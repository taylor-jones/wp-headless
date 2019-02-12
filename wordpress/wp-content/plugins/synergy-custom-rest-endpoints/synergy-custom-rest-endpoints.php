<?php
/*
Plugin Name:  Synergy Custom Rest Endpoints
Plugin URI:   
Description:  Custom REST endpoints for Synergy In Action
Version:      0.0.1
Author:       Taylor Jones
Author URI:   
License:      GPL3
License URI:  https://www.gnu.org/licenses/gpl-3.0.html
Text Domain:  synergy-custom-rest-endpoints
Domain Path:  /languages
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Synergy_Custom_Rest {

	/**
	 * @var $instance - The One true copy of Synergy_Custom_Rest that we'll ever need
	 */
	private static $instance;

	/**
	 * @var $plugin_dir - The plugin directory, for reuse in the includes.
	 */
  private static $plugin_dir;
  
	/**
   * Synergy_Custom_Rest constructor.
	 */
  private function __construct() {}


	/**
	 * Determines if we've already loaded the plugin, and if so returns it.
	 * Otherwise it kicks up a new instance of itself and stores it for later use.
	 *
	 * This is the singleton method.
	 *
	 * @return Synergy_Custom_Rest
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Synergy_Custom_Rest ) ) {
			self::$instance = new Synergy_Custom_Rest;
      self::$plugin_dir = trailingslashit( dirname( __FILE__ ) );

			// Load the includes
			self::$instance->includes();
		}

		return self::$instance;
	}


	/**
	 * Include the necessary files.
	 */
	private function includes() {
		include_once self::$plugin_dir . 'includes/menus.php';
		include_once self::$plugin_dir . 'includes/images.php';
	}
}



/**
 * Returns the one true Synergy_Custom_Rest.
 * Loads on plugins_loaded.
 *
 * @return Synergy_Custom_Rest
 */
function synergy_custom_rest_endpoints() {
	return Synergy_Custom_Rest::instance();
}


add_action( 'plugins_loaded', 'synergy_custom_rest_endpoints', 99 );