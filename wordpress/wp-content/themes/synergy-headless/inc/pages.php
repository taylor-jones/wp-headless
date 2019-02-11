<?php

require_once('common.php');


/**
 * Add support for page excerpts
 */
add_post_type_support('page', 'excerpt');



/**
 * Creates the pages in an array, if they don't already exist.
 */
function create_pages_in_array($pages) {
  $DEFAULT_POST_TYPE = 'page';
  $DEFAUKT_POST_STATUS = 'publish';

  foreach($pages as $page) {
    if (!page_exists($page['post_title'])) {
      $page['post_type'] = $DEFAULT_POST_TYPE;
      $page['post_status'] = $DEFAUKT_POST_STATUS;
      wp_insert_post($page);
    }
  }
}


/**
 * Sets up default pages (if they don't already exist)
 */
function ensure_base_pages_exist() {
  // define the root level pages.
  $root_pages = [
    array(
      'post_title'    => 'Synergy In Action',
      'post_name'     => 'Home',
    ),
    array(
      'post_title'    => 'About Us',
      'post_name'     => 'about',
    ),
    array(
      'post_title'    => 'Our Services',
      'post_name'     => 'services',
    ),
    array(
      'post_title'    => 'Get Involved',
    ),
    array(
      'post_title'    => 'Contact Us',
      'post_name'     => 'contact',
    ),
    array(
      'post_title'    => 'Helpful Links',
      'post_name'     => 'links',
    ),
    array(
      'post_title'    => 'Privacy Policy',
      'post_name'     => 'privacy',
    ),
    array(
      'post_title'    => 'Site Map',
    ),
    array(
      'post_title'    => 'Financials',
    )
  ];

  // pages that have a parent page in the root_pages.
  $child_pages = [
    array(
      'post_title'    => 'Mission and Vision',
      'post_parent'   => get_page_id_by_title('About Us'),
    ),
    array(
      'post_title'    => 'Board of Advisors',
      'post_parent'   => get_page_id_by_title('About Us'),
    ),
    array(
      'post_title'    => 'Our Team',
      'post_name'     => 'team',
      'post_parent'   => get_page_id_by_title('About Us'),
    ),
    array(
      'post_title'    => 'FAQs',
      'post_parent'   => get_page_id_by_title('About Us'),
    ),
    array(
      'post_title'    => 'Residential',
      'post_parent'   => get_page_id_by_title('Our Services'),
    ),
    array(
      'post_title'    => 'Community',
      'post_parent'   => get_page_id_by_title('Our Services'),
    ),
    array(
      'post_title'    => 'Tenant Case Management',
      'post_parent'   => get_page_id_by_title('Our Services'),
    ),
    array(
      'post_title'    => 'Careers',
      'post_parent'   => get_page_id_by_title('Get Involved'),
    ),
    array(
      'post_title'    => 'Donate',
      'post_parent'   => get_page_id_by_title('Get Involved'),
    ),
    array(
      'post_title'    => 'Events',
      'post_parent'   => get_page_id_by_title('Get Involved'),
    ),
    array(
      'post_title'    => 'Volunteer',
      'post_parent'   => get_page_id_by_title('Get Involved'),
    ),
  ];

  
  create_pages_in_array($root_pages);
  create_pages_in_array($child_pages);
}


// add_action('init', 'ensure_base_pages_exist', 50);