<?php
/**
* WP-Tabs tinymce plugin.
*/
class wptabs_editor_buttons
{
	
	function wptabs_editor_buttons( )
	{
		$options = get_option( 'wpUI_options' );	
		if ( is_admin() ) {
			if ( isset( $options['enable_tinymce_menu'] ) ) {
			add_filter( 'tiny_mce_version', array( &$this, 'tiny_mce_version' ) );
			add_filter( 'mce_external_plugins', array( &$this, 'mce_external_plugins' ) );
			add_filter( 'mce_buttons', array( &$this, 'mce_buttons' ) );
			}
			if ( isset( $options['enable_quicktags_buttons'] ) ) 
			add_action( 'edit_form_advanced', array(&$this, 'wptabs_quicktags_buttons'));
			add_action( 'edit_page_form', array(&$this, 'wptabs_quicktags_buttons'));
			// add_action( 'admin_head', array(&$this, 'tinymce_vars'));
		}
	}
		
	function mce_buttons( $buttons ) {
		array_push( $buttons, 'separator', 'wpuimce');
		return $buttons;
	}
	
	function tinymce_vars() {
		wp_enqueue_script('editor');
		wp_localize_script( 'editor', 'pluginVars', array(
			'wpUrl'		=>	site_url(),
			'pluginUrl'	=>	plugins_url()
		));

	}
	
	function mce_external_plugins( $plugin_array ) {
		$plugin_array['wpuimce'] = plugins_url('/wp-ui/js/wpuimce/editor_plugin.js');
		return $plugin_array;
	}
	
	function tiny_mce_version( $version ) {
		return ++$version;
	}

	
	function wptabs_quicktags_buttons() {
		?>
		<script type="text/javascript">
			var ebl, ebl_t, edBar, edHTML;
			ebl = edButtons.length;
			ebl_t = ebl;
			
			edButtons[ebl++] = new edButton('ed_wptabtitle', 'Tabs title', '[wptabtitle]', '[/wptabtitle]');
			edButtons[ebl++] = new edButton('ed_wptabcontent', 'Tab contents', '[wptabcontent]', '[/wptabcontent]');
			edButtons[ebl++] = new edButton('ed_wptabs', 'Tabs Wrap', '[wptabs]', '[/wptabs]');
			
			edHTML = ' | <input type="button" value="Tab title" id="ed_wptabtitle" class="ed_button" onclick="edInsertTag(edCanvas, ebl_t);" title="Insert tab title shortcode" />';
			edHTML += '<input type="button" value="Tab contents" id="ed_wptabcontent" class="ed_button" onclick="edInsertTag(edCanvas, ebl_t+1)" title="Insert Tab contents shortcode" />';
			edHTML += '<input type="button" value="Tabs Wrap" id="ed_wptabs" class="ed_button" onclick="edInsertTag(edCanvas, ebl_t+2)" title="Wrap the tabs" /> ';
			edHTML += ' <input type="button" value=" ? " id="wpui_ed_help" class="ed_button" onclick="wpuiEditorHelp()" title="Click for WP UI help!" /> | ';
			
			edBar = document.getElementById('ed_toolbar');
			
			edBar.innerHTML += edHTML;

			function wpuiEditorHelp() {
				editorHelp = '<?php admin_url() ?>admin-ajax.php?action=editorButtonsHelp&TB_iframe=true';
				tb_show('choosing tab names', editorHelp);
			}
			
		</script>
		<?php
	}
	
} // END Class wp_tabs_tinymce


add_action( 'init', 'wptabs_buttons' );

function wptabs_buttons() {
	global $wptabs_buttons;
	$wptabs_buttons = new wptabs_editor_buttons();
} // END wptabs_buttons

