const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const { mappedSlug, getSlug } = require('./lib/commonUtils');
const { getActualPageFile, paramIsSlug } = require('./lib/serverUtils');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



//
// Caching
//

// caching options
const ssrCache = new LRUCache({
  max: 100,
  maxAge: dev ? 1000 * 3 : 1000 * 60 * 60, // dev: 5 seconds, production: 1 hour
});


/**
 * Checks if a slug path exists in the cache. If so, the cached
 * version is served up. Otherwise, the content is cached.
 */
async function renderAndCache(req, res, actualPage, queryParams) {
  const key = getSlug(req.url, 1) || 'home';
  const isSlug = paramIsSlug(key);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    if (isSlug) console.log(`CACHE HIT: ${key}`);

    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
  } else {
    // Otherwise, the page is not cached. Render the page into HTML.
    try {
      const html = await app.renderToHTML(req, res, actualPage, queryParams);

      // If the page returns a good status code, then cache the page.
      if (res.statusCode === 200) {
        ssrCache.set(key, html);
        if (isSlug) console.log(`CACHE MISS: ${key}`);
        res.setHeader('x-cache', 'MISS');
      }

      // Either way, send the html.
      res.send(html);
    } catch (err) {
      console.log(`CACHE ERR: ${key}`);
      app.renderError(err, req, res, actualPage, queryParams);
    }
  }
}



//
// Routes
//

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/post/:slug', (req, res) => {
      /* NOTE: We aren't using any getActualPageFile or mappedSlug functionality, bc we're assuming:
       * - all posts (not pages) will use the same general layout, which means they
       *   would have no need to have their own specific types of pages in the pages/ directory.
       * - All posts should direct to a slug that accurately reflects the post's slug. */
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'post' };
      renderAndCache(req, res, actualPage, queryParams);
    });

    // treat '/' and '/home' as root pages.
    server.get('(/|/home)', (req, res) => {
      const queryParams = { slug: 'home', apiRoute: 'page' };
      const actualPage = '/index';
      renderAndCache(req, res, actualPage, queryParams);
    });

    // handle all other non-root pages.
    server.get('(/page/|/):slug', (req, res) => {
      const queryParams = { slug: mappedSlug(req.params.slug), apiRoute: 'page' };
      const actualPage = getActualPageFile(queryParams.slug, 'post');
      // NOTE: in previous version, where page.js was different than post.js, I used:
      // const actualPage = getActualPageFile(queryParams.slug, `${queryParams.apiRoute}`);
      renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      app.renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
      app.renderAndCache(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
