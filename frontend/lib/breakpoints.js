/**
 * Breakpoint Sizes
 *
 * Make sure to keep these consistant with
 * the breakpoints in the stylesheets.
 */
export const breakpointSizes = {
  xs: 0,
  sm: 480,
  md: 744,
  lg: 1128,
  xl: 1440,
};


/**
 * Checks if a breakpoint size exists.
 * @param {string} size - the name of a breakpoint size to look for.
 * @returns {bool} true if the size exists, false if not.
 */
const hasBreakpoint = size => Object.prototype.hasOwnProperty.call(breakpointSizes, size);


/**
 * Gets the value of a breakpoint from the breakpointSizes map.
 * @param {string} size - the name of a breakpoint size to get the value of.
 * @returns {number} the associated value from the breakpointSizes map or 0 if the value doesn't exist.
 */
export const getBreakpoint = size => {
  if (!hasBreakpoint(size)) return 0;
  return breakpointSizes[size];
};


/**
 * Generates a media query specifying a max-width below a specified breakpoint.
 *
 * @param {string} size - the name of a breakpoint size to break below
 * @param {bool} includeMedia - optionally include the "@media" text in the response.
 * @returns {string} the corresponding media query for the specified breakpoint.
 */
export const toBreakpoint = (size, includeMedia = false) => {
  const maxWidth = Math.max(getBreakpoint(size) - 1, 0);
  const statement = `max-width: ${maxWidth}px`;
  return includeMedia ? `@media(${statement})` : statement;
};

/**
 * Generates a media query specifying a min-width starting with a specified breakpoint.
 *
 * @param {string} size - the name of a breakpoint size to break above.
 * @param {bool} includeMedia - optionally include the "@media" text in the response.
 * @returns {string} the corresponding media query for the specified breakpoint.
 */
export const fromBreakpoint = (size, includeMedia = false) => {
  const minWidth = getBreakpoint(size);
  const statement = `min-width: ${minWidth}px`;
  return includeMedia ? `@media(${statement})` : statement;
};
