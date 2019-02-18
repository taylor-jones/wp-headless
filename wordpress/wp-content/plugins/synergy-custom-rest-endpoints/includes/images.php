<?php

/********************************************
 * Custom REST endpoints for featured images.
 ********************************************/

 /**
 * Check once if ACF exists
 */
define('HAS_ACF', class_exists('ACF') && function_exists('get_field'));


add_action('init', 'init_custom_rest_images', 12);


/**
 * Registers the custom featured image endpoint for all public
 * post types that support post thumbnails.
 */
function init_custom_rest_images() {
  $post_types = get_post_types(array('public' => true), 'objects');
  foreach($post_types as $post_type) {
    $post_type_name = $post_type->name;
    $show_in_rest = (isset($post_type->show_in_rest) && $post_type->show_in_rest) ? true : false;
    $supports_thumbnail = post_type_supports($post_type_name, 'thumbnail');

    // make sure the post type is set to be available via the REST API 
    // and that it supports featured inmages.
    if ($show_in_rest && $supports_thumbnail) {
      register_rest_field($post_type_name,
        'featured_image',
        array(
          'get_callback'  => 'get_custom_rest_image',
          'schema'        => null,
        )
      );
    }
  }
}


/**
 * Gets the custom featured image data for a given post request
 */
function get_custom_rest_image($object) {
  // make sure there's a featured image.
  if (empty($object['featured_media'])) return null;
  
  // get the image data
  $image_id = (int) $object['featured_media'];
  $image = get_post($image_id);
  if (!$image) return null;
  
  $featured_image['id']             = $image_id;
  $featured_image['alt']            = get_post_meta($image_id, '_wp_attachment_image_alt', true);
  $featured_image['caption']        = $image->post_excerpt;
  $featured_image['description']    = $image->post_content;
  $featured_image['post_id']        = !empty($image->post_parent) ? (int) $image->post_parent : null;
  $featured_image['sizes']          = wp_get_attachment_metadata($image_id)['sizes'];
  $featured_image['source_url']     = wp_get_attachment_url($image_id);

  // Update all the images sizes to have a proper source url
  if (empty($featured_image['sizes'])) {
    // there aren't any sizes set, so just set it to an empty object.
    $featured_image['sizes'] = new stdClass;
  } else {
    // add a source url property to each image size
    foreach($featured_image['sizes'] as $size => &$size_data) {
      $src = wp_get_attachment_image_src($image_id, $size);
      $size_data['source_url'] = $src ? $src[0] : null;
    }
  }

  // $featured_image['sizes']['foo'] = 'bar';
  $featured_image = check_for_small_featured_image_override($object, $featured_image);

  return apply_filters('custom_rest_images', $featured_image, $image_id);
}



/**
 * Checks for a portrait featured image override.
 */
function check_for_small_featured_image_override($object, $featured_image) {
  // only do this if ACF is present
  if (HAS_ACF) {
    // declare the size that should be overriden in the original featured image data
    $override_size = 'hero-sm-portrait';

    // get the image id of the chosen portrait featured image
    $image_id = get_field('portrait_featured_image', $object->ID);
    if (!$image_id) return $featured_image;

    // if there aren't any sizes present for this image, return early
    $portrait_image['sizes'] = wp_get_attachment_metadata($image_id)['sizes'];
    if (empty($portrait_image['sizes'])) return $featured_image;

    // loop through each size. when the specified override size is found,
    // get the image data for the overriding image and replace it in the 
    // original featured image data.
    foreach($portrait_image['sizes'] as $size => &$size_data) {
      if ($size == $override_size) {
        $src = wp_get_attachment_image_src($image_id, $size);
        $size_data['source_url'] = $src ? $src[0] : null;
      }
    }

    $featured_image['sizes'][$override_size] = $portrait_image['sizes'][$override_size];
  }

  // return the featured image data, whether or not it's been modified.
  return $featured_image;
}