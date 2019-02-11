<?php
/**
 * Common/Helper functions that are used in more than one
 * of the othher include files in this directory.
 */


/**
* Checks if a specified page already exists.
* @param $title - the title of the page
* @return bool - true if the page exists, false if not.
*/
function page_exists($title) {
  return (get_page_by_title($title) != NULL);
}


/**
 * Gets a page's ID from it's title. If the page doesn't
 * exist, returns 0.
 */
function get_page_id_by_title($title) {
  $page = get_page_by_title($title);
  if ($page) {
    return $page->ID;
  }
  return 0;
}
