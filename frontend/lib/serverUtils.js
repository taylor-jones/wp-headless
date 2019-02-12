/**
 * Server-side utility functions.
 *
 * Note: these won't be available from client-side files,
 * because of the use of 'fs', which isn't available on the client.
 */

const fs = require('fs');
const { toCamelCase } = require('./commonUtils');


/**
 * Checks if a specified page file exists in the pages/ directory
 */
const pageExists = pageName => {
  return fs.existsSync(`./pages/${pageName}.js`);
};


/**
 * Checks if a matching page exists for a slug route. If so,
 *  the matching page is used as the actual page. If not, a fallback
 *  page is used.
 */
const getActualPageFile = (slug, fallback) => {
  const pageName = toCamelCase(slug);
  return (pageExists(pageName) ? `/${pageName}` : `/${fallback}`);
};


/**
 * Checks a url parameter to make sure it represents an actual slug
 * that should be processed, instead of an auxiliary element.
 */
const paramIsSlug = param => {
  return (param !== '_next'
    && param !== 'robots.txt'
    && param !== 'service-worker.js'
    && param !== 'favicon.ico'
    && param !== 'static'
    && param !== 'json'
  );
};


module.exports = {
  pageExists,
  getActualPageFile,
  paramIsSlug,
};

