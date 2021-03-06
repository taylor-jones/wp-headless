module.exports = {
  plugins: [
    require('postcss-easy-import')({ prefix: '_' }), // keep this first
    require('autoprefixer')({ /* ...options */ }), // so imports are auto-prefixed too
    require('postcss-easing-gradients'),
    require('postcss-aspect-ratio'),
    require('rucksack-css')(),
  ],
};
