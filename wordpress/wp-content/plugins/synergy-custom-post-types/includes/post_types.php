<?php

/**********************************************
 *    Register the custom post types
 **********************************************/
add_action( 'init', 'register_custom_post_types' );



/************************************
 * Define the custome post types
 ************************************/
define('SIA_CPT_DOMAIN', 'synergy-custom-post-types');

function register_custom_post_types() {
  // 
  // Service
  // 
  
  register_post_type('service', array(
    'can_export'            => true,
    'capability_type'       => 'post',
    'description'           => __( 'A service provided by our organization', SIA_CPT_DOMAIN ),
    'exclude_from_search'   => false,
    'graphql_plural_name'   => 'services',
    'graphql_single_name'   => 'service',
    'has_archive'           => true,
    'hierarchical'          => false,
    'label'                 => __( 'Service', SIA_CPT_DOMAIN ),
    'labels'                => array(
        'name'                  => _x( 'Services', 'Post Type General Name', SIA_CPT_DOMAIN ),
        'singular_name'         => _x( 'Service', 'Post Type Singular Name', SIA_CPT_DOMAIN ),
        'menu_name'             => __( 'Services', SIA_CPT_DOMAIN ),
        'name_admin_bar'        => __( 'Services', SIA_CPT_DOMAIN ),
        'archives'              => __( 'Service Archives', SIA_CPT_DOMAIN ),
        'attributes'            => __( 'Service Attributes', SIA_CPT_DOMAIN ),
        'parent_item_colon'     => __( 'Parent Service:', SIA_CPT_DOMAIN ),
        'all_items'             => __( 'All Services', SIA_CPT_DOMAIN ),
        'add_new_item'          => __( 'Add New Service', SIA_CPT_DOMAIN ),
        'add_new'               => __( 'Add New', SIA_CPT_DOMAIN ),
        'new_item'              => __( 'New Service', SIA_CPT_DOMAIN ),
        'edit_item'             => __( 'Edit Service', SIA_CPT_DOMAIN ),
        'update_item'           => __( 'Update Service', SIA_CPT_DOMAIN ),
        'view_item'             => __( 'View Service', SIA_CPT_DOMAIN ),
        'view_items'            => __( 'View Services', SIA_CPT_DOMAIN ),
        'search_items'          => __( 'Search Services', SIA_CPT_DOMAIN ),
        'not_found'             => __( 'Not found', SIA_CPT_DOMAIN ),
        'not_found_in_trash'    => __( 'Not found in Trash', SIA_CPT_DOMAIN ),
        'featured_image'        => __( 'Featured Image', SIA_CPT_DOMAIN ),
        'set_featured_image'    => __( 'Set featured image', SIA_CPT_DOMAIN ),
        'remove_featured_image' => __( 'Remove featured image', SIA_CPT_DOMAIN ),
        'use_featured_image'    => __( 'Use as featured image', SIA_CPT_DOMAIN ),
        'insert_into_item'      => __( 'Insert into Service', SIA_CPT_DOMAIN ),
        'uploaded_to_this_item' => __( 'Uploaded to this Service', SIA_CPT_DOMAIN ),
        'items_list'            => __( 'Services list', SIA_CPT_DOMAIN ),
        'items_list_navigation' => __( 'Services list navigation', SIA_CPT_DOMAIN ),
        'filter_items_list'     => __( 'Filter Services list', SIA_CPT_DOMAIN ),
    ),
    'menu_position'         => 30,
    'menu_icon'             => 'dashicons-sos',
    'public'                => true,
    'rest_base'             => 'services',
    'rewrite'               => array(
      'slug'                  => _x('services', 'post type slug', SIA_CPT_DOMAIN),
      'with_front'            => true,
    ),
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => false,
    'show_in_graphql'       => true,
    'show_in_menu'          => true,
    'show_in_rest'          => true,
    'show_ui'               => true,
    'supports'              => array( 'title', 'editor', 'excerpt' ),
  ));

}



