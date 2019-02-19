<?php

/**
 * Add support for featured images
 */
add_theme_support('post-thumbnails');

/**
 * Add custom image sizes
 */
add_image_size('hero-sm-portrait', 800, 1066, true);
add_image_size('hero-sm', 744, 992, true);
add_image_size('hero-md', 1600, 800, true);
add_image_size('hero-lg', 2262, 686, true);

/**
 * Register custom image sizes for use in the Add Media modal
 */
add_filter( 'image_size_names_choose', 'add_custom_images_size_names_to_media_modal' );
function add_custom_images_size_names_to_media_modal($sizes) {
  return array_merge($sizes, array(
    'hero-sm-portrait' => __('Hero Small Portrait'),
    'hero-sm' => __('Hero Small'),
    'hero-md' => __('Hero Medium'),
    'hero-lg' => __('Hero Large'),
  ));
}