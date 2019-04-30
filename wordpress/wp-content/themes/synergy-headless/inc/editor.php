<?php

/**
 * Gutenberg scripts and styles
 * @see https://www.billerickson.net/block-styles-in-gutenberg/
 */

 function sia_gutenberg_scripts() {
	  wp_enqueue_script(
        'sia-editor', 
        get_stylesheet_directory_uri() . '/editor.js', 
        array( 'wp-blocks', 'wp-dom' ), 
        filemtime( get_stylesheet_directory() . '/editor.js' ),
        true
	  );
}

add_action( 'enqueue_block_editor_assets', 'sia_gutenberg_scripts' );


/**
 * Disable Gutenberg color picker
 */
add_theme_support('disable-custom-colors');