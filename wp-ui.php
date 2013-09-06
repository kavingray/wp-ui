<?php
/*
Plugin Name: WP UI - Tabs, accordions and more.
Plugin URI: http://kav.in/wp-ui-for-wordpress
Description: Easily add Tabs, Accordion, Collapsibles to your posts. With Unique CSS3 styles and ability to use multiple jQuery UI custom themes.
Author:	Kavin
Version: 0.8.8
Author URI: http://kav.in

Copyright (c) 2011 Kavin ( http://kav.in/contact )

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/


define( 'WPUI_VER', '0.8.8' );

// $opts = get_option( 'wpUI_options');
// echo '<pre>';
// print_r( $opts );
// echo '</pre>';

global $wp_ui;

$wp_ui = new wpUI;

/**
 * WP UI Core.
 *
 * @package wp-ui
 * @author Kavin Gray
 **/
class wpUI {
	private $plugin_details,
	 		$options,
			$wpuiPosts;


	public function __construct() {
		$this->wpUI();
	} // END fn __construct.


	public function wpUI() {
		
		// Helpers
		include_once( 'inc/wpui-helpers.php' );

		// Register the default options on activation.
		register_activation_hook( __FILE__ , array( &$this, 'set_defaults' ));

		// Get the options.
		$this->options = get_option('wpUI_options', array());


		// Translation.
		add_action('init', array(&$this, 'load_plugin_loc'));


		// Custom CSS query - Moved to wpui-helpers.php

		// Shortcodes.
		add_shortcode('wptabs',			array(&$this, 'sc_wptabs'));
		add_shortcode('wptabposts',		array(&$this, 'sc_wptabposts'));
		add_shortcode( 'wptabtitle', 	array(&$this, 'sc_wptabtitle'));
		add_shortcode( 'wptabcontent', 	array(&$this, 'sc_wptabcontent'));
		add_shortcode( 'wpspoiler',		array(&$this, 'sc_wpspoiler'));
		add_shortcode( 'wpdialog',		array(&$this, 'sc_wpdialog'));
		add_shortcode( 'wploop',		array(&$this, 'sc_wpui_loop'));
		add_shortcode( 'wpuifeeds',		array(&$this, 'sc_wpuifeeds'));
		add_shortcode( 'wpuicomp',		array( &$this, 'sc_wpuicomp' ) );
		add_shortcode( 'wpui_related_posts', array( $this->wpuiPosts, 'insert_related_posts' ) );


		// Feeds support.
		include_once( ABSPATH . WPINC . '/feed.php' );

		global $pagenow;
		$load_demo_page = ( $pagenow == 'admin-ajax.php' && ! empty( $_GET ) && $_GET[ 'action' ] == 'wpui_styles_demo' );
		/**
		 * Load scripts and styles.
		 */
		if ( ! is_admin() || $load_demo_page ) {
			add_action('wp_enqueue_scripts', array(&$this, 'plugin_viewer_scripts'), 999);
			add_action('wp_print_styles', array(&$this, 'plugin_viewer_styles'), 999 );
		}
		

		/**
		 *  Insert the editor buttons and help panels.
		 */
		if ( is_admin() ) include_once( 'inc/wpuimce/wpui_mce.php' );

		if ( function_exists( 'gd_info' ) )
			include_once( 'inc/class-imager.php' );

		/**
		 * Posts module.
		 * @todo move into modules dir.
		 */
		include_once( 'inc/class-wpui-posts.php' );
		$this->wpuiPosts = new wpuiPosts();

		/**
		 * 	WP UI options module and the page.
		 */
		if ( is_admin() ) 
			require_once( wpui_dir( 'admin/wpUI-options.php' ));

		if ( ! is_admin() ) include_once( wpui_dir( 'inc/wpui-buttons.php' ));

		if ( isset( $this->options[ 'alt_sc' ] ) && $this->options[ 'alt_sc' ] == 'on' )
		{
			// alternative shortcodes.
			add_shortcode( 'tabs', array(&$this, 'sc_wptabs'));
			add_shortcode( 'tabname', array(&$this, 'sc_wptabtitle'));
			add_shortcode( 'tabcont', array(&$this, 'sc_wptabcontent'));
			add_shortcode( 'spoiler', array(&$this, 'sc_wpspoiler'));
			add_shortcode( 'dialog', array(&$this, 'sc_wpdialog'));
		}


		$this->plugin_dir = plugin_dir_path( __FILE__ );

		if ( isset( $this->options[ 'enable_widgets' ] ) && $this->options[ 'enable_widgets' ] == 'on' ) {
/*			$widVer = ( floatval( get_bloginfo( 'version' ) ) >= 3.3 ) ? '-3.3' : '';*/
			if ( isset( $this->options[ 'use_old_widgets' ] ) && $this->options[ 'use_old_widgets' ] == 'on' ) {
				include_once( $this->plugin_dir . 'inc/widgets-old.php' );
				
			} else {
				include_once( $this->plugin_dir . 'inc/widgets.php' );
				
			}
			
		}


		/** NOT Now.
		 * Scan and load modules.
		 */
		// $this->load_modules();

	} //END method wpUI


	/**
	 * Test stuff.
	 */
	public function test_ground() {}


	/**
	 * 	Load the wpUI text domain.
	 */
	public function load_plugin_loc() {
		load_plugin_textdomain( 'wp-ui', false, '/wp-ui/languages/' );
	}


	/**
	 * Include the scripts on non admin side.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	public function plugin_viewer_scripts() {
		if ( ! $this->get_conditionals() ) return;

		$plugin_url = wpui_url();

		$js_dir = $plugin_url . '/js/';

		
		$deps = array( "jquery", "jquery-ui-core", "jquery-ui-tabs", "jquery-ui-accordion", "jquery-ui-dialog", "jquery-ui-sortable", "jquery-ui-draggable" );
		if ( isset( $this->options[ 'jquery_fx' ] ) && $this->options[ 'jquery_fx' ] == 'on' ) {
			array_push(
				$deps,"jquery-effects-core",'jquery-effects-blind', 'jquery-effects-bounce', 'jquery-effects-clip', 'jquery-effects-drop', 'jquery-effects-explode', 'jquery-effects-fade', 'jquery-effects-fold', 'jquery-effects-highlight', 'jquery-effects-pulsate', 'jquery-effects-scale', 'jquery-effects-shake', 'jquery-effects-slide', 'jquery-effects-transfer' );
		}
				

		/**
		 * On demand loading. Highly recommended.
		 */
		if ( isset( $this->options[ 'load_scripts_on_demand' ] ) &&
		 	$this->options[ 'load_scripts_on_demand' ] == 'on' ) {
			wp_enqueue_script( 'wp-ui-async', wpui_url( 'js/async.js' ), $deps, WPUI_VER );
			wp_localize_script( 'wp-ui-async', 'wpUIOpts', $this->get_script_options());
			return;
		}


		if ( isset( $this->options[ 'use_old_scripts' ] ) && $this->options[ 'use_old_scripts' ] == 'on' ) {
			wp_enqueue_script( 'wp-ui-min', $plugin_url . 'js/wp-ui-old.js', $deps, WPUI_VER );

		} else {

			if ( ! is_admin() && ( isset( $this->options[ 'cdn_jquery' ] ) && $this->options[ 'cdn_jquery' ] == 'on' ) ) {
				wp_enqueue_script( 'wpui-script-begin', site_url( '/?wpui-script=begin' ), null, WPUI_VER );
				// wp_enqueue_script( 'wpui-jquery', wpui_url( 'js/jquery.js' ), array( 'wpui-script-begin' ), WPUI_VER );
				// wp_register_script( 'wpui-jquery-ui', wpui_url( 'js/jquery-ui.js' ), array( 'wpui-jquery' ) );

				wp_enqueue_script( 'wpui-jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', array( 'wpui-script-begin' ), WPUI_VER );
				wp_register_script( 'wpui-jquery-ui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js', array( 'wpui-jquery' ) );
				// wp_register_script( 'wpui-jquery-ui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js', array( 'wpui-jquery' ) );
				wp_register_script( 'wpui-script-before', site_url( '?wpui-script=before' ), array( 'wpui-jquery-ui' ) );
				wp_enqueue_script( 'wp-ui-min', wpui_url( 'js/wp-ui.js' ), array( 'wpui-script-before' ), WPUI_VER  );
				wp_enqueue_script( 'wp-ui-end', site_url( '?wpui-script=end' ), array( 'wpui-jquery-ui' ), WPUI_VER );
				
				
			} else {
				wp_register_script( 'wpui-script-before', site_url( '?wpui-script=before' ), $deps );
				wp_enqueue_script( 'wp-ui-min', $plugin_url . 'js/wp-ui.js', array( 'wpui-script-before' ), WPUI_VER  );
			}

		}
		
		wp_localize_script( 'wp-ui-min', 'wpUIOpts', $this->get_script_options());

	} // END function plugin_viewer_scripts



	/**
	 * Check if scripts/styles can be loaded.
	 *
	 * @uses eval
	 * @return boolean
	 */
	private function get_conditionals() {
		$script_needed = true;
		if ( isset( $this->options ) &&
		 	! empty( $this->options[ 'script_conditionals' ] ) ) {
			$scrcon = $this->options[ 'script_conditionals' ];
			$script_needed = ( stripos( $scrcon , 'return') !== FALSE ) ?
			 						$scrcon :
		 							eval( 'return ' . $scrcon . ';');
		}
		return $script_needed;
	}


	/**
	 * Script options
	 *
	 * @todo remove.
	 * @return array options for javascript
	 */
	public function get_script_options() {
		$wpui_opts = array(
			'wpUrl'           =>	get_bloginfo('url'),
			'pluginUrl'       =>	plugins_url('/wp-ui/'),
			'enableTabs'      =>	isset($this->options['enable_tabs']) ? $this->options['enable_tabs'] : '',
			'enableAccordion' =>	isset($this->options['enable_accordion']) ? $this->options['enable_accordion'] : '',
			'enableSpoilers'  =>	isset($this->options['enable_spoilers']) ?	$this->options['enable_spoilers'] : '' ,
			'enableDialogs'	  =>	isset($this->options['enable_dialogs']) ?	$this->options['enable_dialogs'] : '' ,
			// 'enablePagination' =>	isset($this->options['enable_pagination']) ?	$this->options['enable_pagination'] : '' ,
			'tabsEffect'      =>	isset($this->options['tabsfx']) ? $this->options['tabsfx'] : '',
			'effectSpeed'     =>	isset($this->options['fx_speed']) ? $this->options['fx_speed'] : '',
			'accordEffect'    =>	isset($this->options['tabsfx']) ? $this->options['tabsfx'] : '',
			'alwaysRotate'    =>	isset($this->options['tabs_rotate']) ? $this->options['tabs_rotate'] : '',
			'tabsEvent'  	  =>	isset($this->options['tabs_event']) ? $this->options['tabs_event'] : '',
			'collapsibleTabs'  =>	isset($this->options['collapsible_tabs']) ? $this->options['collapsible_tabs'] : '',
			'accordEvent'  	  =>	isset($this->options['accord_event']) ? $this->options['accord_event'] : '',
			'singleLineTabs'   =>	isset($this->options['single_line_tabs' ] ) ? $this->options['single_line_tabs' ]  : '',
			'accordAutoHeight'=>	isset($this->options['accord_autoheight']) ? $this->options['accord_autoheight'] : '',
			'accordCollapsible'=>	isset($this->options['accord_collapsible']) ? $this->options['accord_collapsible'] : '',
			'accordEasing'		=>	isset( $this->options['accord_easing'] ) ? $this->options['accord_easing'] : '',
			'mouseWheelTabs'	=>	isset( $this->options['mouse_wheel_tabs'] ) ? $this->options['mouse_wheel_tabs'] : '',
			'bottomNav'       =>	isset($this->options['bottomnav']) ? $this->options['bottomnav'] : '',
			'tabPrevText'     =>	isset($this->options['tab_nav_prev_text']) ? $this->options['tab_nav_prev_text'] : '',
			'tabNextText'     =>	isset($this->options['tab_nav_next_text']) ? $this->options['tab_nav_next_text'] : '',
			'spoilerShowText' =>	isset($this->options['spoiler_show_text']) ? $this->options['spoiler_show_text'] : '',
			'spoilerHideText' =>	isset($this->options['spoiler_hide_text']) ? $this->options['spoiler_hide_text'] : '',
			"cookies"			=>	isset( $this->options['use_cookies'] ) ? $this->options['use_cookies'] : '',
			"hashChange"		=> isset( $this->options['linking_history'] ) ? $this->options['linking_history'] : '',
			"docWriteFix"		=> isset( $this->options['docwrite_fix'] ) ? $this->options['docwrite_fix'] : '',
			'linking_history'			=>	isset( $this->options[ 'linking_history' ] ) ?  $this->options[ 'linking_history' ]  : 'off',
			'misc_options'		=>	isset( $this->options[ 'misc_options' ] ) ?  $this->options[ 'misc_options' ]  : 'hello=world'
		);
		return $wpui_opts;
	}


	/**
	 * 	Output the plugin styles.
	 */
	public function plugin_viewer_styles() {
		if ( ! $this->get_conditionals() ) return;

		global $is_IE;
		$plugin_url = plugins_url('/wp-ui/');

		$wpuiCss3List = wpui_get_css3_styles_list();
		$jqui_c = wpui_get_custom_themes_list();
		$jqui_cs = wpui_get_custom_themes_list( true );


		/**
		 * 	Look if it's a css3 style, or try to load a jQuery theme.
		 */
		if ( in_array( $this->options[ 'tab_scheme' ] , $wpuiCss3List ) )	{
			wp_enqueue_style( 'wp-ui', $plugin_url . 'css/wp-ui.css');
			wp_enqueue_style($this->options['tab_scheme'], $plugin_url . 'css/themes/' . $this->options['tab_scheme'] . '.css');

		} elseif( $jqui_c && in_array( $this->options[ 'tab_scheme' ] , $jqui_c ) ) {
			wp_enqueue_style( 'wpui-jqueryui', $plugin_url . 'css/jquery-ui-wp-fix.css' );

			wp_enqueue_style( $this->options[ 'tab_scheme' ], $jqui_cs[ $this->options[ 'tab_scheme' ] ] );

		} else {
			// Sets the standard font size for jQuery UI themes,
			// to ensure compat with variety of wordpress themes.
			wp_enqueue_style( 'wpui-jqueryui', $plugin_url . 'css/jquery-ui-wp-fix.css' );

			// Load the jQuery UI theme from the Google CDN.
			wp_enqueue_style( $this->options['tab_scheme'], 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/' . $this->options['tab_scheme'] . '/jquery-ui.css');
			// wp_enqueue_style( 'jquery-ui-css-' . $this->options['tab_scheme'], 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/' . $this->options['tab_scheme'] . '/jquery.ui.all.css');
			// wp_enqueue_style( 'jquery-ui-css-' . $this->options['tab_scheme'], 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/' . $this->options['tab_scheme'] . '/jquery-ui.css' );
		}

		$sel_styles = false;

		/**
		 * 	Load multiple styles - once that are selected on admin.
		 */
		if ( !empty( $this->options[ 'load_all_styles' ] ) &&
			!empty( $this->options[ 'selected_styles' ] ) &&
			$this->options[ 'load_all_styles' ] == 'on' )
		{
			$sel_styles = json_decode( $this->options[ 'selected_styles' ] );
		}

		if ( ! empty( $sel_styles ) ) {
			$selQuery = implode( "|" , $sel_styles );
			wp_enqueue_style( 'wpui-multiple' , $plugin_url . 'css/css.php?styles=' . $selQuery );
		} else {
			wp_enqueue_style( 'wp-ui-all' , $plugin_url . 'css/themes/wpui-all.css');
		}


		// if ( $is_IE && $this->options['enable_ie_grad'] )
		// wp_enqueue_style( 'wp-tabs-css-bundled-all-IE' , $plugin_url . 'css/themes/wpui-all-ie.css');


		/**
		 * 	Load jQuery UI custom themes.
		 */
		if ( isset( $this->options['jqui_custom_themes'] ) && $this->options['jqui_custom_themes'] != '' ) {
			$jquithms = json_decode( $this->options[ 'jqui_custom_themes'] , true );
			foreach( $jquithms as $key=>$val ) {
				if ( $key !== $this->options[ 'tab_scheme' ] )
					wp_enqueue_style( $key, $val );
			}
		}

		// Try a jQuery UI theme.
		// wp_enqueue_style( 'jquery-ui-css-flick' , 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/flick/jquery.ui.all.css');

		/**
		 *	Load the additional CSS, if any has been input on the options page.
		 */
		if ( $this->options['custom_css'] != '' )
			wp_enqueue_style( 'wpui-custom-css', get_bloginfo( 'url' ) . '/?wpui-style=custom');

	} // END method plugin_viewer_styles()



	/**
	 * 	Set the defaults on plugin activation.
	 */
	function set_defaults() {
		$options = get_option( 'wpUI_options', false );

		// First install.
		if ( ! $options ) {
			$options = get_wpui_default_options();
			// update_option( 'wpUI_options', $defaults );
		} else {
			$defaults = get_wpui_default_options();
			$options = array_merge( $options, $defaults );
		} // End if ( !this->options )
		
		update_option( 'wpUI_options', $options );
	} // END set defaults.

	/**
	 *
	 * 	Add the shortcodes.
	 *
	 */

	/**
	 * 	[wptabs] shortcode.
	 */
	function sc_wptabs( $atts, $content = null) {
		extract(shortcode_atts(array(
			"type"			=>	'tabs',
			'style'			=>	$this->options['tab_scheme'],
			'effect'		=>	$this->options['tabsfx'],
			'speed'			=>	'600',
			'_id'			=>	false,
			// Tabs only options below
			'rotate'		=>	'',
			'position'		=>	'top',
			'cat'			=>	'',
			'category_name'	=>	'',
			'mode'			=>	'horizontal',
			'listwidth'		=>	'',
			'single_line'	=>	false,
			// Accordion only options below
			'active'		=>	false,
			'background'	=>	'true',
			'autoheight'	=>	'off',
			'sortable'		=>	'false',
			'collapsible'	=>	'false'
		), $atts));

		$output  = '';

		$scheme = $style;
		
		global $wpui_id_remove_chars;
		
		static $wpui_tabs_id = 0;
		$wpui_tabs_id++;
	

		$jqui_cust = isset( $this->options[ 'jqui_custom_themes' ] ) ? json_decode( $this->options[ 'jqui_custom_themes' ] , true ) : array();

		$attr = '';

		$attr .= 'data-style="' . $style . '"';

		if ( stristr( $style, 'wpui-' ) && ! isset( $jqui_cust[ $scheme ] ) ) {
			$style .= ' wpui-styles';
		} else {
			$style .= ' jqui-styles';
		}



		$style .= ( $mode == 'vertical' ) ? ' wpui-tabs-vertical' : ' wpui-tabs-horizontal';
		
		if ( $listwidth != '' )
			$style .= ' listwidth-' . $listwidth;

		if ( $background == 'false' )
			$style .= ' wpui-no-background';

		if ( $autoheight == 'true' )
			$style .= ' wpui-autoheight';

		if ( $sortable == 'true' )
			$style .= ' wpui-sortable';

		if ( !empty( $this->options ) && isset( $this->options[ 'accord_collapsible' ] ) && $this->options[ 'accord_collapsible' ] == 'on' )
			$collapsible = 'true';

		if ( $collapsible == 'true' )
			$style .= ' wpui-collapsible';

		// Default : tabs. Change type for accordion.
		// $class  = ($type == 'accordion') ? 'wp-accordion' : 'wp-tabs';

		if ( $type == 'accordion' ) {
			$class = 'wp-accordion';
			if ( $active && $active > 0 ) {
				$class .= ' acc-active-' . ( $active - 1 );
			}
		} else {
			$class = 'wp-tabs';
		}

		$class .= ' ' . $style;
		$class .= ( $rotate == '' ) ? '' : ' tab-rotate-' . $rotate;
		$class .= ( $position == 'bottom' ) ? ' tabs-bottom' : '';
		
		if ( $single_line ) 
			$class .= ' tabs-single-line';
		
		if ( $single_line == 'false' )
			$class .= ' tabs-single-line-false';
				
		
		if ( ! empty( $_id ) && str_ireplace( $wpui_id_remove_chars, '', $_id ) == $_id )
			$id = $_id;
		else
			$id = ( ( $type == 'accordion' ) ? 'wp-accordion-' : 'wp-tabs-' ) . $wpui_tabs_id;

		$output .= '<div id="' . $id . '" class="' . $class . '" ' . $attr . '>' . do_shortcode($content) . '</div><!-- end div.wp-tabs -->';

		return $output;
	} // END function sc_wptabs.


	/**
	 * Get posts with a custom loop.
	 */
	function sc_wpui_loop( $atts, $content=null )
	{
		extract( shortcode_atts( array(
			'get'				=>	'',
			'cat'				=>	'',
			'category_name'		=>	'',
			'tag'				=>	'',
			'number'			=>	'4',
			'exclude'			=>	'',
			'elength'			=>	$this->options['excerpt_length'],
			'before_post'		=>	'',
			'after_post'		=>	'',
			'num_per_page'		=>	FALSE,
			'template'			=>	'1'
		), $atts ));

		if ( ( ! $cat || $cat == '' ) && ( ! $tag || $tag == '' ) && ( ! $get || $get == '' ) )
			return;

		if ( $cat != '' ) $tag = '';

		// $wquery . '&number=' . $number . '&length=' . $elength
		$custom_loop = $this->wpuiPosts->wpui_get_posts( array(
									'cat'		=>	$cat,
									'tag'		=>	$tag,
									'get'		=>	$get,
									'number'	=>	$number,
									'exclude'	=>	$exclude,
									'length'	=>	$elength
								));

		$output = '';

		if ( ! $custom_loop ) {
			return "Please verify <code>[<span>wploop</span>]</code> arguments.";
		}

		if ( $num_per_page ) {
			$output .= '<div class="wpui-pages-holder" />';
			$output .= '<div class="wpui-page wpui-page-1">';
			$num_page = 1;
		}

		$ptempl = ( isset( $this->options[ 'post_template_' . $template ] ) ) ?
					$this->options[ 'post_template_' . $template ] :
					$this->options[ 'post_template_1' ];


		$wpui_total_posts = count( $custom_loop );
		foreach( $custom_loop as $index=>$item ) {
			$posts_passed = $index + 1;

			$tmpl = $this->wpuiPosts->replace_tags( $ptempl, $item );
			$output .= $before_post . $tmpl . $after_post;

			if( $num_per_page
				&& ( ( $posts_passed % $num_per_page ) == 0 )
				&& ( $posts_passed != ( $wpui_total_posts ) )
				) {
				$num_page++;
				$output .= '</div><!-- end div.wpui-page -->';
				$output .= '<div class="wpui-page wpui-page-' . $num_page . '">';

			}
		} // END foreach.

		if ( $num_per_page ) {
			$output .= '</div><!-- end wpui-page -->';
			$output .= '</div><!-- end wpui-pages-holder -->';
		}
		return $output;
	} // END function sc_wpui_loop


	/**
	 *	Output tab sets of posts.
	 * 	[wptabposts]
	 *
	 * @since 0.7
	 * @param $atts, $content
	 * @return shortcode handler.
	 */
	function sc_wptabposts( $atts, $content = null )
	{
		extract( shortcode_atts( array(
			'style'				=>	$this->options[ 'tab_scheme' ],
			'type'				=>	'tabs',
			'mode'				=>	'',
			'listwidth'			=>	'',
			'tab_names'			=>	'title',
			'effect'			=>	$this->options['tabsfx'],
			'speed'				=>	'600',
			'get'				=>	'',
			'cat'				=>	'',
			'category_name'		=>	'',
			'tag'				=>	'',
			'post_type'			=>	'',
			'post_status'		=>	'publish',
			'number'			=>	'4',
			'page'				=>	'',
			'exclude'			=>	'',
			'rotate'			=>	'',
			'elength'			=>	$this->options['excerpt_length'],
			'before_post'		=>	'',
			'after_post'		=>	'',
			'template'			=>	'1'
		), $atts ));


		if ( ( ! $cat || $cat == '' ) && ( ! $tag || $tag == '' ) && ( ! $get || $get == '' ) && ( $post_type == '' ))
			return;

		if ( $cat != '' ) $tag = '';

		$my_posts = $this->wpuiPosts->wpui_get_posts( array(
									'cat'			=>	$cat,
									'tag'			=>	$tag,
									'get'			=>	$get,
									'post_type'		=>	$post_type,
									'post_status'	=>	$post_status,
									'number'		=>	$number,
									'exclude'		=>	$exclude,
									'length'		=>	$elength
								));


		$tab_names_arr = preg_split( '/\s?,\s?/i', $tab_names );

		$output = '';

		$each_tabs = '';

		if ( ! $my_posts ) {
			return "Please verify <code>[<span>wptabposts</span>]</code> arguments.";
		}

		$ptempl = ( isset( $this->options[ 'post_template_' . $template ] ) ) ?
					$this->options[ 'post_template_' . $template ] :
					$this->options[ 'post_template_1' ];

		foreach( $my_posts as $index=>$item ) {
			$tabs_count = $index + 1;
			if ( $tab_names == 'title' ) {
				$tab_name =  $item[ 'title' ];
			} elseif ( isset( $tab_names_arr ) && ( count( $tab_names_arr ) > 1 ) ) {
				$tab_name = $tab_names_arr[ $index ];
			} else {
				$tab_name = $tabs_count;
			}

			$tmpl = $this->wpuiPosts->replace_tags( $ptempl , $item );
			$tab_content = $before_post . $tmpl . $after_post;

			if ( $item[ 'thumbnail' ] )
				$tab_title_args = ' icon="' . htmlspecialchars( $item[ 'thumbnail' ] ) . '"';

			$each_tabs .= do_shortcode( '[wptabtitle ' . $tab_title_args . '] ' . $tab_name . ' [/wptabtitle] [wptabcontent] ' . $tab_content  . ' [/wptabcontent]' . "\n" );
		} // END foreach.


		$wptabsargs = '';

		if ( $type != '' )
			$wptabsargs .= ' type="' . $type . '"';
		if ( $mode != '' )
			$wptabsargs .= ' mode="' . $mode . '"';

		if ( $listwidth != '' )
			$style .= ' listwidth-' . $listwidth;
		$wptabsargs .= ' style="' . $style . '"';
		if ( $rotate && $rotate != '' )
			$wptabsargs .= ' rotate="' . $rotate . '"';

		if ( $listwidth != '' )
			$wptabsargs .= ' listwidth-' . $listwidth;

		$output .= do_shortcode( '[wptabs' . $wptabsargs . '] ' . $each_tabs . ' [/wptabs]' );

		return $output;

	} // END function wptabposts



	/**
	 * 	[wptabtitle]
	 */
	function sc_wptabtitle( $atts, $content = null ) {
		extract(shortcode_atts(array(
			'header'	=>	'h3',
			'hclass'	=>	'wp-tab-title',
			'label'		=>	'text',
			'image_size'=>	'24,24',
			'_id'		=>	false,
			'load'		=>	'',
			'post'		=>	'',
			'page'		=>	'',
			'cat'		=>	'',
			'category_name' => '',
			'tag'		=>	'',
			'tag_name'		=>	'',
			'number'	=>	'4',
			'exclude'	=>	'',
			'tag'		=>	'',
			'feed'		=>	'',
			'hide'		=>	"false",
			'elength'	=>	$this->options['excerpt_length'],
			'before_post'	=>	'',
			'after_post'	=>	'',
			'template'		=>	'1',
			'icon'		=>	false
		), $atts));

		global $wpui_id_remove_chars;
		
		if ( str_ireplace( $wpui_id_remove_chars, '', $_id ) != $_id )
			$_id = false;

		$tmpl = ( isset( $this->options[ 'post_template_' . $template ] ) ) ?
					$this->options[ 'post_template_' . $template ] :
					$this->options[ 'post_template_1' ];

		 if ( isset( $this->options[ 'title_template' ] ) && $this->options[ 'title_template' ] != '' ) {
			 $title_template = $this->options[ 'title_template' ];
	 		if ( $_id ) {
	 			$title_template = str_ireplace( '>{$title}', 'id="' . $_id . '">{$title}', $title_template );
	 		}
		 } else {
			 $title_template = '<' . $header;
			 $title_template .= ' class="' . $hclass . '"';
			 if ( $_id ) {
				 $title_template .= ' id="' . $_id . '"';
			 }
			 $title_template .= '>{$title}</' . $header . '>'; 
		 }

		if ( $hide == "true" ) $hclass .= ' wpui-hidden-tab';

		$data = false;

		// Get the post contents.
		if ( $post != '' ) {
			$data = $this->wpuiPosts->wpui_get_post( $post, $elength );
		} elseif ( $page != '' ) {
			$data = $this->wpuiPosts->wpui_get_post( $page, $elength );
		} elseif ( $feed != '' ) {
			$data = $this->wpuiPosts->wpui_get_feeds( array(
							'url'		=>	$feed,
							'number'	=>	$number
						));

		} elseif ( $cat != '' || $category_name != '' || $tag != '' || $tag_name != '' ) {
			$data = $this->wpuiPosts->wpui_get_posts( array(
										'cat'		=>	$cat,
										'category_name' => $category_name,
										'tag'		=>	$tag,
										'tag_name'	=>	$tag_name,
										'number'	=>	$number,
										'exclude'	=>	$exclude,
										'length'	=>	$elength
									));
		}

		if ( $load != '' ) {
			$content = '<a class="wp-tab-load" href="' . $load . '">' . $content . '</a>';
		}


		$title_str = str_ireplace( '{$title}', $content, $title_template );


		if ( $icon && $icon != '' ) {
			$title_str = str_replace( '{$thumbnail}', htmlspecialchars_decode( $icon ), $title_str );
		}

		if ( is_array( $data ) ) {
			if ( isset( $data[ 'title' ] ) ) {
				$title_str = $this->wpuiPosts->replace_tags( $title_template, $data );
				$data = $before_post . $this->wpuiPosts->replace_tags( $tmpl, $data ) . $after_post;
			} else {
				$scra = '';
				foreach( $data as $index=>$values ) {
					$scra .= $this->wpuiPosts->replace_tags( $tmpl, $values );
				}
				$data = $before_post . $scra . $after_post;
			}
		}


		$title_str = preg_replace( '/\{.*\}/', '', $title_str );

		$output = $title_str;

		if ( $data ) {
			$output .= do_shortcode( "[wptabcontent]" . $data . "[/wptabcontent]" );
		}

		return $output;


	} // END function sc_wptabtitle


	/**
	 * 	[wptabcontent]
	 */
	function sc_wptabcontent( $atts, $content = null ) {
		extract( shortcode_atts( array(
				'class'	=>	''
			), $atts));
			return '<div class="wp-tab-content"><div class="wp-tab-content-wrapper">' . do_shortcode($content) . '</div></div><!-- end div.wp-tab-content -->';

	} // END function sc_wptabcontent


	/**
	 * 	Spoilers/Collapsibles/Sliders.
	 *
	 * 	[wpspoiler name="NAME"]
	 */
	function sc_wpspoiler( $atts, $content = null ) {
		extract( shortcode_atts( array(
				'name'		=>	'Show Content',
				'_id'		=>	false,
				'style'		=>	$this->options['tab_scheme'],
				'fade'		=>	'true',
				'slide'		=>	'true',
				'speed'		=>	false,
				'closebtn'	=>	false,
				'showtext'	=>	false,
				'hidetext'	=>	false,
				'open'		=>	'false',
				'post'		=>	'',
				'page'		=>	'',
				'elength'	=>	$this->options['excerpt_length'],
				'before_post'	=>	'',
				'after_post'	=>	'',
				'template'	=>	'2',
				'background'=>	'true'
			), $atts));

			global $wpui_id_remove_chars;

			static $wpui_spoiler_id = 0;
			$wpui_spoiler_id++;

			$scheme = $style;
			
			$attr = '';

			$style = ( $background != 'true' ) ? $background : $style;

			$h3class  = '';
			$h3class .= ( $fade == 'true' ) ? ' fade-true' : ' fade-false';
			$h3class .= ( $slide == 'true' ) ? ' slide-true' : ' slide-false';
			$h3class .= ( $open == 'true' ) ? ' open-true' : ' open-false';

			$jqui_cust = isset( $this->options[ 'jqui_custom_themes' ] ) ? @json_decode( $this->options[ 'jqui_custom_themes' ] , true ) : array();

			$attr .= 'data-style="' . $style . '"';


			if ( stristr( $style, 'wpui-' ) && ! isset( $jqui_cust[ $scheme ] ) ) {
				$style .= ' wpui-styles';
			} else {
				$style .= ' jqui-styles';
			}


			$h3class .= ( $speed ) ? ' speed-' . $speed : '';

			if ( $post != '' || $page != '' ) {
				$typew = ( $page != '' ) ? 'page' : 'post';
				$piod = ( $page != '' ) ? $page : $post;

				$content = '';

				$post_content = $this->wpuiPosts->wpui_get_post( $piod, $elength, $typew );

				$tmpl = ( isset($this->options[ 'post_template_' . $template ]) ) ?
							$this->options[ 'post_template_' . $template ] :
							$this->options[ 'post_template_2' ];
				$content = $before_post . $this->wpuiPosts->replace_tags( $tmpl, $post_content ) . $after_post;
				$name = $post_content[ 'title' ];
			}

			$out_content = do_shortcode( $content );
			if ( $closebtn )
				$out_content .= '<a class="close-spoiler ui-button ui-corner-all" href="#">' . $closebtn . '</a>';

			$textdata = '';

			if ( $showtext )
				$textdata .= ' data-showtext="' . $showtext . '"';
			if ( $hidetext )
				$textdata .= ' data-hidetext="' . $hidetext . '"';
			
			if ( ! empty( $_id ) && str_ireplace( $wpui_id_remove_chars, '', $_id ) == $_id )
				$textdata .= ' id="' . $_id . '"'; 
			

			return '<div id="wp-spoiler-' . $wpui_spoiler_id . '" class="wp-spoiler wpui-hashable ' . $style . '" ' . $attr . '>  <h3 class="wp-spoiler-title wpui-hashable' . $h3class . '"' . $textdata . '>' .$name . '</h3><div class="wpui-hidden wp-spoiler-content">'  . $out_content . '</div>  </div><!-- end div.wp-spoiler -->';
	} // END function sc_wptabcontent


	/**
	 * 	Dialogs
	 *
	 * 	[wpdialog]Stuff you wanna say[/wpdialog]
	 */
	function sc_wpdialog( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'style'			=>	$this->options['tab_scheme'],
			'_id'			=>	false,
			'auto_open'		=>	"true",
			'openlabel'		=>	"Show Information",
			'opener'		=>	'button',
			'title'			=>	'Information',
			'height'		=>	'auto',
			'width'			=>	$this->options[ 'dialog_width' ],
			'show'			=>	null,
			'hide'			=>	null,
			'modal'			=>	'false',
			'closeOnEscape'	=>	'true',
			'resizable'		=>	'true',
			'draggable'		=>	'true',
			'position'		=>	'center',
			'zIndex'		=>	false,
			'button'		=>	false,
			'singular'		=>	false,
			'post'			=>	'',
			'elength'		=>	'more',
			'before_post'	=>	'',
			'after_post'	=>	'',
			'template'		=>	'2'
		), $atts ) );

		global $wpui_id_remove_chars;

		static $dia_inst = 0;
		$dia_inst++;
		// $args = '';
		$args = array();
		$scheme = $style;
		$sel_post = $post;

		$attr = '';
		
		$jqui_cust = isset( $this->options[ 'jqui_custom_themes' ] ) ? json_decode( $this->options[ 'jqui_custom_themes' ] , true ) : array();
			
		$attr .= 'data-style="' . $style . '"';

		if ( stristr( $style, 'wpui-' ) && ! isset( $jqui_cust[ $scheme ] ) ) {
			$style .= ' wpui-styles';
		} else {
			$style .= ' jqui-styles';
		}
		
				
		if ( $singular == "true" && ! is_singular() ) return;
		
		unset( $post );

		global $post;

		$args[ 'dialogClass' ] = $style;
		$args[ 'width' ] = $width;
		$args[ 'height' ] = $height;
		$args[ 'autoOpen' ] = ($auto_open == 'true' ) ? true : false;
		$args[ 'show' ] = $show;
		$args[ 'hide' ] = $hide;
		$args[ 'modal' ] = ($modal == 'true' ) ? true : false;
		$args[ 'resizable' ] = ($resizable == 'true' ) ? true : false;
		$args[ 'draggable' ] = ($draggable == 'true' ) ? true : false;
		$args[ 'closeOnEscape' ] = ($closeOnEscape == 'true' ) ? true : false;
		$args[ 'position' ] = explode( ' ', $position );
		if ( $zIndex ) $args[ 'zIndex' ] = $zIndex;

		$buttonz = get_post_meta( $post->ID, 'wpui_dialog_' . $dia_inst . '_button', true );

		$tmpl = ( isset($this->options[ 'post_template_' . $template ]) ) ?
					$this->options[ 'post_template_' . $template ] :
					$this->options[ 'post_template_1' ];

		if ( $sel_post != '' ) {
			$get_post = $this->wpuiPosts->wpui_get_post( $sel_post , $elength );
			$title = $get_post[ 'title' ];
			$out_content = $before_post . $this->wpuiPosts->replace_tags( $tmpl, $get_post ) . $after_post;
		} else {
			$out_content = $content;
		}

		$output = '';

		if ( $auto_open == "false" ) {

			if ( $opener == 'button' ) {
				$output .= do_shortcode( '[wpui_button class="wpui-open-dialog" primary="ui-icon-newwin" url="#" rel="wp-dialog-' . $dia_inst . '" label="' . $openlabel . '"]' );
			} else {
				$output .= '<a href="#" class="wpui-open-dialog dialog-opener-' . $dia_inst . '" rel="wp-dialog-' . $dia_inst . '">' . $openlabel . '</a>';
			}
		}

		$did = ( ! empty( $_id ) && str_ireplace( $wpui_id_remove_chars, '', $_id ) == $_id ) ? $_id : 'wp-dialog-'. $dia_inst;

		$output .= '<div id="' . $did . '" class="wp-dialog wp-dialog-' . $dia_inst . ' ' . $style . '" title="' . $title . '"' . $attr . '>';

		$output .= do_shortcode( $out_content ) . '</div><!-- end .wp-dialog -->';

		$output .= '<script type="text/javascript">' . "\n";
		$output .= 'wpuiJQ( function() {' . "\n";
		
		$output .= 'wpDialogArgs' .  $dia_inst . ' = JSON.parse(\'' . json_encode( $args ) . '\');' . "\n";
		if ( $buttonz ) {
			$output .= 'wpDialogArgs' . $dia_inst . '.buttons = [' . $buttonz . '];';
		}

		$output .= 'wpuiJQ(  "#' . $did . '" ).dialog( wpDialogArgs' .  $dia_inst . ' );  });' . "\n";
		$output .= 'wpuiJQ(  "#' . $did . '" ).attr( "data-style", "'. $scheme . '" );' . "\n";
		$output .= 'wpuiJQ( ".wpui-open-dialog" ).live( "click", function() {' . "\n";
		$output .= 'var tisRel = wpuiJQ(  this ).attr( "rel" );' . "\n";
		$output .= 'wpuiJQ(  "#" + tisRel ).dialog( "open" );' . "\n";
		$output .= 'return false;'. "\n";
		$output .= '});' . "\n";
		$output .= '</script>';
		return $output;
	} // END method sc_wpdialog


	/**
	 * WP UI Feeds - Parse a feed articles into tabs/accordions.
	 *
	 * @return void
	 * @author Kavin
	 **/
	function sc_wpuifeeds( $atts, $content = null ) {
		extract( shortcode_atts( array(
				'url'			=>	'',
				'number'		=>	3,
				'style'			=>	$this->options[ 'tab_scheme' ],
				'type'			=>	'tabs',
				'mode'			=>	'',
				'listwidth'		=>	'',
				'tab_names'		=>	'title',
				'effect'		=>	$this->options['tabsfx'],
				'speed'			=>	'600',
				'number'		=>	'4',
				'rotate'		=>	'',
				'elength'		=>	$this->options['excerpt_length'],
				'before_post'	=>	'',
				'after_post'	=>	'',
				'template'		=>	'1'
			), $atts));

			if ( ! $url )
				return __( 'WP-UI feeds shortcodes needs a valid RSS URL to work.' , 'wp-ui' );

			$results = $this->wpuiPosts->wpui_get_feeds( array(
				'url'		=>	$url,
				'elength'	=>	$elength,
				'number'	=>	$number
			));

		if ( ! $results ) return false;

		$tab_names_arr = preg_split( '/\s?,\s?/i', $tab_names );

		$output = '';

		$output_s = '';

		$tmpl = ( isset( $this->options[ 'post_template_' . $template ] ) ) ?
					$this->options[ 'post_template_' . $template ] :
					$this->options[ 'post_template_1' ];

		foreach( $results as $index=>$item ) {
			$tab_num = $index+ 1;

			if ( $tab_names == 'title' ) {
				$tab_name = $item[ 'title' ];
			} elseif ( isset( $tab_names_arr ) && count( $tab_names_arr ) > 1 ) {
				$tab_name = $tab_names_arr[ $index ];
			} else {
				$tab_name = $tab_num;
			}

			$tabs_content = $this->wpuiPosts->replace_tags( $tmpl , $item );
			$output_s .= do_shortcode( '[wptabtitle]' . $tab_name. '[/wptabtitle] [wptabcontent] ' . $tabs_content . 	' [/wptabcontent]' );

		}

		$wptabsargs = '';

		if ( $type != '' )
			$wptabsargs .= ' type="' . $type . '"';
		if ( $mode != '' )
			$wptabsargs .= ' mode="' . $mode . '"';

		if ( $listwidth != '' )
			$style .= ' listwidth-' . $listwidth;
		$wptabsargs .= ' style="' . $style . '"';
		if ( $rotate && $rotate != '' )
			$wptabsargs .= ' rotate="' . $rotate . '"';

		if ( $listwidth != '' )
			$style .= ' listwidth-' . $listwidth;

		$output .= do_shortcode( '[wptabs' . $wptabsargs . '] ' . $output_s  . ' [/wptabs]' );

		return $output;

	} // END function sc_wptabcontent



	/**
	 * 	Can the user edit?
	 */
	private function do_edit() {
		$cond = false;
		if (
		( in_array( basename( $_SERVER['PHP_SELF'] ), array( 'post-new.php', 'page-new.php', 'post.php', 'page.php' ) ) ) &&
		( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) )
		) $cond = true;
		return $cond;
	}

	
	/**
	 * Load the modules.
	 */
	private function load_modules() {
		if ( ! is_dir ( wpui_dir( 'modules' ) ) ) return false;
		if ( $mod_dir = opendir( wpui_dir( 'modules' ) ) ) {
			while ( false != ( $module = readdir( $mod_dir ) ) ) {
				if ( 'php' == substr( $module, -3 ) ) {
					@include_once( wpui_dir( 'modules/' . $module ) );
				}
			} // end while.

		} // end if mod_dir.
	} 


} // end class WP_UI


/**
 * Adds/Removes the following shortcodes
 * 	* autop on the_editor_content
 * 	* autop on the_content
 * 	* do_shortcode on WP Text Widget
 */ 
if ( function_exists( 'shortcode_unautop' ) ) {
	add_filter( 'the_editor_content', 'shortcode_unautop' );
	add_filter( 'the_content', 'shortcode_unautop' );
}

add_filter( 'widget_text', 'do_shortcode');


/**
 * Returns the default options.
 *
 * @return array
 * @author Kavin Gray
 * @since 0.7
 **/
$wpui_default_post_template_1 = '<h2 class="wpui-post-title">{$title}</h2>
<div class="wpui-post-meta">{$date} |  {$author}</div>
<div class="wpui-post-thumbnail">{$thumbnail}</div>
<div class="wpui-post-content">{$excerpt}</div>
<p><a class="ui-button ui-widget ui-corner-all" href="{$url}" title="Read more of {$title}">Read More...</a></p>';

$wpui_default_post_template_2 = '<div class="wpui-post-meta">{$date}</div>
<div class="wpui-post-thumbnail">{$thumbnail}</div>
<div class="wpui-post-content">{$excerpt}</div>
<p><a href="{$url}" title="Read more of {$title}">Read More...</a></p>';


function get_wpui_default_options() {
	$defaults = array(
	    "enable_tabs" 				=>	"on",
	    "enable_accordion"			=>	"on",
	    "enable_tinymce_menu"		=>	"on",
	    "enable_quicktags_buttons"	=>	"on",
	    "enable_widgets"			=>	"on",
		"single_line_tabs"			=>	"off",
	    "bottomnav"					=>	"on",
		"enable_spoilers"			=>	"on",
		"enable_dialogs"			=>	"on",
		"load_all_styles"			=>	"on",
		"selected_styles"			=>	'["wpui-light","wpui-blue","wpui-red","wpui-green","wpui-dark","wpui-quark","wpui-alma","wpui-macish","wpui-redmond","wpui-sevin"]',
		"enable_ie_grad"			=>	"on",
		"dialog_width"				=>	"300px",
	    "tab_scheme" 				=>	"wpui-light",
		"jqui_custom_themes"		=>	"{}",
	    "tabsfx"					=>	"none",
		"fx_speed"					=>	"400",
		"tabs_rotate"				=>	"stop",
		"tabs_event"				=>	"click",
		"collapsible_tabs"			=>	"off",
		"accord_event"				=>	"click",
		"accord_autoheight"			=>	"on",
		"accord_collapsible"		=>	"off",
		"accord_easing"				=>	'false',
		"mouse_wheel_tabs"			=>	'false',
		"tab_nav_prev_text"			=>	'Prev',
		"tab_nav_next_text"			=>	"Next",
		"spoiler_show_text"			=>	"Click to show",
		"spoiler_hide_text"			=>	"Click to hide",
		"relative_times"			=>	"off",
		"custom_css"				=>	"",
		"use_cookies"				=>	"on",
		"script_conditionals"		=>	"",
		"load_scripts_on_demand"	=>	"off",
		"linking_history"			=>	"on",
		"widget_rich_text"			=>	"off",
		'title_template'			=>	'',
		'post_template_1'			=>	'<h2 class="wpui-post-title">{$title}</h2>
		<div class="wpui-post-meta">{$date} |  {$author}</div>
		<div class="wpui-post-thumbnail">{$thumbnail}</div>
		<div class="wpui-post-content">{$excerpt}</div>
		<p class="wpui-readmore"><a class="wpui-button ui-button ui-widget ui-corner-all" href="{$url}" title="Read more from {$title}">Read More...</a></p>',
		'post_template_2'			=>	'<div class="wpui-post-meta">{$date}</div>
		<div class="wpui-post-thumbnail">{$thumbnail}</div>
		<div class="wpui-post-content">{$excerpt}</div>
		<p class="wpui-readmore"><a class="wpui-button ui-button ui-widget ui-corner-all" href="{$url}" title="Read more from {$title}">Read More...</a></p>',
		'excerpt_length'			=>	'more',
		'post_widget'				=> array (
			'title'		=>	'We recommend',
		    'type' => array(
		    	'popular'
		    ),
		    'number' => '4',
		    'per_row' => '4'
		),
		'post_default_thumbnail'	=>	array(
			'url'		=>	wpui_url( 'images/wp-light.png' ),
			'width'		=>	'100',
			'height'	=>	'100',
		),
		'post_widget_number' =>	'3',
		'jquery_disabled'    =>	'on',
		'cdn_jquery'         =>	'off',
		'jquery_fx'         =>	'off',
		'docwrite_fix'       =>	'on',
		'alt_sc'             =>	'off',
		'use_old_scripts'    =>	'off',
		'use_old_widgets'    =>	'off',
		// 'misc_options'       =>	"hashing_timeout=1000\ntinymce_icon_row=2",
		'misc_options'       =>	"hashing_timeout=1000",
		'version'            =>	WPUI_VER
	);
	if ( ! wpui_less_33() ) $defaults[ 'tour' ] = 'on';
	return $defaults;
}

