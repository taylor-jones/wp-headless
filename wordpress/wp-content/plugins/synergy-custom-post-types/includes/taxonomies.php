<?php

/**********************************************
 *    Register the custom tabonomies
 **********************************************/
add_action( 'init', 'register_custom_taxonomies' );



/*****************************************
 *          Custom taxonomies
 *****************************************/

function register_custom_taxonomies() {

  /**
   * Service Category
   * 
   * The broad category types for a given service
   * (e.g. - residential, community, tenant case management)
   */

  register_taxonomy('service-category', array('service'), array(
    'graphql_single_name'   => 'serviceCategory',
    'graphql_plural_name'   => 'serviceCategories',
    'hierarchical'          => false,
    'labels'                => array(
        'name'              => _x( 'Service Categories', 'taxonomy general name' ),
        'singular_name'     => _x( 'Service Category', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Service Categories' ),
        'all_items'         => __( 'All Service Categories' ),
        'parent_item'       => __( 'Parent Service Category' ),
        'parent_item_colon' => __( 'Parent Service Category:' ),
        'edit_item'         => __( 'Edit Service Category' ),
        'update_item'       => __( 'Update Service Category' ),
        'add_new_item'      => __( 'Add New Service Category' ),
        'new_item_name'     => __( 'New Service Category Name' ),
        'menu_name'         => __( 'Service Categories' ),
    ),
    'public'                => false,
    'rest_base'             => 'service-category',
    'rewrite'               => array(
        'slug'                  => _x('service-categories', 'taxonomy slug', SIA_CPT_DOMAIN),
        'with_front'            => false,
    ),
    'show_admin_column'     => false,
    'show_in_graphql'       => true,
    'show_in_menu'          => true,
    'show_in_nav_menus'     => false,
    'show_in_rest'          => true,
    'show_in_quick_edit'    => false,
    'show_ui'               => true,
    )
  );


  /**
   * Service Region
   * 
   * The general region in which a given service may be offered
   * (e.g. - Polk County, Rutherford County, Asheville)
   */

  register_taxonomy('service-region', array('service'), array(
    'graphql_single_name'   => 'serviceRegion',
    'graphql_plural_name'   => 'serviceRegions',
    'hierarchical'          => false,
    'labels'                => array(
        'name'              => _x( 'Service Regions', 'taxonomy general name' ),
        'singular_name'     => _x( 'Service Region', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Service Regions' ),
        'all_items'         => __( 'All Service Regions' ),
        'parent_item'       => __( 'Parent Service Region' ),
        'parent_item_colon' => __( 'Parent Service Region:' ),
        'edit_item'         => __( 'Edit Service Region' ),
        'update_item'       => __( 'Update Service Region' ),
        'add_new_item'      => __( 'Add New Service Region' ),
        'new_item_name'     => __( 'New Service Region Name' ),
        'menu_name'         => __( 'Service Regions' ),
    ),
    'public'                => false,
    'rest_base'             => 'service-region',
    'rewrite'               => array(
        'slug'                  => _x('service-regions', 'taxonomy slug', SIA_CPT_DOMAIN),
        'with_front'            => false,
    ),
    'show_admin_column'     => false,
    'show_in_graphql'       => true,
    'show_in_menu'          => true,
    'show_in_nav_menus'     => false,
    'show_in_rest'          => true,
    'show_in_quick_edit'    => true,
    'show_ui'               => true,
    )
  );


}