/**
 * Client-Side utility functions
 */

/**
 * Gets the display name of a component wrapped in a HOC
 * for use in Dev Tools.
 */
export const getComposedDisplayName = Component => {
  return Component.displayName || Component.name || 'Component';
};

