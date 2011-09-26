<?php

require_once( dirname( __FILE__ ) . '/admin-options.php' );

if ( class_exists( 'quark_admin_options' ) ) {
/**
 *	WP UI options
 */
class wpUI_options extends quark_admin_options
{

	public function validate_options( $input ) {

		// echo '<pre>';
		// print_r($input);
		// echo '</pre>';
		
		$new_input = $input;

		$reset = ( ! empty( $input['reset'] )) ? true : false;

		if ( $reset ) {
			$defaults = get_wpui_default_options();
			return $defaults;
		}
		return $new_input;
	}
}
}

$wpui_plugin_details = array(
	'name'			=>	'WP UI',
	'db_prefix'		=>	'wpUI',
	'page_prefix'	=>	'wpUI'
);

// if( class_exists( 'quark_admin_options') )
$option_page = new wpUI_options($wpui_plugin_details);


$sects = array(
	'general'	=>	__('General', WPPTD),
	'style'		=>	__('Style', WPPTD),
	'effects'	=>	__('Effects', WPPTD),
	'text'		=>	__('Text', WPPTD),
	'posts'	=>	__('Posts', WPPTD),
	'advanced'	=>	__('Advanced', WPPTD)	
);


$wpui_skins_list_pre = array(

	'startoptgroup1'=>	__('jQuery UI Themes', WPPTD),
		'ui-lightness'	 =>	__('UI-Lightness', WPPTD),
		'ui-darkness'	 =>	__('UI-Darkness', WPPTD),
		'smoothness'	 =>	__('Smoothness', WPPTD),
		'start'			 =>	__('start', WPPTD),
		'redmond'		 =>	__('Redmond', WPPTD),
		'sunny'			 =>	__('Sunny', WPPTD),
		'overcast'		 =>	__('Overcast', WPPTD),
		'le-frog'		 =>	__('Le Frog', WPPTD),
		'flick'			 =>	__('Flick', WPPTD),
		'pepper-grinder' => __('Pepper Grinder', WPPTD),
		'eggplant'		 => __('Eggplant', WPPTD),
		'dark-hive'		 => __('Dark Hive', WPPTD),
		'cupertino'		 => __('Cupertino', WPPTD),
		'south-street'	 => __('South St', WPPTD),
		'blitzer'		 => __('Blitzer', WPPTD),
		'humanity'		 => __('Humanity', WPPTD),
		'hot-sneaks'	 => __('Hot Sneaks', WPPTD),
		'excite-bike'	 => __('Excite Bike', WPPTD),
		'vader'			 => __('Vader', WPPTD),
		'dot-luv'		 => __('Dot Luv', WPPTD),
		'mint-choc'		 => __('Mint Choc', WPPTD),
		'black-tie'		 => __('Black Tie', WPPTD),
		'trontastic'	 => __('Trontastic', WPPTD),
		'swanky-purse'	 => __('Swanky Purse', WPPTD),
		'base'			 => __('Base', WPPTD),
		'black-tie'		 => __('Black Tie', WPPTD),
		
	'endoptgroup2'	=>	'',
		
	'startoptgroup2'=>	__('WP UI CSS3 Themes', WPPTD),
		'wpui-light'		=>	__('WPUI - light', WPPTD),
		'wpui-blue'			=>	__('WPUI - Blue', WPPTD),
		'wpui-red'			=>	__('WPUI - Red', WPPTD),
		'wpui-green'		=>	__('WPUI - Green', WPPTD),
		'wpui-dark'			=>	__('WPUI - Dark', WPPTD),	
		'wpui-quark'		=>	__('WPUI - Quark', WPPTD),
		'wpui-cyaat9'		=>	__('WPUI - See ya at 9', WPPTD),
		'wpui-android'		=>	__('WPUI - Android', WPPTD),
		'wpui-safle'		=>	__('WPUI - safle', WPPTD),
		'wpui-alma'			=>	__('WPUI - Alma', WPPTD),
		'wpui-macish'		=>	__('WPUI - Macish', WPPTD),
		'wpui-achu'			=>	__('WPUI - Achu', WPPTD),
		'wpui-redmond'		=>	__('WPUI - Redmond', WPPTD),
		'wpui-sevin'		=>	__('WPUI - Sevin', WPPTD),
	'endoptgroup1'	=>	'',
	
);






// 
// $wpui_options = get_option( 'wpUI_options' );
// 
// if ( ! empty( $wpui_options) ) {
// 	$wpui_jqui_custom_themes = json_decode( $wpui_options[ 'jqui_custom_themes' ] , true);
// 
// 	
// 	$wpui_custom_thm_num = count( $wpui_jqui_custom_themes );
// 	
// 	if ( $wpui_custom_thm_num > 0 ) {
// 		$wpui_skins_list_pre[ 'startoptgroup3' ] = __( 'jQuery Custom themes', WPPTD ); 
// 		foreach( $wpui_jqui_custom_themes as $key=>$value ) {
// 			$wpui_jqui_cust_thm_display = ucwords(str_ireplace( '-', ' ', $key ));
// 			$wpui_skins_list_pre[ $wpui_jqui_cust_thm_display ] = $key;
// 		}
// 		
// 		$wpui_skins_list_pre[ 'endoptgroup3' ] = '';
// 		
// 	}
// 	
// }
// 

$option_page->set_sections($sects);
$options_list = array(
	'tabMain'	=>	array(
		'id'		=>	'enable_tabs',
		'title'		=>	__('Tabs', WPPTD),
		'desc'		=>	__('Uncheck to disable tabs.', WPPTD),
		'section'	=>	'general',
		'type'		=>	'checkbox'				
	),
	'accordMain'	=>	array(
		'id'		=>	'enable_accordion',
		'title'		=>	__('Accordions', WPPTD),
		'desc'		=>	__('Uncheck to disable accordion.', WPPTD),
		'section'	=>	'general',
		'type'		=>	'checkbox'				
	),
	'enableColl'	=>	array(
		'id'		=>	'enable_spoilers',
		'title'		=>	__('Enable Collapsibles (Sliders)', WPPTD),
		'desc'		=>	__('Uncheck this option to disable Collapsible panels/sliders.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'general',
	),
	'enabledialog'	=>	array(
		'id'		=>	'enable_dialogs',
		'title'		=>	__('Enable Dialogs', WPPTD),
		'desc'		=>	__('Uncheck to disable dialog support.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'general',
	),
	'enableQTB'	=>	array(
		'id'		=>	'enable_quicktags_buttons',
		'title'		=>	__('Enable Quicktags(HTML editor) buttons', WPPTD),
		'desc'		=>	__('When enabled, HTML aspect of Wordpress post editor shows buttons for inserting tab shortcodes.', WPPTD),
		'section'	=>	'general',
		'type'		=>	'checkbox'	
	),
	'top_navigation'	=>	array(
		'id'		=>	'topnav',
		'title'		=>	__('Display <i>Top</i> next/previous links?', WPPTD),
		'desc'		=>	__('Check to display the Next/previous tab navigation at top of the panel.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'general',
	),
	'bottom_navigation'	=>	array(
		'id'		=>	'bottomnav',
		'title'		=>	__('Display <i>Bottom</i> next/previous links?', WPPTD),
		'desc'		=>	__('Check to display the Next/previous tab navigation at bottom of the panel.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'general',
	),
	'enableTMCE'	=>	array(
		'id'		=>	'enable_tinymce_menu',
		'title'		=>	__('TinyMCE menu', WPPTD),
		'desc'		=>	__('Uncheck to disable TinyMCE menu.', WPPTD),
		'section'	=>	'general',
		'type'		=>	'checkbox'	
	),	
	
	'tabstyle'=>	array(
		'id'		=>	'tab_scheme',
		'title'		=>	__('Default style<br /><small>All widgets</small>', WPPTD),
		'desc'		=>	__('Select a <u>default</u> style. Use the shortcode attributes to override.<br /> ex. <code>[wptabs style="chosenstyle"]</code>', WPPTD),
		'type'		=>	'select',
		'section'	=>	'style',
		'choices'	=>	$wpui_skins_list_pre,
		'extras'	=>	'&nbsp; Preview <a id="wpui_styles_preview" href="" class="button-secondary">WP UI CSS3 Styles</a>  <a id="jqui_styles_preview" href="#" class="button-secondary">jQuery UI themes</a>'
	),	
	
	'jqui_custom'	=>	array(
		'id'		=>	'jqui_custom_themes',
		'title'		=>	__('jQuery UI custom themes<br /><small>Manage Custom themes. Not sure? <a target="_blank" href="http://kav.in/wp-ui-using-jquery-ui-custom-themes/">follow this guide</a>.</small>'),
		'desc'		=>	__('') . '<div id="jqui_theme_list" ></div><a href="#" class="button-secondary" title="This will scan the directory wp-ui under uploads for themes." id="jqui_scan_uploads">Scan Uploads</a>&nbsp;<a href="#" class="button-secondary" id="jqui_add_theme">Add theme</a>',
		'type'		=>	'textarea',
		'section'	=> 'style',
		'textarea_size'	=>	array(
			'cols'	=>	'60',
			'rows'	=>	'5',
			'autocomplete'	=>	'off'
		)
	),
	'dialog_wid'	=>	array(
		"id"		=>	'dialog_width',
		'title'		=>	__('Dialog Width', WPPTD),
		'desc'		=>	__('Default width of dialogs (without suffixing units)', WPPTD),
		'type'		=>	'text',
		'section'	=>	'style'
	),
	
	
	// 'iegrads'		=>	array(
	// 	'id'		=>	'enable_ie_grad',
	// 	'title'		=>	__('Enable gradients for IE?', WPPTD),
	// 	'desc'		=>	__('Check this box to enable gradients for IE ( using <code>IE filter:</code> ).', WPPTD),
	// 	'type'		=>	'checkbox',
	// 	'section'	=>	'style'
	// ),
	
	
	// =====================
	// = Effects and other =
	// =====================
	
	'tabsfx'		=>	array(
		'id'		=>	'tabsfx',
		'title'		=>	__('Tabs effects', WPPTD),
		'desc'		=>	__('Select the desired effects for the tabs/accordion.', WPPTD),
		'type'		=>	'select',
		'section'	=>	'effects',
		'choices'	=>	array(
			'none'		=>	'None',
			'slideDown'	=> 'Slide down',
			'fadeIn'	=>	'Fade In',
		)
		
	),
	'fxSpeed'	=>	array(
		'id'		=>	'fx_speed',
		'title'		=>	__('Effect speed', WPPTD),
		'desc'		=>	__("Enter the speed, number of microseconds the animation should run. Possible valid example values are 200, 600, 900, 'fast', 'slow'.", WPPTD),
		'type'		=>	'text',
		'section'	=>	'effects'
	),

	'tabsrotate'	=>	array(
		'id'	=>	'tabs_rotate',
		'title'	=>	__('Tabs rotation', WPPTD),
		'desc'	=>	__('choose the options on Tabs auto rotation. Tabs can rotated by passing a shortcode attribute "rotate". Example: <code>[wptabs rotate="6000"]</code> or <code>[wptabs rotate="6s"]</code>, where <code>6000/6s</code> is the example speed( 6 seconds ). And above option should have any other than "None" selected.', WPPTD),
		'type'	=>	'select',
		'section'	=>	'effects',
		'choices'	=>	array(
			'always'		=>	__( 'Always Rotate', WPPTD ),			
			'stop'	=>	__( 'Stop on Click', WPPTD ),
			'disable'	=>	__( 'None', WPPTD ),

		)
	),
	

	'tabz_event'	=>	array(
		'id'	=>	'tabs_event',
		'title'	=>	__('Tabs trigger event', WPPTD),
		'desc'	=>	__('Open Tabs on click or mouseover.', WPPTD),
		'type'	=>	'select',
		'section'	=>	'effects',
		'choices'	=>	array(
			'click'		=>	__( 'Click', WPPTD ),			
			'mouseover'	=>	__( 'Mouseover', WPPTD ),
		)
	),	
	
	
	
	// Accordion

	'accord_event'	=>	array(
		'id'	=>	'accord_event',
		'title'	=>	__('Accordion trigger event', WPPTD),
		'desc'	=>	__('Open accordion on click or mouseover.', WPPTD),
		'type'	=>	'select',
		'section'	=>	'effects',
		'choices'	=>	array(
			'click'		=>	__( 'Click', WPPTD ),			
			'mouseover'	=>	__( 'Mouseover', WPPTD ),
		)
	),	
	
	'accordion_autoheight'	=>	array(
		'id'		=>	'accord_autoheight',
		'title'		=>	__('Accordion auto height', WPPTD),
		'desc'		=>	__('Use height of the highest content panel for all the panels.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'effects'
	),
	'collapsible_accordions' => array(
		'id'		=>	'accord_collapsible',
		'title'		=>	__('Collapsible Accordions', WPPTD),
		'desc'		=>	__('Enable all sections of accordion to be closed, and at load.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'effects'
	),
	'accord_Easing'	=>	array(
		'id'		=>	'accord_easing',
		'title'		=>	__('Easing for the Accordion', WPPTD),
		'desc'		=>	__('Choose the favorite easing animation. Choose <code>Disable</code> to disable. Easing effects can be demoed at <a href="http://jqueryui.com/demos/effect/easing.html" target="_blank" rel="nofollow">this link</a>. ', WPPTD),
		'section'	=>	'effects',
		'type'		=>	'select',
		'choices'	=>	array(
			"false"       	   =>	"disable",
			"linear"           =>	"linear",
			"swing"            =>	"swing",
			"easeInQuad"       =>	"easeInQuad",
			"easeOutQuad"      =>	"easeOutQuad",
			"easeInOutQuad"    =>	"easeInOutQuad",
			"easeInCubic"      =>	"easeInCubic",
			"easeOutCubic"     =>	"easeOutCubic",
			"easeInOutCubic"   =>	"easeInOutCubic",
			"easeInQuart"      =>	"easeInQuart",
			"easeOutQuart"     =>	"easeOutQuart",
			"easeInOutQuart"   =>	"easeInOutQuart",
			"easeInQuint"      =>	"easeInQuint",
			"easeOutQuint"     =>	"easeOutQuint",
			"easeInOutQuint"   =>	"easeInOutQuint",
			"easeInSine"       =>	"easeInSine",
			"easeOutSine"      =>	"easeOutSine",
			"easeInOutSine"    =>	"easeInOutSine",
			"easeInExpo"       =>	"easeInExpo",
			"easeOutExpo"      =>	"easeOutExpo",
			"easeInOutExpo"    =>	"easeInOutExpo",
			"easeInCirc"       =>	"easeInCirc",
			"easeOutCirc"      =>	"easeOutCirc",
			"easeInOutCirc"    =>	"easeInOutCirc",
			"easeInElastic"    =>	"easeInElastic",
			"easeOutElastic"   =>	"easeOutElastic",
			"easeInOutElastic" =>	"easeInOutElastic",
			"easeInBack"       =>	"easeInBack",
			"easeOutBack"      =>	"easeOutBack",
			"easeInOutBack"    =>	"easeInOutBack",
			"easeInBounce"     =>	"easeInBounce",
			"easeOutBounce"    =>	"easeOutBounce",
			"easeInOutBounce"  =>	"easeInOutBounce"

		)
	),
	'mousewheel_tabs'	=>	array(
		'id'		=>	'mouse_wheel_tabs',
		'title'		=>	__('Tabs mousewheel navigation', WPPTD),
		'desc'		=>	__('Scroll to switch between tabs.', WPPTD),
		'section'	=>	'effects',
		'type'		=>	'select',
		'choices'	=>	array(
			"false"		=>	"disable",
			"list"      =>	"On List",
			"panels"    =>	"On Panels"
		)
	),
	
	
	// ================
	// = Text options =
	// ================
	'tab_nav_prev'	=>	array(
		'id'		=>	'tab_nav_prev_text',
		'title'		=>	__('Previous tab - button text<br /><small>Tabs Navigation</small>', WPPTD),
		'desc'		=>	__('Enter the alternate text for the Tab navigation\'s (Switch to) Previous tab button. Default is <code> Previous </code>.', WPPTD),
		'section'	=>	'text',
		'type'		=>	'text'
	),
		
	'tab_nav_next'	=>	array(
		'id'		=>	'tab_nav_next_text',
		'title'		=>	__('Next tab - button text<br /><small>Tabs Navigation</small>', WPPTD),
		'desc'		=>	__('Enter the alternate text for the Tab navigation\'s (Move to) Next tab button. Default is <code> Next </code>.', WPPTD),
		'section'	=>	'text',
		'type'		=>	'text'
	),
	
	'showtext'		=>	array(
		'id'		=>	'spoiler_show_text',
		'title'		=>	__('Text for show hidden content <br /><small>wp-spoiler <i>aka</i> collapsible panels </small>', WPPTD),
		'desc'		=>	__( 'Displayed on the header above collapsed, hidden content. Changes to text in the next option when clicked. Dont want one? leave blank!', WPPTD),
		'section'	=>	'text',
		'type'		=>	'textarea',
		'textarea_size'	=>	array(
			'cols'	=>	'60',
			'rows'	=>	'2'
		)
	),
	
	'hidetext'		=>	array(
		'id'		=>	'spoiler_hide_text',
		'title'		=>	__('Text for Hide shown content <br /><small>wp-spoiler <i>aka</i> collapsible panels </small>', WPPTD),
		'desc'		=>	__( 'Displayed on open, shown collapsible content. Changes to text in previous option when clicked. Dont want one? leave blank!', WPPTD),
		'section'	=>	'text',
		'type'		=>	'textarea',
		'textarea_size'	=>	array(
			'cols'	=>	'60',
			'rows'	=>	'2'
		)
	),
	
	
	
	
	/**
	 * Advanced options
	 */
	'custom_styles'		=>	array(
			'id'		=>	'custom_css',
			'title'		=>	__('Custom CSS', WPPTD),
			'desc'		=>	__('Enter additional css rules here. Make sure of the right syntax.', WPPTD),
			'type'		=>	'textarea',
			'section'	=>	'advanced',
			'textarea_size'	=>	array(
				'cols'	=>	'60',
				'rows'	=>	'10'
			)
	),
	'alternative_codes'	=>	array(
		'id'		=>	'alt_sc',
		'title'		=>	__( 'Alternative shortcodes, Shorter.' ),
		'desc'		=>	__( 'Use shorter codes. For ex.<br /><ul><li>[<strong>tabs</strong>] instead of [wptabs]</li><li>[<strong>tabname</strong>] instead of [wptabtitle]</li><li>[<strong>tabcont</strong>] instead of [wptabcontent]</li><li>[<strong>spoiler</strong>] instead of [wpspoiler]</li><li>[<strong>dialog</strong>] instead of [wpdialog]</li></ul>Please make sure that no other plugins that you use have the same short codes defined.' ),
		'type'		=>	'checkbox',
		'section'	=>	'advanced'
	),
	'jquery_include'	=>	array(
		'id'		=>	'jquery_disabled',
		'title'		=>	__('Donot load the jQuery copy', WPPTD),
		'desc'		=>	__('Check this box to prevent loading jQuery & UI libs from Google CDN. <br /> <br /><span style="color: maroon">Please note: Recent versions of jQuery and jQuery UI javascript libraries are required for the functionality of WP UI. This Plugin\'s components might <b>not</b> work as expected with the older versions of jQuery and UI. </span>', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'advanced'
	),
	"cookies"		=>	array(
		'id'		=>	'use_cookies',
		'title'		=>	__(	'Use cookies for tabs', WPPTD ),
		'desc'		=>	__( 'WP UI makes use of cookies to remember the state of the selected tabs. Click here to disable the behavior. This uses jQuery cookie plugin by Klaus Hartl.'),
		'type'		=>	'checkbox',
		'section'	=>	'advanced'
	),
	
	"link_hist"		=>	array(
		'id'		=>	'linking_history',
		'title'		=>	__(	'Linking and History', WPPTD ),
		'desc'		=>	__( 'Uncheck here to disable history and linking. This uses jQuery hashchange plugin by Ben Alman.'),
		'type'		=>	'checkbox',
		'section'	=>	'advanced'
	),


	'post_template_one'	=>	array(
		'id'		=>	'post_template_1',
		'title'		=>	__('Template for posts in tabs and accordion', WPPTD),
		'desc'		=> __( 'Modify the template structure here. Use the variables within curled brackets.'),
		'type'		=>	'textarea',
		'section'	=>	'posts',
	'textarea_size'	=>	array(
		'cols'	=>	'60',
		'rows'	=>	'10',
		'autocomplete'	=>	'off'
	)
	),

	'post_template_two'	=>	array(
		'id'		=>	'post_template_2',
		'title'		=>	__('Template for posts in Dialogs and sliders', WPPTD),
		'desc'		=> __( 'Modify the template structure here. Use the variables within curled brackets.'),
		'type'		=>	'textarea',
		'section'	=>	'posts',
	'textarea_size'	=>	array(
		'cols'	=>	'60',
		'rows'	=>	'10',
		'autocomplete'	=>	'off'
	)
	),
	'relative_timez'	=>	array(
		'id'		=>	'relative_times',
		'title'		=>	__( 'Relative time', WPPTD ),
		'desc'		=>	__( 'Display relative time on posts retrieved by WP UI. <code>Example : 9 days ago.</code>'),
		'type'		=>	'checkbox',
		'section'	=>	'posts'
	),
	'excerpt_length'	=>	array(
		'id'		=>	'excerpt_length',
		'title'		=>	__( 'Default excerpt length', WPPTD ),
		'desc'		=>	__( 'Maximum limit for the excerpts. Default is upto the  <code>&lt;!--more--&gt;</code> tag. '),
		'type'		=>	'text',
		'section'	=>	'posts'
	),
	

);

$option_page->set_fields( $options_list );

add_action('wp_ajax_WPUIstyles', 'choose_wpui_style');

function choose_wpui_style() {
	echo file_get_contents( plugins_url('/wp-ui/js/wpui-choosestyles.php'));
	die();
}


add_action('wp_ajax_JQUIstyles', 'choose_jqui_style');

function choose_jqui_style() {
	echo file_get_contents( plugins_url('/wp-ui/js/wpui-choose-jquistyles.php'));
	die();
}





add_action('wp_ajax_editorButtonsHelp', 'editor_buttons_help');

function editor_buttons_help() {
	echo file_get_contents( plugins_url('/wp-ui/admin/doc/wpui-buttons.php'));
	die();	
}



add_action('wp_ajax_jqui_css', 'wpui_search_for_stylesheets');
/**
 *	Documentation
 */
function wpui_search_for_stylesheets() 
{
	$upload_dir = wp_upload_dir();
	$udir = preg_replace( '/(\d){4}\/(\d){2}/i' , '' , $upload_dir['path'] ) . 'wp-ui/';
	$upnonce = $_POST['upNonce'];

	if ( ! wp_verify_nonce( $upnonce, 'wpui-jqui-custom-themes' ) )
		return false;

	$results = wpui_jqui_dirs( $udir );

	if ( is_array( $results ) ) {
		echo json_encode( $results );
	} else {
		echo $results;
	}
	
	die();
} // END wpui_search_for_stylesheets




/**
 * Get the theme options.
 */
function get_wpui_option( $value ) {
	$options = get_option( 'wpUI_options' );
	
	if ( isset( $options[$value] ) )
		return $options[$value];
	else 
		return false;	
} // END FUNCTION get_wpui_option.



// Insert content into the options page.
add_action( 'wpUI_above_options_page', 'wpui_plugin_info_above' );
add_action( 'wpUI_below_options_page', 'wpui_plugin_info_below' );


function wpui_plugin_info_above() {
	?>
	<div class="click-for-help"></div>
	<div class="info-above">
	<noscript>
		<p style="background: pink; border:1px solid darkred; padding: 10px; color: #600">Please enable the javascript in your browser.</p>
	</noscript>
	
	<div id="wpui-cap">
	<div class="cap-icon">
		<img width="80px" src="<?php echo plugins_url( '/wp-ui/images/cap-icon.png' ) ?>" />
	</div><!-- end div.cap-icon -->
	
	<div class="wpui-desc">

			<p> Support this plugin : <a href="http://www.facebook.com/pages/Capability/136970409692187" title="Motivate and see us performing better!" target="_blank">Like us on Facebook</a> | <a title="Motivate and see us performing better!" href="http://twitter.com/cpblty" target="_blank">Follow us on Twitter</a>. 
		</p>
		<p>
			Help - <a class="wpui_options_help" href="#">Options Help</a> | <a target="_blank" href="http://kav.in/projects/blog/tag/wp-ui/">Plugin documentation, demo @ projects</a>.
		</p>
		
		<p>
			Help improve this plugin : <a target="_blank" href="http://kav.in/discuss" title="Improve the plugin by sharing your thoughts">Suggestions? Ideas?</a> | Report - <a target="_blank" title="Report the issues you find, so it gets just better and better!" href="http://kav.in/discuss">Bugs / Issues / conflicts</a> on Support forums</p>
	</div><!-- end div.wpui-desc -->	
	
	</div>
	
	
	
</div><!-- end div.info-above -->
	
	<?php
}	


function wpui_plugin_info_below() {
	?>

	<div class="info-below">

	<div id="wpui-cap-below">


	<div class="support-plugin cols">
		<h4><span></span>Like this plugin?</h4>
		<ul>
		<li>
			<a target="_blank" href="http://wordpress.org/extend/plugins/wp-ui/">Give it a nice rating at Wordpress.org</a>
		</li>
		<li>
			<a target="_blank" href="http://wordpress.org/extend/plugins/wp-ui/" title="Login and choose It 'works' at wordpress.org">Tell others that it works!</a>
		</li>
		
		<li>
			<a target="_blank" href="http://kav.in/wp-ui-for-wordpress">Link to or recommend the plugin!</a>
		</li>		
		<li class="last-li">
			<a target="_blank" href="http://www.facebook.com/#!/pages/Capability/136970409692187" title="So we can make more awesome plugins like this!">Like us on facebook!</a>				
			</li>
		</ul>
	</div>
		
	<div class="help cols col-1">
		<h4><span></span>Get Help/Support!</h4>
		<ul>
		<li>
			<a target="_blank" href="http://kav.in/projects/blog/tag/wp-ui/">Documentation</a>
		</li>
		<li>
			<a target="_blank" href="http://kav.in/discuss/viewforum.php?f=4">Help, Bugs and Issues</a>
		</li>
		<li>
			<a target="_blank" href="http://kav.in/discuss/viewforum.php?f=5">Suggestions / Ideas</a>
		</li>
		<li class="last-li">
			<a href="http://twitter.com/cpblty">Capability on Twitter</a>
		</li>		
		</ul>

	</div>

	<div class="developer cols col-2" style="line-height: 1.6 !important">
		<h4>Note from the developer</h4>
		<p>Hello there!</p><p>  I am <b>kavin</b>, developer &amp; designer of this plugin. First of all, thank you all for your solid support. Your feedback has been highly encouraging and i hope it continues that way as i will strive to make this plugin even better.</p>
		<p>Please visit the <a href="http://kav.in/forum" target="_blank">forums</a> if you have any suggestions/ideas or criticism. You can contact me <a href="http://kav.in/contact/">here</a>, or at my <a target="_blank" href="http://www.facebook.com/pixelcreator">Facebook</a> and <a target="_blank" href="http://twitter.com/cpblty">twitter</a> account.</p>
		<p>Thank you for using this plugin.</p>
	</div>
	
	<!-- <div class="developer cols col-2">
		<h4>Plugin developer</h4>
		<p>WP UI for wordpress is being developed and maintained by <a href="http://kav.in">Kavin</a>.
		You can visit the <a target="_blank" href="http://kav.in">his blog</a> for information on his current/upcoming works. </p> 
	<p>Or maybe you could follow/hear/discuss what he has to say on <a target="_blank" href="http://twitter.com/cpblty">Twitter</a> and <a target="_blank" href="http://www.facebook.com/pixelcreator">Facebook</a>, if you like!</a></p>
	</div> -->

	<!-- <div class="wpui-new cols col-2">
		<h4>Fresh!</h4>
		<p>WP UI for wordpress is quite new! So please let me know what you think about this plugin.</p>
			
		<p>	This plugin is 100% free and open source. This is licensed under <a target="_blank" href="http://www.gnu.org/licenses/gpl2.html">GNU Public License v2</a>, so please feel free to distribute and recommend!</p>

	</div> --><!-- end div.wpui-new -->
	

	
	
	</div><!-- end #wpui-cap-below -->
</div><!-- end div.info-below -->
<div class="wpui-credits">
	<h4>Credits</h4>
		<p>Thanks to the WordPress team and jQuery (&amp;) UI team. Also thanks to the all people out there, who spend their invaluable time for the spirit of The Open Source - Sharing and helping everyone. Icons on this page - <a target="_blank" rel="nofollow" href="http://www.woothemes.com/2010/08/woocons1/">GPL licensed Woocons</a>.
		
		</p>	

</div>
	<?php
}


/**
 * Get the list of jQuery UI themes.
 */
function wpui_get_jqui_themes_list()
{
	$theme_list = array(
		'ui-lightness', 'ui-darkness', 'smoothness', 'start', 'redmond',	
		'sunny', 'overcast', 'le-frog',	'flick', 'pepper-grinder', 'eggplant',
		'dark-hive', 'cupertino', 'south-street', 'blitzer', 'humanity',
		'hot-sneaks', 'excite-bike', 'vader', 'dot-luv', 'mint-choc',
		'black-tie', 'trontastic', 'swanky-purse', 'base'		
	);	
	return $theme_list;	
} // END function wpui_get_jqui_themes_list
	
/**
 * Get the list of CSS3 styles.
 */
function wpui_get_css3_styles_list()
{
	$theme_list = array( 
			'wpui-light', 'wpui-blue', 'wpui-red', 'wpui-green', 'wpui-dark',
			'wpui-quark', 'wpui-cyaat9', 'wpui-android', 'wpui-safle', 'wpui-alma',
			'wpui-macish', 'wpui-achu', 'wpui-redmond', 'wpui-sevin'
	);
	return $theme_list;
} // END function wpui_get_css3_styles_list


/**
 * Default options and like.
 */

$wpui_default_post_template_1 = '<h2 class="wpui-post-title">{$title}</h2>
<div class="wpui-post-meta">{$date} |  {$author}</div>
<div class="wpui-post-thumbnail">{$thumbnail}</div>
<div class="wpui-post-content">{$excerpt}</div>
<p><a class="ui-button ui-widget ui-corner-all" href="{$url}" title="Read more of {$title}">Read More...</a></p>';

$wpui_default_post_template_2 = '<div class="wpui-post-meta">{$date}</div>
<div class="wpui-post-thumbnail">{$thumbnail}</div>
<div class="wpui-post-content">{$excerpt}</div>
<p><a href="{$url}" title="Read more of {$title}">Read More...</a></p>';


function get_wpui_default_options( ) {
	$defaults = array(
	    "enable_tabs" 				=>	"on",
	    "enable_accordion"			=>	"on",
	    "enable_tinymce_menu"		=>	"on",
	    "enable_quicktags_buttons"	=>	"on",
		"topnav"					=>	"",
	    "bottomnav"					=>	"on",
		"enable_spoilers"			=>	"on",
		"enable_dialogs"			=>	"on",
		"load_all_styles"			=>	"on",
		"enable_ie_grad"			=>	"on",
		"dialog_width"				=>	"300",
	    "tab_scheme" 				=>	"wpui-light",
		"jqui_custom_themes"		=>	"{}",
	    "tabsfx"					=>	"slide",
		"fx_speed"					=>	"400",
		"tabs_rotate"				=>	"stop",
		"tabs_event"				=>	"click",
		"accord_event"				=>	"click",
		"accord_autoheight"			=>	"on",
		"accord_collapsible"		=>	"off",
		"accord_easing"				=>	'false',
		"mouse_wheel_tabs"			=>	'list',
		"tab_nav_prev_text"			=>	'Prev',
		"tab_nav_next_text"			=>	"Next",
		"spoiler_show_text"			=>	"Click to show",
		"spoiler_hide_text"			=>	"Click to hide",
		"relative_times"			=>	"off",
		"custom_css"				=>	"",
		"use_cookies"				=>	"on",
		"linking_history"			=>	"on",
		'post_template_1'			=>	'<h2 class="wpui-post-title">{$title}</h2>
		<div class="wpui-post-meta">{$date} |  {$author}</div>
		<div class="wpui-post-thumbnail">{$thumbnail}</div>
		<div class="wpui-post-content">{$excerpt}</div>
		<p class="wpui-readmore"><a class="ui-button ui-widget ui-corner-all" href="{$url}" title="Read more from {$title}">Read More...</a></p>',
		'post_template_2'			=>	'<div class="wpui-post-meta">{$date}</div>
		<div class="wpui-post-thumbnail">{$thumbnail}</div>
		<div class="wpui-post-content">{$excerpt}</div>
		<p class="wpui-readmore"><a href="{$url}" title="Read more from {$title}">Read More...</a></p>',
		'excerpt_length'			=>	'more'
	);
	return $defaults;
}


?>