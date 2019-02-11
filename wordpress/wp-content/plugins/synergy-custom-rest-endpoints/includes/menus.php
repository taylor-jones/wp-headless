<?php

/************************************************
 * Custom REST endpoints for menus & menu items.
 ************************************************/

add_action('rest_api_init', 'setup_custom_rest_menus');



 /**
  * Sets up the custom menu endpoints
  */
 function setup_custom_rest_menus() {
    register_rest_route('menus/v1', '/menus', array(
      'methods'  => \WP_REST_Server::READABLE,
      'callback' => 'get_registered_menus'
    ));

    register_rest_route('menus/v1', '/menus/(?P<id>[a-zA-Z0-9_-]+)', array(
      'methods'  => \WP_REST_Server::READABLE,
      'callback' => 'get_menu_data'
    ));

    register_rest_route('menus/v1', '/subnav/(?P<id>[a-zA-Z0-9_-]+)', array(
      'methods'  => \WP_REST_Server::READABLE,
      'callback' => 'get_subnav_data'
    ));
 }



/**
 * Get all menus registered WordPress menus
 * @return $menus - an array of menus.
 */
function get_registered_menus() {
  $menus = [];
  foreach (get_registered_nav_menus() as $slug => $description) {
    $menu = new stdClass();
    $menu->slug = $slug;
    $menu->description = $description;
    $menus[] = $menu;
  }

  return $menus;
}



/**
 * Gets the subnav items for a specified subnav post query
 */
function get_subnav_data(WP_REST_Request $request) {
  $response = new stdClass();
  $params = $request->get_params();
  $items = [];

  // determine if the argued id represents a slug or an object id.
  $current_id = $params['id'];
  $exclude_post_id = null;

  if (!is_numeric($current_id)) {
    // get the current post id from the slug
    if ($req_post = get_posts(array(
      'name'          => $current_id,
      'post_type'     => array('any'),
      'post_status'   => 'publish',
      'numberposts'   => 1
    ))) {
      $current_id = $req_post[0]->ID;
    }
  }

  // if it's still not numeric, then something is wrong...
  if (!is_numeric($current_id)) return $response;

  // gather (possibly) argued query parameters
  $include_current = $params['include_current'];
  $include_parent = $params['include_parent'];
  $post_type = $params['post_type'] ?: array('any');    // post type is 'any' unless specified.


  /* If the post_parent of the id is 0, then this is a base-level
   * item, so we want to return its children (and optionally itself).
   * 
   * Otherwise, if the post_parent of the id != 0, then this is not
   * a base-level item, so we want to display its peers (and optionally itself)
   * 
   * Note: from a practical standpoint, page submenus (that arent' overview pages)
   * should always include the current page, but there may be other cases 
   * (like events, posts, etc.) where maybe it makes more sense to not display 
   * a link to the current item along with its peers in the submenu). */

  // Get post information for the current post (we need it whether or not
  // the current post will be included in the response).
  $current_post = get_post($current_id);
  $current_post_parent_id = $current_post->post_parent;

  if ($current_post_parent_id == 0) {
   /* The current post is a top-level post.
    * 1) There is no parent post, so we can exclude that from the response,
    *    regardless of the value of the 'include_parent' parameter.
    * 2) Unless 'include_current' was explicitely argued as true, this 
    *    top-level post will not be included by in the response default. */
    if ($include_current) {
      $current_post->url = get_permalink($current_post->ID);
      array_push($items, $current_post);
    }

  } else {
    // The current post is not a top-level post. 
    $parent_post = get_post($current_post_parent_id);
    $parent_post_parent = $parent_post->post_parent;

    /* Consider the parent of the current post:
     * If the parent post is top-level (meaning it has a parent == 0): 
     *  - unless $include_parent is explicitly true, we will not include the parent post in the response.
     * If the parent post is not top-level (meaning it has a parent != 0): 
     *  - unless $include_parent is explicitely false, we will include the parent post in the response. */
    if (($parent_post_parent == 0 && $include_parent == 'true') || ($parent_post_parent != 0 && $include_parent != 'false')) {
      $parent_post->url = get_permalink($parent_post->ID);
      $parent_post->featured_image = get_featured_image_data($parent_post->ID);
      array_push($items, $parent_post);
    }

    // Unless include_current is explicitely false, include it in the response.
    if ($include_current == 'false') {
      $exclude_post_id = $current_id;
    }
    
    // Update the $current_id value to be the parent of the current post, 
    // so we can return the siblings of the current post instead of the children.
    $current_id = $current_post_parent_id;
  }

  
  // Fetch all the related posts (whether children or siblings, as determined above),
  // and push each of those items onto the reponse array.
  foreach (get_posts(array(
    'post_type'      => $post_type,
    'posts_per_page' => -1,
    'post_parent'    => $current_id,
    'post_status'    => 'publish',
    'post__not_in'   => array($exclude_post_id),
    'order'          => 'ASC',
    'orderby'        => 'menu_order'
  )) as $post) {
    $post->url = get_permalink($post->ID);
    $post->menu_item_parent = $current_id;
    $post->parent_name = $current_post->post_title;
    $post->featured_image = get_featured_image_data($post->ID);
    array_push($items, $post);
  }

  // return the items after purging & cleanup
  $response->count = count($items);
  $response->items = $items;
  $response->parent_id = $current_post_parent_id;

  if ($response->count > 0) {
    $response->items = purged_menu_items($items);
  }

  return $response;
}



/**
 * Gets the featured image data (if it exists) for a given post id.
 * @param $post_id - the id of a post to get the featured image data for.
 */
function get_featured_image_data($item_id) {
  $featured_image = new stdClass();
  $post = get_post($item_id);
  
  // only try to get the related image data if the post exists.
  if ($post) {
    $image_id = (int) get_post_thumbnail_id($post->ID);
    $image = get_post($image_id);
    if (!$image) return null;
    
    $featured_image->id             = $image_id;
    $featured_image->alt            = get_post_meta($image_id, '_wp_attachment_image_alt', true);
    $featured_image->caption        = $image->post_excerpt;
    $featured_image->description    = $image->post_content;
    $featured_image->post_id        = !empty($image->post_parent) ? (int) $image->post_parent : null;
    $featured_image->sizes          = wp_get_attachment_metadata($image_id)['sizes'];
    $featured_image->source_url     = wp_get_attachment_url($image_id);
  
    // Update all the images sizes to have a proper source url
    if (!$featured_image->sizes) {
      // there aren't any sizes set, so just set it to an empty object.
      $featured_image->sizes = new stdClass;
    } else {
      // add a source url property to each image size
      foreach($featured_image->sizes as $size => &$size_data) {
        $src = wp_get_attachment_image_src($image_id, $size);
        $size_data['source_url'] = $src ? $src[0] : null;
      }
    }
  }

  return $featured_image;
}



/**
 * Get all data for a specified menu location.
 * The function checks if a 'nested' parameter was argued.
 * If not, it defaults to true, which will return the data in a
 * recursively nested format for each of the menu items. 
 * If 'nested' is explicitely false, then the data will be returned
 * in a flattened format.
 * 
 * @param $request - a WP REST API request
 */
function get_menu_data(WP_REST_Request $request) {
  $is_nested = $request->get_param('nested') == 'false' ? false : true;
  $menu_location = $request->get_url_params()['id'];

  if ($is_nested) {
    return get_menu_data_nested($menu_location);
  } else {
    return get_menu_data_flattened($menu_location);
  }
}



/**
 * Returns the nested menu data for a particular menu.
 */
function get_menu_data_nested($menu_location) {
  $menu = new stdClass();
  $menu->items = [];

  if (($locations = get_nav_menu_locations()) && isset($locations[$menu_location])) {
    $menu = get_term($locations[$menu_location]);
    $menu->items = purged_menu_items(wp_get_nav_menu_items($menu->term_id));

    // menu items that have no parent
    $root_menu_items = array_values(
      array_filter($menu->items, function($item) {
        return $item->menu_item_parent == 0;
      })
    );
    
    // track the # of root-level menu items
    $root_item_count = 0;
    
     // Build a nested array of descendant menu items 
     // for each of the root-level menu items.
     foreach($root_menu_items as $root_item) {
       $root_item_count += 1;
       $item_group = get_item_path_group($root_item, $root_menu_items);
       $root_item = get_nested_menu_items($root_item, $menu->items, $item_group);
     }
  
    // Set the menu items as the nested root menu items
    $menu->items = $root_menu_items;
    $menu->count = $root_item_count;
  }

  // $menu->type = 'nested';
  return purged_menu_object($menu);
}



/**
 * Gets the path group for a given menu item.
 * The path group includes the group name, group id,
 * and group slug of the top-most ancestor menu item
 * for the given menu item.
 * 
 * @param $item - the menu item object
 * @param $items - the pool of items from which to get the ancestor item
 */
function get_item_path_group($item, $items) {
  $path_group = [];
  $ancestor = $item;

  // traverse the tree until the ancestor is found
  while ($ancestor->menu_item_parent != 0) {
    foreach($items as $i) {
      if ($i->ID == $ancestor->menu_item_parent) {
        // set the item's immediate parent name
        if (!$item->parent_name) {
          $item->parent_name = $i->title;
        }

        $ancestor = $i;
        break;
      }
    }
  }

  // Once found, populate the item group w/ the ancestor info
  $path_group = array(
    name   => $ancestor->title,
    id     => $ancestor->ID,
    slug   => $ancestor->slug,
  );

  return $path_group;
}



/**
 * Recursively populates menu items with any child items.
 * @param $item - the item for which to get all child items.
 * @param $items - the pool of menu items to inspect
 * @param $item_group - the slug name of the ancestor (top level) menu item for the current item
 * @param $parent_name - the slug name of the current menu item's parent menu item
 * @param $depth - the depth of the current menu item within it's menu path (where 0 is for root level)
 * @param $max_depth - the maximum nesting depth allowed (-1 = no limit)
 */
function get_nested_menu_items($item, $items, $item_group, $parent_name = '', $depth = 0, $max_depth = -1) {
  $items_left = [];
  $children = [];

  for ($i = 0; $i < count($items); $i++) {
    if ($items[$i]->menu_item_parent == $item->ID) {
      // it's a child of the current item
      array_push($children, $items[$i]);
    } else if ($items[$i]->menu_level == null) {
      // keep it in the pool of possible child items
      array_push($items_left, $items[$i]);
    }
  }

  // Increment the menu level depth for each nested recursive call
  $depth += 1;
  $child_count = 0;

  // Make sure not to exceed the max nested level depth allowed.
  if ($max_depth == -1 || $max_depth <= $depth) {
    // Recursively call this function for each child to complete the nesting.
    foreach($children as $c) {
      $c = get_nested_menu_items($c, $items_left, $item_group, $item->title, $depth, $max_depth);
      $child_count += 1;
    }
  }

  // Append an 'items' array to each menu item, 
  // whether or not it has any child items
  $item->count = $child_count;
  $item->items = $children;
  $item->menu_level = $depth;
  $item->parent_name = $parent_name;
  $item->path_group = $item_group;

  return $item;
}



/**
 * Returns the flattened menu data for a particular menu.
 */
function get_menu_data_flattened($menu_location) {
  $menu = new stdClass();
  $menu->items = [];

  if (($locations = get_nav_menu_locations()) && isset($locations[$menu_location])) {
    $menu = get_term($locations[$menu_location]);
    $menu->items = purged_menu_items(wp_get_nav_menu_items($menu->term_id));

    // get the path group data for each menu item.
    foreach($menu->items as $item) {
      $item->path_group = get_item_path_group($item, $menu->items);
    }
  }

  return purged_menu_object($menu);
}



/**
 * Purges and returns a menu object that has been purged of unnecessary 
 * information to make it more lightweight and easier to read.
 */
function purged_menu_object($menu) {
  // array of properties to remove from the menu object
  // NOTE: including a property that doesn't exist on the object won't cause an error.
  $remove_props = [
    'filter', 
    'description',
    'name',
    'parent',
    'slug',
    'taxonomy',
    'term_id',
    'term_group',
    'term_taxonomy_id',
  ];
  
  foreach($remove_props as $prop) {
    unset($menu->{$prop});
  }

  return $menu;
}



/**
 * Purges each of the menu items in an array of menu items (non-recursive)
 */
function purged_menu_items($items) {
  $purged = [];
  foreach($items as $item) {
    if (isset($item->items)) {
      $item->items = purged_menu_items($item->items);
    }

    array_push($purged, purged_menu_item($item));
  }
  return $purged;
}



/**
 * Purges and returns a menu item that has been purged of unnecessary 
 * information to make it more lightweight and easier to read.
 */
function purged_menu_item($item) {
  // array of properties to remove from the menu item object
  // NOTE: including a property that doesn't exist on the object won't cause an error.
  $remove_props = [
    'attr_title',
    'classes',
    'comment_count',
    'comment_status',
    'db_id',
    'description',
    'filter',
    'guid',
    'object_id',
    'ping_status',
    'pinged',
    'post_author',
    'post_content',
    'post_content_filtered',
    'post_date',
    'post_date_gmt',
    'post_mime_type',
    'post_modified',
    'post_modified_gmt',
    // 'post_name',
    'post_password',
    'post_status',
    'post_title',
    'post_type',
    'target',
    'to_ping',
    'type',
    'xfn',
  ];

  
  // remove all the listed properties
  foreach($remove_props as $prop) {
    unset($item->{$prop});
  }

  // Add the is_link property, if it exists (which it should if defined in ACF)
  if (function_exists('get_field')) {
    $item->is_link = get_field('is_link', $item->ID);
    if ($item->is_link == null) $item->is_link = true;
    
    if (!$item->is_link) {
      $item->url = '';
    }
  }

  // now add a slug property
  $item->slug = wp_basename($item->url) ?: wp_basename($item->title) ?: wp_basename($item->post_name) ?: '';


  // add a menu level property
  /* This is important to keep, because removing it could break the 
   * way that nested menu items determine who their child items are 
   * (If that happens, there are other ways to make it still work, but
   * it'll be a little bit slower) */
  if (!isset($item->menu_level)) {
    $item->menu_level = null;
  }

  return $item;
}

