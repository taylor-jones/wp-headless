/**
 * Utility functions for use with Services
 */

/**
 * Filters an array of services to only those that have
 * a service category matching the given category.
 *
 * @param { services } array - array of services
 * @param {category} string - the service category to use for filtering the results.
 */
export const getServicesByCategory = (services, category) => {
  return services.filter(service => {
    return service.acf.service_categories.some(cat => {
      return cat.slug === category;
    });
  });
};
