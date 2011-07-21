jQuery(document).ready(function() {
	jQuery( '#optionsform' ).wrap('<div class="tabwrap" />');

	$admin_tabs = jQuery('#optionsform #options-wrap').wptabs({
		 					h3Class: 'h3',
		 					effect: 'fade',
		 					topNav: false,
		 					botNav: true,
		 					cookie: false
		});



		jQuery('#tab_scheme_trigger').click(function() {
			chooseTabStyles = initOpts.wpUrl + '/wp-admin/admin-ajax.php?action=WPUIstyles&TB_iframe=true';
			tb_show('Choose a WP UI style!', chooseTabStyles);
			return false;
		});
		
		window.send_to_editor = function(skin_name) {
			jQuery('#tab_scheme option').each(function() {
				if ( jQuery(this).attr("value") == skin_name )
					jQuery(this).attr( 'selected', 'selected' );
			});
			tb_remove();
		}


		var context = new Array;

		context[0] = "<h3>WP UI - General options</h3><p>Enable/disable the plugin components.  This panel provides the following options.</p><h4><strong>Tabs</strong></h4><p>Uncheck the box to disable tabs. <em>Default is enabled</em>. Tabs are navigational widgets that are used to split context into alternative views. See the demo page for more information.</p><p><strong>Accordion</strong></p><p>Uncheck the box to disable accordions. <em>Default is enabled</em>. Accordions are vertically stacked list of items each of which can be clicked to expand the content associated with that item.</p><p><strong>Editor Buttons</strong></p><p>Wordpress post editor buttons makes it easy to insert the tabs into posts. Buttons are available for both Visual and HTML(recommended) mode editors.</p><p><strong>Navigation</strong></p>The tabs only navigation buttons, enables us to move through tabs sequentially without actually clicking one. Default : Bottom navigation buttons are enabled. </p><p><strong>Sliders</strong></p><p>Collapsibles/sliders/spoilers - you can call'em whatever you like! Content is hidden at load and is shown when user clicks the toggler. Use one , You've got a neat slider. Use multiple, you get smooth collapsible panels.</p>";
		context[1] = "<h3>WP UI - Style options</h3><h4>Load all styles.</h4><p>If enabled, all styles are loaded with the page and widgets with multiple styles can be shown at the same time.</p><p>Using the default style for the tabs/accordion. For e.g.</p><pre style='background:#FFF;  padding:4px; border-bottom: 1px dotted #AAA'>[wptabs] ..content.. [/wptabs]</pre><p>To use a different styled tabs on the same page, example:<pre style='background:#FFF; padding:4px; border-bottom: 1px dotted #AAA'>[wptabs style='wpui-dark'] ..Content..[/wptabs]</pre><h4>Tabs styles</h4><p>Choose the default styles for the tabs/accordion/sliders. Use the <code class='button-secondary'>visualize and select</code> button to interactively choose through a demo.</p> <blockquote><p><strong><em>Note: </em></strong>The visualize and select is only available for Bundled custom CSS3 styles. Check out the <a href=\"http://jqueryui.com/themeroller/#themeGallery\" title=\"jQuery UI themes\" target=\"_blank\">jQuery UI styles here</a>. </p> <p><em><strong>Note</strong> : As for this version, it is not recommended to use widgets with WP UI custom style and jQuery theme on the same page. jQuery UI themes may cause multiple style inconsistencies, like extra large font size, broken tab layouts. And moreover this varies with different wordpress themes.</em></p></blockquote> <h4>IE gradients</h4> <p>Choose whether to enable Internet Explorer gradients support, using microsoft<code> filter: </code>. A seperate stylesheet is additionally served for IE.</p>";
		context[2] = "<h3>WP UI - Effects options</h3><h4>Effects</h4><p>Two effects are available for now, slide and fade. Choose the default effect here.</p><p>Each tabset can have different tab effects, by defining through the shortcode. For e.g.</p><pre style='background:#FFF;  padding:4px; border-bottom: 1px dotted #AAA'>[wptabs effect='fade'] ..content.. [/wptabs]</pre><h4>Effects speed</h4><p>Effects speed is time, in which animating effect is run.  It can be a value in microseconds - 200, 600 or slow and fast. For a swift animation, limt the value within 1000ms. </p><h4>Tabs auto rotation</h4><p>Tabs can be set to  automatically rotate at specified intervals by passing the <code>rotate</code> attribute on the tabs wrapping shortcode. For eg.</p>	<pre style='background:#FFF;  padding:4px; border-bottom: 1px dotted #AAA'>[wptabs rotate=&quot;6000&quot;] ..content.. [/wptabs]<br />[wptabs rotate=&quot;10s&quot;] ..content.. [/wptabs]</pre><p>In the first example, tabs will be rotated i.e switched every 6 seconds ( 6000 is 6s in microseconds ). In the second example, rotate interval is 10s, so tab switch will occur every 10th second.</p>";
		context[3] = '<h3>WP UI - Text options</h3><h4>Text replacements for the WP UI interface</h4><p>Enter a different value to override the default text - <br /> For tabs</p><ol>  <li>Button for switching to Previous tab</li>  <li>Button for switching to Next tab</li></ol><p>and for WP-spoilers aka Collapsibles/sliders.</p><ol> <li>Collapsible/spoilers Show (hidden) content text.</li><li>Collapsible/spoilers Hide (shown) content text.</li></ol>';


		if ( /\?page=wpUI-options/gm.test(window.location.href)) {

		var cTab = $admin_tabs.children('.ui-tabs').tabs('option', 'selected');

		jQuery(".metabox-prefs").html(context[cTab]);

		for( i = 0; i<context.length; i++ ) {
			$admin_tabs.bind("tabsshow, tabsselect", function(event, ui) {
				index = ui.index;
				jQuery('.metabox-prefs').html(context[index]);
			});
		}

		}	


});
