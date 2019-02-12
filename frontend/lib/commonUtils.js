/**
 * Utility functions available from either the server-side or the client-side.
 *
 * NOTE: For the sake of compatibility, CommonJS syntax is used (e.g. module.exports),
 * so if you want to import any of these in client-side files, you'll need to use the
 * const commonUtils = require('path/to/commonUtils.js') style syntax.
 */

const slugMap = require('./slugMap');



/**
 * Looks in the slugMap to determine if a slug should be redirected
 * to a different slug. If the argued slug doesn't have a mapped
 * property in the slugMap, then the argued slug is returned as argued.
 */
const mappedSlug = slug => slugMap[slug] || slug;


/**
 * Returns the parsed slug from a given url.
 * NOTE: This function does not check for any slug mapping.
 * @param {string} url
 */
const getSlug = (url, offset) => {
  const parts = url.split('/');
  return parts.length > offset ? parts[parts.length - offset] : url;
};


/**
 * Converts a string to camelCase.
 * Removes any underscores, hyphens, or spaces.
 * @param str - a string to convert to camelCase.
 */
const toCamelCase = str => str.replace(/(-|_|\s)\w/g, (m) => m[1].toUpperCase());


module.exports = {
  mappedSlug,
  getSlug,
  toCamelCase,
};
