<?php

require_once('common.php');


/**
 * Register navigation menu.
 *
 * @return void
 */
function register_menus() {
    register_nav_menu( 'header-menu', __( 'Header Menu', 'sia-wp' ) );
    register_nav_menu( 'footer-menu', __( 'Footer Menu', 'sia-wp' ) );
    register_nav_menu( 'mobile-menu', __( 'Mobile Menu', 'sia-wp' ) );
}
add_action( 'after_setup_theme', 'register_menus' );


/**
 * Gets a menu id from it's name
 * 
 * @param string $name - The name of the menu
 * @return int The menu id (or 0 if not found)
 */
function get_menu_id_by_name($name) {
  $menus = get_terms('nav_menu');

  foreach($menus as $menu) {
    if ($name == $menu->name) {
      return $menu->term_id;
    }
  }

  return 0;
}


/**
 * Programmatically add menu items
 * NOTE: For these to function properly, the pages will need to exist.
 */
// function add_menu_items() {
//   $DEFAULT_MENU_ITEM_OBJECT = 'page';
//   $DEFAULT_MENU_ITEM_STATUS = 'publish';
//   $DEFAULT_MENU_ITEM_TYPE = 'post_type';

//   // Get the ids of each of the menus
//   $header_menu_id = get_menu_id_by_name('header-menu');
//   $footer_menu_id = get_menu_id_by_name('footer-menu');
//   $mobile_menu_id = get_menu_id_by_name('mobile-menu');

//   $menus = [
//     array(
//       'menu-name'   => 'header-menu',
//       'menu-items'  => array(
        
//       )
//     )
//   ];



//   // process each of the menus
//   foreach($menus as $menu) {
//     $menu_id = get_menu_id_by_name($menu['menu_name']);

//     // if the menu exists, process all the menu items
//     if ($menu_id > 0) {
//       // however, don't add the menu items if they already exist
//       foreach($menu['menu_items'] as $item) {
        
//       }

//     }

//   }
// }