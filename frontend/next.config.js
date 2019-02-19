const path = require('path');
const glob = require('glob');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const loaderUtils = require('./node_modules/loader-utils');


/**
 * Defines directories containing stylesheets that should NOT be "localized"
 * with hashed class names whwnever their styles are included in a component.
 */
const nonLocalStyles = ['styles/**', 'node_modules/**'].map(d => path.join(__dirname, d));


/**
 * Determines if a specified filepath belongs to a path
 * that should be transformed to a localized convention
 */
const shouldBeLocalized = pathToCheck => {
  return !nonLocalStyles.some((v) => {
    const curr = pathToCheck.substr(0, pathToCheck.lastIndexOf('/') + 1);
    return v.includes(curr);
  });
};



/**
 * Returns the class name of a style as it should be rendered when used within a
 * component, based on whether it belongs to a localized path or not.
 * If so, the class name is hashed. If not, it is not hashed.
 */
const getComponentClass = (context, ident, locName, opts) => {
  const shouldBeLocal = shouldBeLocalized(context.resourcePath);

  // if it doesn't need to be localized (hashed),
  // then just return the existing local name as it is.
  if (!shouldBeLocal) return locName;

  // Otherwise, hash the class name
  if (!opts.context) {
    if (context.rootContext) {
      opts.context = context.rootContext;
    } else if (context.opts && typeof context.opts.context === 'string') {
      opts.context = context.opts.context;
    } else {
      opts.context = context.context;
    }
  }

  const request = path.relative(opts.context, context.resourcePath);
  opts.content = `${opts.hashPrefix + request}+${locName}`;
  ident = ident.replace(/\[local\]/gi, locName);

  const hash = loaderUtils
    .interpolateName(context, ident, opts)
    .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
    .replace(/^((-?[0-9])|--)/, '_$1');

  return `${locName}___${hash.substr(0, 6)}`;
};



/**
 * Webpack config
 */
const webpackConfig = {
  webpack(config, { dev }) {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: { name: 'dist/[path][name].[ext]' },
      },
      {
        test: /\.scss$/,
        use: [
          'babel-loader',
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), []),
            },
          },
        ],
      },
    );

    return config;
  },
};


module.exports = withCss(withSass({
  webpackConfig,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    getLocalIdent: (loaderContext, localIdentName, localName, options) => {
      return getComponentClass(loaderContext, localIdentName, localName, options);
    },
  },
}));
