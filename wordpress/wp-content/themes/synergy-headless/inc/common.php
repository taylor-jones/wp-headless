<?php
/**
 * Common/Helper functions that are used in more than one
 * of the othher include files in this directory.
 */


/**
* Checks if a specified page already exists.
*
* @param $title - the title of the page
* @return bool - true if the page exists, false if not.
*/
function page_exists($title) {
  return (get_page_by_title($title) != NULL);
}


/**
 * Gets a page's ID from it's title. 
 * 
 * @param title - the title of a wp page
 * @return int - the ID of the page if it exists, 0 if it doesn't
 */
function get_page_id_by_title($title) {
  $page = get_page_by_title($title);
  if ($page) return $page->ID;
  return 0;
}


/**
 * Wrapper for the in_array function that will return the $needle
 * value, if in_array returns true, but will return a pre-defined
 * $default value if in_array returns false.
 * 
 * @param needle - a target value to look for in the array.
 * @param haystack - the array in which to look for the target.
 * @param default - the value that is returned if the target isn't in the array.
 * @param strict - whether or not to use strict mode in searching 
 *    (type specific, case sensitive, etc..). This is a built-in PHP thing,
 *    see here for more: http://php.net/manual/en/function.in-array.php
 */
function from_array($needle, $haystack, $default = null, $strict = false) {
  if (in_array($needle, $haystack, $strict)) return $needle;
  return $default;
}