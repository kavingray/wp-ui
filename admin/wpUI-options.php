<?php
require_once( 'admin-options.php' );


/**
* Wp Present options
*/
class wpUI_options extends plugin_options
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

$this->plugin_details = array(
	'name'			=>	'WP UI',
	'db_prefix'		=>	'wpUI',
	'page_prefix'	=>	'wpUI'
);

$option_page = new wpUI_options($this->plugin_details);


$sects = array(
	'general'	=>	__('General', WPPTD),
	'style'		=>	__('Style', WPPTD),
	'effects'	=>	__('Effects', WPPTD),
	'text'		=>	__('Text', WPPTD),
	'advanced'	=>	__('Advanced', WPPTD)
	// 'popup'		=>	'PopUp'
);

$option_page->set_sections($sects);
$options_list = array(
	'tabMain'	=>	array(
		'id'		=>	'enable_tabs',
		'title'		=>	__('Enable Tabs', WPPTD),
		'desc'		=>	__('Uncheck this, <u>only</u> if you want to disable Tabs.', WPPTD),
		'section'	=>	'general',
		'type'		=>	'checkbox'				
	),
	'accordMain'	=>	array(
		'id'		=>	'enable_accordion',
		'title'		=>	__('Enable Accordion', WPPTD),
		'desc'		=>	__('Uncheck this, <u>only</u> if you want to disable Accordions.', WPPTD),
		'section'	=>	'general',
		'type'		=>	'checkbox'				
	),
	'enableTMCE'	=>	array(
		'id'		=>	'enable_tinymce_menu',
		'title'		=>	__('Enable TinyMCE menu/button', WPPTD),
		'desc'		=>	__('When enabled, Tabs can be easily configured from Wordpress post editor(TinyMCE) menu.', WPPTD),
		'section'	=>	'general',
		'type'		=>	'checkbox'	
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
		'desc'		=>	__('Check the box to display the Next/previous tab navigation links at top of the panel.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'general',
	),
	'bottom_navigation'	=>	array(
		'id'		=>	'bottomnav',
		'title'		=>	__('Display <i>Bottom</i> next/previous links?', WPPTD),
		'desc'		=>	__('Check the box to display the Next/previous tab navigation links at bottom of the panel.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'general',
	),
	'enableColl'	=>	array(
		'id'		=>	'enable_spoilers',
		'title'		=>	__('Enable Collapsibles (Sliders)', WPPTD),
		'desc'		=>	__('Uncheck this option, if you want to disable Collapsible panels/sliders <i>aka</i> wp-spoiler.', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'general',
	),
	
	

	'load_all_styles'	=>	array(
		'id'	=>	'load_all_styles',
		'title'		=>	__('Load all styles', WPPTD),
		'desc'		=>	__('If checked, <i>Multiple styles</i> can be used on the same page.', WPPTD),
		'type'	=>	'checkbox',
		'section'	=>	'style'
	),
	
	'tabstyle'=>	array(
		'id'		=>	'tab_scheme',
		'title'		=>	__('Tabs styles', WPPTD),
		'desc'		=>	__('Select a <u>default</u> style. With the previous option is enabled, use the shortcode attributes, ex. <code>[wptabs style="chosenstyle"]</code> to override.', WPPTD),
		'type'		=>	'select',
		'section'	=>	'style',
		'choices'	=>	array(
	
			// __('Bundled - Quark', WPPTD),
			'startoptgroup1'=>	__('WP UI CSS3 Themes', WPPTD),
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
			
			'startoptgroup2'=>	__('jQuery UI Themes', WPPTD),
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
				'blitzer'		 => __('Blitzer Blitzer', WPPTD),
				'humanity'		 => __('Humanity Humanity', WPPTD),
				'hot-sneaks'	 => __('Hot Sneaks', WPPTD),
				'excite-bike'	 => __('Excite Bike', WPPTD),
				'vader'			 => __('Vader', WPPTD),
				'dot-luv'		 => __('Dot Luv', WPPTD),
				'mint-choc'		 => __('Mint Choc', WPPTD),
				'black-tie'		 => __('Black Tie', WPPTD),
				'trontastic'	 => __('Trontastic', WPPTD),
				'swanky-purse'	 => __('Swanky Purse', WPPTD),
			'endoptgroup2'	=>	''

		),
		'extras'	=>	'&nbsp; <input id="tab_scheme_trigger" type="button" class="button-secondary" value="Visualize and Select!" />'
	),	
	
	'iegrads'		=>	array(
		'id'		=>	'enable_ie_grad',
		'title'		=>	__('Enable gradients for IE?', WPPTD),
		'desc'		=>	__('Check this box to enable gradients for IE ( using <code>IE filter:</code> ).', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'style'
	),
	
	
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
	
	
	// Accordion
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

	
	
	// ================
	// = Text options =
	// ================
	'tab_nav_prev'	=>	array(
		'id'		=>	'tab_nav_prev_text',
		'title'		=>	__('Previous tab - button text<br /><small>Tabs Navigation</small>', WPPTD),
		'desc'		=>	__('Enter the alternate text for the Tab navigation\'s (Switch to) Previous tab button. Default is <code> &laquo; Previous </code>.', WPPTD),
		'section'	=>	'text',
		'type'		=>	'text'
	),
		
	'tab_nav_next'	=>	array(
		'id'		=>	'tab_nav_next_text',
		'title'		=>	__('Next tab - button text<br /><small>Tabs Navigation</small>', WPPTD),
		'desc'		=>	__('Enter the alternate text for the Tab navigation\'s (Move to) Next tab button. Default is <code> Next &raquo; </code>.', WPPTD),
		'section'	=>	'text',
		'type'		=>	'text'
	),
	
	'showtext'		=>	array(
		'id'		=>	'spoiler_show_text',
		'title'		=>	__('Text for show hidden content <br /><small>wp-spoiler <i>aka</i> collapsible panels </small>', WPPTD),
		'desc'		=>	__( 'Displayed on the header above collapsed, hidden content. Changes to text in the next option when clicked. Dont want one? leave blank!', WPPTD),
		'section'	=>	'text',
		'type'		=>	'text'
	),
	
	'hidetext'		=>	array(
		'id'		=>	'spoiler_hide_text',
		'title'		=>	__('Text for Hide shown content <br /><small>wp-spoiler <i>aka</i> collapsible panels </small>', WPPTD),
		'desc'		=>	__( 'Displayed on open, shown collapsible content. Changes to text in previous option when clicked. Dont want one? leave blank!', WPPTD),
		'section'	=>	'text',
		'type'		=>	'text'
	),
	
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
		'desc'		=>	__( 'Use shorter codes. For ex.<br /><ul><li>[<strong>tabs</strong>] instead of [wptabs]</li><li>[<strong>tabname</strong>] instead of [wptabtitle]</li><li>[<strong>tabcont</strong>] instead of [wptabcontent]</li><li>[<strong>wslider</strong>] instead of [wpspoiler]</li></ul>Please make sure that no other plugins that you use have the same short codes defined.' ),
		'type'		=>	'checkbox',
		'section'	=>	'advanced'
	),
	'jquery_include'	=>	array(
		'id'		=>	'jquery_disabled',
		'title'		=>	__('Donot load the jQuery copy', WPPTD),
		'desc'		=>	__('Check this box to prevent loading jQuery & UI libs from Google CDN. <br /> <br /><span style="color: maroon">Please note: Recent versions of jQuery and jQuery UI javascript libraries are required for the functionality of WP UI. This Plugin\'s components might work as expected with the older versions of jQuery and UI. </span>', WPPTD),
		'type'		=>	'checkbox',
		'section'	=>	'advanced'
	),
	"cookies"		=>	array(
		'id'		=>	'use_cookies',
		'title'		=>	__(	'Use cookies for tabs', WPPTD ),
		'desc'		=>	__( 'WP UI makes use of cookies to remember the state of the selected tabs. Click here to disable the behavior.'),
		'type'		=>	'checkbox',
		'section'	=>	'advanced'
	),

);

$option_page->set_fields( $options_list );

add_action('wp_ajax_WPUIstyles', 'choose_tab_style');

function choose_tab_style() {
	echo file_get_contents( plugins_url('/wp-ui/js/wpui-choosestyles.php'));
}


add_action('wp_ajax_editorButtonsHelp', 'editor_buttons_help');

function editor_buttons_help() {
	echo file_get_contents( plugins_url('/wp-ui/admin/doc/wpui-buttons.php'));
}


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
add_action( 'plugin_info_above_options_page', 'plugin_info_above' );
add_action( 'plugin_info_below_options_page', 'plugin_info_below' );


function plugin_info_above() {
	?>
	<div class="click-for-help"></div>
	<div class="info-above">
	<noscript>
		<p style="background: pink; border:1px solid darkred; padding: 10px; color: #600">Please enable the javascript in your browser. This is needed for the contextual help and the demo.</p>
	</noscript>
	
	<div id="wpui-cap">
	<div class="cap-icon">
		<img src="<?php echo plugins_url( '/wp-ui/images/cap-icon.png' ) ?>" />
	</div><!-- end div.cap-icon -->
	
	<div class="wpui-desc">
		<p>
			WP UI for WordPress is a plugin that lets you add smart, beautiful responsive User interface widgets, such as tabs, Accordions, Collapsibles, Sliders to spice up your blog posts.  This plugin is built on top of the jQuery UI and bundled with rich documentation and extended browser support.
		</p>	
		<p>
			Not sure of something? Refer the contextual help with the "Help" button on the top right corner of this page. Plugin documentation can be accessed at the <a href="http://kav.in/projects/blog/tag/wp-ui/">projects site</a>.
		</p>
		<p>
			Bugs? Suggestions? Ideas? <a href="http://kav.in/wp-ui-for-wordpress">Let me know!</a>  Want to support this plugin? Thanks! You can do so with <a href="http://www.facebook.com/pages/Capability/136970409692187" target="_blank">likes on Facebook</a> or <a href="http://twitter.com/cpblty" target="_blank">follows on Twitter</a>. 
		</p>
	</div><!-- end div.wpui-desc -->	
</div><!-- end div.info-above -->
	
	<?php
}	


function plugin_info_below() {
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

	<div class="developer cols col-2">
		<h4>Plugin developer</h4>
		<p>WP UI for wordpress is being developed and maintained by <a href="http://kav.in">Kavin</a>.
		You can visit the <a target="_blank" href="http://kav.in">his blog</a> for information on his current/upcoming works. </p> 
	<p>Or maybe you could follow/hear/discuss what he has to say on <a target="_blank" href="http://twitter.com/cpblty">Twitter</a> and <a target="_blank" href="http://www.facebook.com/pixelcreator">Facebook</a>, if you like!</a></p>
	</div>

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


function get_wpui_default_options( ) {
	$defaults = array(
	    "enable_tabs" 				=>	"on",
	    "enable_accordion"			=>	"on",
	    "enable_tinymce_menu"		=>	"on",
	    "enable_quicktags_buttons"	=>	"on",
		"topnav"					=>	"",
	    "bottomnav"					=>	"on",
		"enable_spoilers"			=>	"on",
		"load_all_styles"			=>	"on",
		"enable_ie_grad"			=>	"on",
	    "tab_scheme" 				=>	"wpui-light",
	    "tabsfx"					=>	"slide",
		"fx_speed"					=>	"400",
		"tabs_rotate"				=>	"stop",
		"accord_autoheight"			=>	"on",
		"accord_collapsible"		=>	"off",
		"accord_easing"				=>	'false',
		"tab_nav_prev_text"			=>	'&laquo; Prev',
		"tab_nav_next_text"			=>	"Next &raquo;",
		"spoiler_show_text"			=>	"Click to show",
		"spoiler_hide_text"			=>	"Click to hide",
		"custom_css"				=>	"",
		"use_cookies"				=>	"on"
	);
	return $defaults;
}


?>