<?php
/*
Plugin Name: WP UI - Tabs, accordions and more. 
Plugin URI: http://kav.in/wp-ui-for-wordpress
Description: Easily add Tabs, Accordion, Collapsibles to your posts. With 14 fresh Unique CSS3 styles and multiple jQuery UI custom themes.
Author:	Kavin
Version: 0.7.2
Author URI: http://kav.in

Copyright (c) 2011 Kavin (http://kav.in/contact)

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


if ( function_exists( 'shortcode_unautop' ) ) {
	add_filter( 'the_editor_content', 'shortcode_unautop' );
	add_filter( 'the_content', 'shortcode_unautop' );
}

add_filter( 'widget_text', 'do_shortcode');


// Textdomain constant 
define( 'WPPTD' , 'wp-ui');

// $opts = get_option( 'wpUI_options');
// echo '<pre>';
// print_r( $opts );
// echo '</pre>';

$wpuiver = '0.7.2';

$wp_ui = new wpUI;

class wpUI {

	private $plugin_details, $options;
	
	public function __construct() {
		$this->wpUI();
	} // END fn __construct.


	public function wpUI() {
		
		// Register the default options on activation.
		register_activation_hook( __FILE__ , array(&$this, 'set_defaults'));

		// Output the plugin scripts and styles.
		add_action('wp_print_scripts', array(&$this, 'plugin_viewer_scripts'));
		
		add_action('wp_print_styles', array(&$this, 'plugin_viewer_styles'));


		// Load the admin scripts and styles.
		if ( is_admin() )
			add_action('admin_print_styles', array(&$this, 'admin_scripts_styles'));
			add_action('admin_print_styles', array(&$this, 'admin_styles'));
	
		// Translation.
		add_action('init', array(&$this, 'load_plugin_loc'));
		add_action('init', array(&$this, 'wpui_tackle_conflicts'));

		// Custom CSS query.
		add_filter( 'query_vars', array( &$this, 'wpui_add_query') );
		add_action( 'template_redirect', array( &$this, 'wpui_custom_css') );		
	
		// Shortcodes.
		add_shortcode('wptabs', array(&$this, 'sc_wptabs'));
		add_shortcode('wptabposts', array(&$this, 'sc_wptabposts'));
		add_shortcode( 'wptabtitle', array(&$this, 'sc_wptabtitle'));
		add_shortcode( 'wptabcontent', array(&$this, 'sc_wptabcontent'));
		add_shortcode( 'wpspoiler', array(&$this, 'sc_wpspoiler'));
		add_shortcode( 'wpdialog', array(&$this, 'sc_wpdialog'));
		add_shortcode( 'wploop', array(&$this, 'sc_wpui_loop'));
		
		/**
		 *  Insert the editor buttons and help panels.
		 */
		include_once( 'js/wpuimce/wptabs_mce.php' );
		
		/**
		 * 	WP UI options module and the page.
		 */
		require_once('admin/wpUI-options.php');

		// Get the options.
		$this->options = get_option('wpUI_options');

		if ( isset( $this->options[ 'alt_sc' ] ) ) {
			// alternative shortcodes.
			add_shortcode( 'tabs', array(&$this, 'sc_wptabs'));
			add_shortcode( 'tabname', array(&$this, 'sc_wptabtitle'));
			add_shortcode( 'tabcont', array(&$this, 'sc_wptabcontent'));
			add_shortcode( 'spoiler', array(&$this, 'sc_wpspoiler'));
			add_shortcode( 'dialog', array(&$this, 'sc_wpdialog'));
		}
		
	} //END method wpUI
	
	
	/**
	 * 	Load the wpUI text domain.
	 */
	public function load_plugin_loc() {
		load_plugin_textdomain( WPPTD, false, '/wp-ui/languages/' );		
	}

	public function plugin_viewer_scripts() {
		$plugin_url = get_option("url") . '/wp-content/plugins/' . plugin_basename(dirname(__FILE__));
		$js_dir = $plugin_url . '/js/';
		if ( ! is_admin() && ! isset($this->options['jquery_disabled'] ) ) {
			wp_deregister_script( 'jquery' );
			
			wp_enqueue_script( 'jquery', $js_dir . 'jquery.min.js' );
			wp_enqueue_script( 'jquery-ui', $js_dir . 'jquery-ui.min.js' );
			wp_enqueue_script( 'jquery-easing', $js_dir . 'jquery.easing.1.3.js' );
			
			// wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');
			
			// wp_enqueue_script('jquery-ui', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js');
					
			// wp_enqueue_script('jquery-easing', $plugin_url . '/js/jquery.easing.1.3.js');
		}
		
		wp_enqueue_script( 'wp-ui-min', $plugin_url . '/js/wp-ui.js');
		wp_localize_script( 'wp-ui-min', 'wpUIOpts', array(
			'wpUrl'           =>	get_bloginfo('url'),
			'pluginUrl'       =>	plugins_url('/wp-ui/'),
			'enableTabs'      =>	isset($this->options['enable_tabs']) ? $this->options['enable_tabs'] : '',
			'enableAccordion' =>	isset($this->options['enable_accordion']) ? $this->options['enable_accordion'] : '',
			'enableSpoilers'  =>	isset($this->options['enable_spoilers']) ?	$this->options['enable_spoilers'] : '' ,	
			'enableDialogs'	  =>	isset($this->options['enable_dialogs']) ?	$this->options['enable_dialogs'] : '' ,	
			'tabsEffect'      =>	isset($this->options['tabsfx']) ? $this->options['tabsfx'] : '',
			'effectSpeed'     =>	isset($this->options['fx_speed']) ? $this->options['fx_speed'] : '',
			'accordEffect'    =>	isset($this->options['tabsfx']) ? $this->options['tabsfx'] : '',
			'alwaysRotate'    =>	isset($this->options['tabs_rotate']) ? $this->options['tabs_rotate'] : '',
			'tabsEvent'  	  =>	isset($this->options['tabs_event']) ? $this->options['tabs_event'] : '',
			'accordEvent'  	  =>	isset($this->options['accord_event']) ? $this->options['accord_event'] : '',
			'topNav'          =>	isset($this->options['topnav']) ? $this->options['topnav'] : '',
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
			"hashChange"		=> isset( $this->options['linking_history'] ) ? $this->options['linking_history'] : ''
		));

		if ( ! is_admin() ) {
			wp_enqueue_script('wpui-init', $plugin_url . '/js/init.js');
			wp_localize_script('wpui-init' , 'initOpts', array(
				'wpUrl'				=>	get_bloginfo('url'),
				'pluginUrl' 		=>	plugins_url('/wp-ui/'),
				// 'queryVars1'	=>	add_query_arg( array(
				// 	 	'action' => 'WPUIstyles',
				// 	 	'height' => '200',
				// 	 	'width' => '300'
				// 	 ), 'admin-ajax.php' )	
			));
		} // END if ! is _admin() for init.js.
		
	}
	
	/**
	 * 	Output the plugin styles.
	 */
	public function plugin_viewer_styles() {

		global $is_IE;
		$plugin_url = plugins_url('/wp-ui/');


		$wpuiCss3List = wpui_get_css3_styles_list();


		
	
		
		
		/**
		 * 	Look if it's a css3 style, or try to load a jQuery theme.
		 */		
		if ( in_array( $this->options[ 'tab_scheme' ] , $wpuiCss3List ) )	{
			wp_enqueue_style('wp-ui', $plugin_url . 'wp-ui.css');
			
		} else {	
			// Sets the standard font size for jQuery UI themes,
			// to ensure compat with variety of wordpress themes. 
			wp_enqueue_style( 'jquery-ui-wp-fix', $plugin_url . 'css/jquery-ui-wp-fix.css' );
			
			// Load the jQuery UI theme from the Google CDN.
			wp_enqueue_style( 'jquery-ui-css-' . $this->options['tab_scheme'] , 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/' . $this->options['tab_scheme'] . '/jquery.ui.all.css');
			
		} // END if ( !in_array( ) )

		/**
		 * 	Load all the styles default since 0.5.7
		 */
		wp_enqueue_style( 'wp-ui-all' , $plugin_url . 'css/wpui-all.css');
			
		if ( $is_IE && $this->options['enable_ie_grad'] )
		wp_enqueue_style( 'wp-tabs-css-bundled-all-IE' , $plugin_url . 'css/wpui-all-ie.css');	


		/**
		 * 	Load jQuery UI custom themes.
		 */
		if ( isset( $this->options['jqui_custom_themes'] ) && $this->options['jqui_custom_themes'] != '' ) {
			$jquithms = json_decode( $this->options[ 'jqui_custom_themes'] , true );
			foreach( $jquithms as $key=>$val ) {
				wp_enqueue_style( $key, $val );		
			}
		}
			
		// Try a jQuery UI theme.
		// wp_enqueue_style( 'jquery-ui-css-flick' , 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/flick/jquery.ui.all.css');
			
		/**
		 *	Load the additional CSS, if any has been input on the options page.		
		 */
		if ( $this->options['custom_css'] != '' )
			wp_enqueue_style( 'wpui-custom-css', get_bloginfo( 'url' ) . '/?wpui-query=css');
	
		
	} // END method plugin_viewer_styles()
	
	
	/**
	 * 	Load the scripts and styles for the admin.
	 * 
	 * 	@uses wp_enqueue_style and wp_enqueue_script.
	 * 	@since 0.1
	 */
	public function admin_scripts_styles() {
		global $wp_version;
		$plugin_url = plugins_url('/wp-ui/');
		
		
		// Use the bundled jQuery.
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui-tabs' );
		wp_enqueue_script( 'jquery-ui-dialog' );

		// wp_enqueue_script( 'jquery-color' );
		// wp_enqueue_script( 'jquery-ui-effects' , $plugin_url . 'js/ui-effects.js');


		if ( ( isset($_GET['page']) && $_GET['page'] == 'wpUI-options' )) {
				
			// Load newer jQuery for older versions. Will be removed in WP UI 1.0. 
			// if ( version_compare( $wp_version, '3.0', '<' ) ) {	
				wp_deregister_script( 'jquery' );
				wp_deregister_script( 'jquery-ui-tabs' );
				wp_deregister_script( 'jquery-ui-dialog' );
				// wp_deregister_script( 'jquery-color' );
			 	wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');
					wp_enqueue_script('jquery-ui', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js');
			// }

			wp_enqueue_script( 'admin_wp_ui' , $plugin_url . 'js/admin.js');
			wp_localize_script('admin_wp_ui' , 'initOpts', array(
				'wpUrl'				=>	get_bloginfo('url'),
				'pluginUrl' 		=>	plugins_url('/wp-ui/'),
				'queryVars1'	=>	add_query_arg( array(
					 	'action' => 'WPUIstyles',
					 	'height' => '200',
					 	'width' => '300'
					 ), 'admin-ajax.php' ),
					
				'queryVars2'	=>	add_query_arg( array(
					 	'action' => 'jqui_custom_css',
					 ), 'admin-ajax.php' )
				));
			
		wp_enqueue_script( 'admin_jq_ui' , $plugin_url . 'js/jqui-admin.js');
		wp_localize_script( 'admin_jq_ui' , 'jqui_admin', array(
			'upNonce'	=>	wp_create_nonce( 'wpui-jqui-custom-themes' )
		));

			wp_deregister_script( 'thickbox' );
			wp_enqueue_script( 'wpui_tb' , $plugin_url . 'js/thickbox.js' );
			wp_localize_script( 'wpui_tb' , 'tbOpts', array(
				'wpUrl'				=>	get_bloginfo('url'),
				'pluginUrl' 		=>	plugins_url('/wp-ui/')				
			));
	
		} // end the $_GET page conditional.

		// Load the thickbox scripts, styles and media-upload.
		wp_enqueue_script('thickbox');
		wp_enqueue_style('thickbox');
		wp_print_scripts('media-upload');

		// Editor buttons and JS vars.
		wp_enqueue_script('editor');
		wp_localize_script( 'editor', 'pluginVars', array(
			'wpUrl'		=>	get_bloginfo('url'),
			'pluginUrl'	=>	$plugin_url,
			'tmceURL'	=>	get_bloginfo( 'url' ) . '/wp-includes/js/tinymce/',
			'queryVars1'	=>	add_query_arg( array( 'action' => 'tabtitlehelp', 'height' => '200', 'width' => '300' ), 'admin-ajax.php' )
		));

		
	} // END method admin_scripts_styles


	function admin_styles() {
		$plugin_url = plugins_url('/wp-ui/');
		
		// Load the css on options page.
		if ( isset( $_GET['page'] ) && $_GET['page'] == 'wpUI-options' ) {
			wp_enqueue_style('wp-tabs-admin-js', $plugin_url . '/css/admin.css');
			// wp_enqueue_style('wp-admin-jqui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/smoothness/jquery.ui.all.css');
		}		
	}


	/**
	 * 	Add buttons to wp-ui options page's editors.
	 */
	function add_mce_buttons($buttons) {
		if ( isset($GET['page']) && $_GET['page'] == 'wpUI-options')
			array_push( $buttons, 'seperator', 'image', 'forecolorpicker', 'backcolorpicker');
		return $buttons;		
	} // END function add_mce_buttons
	


	/**
	 * 	Set the defaults on plugin activation.
	 */
	function set_defaults() {
		
		// First install.
		if ( ! $this->options ) {
			$defaults = get_wpui_default_options();
			update_option( 'wpUI_options', $defaults );
		} else {
			// Append the new options.
			$oldopts = get_option( 'wpUI_options' );
			$newdefs = get_wpui_default_options();
			$updateopts = array_merge( $newdefs , $oldopts );
			update_option( 'wpUI_options', $updateopts );
		} // End if ( !this->options )

	} // END set defaults.

	

	// =======================
	// = Add the shortcodes. =
	// =======================

	/**
	 * 	[wptabs] shortcode.	
	 */
	function sc_wptabs( $atts, $content = null) {
		extract(shortcode_atts(array(
			"type"		=>	'tabs',
			'style'		=>	$this->options['tab_scheme'],
			'effect'	=>	$this->options['tabsfx'],
			'speed'		=>	'600',
			// Tabs only options below
			'rotate'	=>	'', 
			'position'	=>	'top',
			'cat'		=>	'',
			'mode'		=>	'horizontal',
			'listwidth'	=>	'',
			// Accordion only options below
			'active'	=>	false
		), $atts));
		
		$output  = '';

		$scheme = $style;
		
		$jqui_cust = isset( $this->options[ 'jqui_custom_themes' ] ) ? json_decode( $this->options[ 'jqui_custom_themes' ] , true ) : array();	
		
					
		if ( stristr( $style, 'wpui-' ) && ! isset( $jqui_cust[ $scheme ] ) ) {
			$style .= ' wpui-styles';
		} else {
			$style .= ' jqui-styles';
		}
		
		if ( $mode == 'vertical' ) {
			$style .= ' wpui-tabs-vertical';
		}
		
		if ( $listwidth != '' )
			$style .= ' listwidth-' . $listwidth;

	
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

	
		$output .= '<div class="' . $class . '">' . do_shortcode($content) . '</div><!-- end div.wp-tabs -->';
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
			'tag'				=>	'',
			'number'			=>	'4',
			'exclude'			=>	'',
			'elength'			=>	$this->options['excerpt_length'],
			'before_post'		=>	'',
			'after_post'		=>	'',
			'num_per_page'		=>	FALSE		
		), $atts ));
		
		if ( ( ! $cat || $cat == '' ) && ( ! $tag || $tag == '' ) && ( ! $get || $get == '' ) )
			return;
		
		if ( $cat != '' ) $tag = '';		

		// $wquery . '&number=' . $number . '&length=' . $elength
		$custom_loop = $this->wpui_get_posts( array( 
									'cat'		=>	$cat,
									'tag'		=>	$tag,
									'get'		=>	$get,
									'number'	=>	$number,
									'exclude'	=>	$exclude,
									'length'	=>	$elength								
								));
	
		$output = ''; 
		
		if ( ! $custom_loop ) {
			return "Please verify <code>[<span>wptabposts</span>]</code> arguments.";
		}
		
		if ( $num_per_page ) {
			$output .= '<div class="wpui-page wpui-page-1">';		
			$num_page = 1;
		}
		
		$wpui_total_posts = count( $custom_loop );
		foreach( $custom_loop as $index=>$item ) {			
			$posts_passed = $index + 1;

			$tmpl = $this->replace_tags( $this->options[ 'post_template_1'], $item );
			$output .= $before_post . $tmpl . $after_post;
		
			if( $num_per_page 
				&& ( ( $posts_passed % $num_per_page ) == 0 ) 
				&& ( $posts_passed != ( $wpui_total_posts ) )
				) {
				$num_page++;
				$output .= '</div>';
				$output .= '<div class="wpui-page wpui-page-' . $num_page . '">';
			}			
		} // END foreach.
		
		if ( $num_page )
		$output .= '</div><!-- end wpui-page -->';
		
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
			'tab_names'			=>	'numbers',
			'effect'			=>	$this->options['tabsfx'],
			'speed'				=>	'600',
			'get'				=>	'',
			'cat'				=>	'',
			'tag'				=>	'',
			'number'			=>	'4',
			'exclude'			=>	'',
			'elength'			=>	$this->options['excerpt_length'],
			'before_post'		=>	'',
			'after_post'		=>	''
		), $atts ));
		
		
		if ( $tab_names != 'numbers' ) {
			$tab_names_arr = preg_split( '/(?<!\\\\),/sim', $tab_names );
			if ( count( $tab_names_arr ) < 2 )
				$tab_names = 'numbers';
		}
		
		if ( ( ! $cat || $cat == '' ) && ( ! $tag || $tag == '' ) && ( ! $get || $get == '' ) )
			return;
		
		if ( $cat != '' ) $tag = '';		

		// $wquery . '&number=' . $number . '&length=' . $elength
		$my_posts = $this->wpui_get_posts( array( 
									'cat'		=>	$cat,
									'tag'		=>	$tag,
									'get'		=>	$get,
									'number'	=>	$number,
									'exclude'	=>	$exclude,
									'length'	=>	$elength								
								));

		// echo '<pre>';
		// print_r($my_posts);
		// echo '</pre>';
		
		$output = ''; 
		
		$tabs_count = 1;
		
		$each_tabs = '';
		
		if ( ! $my_posts ) {
			return "Please verify <code>[<span>wptabposts</span>]</code> arguments.";
		}
		
		foreach( $my_posts as $index=>$item ) {
			if ( $tab_names != 'numbers' )
				$tab_name = $tab_names_arr[ $index ];
			else
				$tab_name = $tabs_count;
			$tmpl = $this->replace_tags( $this->options[ 'post_template_1'], $item );
			$tab_content = $before_post . $tmpl . $after_post;
			$each_tabs .= do_shortcode( '[wptabtitle] ' . $tab_name . ' [/wptabtitle] [wptabcontent] ' . $tab_content  . ' [/wptabcontent]' );

			$tabs_count++;
		} // END foreach.
		
		$wptabsargs = '';
		
		if ( $type != '' )
			$wptabsargs .= ' type="' . $type . '"';
		if ( $mode != '' )
			$wptabsargs .= ' mode="' . $mode . '"';
		
		if ( $listwidth != '' )
			$style .= ' listwidth-' . $listwidth;
		$wptabsargs .= ' style="' . $style . '"';
		
		
		// if ( $listwidth != '' )
			$style .= ' listwidth-' . $listwidth;
		$output .= do_shortcode( '[wptabs' . $wptabsargs . ']' . $each_tabs . '[/wptabs]' );
		
		return $output;
		
	} // END function wptabposts

	
	
	/**
	 * 	[wptabtitle]
	 */
	function sc_wptabtitle( $atts, $content = null ) {
		extract(shortcode_atts(array(
			'header'	=>	'h3',
			'tablabel'	=>	'',
			'load'		=>	'',
			'post'		=>	'',
			'page'		=>	'',
			'cat'		=>	'',
			'tag'		=>	'',
			'number'	=>	'4',
			'exclude'	=>	'',
			'tag'		=>	'',
			'elength'	=>	$this->options['excerpt_length'],
			'before_post'	=>	'',
			'after_post'	=>	''
		), $atts));
		
		if( $post != '' ) {
			// No ajax load if a post is specified.
			$load = '';	
			$post_cont = $this->wpui_get_post( $post, $elength );
			
			if ( ! is_array( $post_cont ) ) :
				$post_content = $post_cont;
			else :
			$tmpl = $this->options[ 'post_template_1' ];
			$post_content = $before_post . $this->replace_tags( $tmpl, $post_cont ) . $after_post;
			endif;
			$output  = '<' . $header . ' class="wp-tab-title">';
			$output .= do_shortcode( __( $content ) ) . '</' . $header . '>';
			$output .= do_shortcode( '[wptabcontent]' .  $post_content . '[/wptabcontent]');

		} elseif( $page != '' ) { 
			$load = '';
			$post_cont = $this->wpui_get_post( $page, $elength, 'page' );
			if ( ! is_array( $post_cont ) ) :
				$post_content = $post_cont;
			else :			
			$post_cont[ 'excerpt' ] = $post_cont[ 'content' ];
			$tmpl = $this->options[ 'post_template_1' ];
			$post_content = $before_post . $this->replace_tags( $tmpl, $post_cont ) . $after_post;
			$post_cont[ 'excerpt' ] = $post_cont[ 'content' ];
			endif;
			
			$output  = '<' . $header . ' class="wp-tab-title">';
			$output .= do_shortcode( __( $content ) ) . '</' . $header . '>';
			$output .= do_shortcode( '[wptabcontent]' .  $post_content . '[/wptabcontent]');			
			
		} elseif( $cat != '' || $tag != '' ) {
			$load = '';
			
			$get_cat_posts = $this->wpui_get_posts( array( 
									'cat'		=>	$cat,
									'tag'		=>	$tag,
									'number'	=>	$number,
									'exclude'	=>	$exclude,
									'length'	=>	$elength								
									));
			
			// echo '<pre>';
			// print_r($get_cat_posts);
			// echo '</pre>';
			
			$posts_group = '';
			
			foreach( $get_cat_posts as $index=>$values ) {
				$tmpl = $this->options[ 'post_template_1' ];
				$posts_group .= $this->replace_tags( $tmpl, $values );	
			}
			
			$output = '<' . $header . ' class="wp-tab-title">';
			$output .= do_shortcode( __( $content ) ) . '</' . $header . '>';
			$output .= do_shortcode( '[wptabcontent]' . $posts_group . '[/wptabcontent]' );			
			
		} elseif ( $load != '' ) {
			$output  = '<' . $header . ' class="wp-tab-title">';
			$output .= '<a class="wp-tab-load" href="' . $load . '">';
			$output .= do_shortcode($content);
			$output .= '</a>';
			$output .= '</' . $header . '>';
		} else {	
			$output = '<' . $header . ' class="wp-tab-title">' . do_shortcode( __( $content ) ) . '</' . $header . '>';
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
			return '<div class="wp-tab-content">' . do_shortcode($content) . '</div><!-- end div.wp-tab-content -->';
			
	} // END function sc_wptabcontent


	/**
	 * 	Spoilers/Collapsibles/Sliders. 
	 * 
	 * 	[wpspoiler name="NAME"]
	 */
	function sc_wpspoiler( $atts, $content = null ) {
		extract( shortcode_atts( array( 
				'name'		=>	'Show Content',
				'style'		=>	$this->options['tab_scheme'],
				'fade'		=>	'true',
				'slide'		=>	'true',
				'speed'		=>	false,
				'closebtn'	=>	false,
				'showText'	=>	'Click to show',
				'hideText'	=>	'Click to hide',
				'open'		=>	'false',
				'post'		=>	'',
				'elength'	=>	$this->options['excerpt_length'],
				'before_post'	=>	'',
				'after_post'	=>	''
			), $atts));
			
			$h3class  = '';
			$h3class .= ( $fade == 'true' ) ? ' fade-true' : ' fade-false'; 
			$h3class .= ( $slide == 'true' ) ? ' slide-true' : ' slide-false';
			$h3class .= ( $open == 'true' ) ? ' open-true' : ' open-false';
			
			$h3class .= ( $speed ) ? ' speed-' . $speed : '';
			
			if ( $post != '' ) {
				$content = '';
				$post_content = $this->wpui_get_post( $post, $elength );
				$tmpl = $this->options[ 'post_template_2' ];
				$content = $before_post . $this->replace_tags( $tmpl, $post_content ) . $after_post;
				$name = $post_content[ 'title' ];		
			}
			
			$out_content = do_shortcode( $content );
			if ( $closebtn )
				$out_content .= '<a class="close-spoiler ui-button ui-corner-all" href="#">' . $closebtn . '</a>';
			
			return '<div class="wp-spoiler ' . $style . '"><h3 class="ui-collapsible-header' . $h3class . '"><span class="ui-icon"></span>' .$name . '</h3><div class="ui-collapsible-content">'  . $out_content . '</div></div><!-- end div.wp-spoiler -->';
	} // END function sc_wptabcontent


	/**
	 * 	Dialogs
	 * 	
	 * 	[wpdialog]Stuff you wanna say[/wpdialog]
	 */
	function sc_wpdialog( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'style'			=>	$this->options['tab_scheme'],
			'auto_open'		=>	"true",
			'openlabel'		=>	"Show Information",
			'title'			=>	'Information',
			'height'		=>	'auto',
			'width'			=>	$this->options[ 'dialog_width' ],
			'show'			=>	'slide',
			'hide'			=>	'fade',
			'modal'			=>	'false',
			'closeOnEscape'	=>	'true',
			'position'		=>	'center',
			'zIndex'		=>	'1000',
			'button'		=>	false,
			'post'			=>	'',
			'elength'		=>	'more',
			'before_post'	=>	'',
			'after_post'	=>	''
		), $atts ) );
		
		static $dia_inst = 0;
		$dia_inst++;
		
		$args = '';
		$scheme = $style;
		
		if ( stristr( $style, 'wpui-' ) ) {
			$style .= '%wp-ui-styles%dialog-number-' . $dia_inst;
		}

		if ( $style ) $args .= ' wpui-dialogClass:' . $style . '-arg';
		
		if ( $width ) $args .= ' wpui-width:' . $width . '-arg';
		if ( $height ) $args .= ' wpui-height:' . $height . '-arg';
		if ( $auto_open ) $args .= ' wpui-autoOpen:' . $auto_open . '-arg';
		if ( $show ) $args .= ' wpui-show:' . $show . '-arg';
		if ( $hide ) $args .= ' wpui-hide:' . $hide . '-arg';
		if ( $modal ) $args .= ' wpui-modal:' . $modal . '-arg';
		$args .= ' wpui-closeOnEscape:' . $closeOnEscape . '-arg';
		if ( $position ) $args .= ' wpui-position:' . $position . '-arg';
		if ( $zIndex ) $args .= ' wpui-zIndex:' . $zIndex . '-arg';
		if ( $button ) {
			$button = str_ireplace( ' ', '%', $button );
			$args .= ' wpui-button:' . $button . '-arg';
		}


		if ( $post != '' ) {
			$get_post = $this->wpui_get_post( $post , $elength );
			$title = $get_post[ 'title' ];
			$tmpl = $this->options[ 'post_template_2' ];
			$content = $before_post . $this->replace_tags( $tmpl, $get_post ) . $after_post;
		}
		
		$output = '';

		if ( $auto_open == "false" ) {
			
			$output .= '<p class="' . $scheme . '"><a href="#" class="dialog-opener-' . $dia_inst . '">Show info</a></p>';
			
			// $output .= '<p class="' . $this->options[ 'tab_scheme' ] . '"><a href="#" class="ui-button ui-state-default ui-corner-all dialog-opener-' . $dia_inst . '"><span class="ui-icon ui-icon-newwin"></span><span class="ui-button-text">' . $openlabel . '</span></a></p>';
			$output .= '<div class="wp-dialog wp-dialog-' . $dia_inst . ' ' . $style . '" title="' . $title . '">';
		} else {
			$output .= '<div class="wp-dialog ' . $style . '" title="' . $title . '">';
		}
		$output .= '<h4 class="wp-dialog-title ' . $args . '"></h4>';
		$output .= do_shortcode( $content ) . '</div><!-- end .wp-dialog -->';
		
		
		return $output;
		
	} // END method sc_wpdialog	

	
	/**
	 * 	Try to solve the conflicts.
	 */
	function wpui_tackle_conflicts() {
		// if ( wp_script_is( 'thickbox', 'queue') ||  wp_script_is( 'thickbox', 'done')) 
		wp_enqueue_script('thickbox_fix', plugins_url( 'wp-ui/js/fix_tb.js' ) , array('thickbox'), '0.2', true );
	} // END method wpui_tackle_Conflicts


	/**
	 * 	Add the wpui-query GET var 
	 */
	function wpui_add_query( $query_vars )
	{
		$query_vars[] = 'wpui-query';
		return $query_vars;
	} // END function wpui_add_query


	/**
	 * 	Queue the custom css.
	 * 
	 * 	@since 0.5
	 * 	@uses get_query_var
	 */
	function wpui_custom_css()
	{
		$query = get_query_var( 'wpui-query' );
		if ( 'css' == $query ) {
			// include_once( 'css/css.php');
			header( 'Content-type: text/css' );
			header( 'Cache-Control: must-revalidate' );
			$offset = 72000;
			header( "Expires: " . gmdate( "D, d M Y H:i:s", time() + 72000) . " GMT");
			$opts = get_option( 'wpUi_options' );
			echo $opts['custom_css'];
			exit; // Dont remove.
		}
		
	} // END function wpui_custom_css


	/**
	 * 	Replace the tags on the template.
	 * 	
	 * @since 0.7
	 * @return string $template HTML
	 */
	function replace_tags( $template, $needles ) {
		
		if ( ! $template ) return;
		if ( ! is_array( $needles ) ) return;
		
		$template = str_ireplace( '{$title}' , $needles[ 'title' ], $template );
		$template = str_ireplace( '{$thumbnail}' , $needles[ 'thumbnail' ], $template );
		$template = str_ireplace( '{$excerpt}' , $needles[ 'excerpt' ], $template );
		
		$template = str_ireplace( '{$content}' , $needles[ 'content' ], $template );
		if ( isset( $this->options[ 'relative_times' ] ) )
			$template = str_ireplace( '{$date}' , $this->get_relative_time($needles[ 'date' ]), $template );
		else
			$template = str_ireplace( '{$date}' , $needles[ 'date' ], $template );
		$template = str_ireplace( '{$url}' , $needles[ 'url' ], $template );		
		$template = str_ireplace( '{$author}' , $needles[ 'author' ], $template );
		$author_posts_link = '<a href="' . get_author_posts_url( $needles[ 'author' ] ) . '" target="_blank" />' . $needles[ 'author' ] . '</a>';
		$template = str_ireplace( '{$author_posts_link}', $author_posts_link, $template );
		$first_cat = explode( ', ', $needles[ 'meta' ]['cat'] );
		$first_cat = $first_cat[ 0 ];
		
		$template = str_ireplace( '{$cats}', $needles[ 'meta' ][ 'cat' ], $template );
		$template = str_ireplace( '{$cat}', $first_cat,  $template );
		$template = str_ireplace( '{$tags}', $needles[ 'meta' ][ 'tag' ], $template );
		$template = str_ireplace( '{$num_comments}', $needles[ 'meta' ][ 'comments' ], $template );
	
		return $template;		
	} // END method replace_tags



	
	/**
	 * Generate excerpt.
	 * 
	 * @since 0.7
	 * 
	 * @param string $text to be trimmed.
	 * @param integer $length to trim.
	 * @return string $text trimmed content
	 */
	function get_excerpt( $text, $length ) {
		$text = apply_filters( 'the_content' , $text );
		$text = str_replace( '\]\]\>', ']]&gt;', $text );
		$text = preg_replace( '@<script[^>]*?>.*?</script>@si', '', $text );
		$text = strip_tags( $text, '<p><ul><ol><li><img><h2><h3>' );
		
		if ( ! is_int( $length ) ) {
			if ( isset( $this->options[ 'excerpt_length' ] ) )
				$length = $this->options[ 'excerpt_length' ];
			else 
				$length = 55;
		}
				
		$words = explode( ' ' , $text , $length + 1 );
		
		if ( count( $words ) > $length ) {
			array_pop( $words );
			// array_push( $words , $more_link );
			$text = implode( ' ', $words );
		}		
		return $text;
	} // END method wpui_generate_excerpt
	

	/**
	 * Get individual posts.
	 * 
	 * @since 0.7
	 * @uses get_post()
	 * @param $ID , ID of the post
	 * @param $args array.
	 */
	function wpui_get_post( $ID , $length , $type='post' ) {
		if ( ! $ID ) return;
		if ( ! $length  && isset( $this->options[ 'excerpt_length' ] ) )
			$length = $this->option[ 'excerpt_length' ];
			
		if ( $type == 'page' )			
			$length = 55;
		
		if ( $type == 'page' ) {
			if ( is_numeric( $ID ) ) 
				$wpui_post = get_page( $ID );
			else
				$wpui_post = get_page_by_title( $ID );
				
		} else {
			$wpui_post = get_post( $ID );
		}
		
		if ( ! $wpui_post ) {
			return "Please verify the post/page ID. Check the spelling if using a name or title.";
		}


		$p_title = $wpui_post->post_title;
		$p_thumb = get_the_post_thumbnail( $ID );				

		$more_link = get_permalink( $ID );
		$check_more = preg_match( '/<!--more-->/im', $wpui_post->post_content);
		// die();

		if ( $length == 'more' && $check_more ) {
			$pos = stripos( $wpui_post->post_content , '<!--more-->' );
			$post_exc = substr( $wpui_post->post_content, 0 , $pos);
		} else {
			$length = intval( $length );
			$post_exc = $wpui_post->post_content;
			$post_exc = $this->get_excerpt( $post_exc, $length );
		}
				
		$post_date = mysql2date( get_option( 'date_format' ) , $wpui_post->post_date_gmt);
		
		if ( $type != 'page' ) {
			$cats = get_the_category_list( ', ', '', $wpui_post->ID );
			$tags = $this->wpui_get_post_tags( $wpui_post->ID );
		} else {
			$cats = $tags = '';
		}
			
		
		$output = array(
			'title'		=>	$wpui_post->post_title,
			'excerpt'	=>	$post_exc,
			'content'	=>	$wpui_post->post_content,
			'thumbnail'	=>	$p_thumb,
			'date'		=>	$post_date,
			'author'	=>	get_the_author_meta('display_name' ,$wpui_post->post_author),
			'url'		=>	$more_link,
			'meta'		=>	array(
								'cat'		=>	$cats,
								'tag'		=>	$tags,
								'comments'	=>	$wpui_post->comment_count
							)
			);
		
		return $output;
		
	} // END method wpui_get_post.
	
	
	
	/**
	 * 	Get multiple posts with custom query.
	 * 
	 * 	@since 0.7
	 * 	@uses WP_Query, wp_reset_postdata()
	 * 	@return array $posts 
	 */
	function wpui_get_posts( $args='' ) {
		
		$defaults = array(
			'get'			=>	'',
			'cat'			=>	'',
			'tag'			=>	'',
			'number'		=>	'4',
			'exclude'		=>	'',
			'length'		=>	'more',
			'excerpt'		=>	true,
			'thumbnail'		=>	true,
			'meta'			=>	true
		);
		
		$r = wp_parse_args( $args, $defaults );
			
		// if ( ! isset( $r[ 'cat' ] ) || $r[ 'cat' ] == '' ) 
		// 	return false;

		$qquery = array();
		
		if ( $r[ 'get' ] != '' ) {
			// Get recent posts
			if ( $r['get'] == 'recent' ) {
				$qquery = array( "posts_per_page" => $r[ 'number' ] );
			} else if ( $r[ 'get' ] == 'popular' ) {
				$qquery = array( 'orderby' => 'comment_count' , 'posts_per_page' => $r[ 'number' ] ); 
			} elseif ( $r[ 'get' ] == 'random' ) {
				$qquery = array( 'orderby' => 'rand' , 'posts_per_page' => $r[ 'number' ] );
			}
		} else {
		if ( $r[ 'cat' ] != '' ) {
			$r[ 'tag' ] = '';
			if ( is_numeric( $r[ 'cat' ] ) )
				$qquery[ 'cat' ] = $r[ 'cat' ];
			else
				$qquery[ 'category_name' ] = $r[ 'cat' ];
				
			if ( $r[ 'exclude' ] != '' ) {
				$excl_array = explode( ',' , $r[ 'exclude' ] );
				if ( is_array( $excl_array ) )
				$qquery[ 'category__not_in' ] = $excl_array;
			}
				
		}
		if ( $r[ 'tag' ] != '' ) {
			if ( is_numeric( $r[ 'tag' ] ) ) {
				$qquery[ 'tag_id' ] = $r[ 'tag' ];
				if ( $r[ 'exclude' ] != '' ) {
					$excl_array = explode(',', $r[ 'exclude' ] );
					if ( is_array( $excl_array ) )
					$qquery[ 'tag__not_in' ] = $excl_array;		
				}
			} else {
				$qquery[ 'tag' ] = $r[ 'tag' ];
			}
		
		}
		
		$qquery[ 'posts_per_page' ] = $r['number'];
		
		}			
		$get_posts = new WP_Query( $qquery );
		
		$post_count = 0;
		$post_basket = array();
		
		// 
		while ( $get_posts->have_posts() ) : $get_posts->the_post();
		
		
		$wost = array();
		
		$content = get_the_content();
		
		$wost['title'] = get_the_title();
		$wost[ 'thumbnail' ] = get_the_post_thumbnail( get_the_ID() );		 
		$wost['content'] = $content;
		$check_more = preg_match( '/<!--more-->/im', $wost['content']);

		// if ( $r[ 'length' ] == 'more' && $check_more ) {
		// 	$pos = stripos( $content , '<!--more-->' );
		// 	$wost[ 'excerpt' ] = substr( $content, 0 , $pos);
		// } else {
		if ( $r[ 'length' ] == 'more' )	{
			$wost['excerpt'] = get_the_excerpt();
		} else {
			$elength = intval( $r[ 'length' ] );
			if ( ! is_int( $elength ) ) $elength = 55;
			$wost[ 'excerpt' ] = $this->get_excerpt( $content, $elength );
		}
		
		$wost[ 'meta' ] = array();
		$wost[ 'meta' ][ 'cat' ] = get_the_category_list( ',' );			
		$wost[ 'meta' ][ 'tag' ] = 	get_the_tag_list('', ', ', '');
		$wost[ 'meta' ][ 'comments' ] = get_comments_number();
		
		// }
		$wost[ 'date' ] = get_the_date();
		$wost[ 'url' ] = get_permalink( get_the_ID() );
		$wost[ 'author' ] = get_the_author();
		// $post_basket

		$post_basket[ $post_count ] = $wost;


		$post_count++;
		endwhile; // end while get_posts loop
		
		wp_reset_postdata();
		
		// echo '<pre>';
		// print_r($post_basket);
		// echo '</pre>';

		if ( $post_basket )
			return $post_basket;
	} // END function wpui_get_posts
	
	
	/**
	 * Get the relative time, like 5 days ago.
	 * 
	 * @since 0.5.8
	 * @uses mysql2date, human_time_diff
	 * @param integer $time, post time in GMT.
	 * @return string, relative time
	 */
	function get_relative_time( $time )
	{
		$time = mysql2date( 'U' , $time );
		$time = human_time_diff( $time, current_time( 'timestamp' ) ) . __( ' ago', WPPTD );
		return $time;
	} // END function get_relative_time
	
	
	/**
	 * Get the tags from a post ID.
	 * 
	 * @uses get_the_tags()
	 * @since 0.7
	 * @thinks God! why am i even typing this!
	 * @param $ID id of the post.
	 * @param $separator string 
	 * @return $output long string of tags.
	 */
	function wpui_get_post_tags( $pID='0' , $sep=', ' )
	{		
		$get_tags = get_the_tags( $pID );
		
		$output = '';
		$total_tags = count( $get_tags );
		$present_tag = 1;
		
		if ( ! $get_tags ) return;
		
		foreach( $get_tags as $tag ) {
			if ( $present_tag == $total_tags ) $sep = '';
			$output .= '<a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a>' . $sep;
			$present_tag++;
		}		
		return $output;		
	} // END function wpui_get_post_tags
	
	
	
} // end class WP_UI


$upload_dir = wp_upload_dir();
$jqdir = preg_replace( '/(\d){4}\/(\d){2}/i' , '' , $upload_dir['path'] ) . 'wp-ui/';



function wpui_jqui_dirs( $dir, $format='array' ) {

	$valid = array();
	if ( ! is_dir( $dir ) )
		return "NO_DIR ::::: $dir";
	$it = new DirectoryIterator( $dir );
	$abspath = ABSPATH;
	$i = 0;
	foreach( $it as $fi ) {
		if ( $fi->isDir() &&
		 	! $fi->isDot() )
		  {
	$itt = new DirectoryIterator( $fi->getPathname() );
		foreach( $itt as $fii ) {
				if ( $fii->isFile() ) {
					if( 'css' == substr( $fii->getFilename() , -3 ) ) {
						$valid[ $fi->getBasename() ] = $fii->getPathName();
						$i++;
					}
				}
			}
			$i++;
		}
	}	ksort( $valid );
	foreach( $valid as $key=>$value ) {
		$valid[ $key ] = get_bloginfo('wpurl') . '/' . str_ireplace( ABSPATH, '', $value );
	}
	
	if ( empty( $valid ) ) {
		return "EMPTY_DIR ::::: " . $dir;
	} else {
		return json_encode( $valid );
	}
	
	// if ( $format == 'array' ) {
	// 	return $valid;
	// } else {
	// }		
} // END update CSS dirs.

?>
