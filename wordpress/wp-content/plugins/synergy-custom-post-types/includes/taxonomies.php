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
   * Opportunity Category
   * 
   * The category types of opportunities to get involved
   * (e.g. employment, volunteer, internship, etc...)
   */

  register_taxonomy('opportunity-category', array('opportunity'), array(
    'graphql_single_name'   => 'opportunityCategory',
    'graphql_plural_name'   => 'opportunityCategories',
    'hierarchical'          => false,
    'labels'                => array(
        'name'              => _x( 'Opportunity Categories', 'taxonomy general name' ),
        'singular_name'     => _x( 'Opportunity Category', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Opportunity Categories' ),
        'all_items'         => __( 'All Opportunity Categories' ),
        'parent_item'       => __( 'Parent Opportunity Category' ),
        'parent_item_colon' => __( 'Parent Opportunity Category:' ),
        'edit_item'         => __( 'Edit Opportunity Category' ),
        'update_item'       => __( 'Update Opportunity Category' ),
        'add_new_item'      => __( 'Add New Opportunity Category' ),
        'new_item_name'     => __( 'New Opportunity Category Name' ),
        'menu_name'         => __( 'Opportunity Categories' ),
    ),
    'public'                => false,
    'rest_base'             => 'opportunity-category',
    'rewrite'               => array(
        'slug'                  => _x('opportunity-categories', 'taxonomy slug', SIA_CPT_DOMAIN),
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
   * Service Coverage Types
   * 
   * The insurange coverage types that a service is available for
   */

  register_taxonomy('service-coverage-type', array('service'), array(
    'graphql_single_name'   => 'serviceCoverageType',
    'graphql_plural_name'   => 'serviceCoverageTypes',
    'hierarchical'          => false,
    'labels'                => array(
        'name'              => _x( 'Coverage Types', 'taxonomy general name' ),
        'singular_name'     => _x( 'Coverage Type', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Coverage Types' ),
        'all_items'         => __( 'All Coverage Types' ),
        'parent_item'       => __( 'Parent Coverage Type' ),
        'parent_item_colon' => __( 'Parent Coverage Type:' ),
        'edit_item'         => __( 'Edit Coverage Type' ),
        'update_item'       => __( 'Update Coverage Type' ),
        'add_new_item'      => __( 'Add New Coverage Type' ),
        'new_item_name'     => __( 'New Coverage Type Name' ),
        'menu_name'         => __( 'Coverage Types' ),
    ),
    'public'                => false,
    'rest_base'             => 'service-coverage-type',
    'rewrite'               => array(
        'slug'                  => _x('service-coverage-types', 'taxonomy slug', SIA_CPT_DOMAIN),
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
   * Service Diagnosis Types
   * 
   * The general diagnosis type(s) that a service is available for
   */

  register_taxonomy('service-diagnosis-type', array('service'), array(
    'graphql_single_name'   => 'serviceDiagnosisType',
    'graphql_plural_name'   => 'serviceDiagnosisTypes',
    'hierarchical'          => false,
    'labels'                => array(
        'name'              => _x( 'Diagnosis Types', 'taxonomy general name' ),
        'singular_name'     => _x( 'Diagnosis Type', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Diagnosis Types' ),
        'all_items'         => __( 'All Diagnosis Types' ),
        'parent_item'       => __( 'Parent Diagnosis Type' ),
        'parent_item_colon' => __( 'Parent Diagnosis Type:' ),
        'edit_item'         => __( 'Edit Diagnosis Type' ),
        'update_item'       => __( 'Update Diagnosis Type' ),
        'add_new_item'      => __( 'Add New Diagnosis Type' ),
        'new_item_name'     => __( 'New Diagnosis Type Name' ),
        'menu_name'         => __( 'Diagnosis Types' ),
    ),
    'public'                => false,
    'rest_base'             => 'service-diagnosis-type',
    'rewrite'               => array(
        'slug'                  => _x('service-diagnosis-types', 'taxonomy slug', SIA_CPT_DOMAIN),
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