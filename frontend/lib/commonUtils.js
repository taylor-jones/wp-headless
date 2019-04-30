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
 *
 * @param {string} slug - the slug to check for a mapped path for
 * @returns {string} - the slug that should be routed for the given slug.
 */
const mappedSlug = slug => {
  const hasMappedSlug = Object.prototype.hasOwnProperty.call(slugMap, slug);
  return hasMappedSlug ? slugMap[slug] : slug;
};


/**
 * Returns the parsed slug from a given url.
 * NOTE: This function does not check for any slug mapping.
 * @param {string} url
 * @param {number} offset
 * @param {boolean} includePath
 * @returns {string}
 */
const getSlug = (url, offset = 2, includePath = false) => {
  const parts = url.split('/');

  if (parts.length >= offset) {
    if (includePath) return parts.slice(parts.length - offset).join('/');
    return parts[parts.length - offset];
  }

  return url;
};


/**
 * Converts a string to camelCase.
 * Removes any underscores, hyphens, or spaces.
 * @param {string} str - a string to convert to camelCase.
 */
const toCamelCase = str => str.replace(/(-|_|\s)\w/g, (m) => m[1].toUpperCase());


/**
 * Returns a capitalized copy of a string.
 * @param {string} str - a string to capitalize.
 */
const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1);


/**
 * Given an object and N property names, return the total
 * number of truthy object values represented by the argued
 * property names. A property is falsy if:
 *  - it doesn't exist on the object
 *  - it exists on the object, but it's value is falsy.
 *  - it exists on the object as an empty array.
 * If a property exists as a non-empty array on the object,
 *  then include (in the result) the total length of the array.
 *
 * EXAMPLE:

    const foo = {
      bar: false,
      baz: 1,
      biz: [1, 2, 3],
    };

  countTruthyFromProperties(foo, 'bar');                  // 0
  countTruthyFromProperties(foo, 'bar', 'baz');           // 1
  countTruthyFromProperties(foo, 'bar', 'baz', 'biz');    // 4
 */
const countTruthyFromProperties = (obj, ...props) => {
  let totalTruthy = 0;

  [...props].forEach(prop => {
    if (obj[prop]) {
      if (Array.isArray(obj[prop])) {
        totalTruthy += obj[prop].length;
      } else {
        totalTruthy += 1;
      }
    }
  });

  return totalTruthy;
};


module.exports = {
  mappedSlug,
  getSlug,
  toCamelCase,
  capitalized,
  countTruthyFromProperties,
};
