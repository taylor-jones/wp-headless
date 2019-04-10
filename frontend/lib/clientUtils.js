/**
 * Client-Side utility functions
 */

/**
 * Gets the display name of a component
 * wrapped in a HOC for use in Dev Tools.
 *
 * @param {Component} - a ReactJS component
 */
export const getComposedDisplayName = Component => {
  return Component.displayName || Component.name || 'Component';
};


/**
 * Filters an array of services to only those that have
 * a service category matching the given category.
 *
 * @param {services} array - array of services
 * @param {category} string - the service category to use for filtering the results.
 */
export const getServicesByCategory = (services, category) => {
  return services.filter(service => {
    return service.acf.service_categories.some(cat => {
      return cat.slug === category;
    });
  });
};


/**
 * Decodes html entities in a string by converting them into
 * their original unescaped characters.
 *
 * @param {string} str - the string to decode
 * @returns {string} the decoded string
 */
export const decode = str => {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
};
