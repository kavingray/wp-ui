<?php
/**
 *	Plugin Options template
 *	
 *	Plugin options class using WP Settings API. 
 * 
 * 	Initially derived from the theme options class works by Alison
 * 	Barret( @alisothegeek @link: http://alisothegeek.com ). Much Thanks to her. 
 *		
 * @since $Id$
 * @package wp-ui
 * @subpackage admin-options
**/

/**
*	Plugin Options class.
*/
class plugin_options
{
	
	public $sections, $fields, $page_id, $admin_scripts, $plugin_details, $plugin_db_prefix, $plugin_page_prefix;
	
	private $defaults = array(
		'id'		=>	'default_field',
		'title'		=>	'Default Field',
		'desc'		=>	'Description',
		'type'		=>	'text',
		'std'		=>	'',
		'section'	=>	'general',
		'choices'	=>	array(),
		'class'		=>	'',
		'extras'	=>	''
	);
	
		
	
	function __construct( array $plugin_details=array() )
	{
		$this->plugin_details = $plugin_details;
		foreach ( $plugin_details as $key => $value ) {
			$this->{$key} = $value;
		}
		$this->plugin_options();
		
	}
	
	
	
	public function plugin_options() {
		
		add_action( 'admin_menu' , array(&$this, 'menu_admin'));
		add_action( 'admin_init' , array(&$this, 'init_admin'));
		$this->set_page_id($this->page_id);
	}


	public function init_admin() {
		$this->register_options();
		
	}
	
	public function menu_admin() {
		$this->page_id = add_options_page( $this->name . ' Options', $this->name, 'manage_options', $this->page_prefix . '-options', array(&$this, 'render_options_page') );
		// $this->set_page_id($page_id);
		return $this->page_id;
	}
		
	public function render_options_page() {

		echo '<div class="wrap">
				<div class="icon32" id="icon-options-general"></div>
				<h2>' . $this->name . ' Options</h2>';

		/**
		 * Hook for inserting info *above* your plugin's option page.
		 * 	Can be used for information about the plugin, warnings etc.
		 */
		do_action( 'plugin_info_above_options_page' );

		/**
		 * Start the form tag.
		 */
		echo '<form id="optionsform" action="options.php" method="post">
				<div id="options-wrap">';

			/**
			 * Display the options.
			 */
			settings_fields( $this->db_prefix . '_options');
			do_settings_sections( $_GET['page'] );
			
		echo '</div><!-- end #options-wrap -->
				<p class="submit">
					<input name="' . $this->db_prefix . '_options[submit]" type="submit" class="button-primary" value="' . __( 'Save Changes' ) . '" />
					<input name="' . $this->db_prefix . '_options[reset]" type="submit" class="button-secondary" value="' . __( 'Reset Defaults' ) . '" />
					</p><!-- end p.submit -->
			</form><!-- end form#optionsform -->';

		/**
		 * Hook for inserting info *below* your plugin's option page.
		 * 	Useful for credits and similar.
		 */			
			do_action( 'plugin_info_below_options_page' );
			
	}

	public function register_options() {
		register_setting( $this->db_prefix . '_options', $this->db_prefix . '_options', array(&$this, 'validate_options'));
		
		foreach( $this->sections as $slug => $title ) {
			add_settings_section( $slug, $title , array( &$this, 'display_section'), $this->page_prefix . '-options');
		}
			
		foreach ( $this->fields as $field ) {
			$this->create_option( $field );
		}
		
	} // END method register_options.
	
	public function display_section() {
		
	}
	
	public function create_option( $args = array() ) {
		
		$defaults = array(
			'id'			=>	'default_field',
			'title'			=>	'Default Field',
			'desc'			=>	'Description, nonetheless.',
			'type'			=>	'text',
			'subtype'		=>	'',
			'std'			=>	'',
			'section'		=>	'general',
			'choices'		=>	array(),
			'label_for'		=>	'',
			'field_class'	=>	'',
			'text_length'	=>	'',
			'textarea_size'	=>	array(),
			'extras'		=>	''
		);
		
		extract( wp_parse_args( $args, $defaults) );
		
		$option_args = array(
			'type'					=>	$type,
			'subtype'				=>	$subtype,
			'id'					=>	$id,
			'desc'					=>	$desc,
			'std'					=>	$std,
			'choices'				=>	$choices,
			'label_for'				=>	$id,
			'field_class'			=>	$field_class,
			'text_length'			=>	$text_length,
			'textarea_size'			=>	$textarea_size,
			'extras'				=>	$extras		
		);

		add_settings_field( $id, $title, array( &$this, 'display_option'), $this->page_prefix . '-options', $section, $option_args);
		
		
		
	} // END method create_option.
	
	
	public function display_option( $args = array() ) {
		extract( $args );
		
		$options = get_option( $this->db_prefix . '_options');
		
		if ( !isset( $options[$id] ) && 'type' != 'checkbox' )
			$options[$id] = $std;
		
		
		// Find the type of the option field required and display them accordingly.
		switch( $type ) {		

			////////////////////////////////////////////////
			//////////////// Checkbox //////////////////////
			////////////////////////////////////////////////
			case 'checkbox':
			$checked = '';
			if( isset( $options[$id] ) && $options[$id] == 'on' )
			 		$checked = ' checked="checked"';
			echo '<input' . $field_class . ' id="' . $id . '" type="checkbox" name="'. $this->db_prefix.'_options[' . $id . ']" value="on"' . $checked . '/><label for="' . $id . '"> ' . $desc . '</label>';
			break;
			
			////////////////////////////////////////////////
			/////////// Combo boxes (select) ///////////////
			////////////////////////////////////////////////
			case 'select':
			echo '<select id="' . $id . '"' . $field_class . ' name="' . $this->db_prefix . '_options[' . $id . ']">';
			foreach ( $choices as $value=>$label ) {
				$selected = '';
				if ( $options[$id] == $value ) $selected = ' selected';
				
				if ( stristr( $value, 'startoptgroup' ) ) {
					echo '<optgroup label="' . $label . '">';
				} else if ( stristr( $value, 'endoptgroup') ) {
					echo '</optgroup>';
				} else {
					echo '<option value="' . $value . '"' . $selected . '>' . $label . '</option>';
				}
			}
			echo '</select>';
			if ( $extras )
				echo $extras;
			if( $desc != '' )
				echo '<br /> ' . $desc;
			break;
			
			
			////////////////////////////////////////////////
			//////////////// Radio buttons /////////////////
			////////////////////////////////////////////////
			case 'radio':
			// Choose Radio selectors with descriptive list + images.
			if ( $subtype == 'descriptive' ) {
				if( $desc != '' )
					echo $desc . '<br /><br />';
				$style_elem = "style='float:left;margin-right:20px;margin-bottom:20px;border: 1px solid #bbb;-moz-box-shadow: 0px 1px 2px #AAA;-webkit-box-shadow: 2px 2px 2px #777;box-shadow: 2px 2px 2px #777;'";
			foreach ( $choices as $choice )
			{
				$active = ($options[$id] == $choice['slug']) ? 'class="active-layout"' : '';
				echo "<dl style='float:left; padding:5px; text-align:center; max-width:160px' " . $active . ">";
				$checked = ($options[$id] == $choice['slug']) ? ' checked ' : '';
				echo "<dt>" . $choice['name'] . "</dt>";
				echo "<dd style='text-align:center'><img src='". $choice['image'] ."' /></dd>";
				echo "<dd>";
				echo "<input " . $field_class . " name='" . $this->db_prefix . "_options[" . $id . "]' " . $checked . " id='" . $id .  "' value='" . $choice['slug'] . "' type='radio' />";
				echo "</dd>";
				echo "<dd>" . $choice['description'] . "</dd>";
				echo '</dl>';
				}	
			}
			else // Regular radio buttons.
			{
			$i = 0;
			foreach( $choices as $value => $label ) {
				$selected = '';
				if ( $options[$id] == $value )
					$selected = ' checked="checked"';
			echo '<input' . $field_class . ' type="radio" name="' . $this->db_prefix. '_options[' . $id . ']" value="' . $value . '"' . $selected . '><label for="' . $id . $i . '">' . $label . '</label>';
			if ( $i < count( $choices ) -1 )
				echo '<br />';
			$i++;	
			}
			if( $desc != '' )
				echo '<br /> ' . $desc;
			}
			break;
			
			
			////////////////////////////////////////////////
			//////////////// Text areas ////////////////////
			////////////////////////////////////////////////
			case 'textarea':
			$text_cols = ''; $text_rows = '';
			if (!empty($textarea_size)) {
				$text_cols = ' cols="' . $textarea_size['cols'] . '"';
				$text_rows = ' rows="' . $textarea_size['rows'] . '"';
			}	
			echo '<textarea' . $field_class . $text_cols . $text_rows . ' id="' . $id . '" name="' . $this->db_prefix . '_options[' . $id . ']">' . $options[$id] . '</textarea>';
			if( $desc != '' )
				echo '<br /> ' . $desc;
			break;

			
			////////////////////////////////////////////////
			//////////////// Rich text edit ////////////////
			////////////////////////////////////////////////
			case 'richtext':
			if (!empty($textarea_size)) {
				$text_cols = ' cols="' . $textarea_size['cols'] . '"';
				$text_rows = ' rows="' . $textarea_size['rows'] . '"';
			}
			echo '<p class="switch-editors" align="right"><a class="toggleVisual">Visual</a><a class="toggleHTML">HTML</a></p>';
			echo '<textarea' . $field_class . $text_cols . $text_rows . ' id="' . $id . '" class="rich-text-editor" name="' . $this->db_prefix . '_options[' . $id . ']">' . $options[$id] . '</textarea>';
			if( $desc != '' )
				echo '<br /> ' . $desc;
			if( function_exists( 'wp_tiny_mce' ) ) wp_tiny_mce(false, array( 'editor_selector' => 'rich-text-editor' , 'height' => 300, 'mce_external_plugins' => array()));
			echo '<script type="text/javascript">
			jQuery(document).ready(function() {
			jQuery("a.toggleVisual").click(function(){
					tinyMCE.execCommand("mceAddControl", false, "' . $id . '");
			});
			jQuery("a.toggleHTML").click(function(){
					tinyMCE.execCommand("mceRemoveControl", false, "' . $id .'");
			});				
				
			}); // END document ready

			</script>';
			break;


			////////////////////////////////////////////////
			//////////////// Password //////////////////////
			////////////////////////////////////////////////
			case 'password':
			echo '<input id="' . $id . '" type="password" name="' . $this->db_prefix . '_options[' . $id . ']" value="' . $options[$id] . '" />';
			if( $desc != '' )
				echo '<br /> ' . $desc;			
			break;
			

			////////////////////////////////////////////////
			/////////// Regular PHP file uploader //////////
			////////////////////////////////////////////////
			case 'file':
			echo '<input type="file" id="' . $id . '" name="' . $id . '" />';
			if ( $desc != '' )
				echo '<br /> ' . $desc;
			if ( $file = $options[$id]) {
				// var_dump($file);
				echo '<br /> <br /><a class="thickbox" href=' . $file['url'] . '>' .  __('Currently uploaded image') . '</a>';
			}				
			break;						
		
		
			////////////////////////////////////////////////
			/////////// Wordpress Media uploader ///////////
			////////////////////////////////////////////////
			case 'media-upload':
			echo '<input id="' . $id . '" type="text" size="36" name="' . $this->db_prefix . '_options[' . $id . ']" value="" />';
			echo '<input id="' . $id . '_trigger" type="button" class="button-secondary" value="Upload Image" />';
			if ( $desc != '') echo '<br />' . $desc;
			if ( $options[$id] != '' ) {
				echo '<br /> <br /><a class="thickbox" href=' . $options[$id] . '>' .  __('Currently uploaded image') . '</a>';
			}
			break;
		
		
			////////////////////////////////////////////////
			//////////////// Color picker //////////////////
			////////////////////////////////////////////////
			case 'color':
			if ($text_length != '') {
				$text_length = ' size="' . $text_length . '"';
			}
			if ( $this->color_picker == 'farbtastic' )
				$style = ' style="position:relative" ';
			else  if( $this->color_picker == 'jscolor' )
				$style = ' class="color {hash:true}" ';
			else 
				$style = '';	

			
			echo '<input' . $text_length . $style . ' type="text" id="' . $id . '" name="' . $this->db_prefix . '_options[' . $id . ']" value="' . $options[$id] . '" />';
			
			if ( $this->color_picker == 'farbtastic' ) {
				// Init farbtastic color-picker.
				echo '<div id="colorpicker"></div>';
				echo '<script type="text/javascript">
					// Hide the colorpicker first.
					jQuery("#colorpicker").hide();
					// Open the color picker on clicking the textfield.
					jQuery("#' . $id . '").click(function() {
						jQuery("#colorpicker").farbtastic("#' . $id . '").slideDown(500);
					});
					// Hide the color-picker on Double click.
					jQuery("#' . $id . '").dblclick(function() {
						jQuery("#colorpicker").slideUp(300);
					});
			</script><!-- End farbtastic init script. -->';
			} else if( $this->color_picker == 'jscolor' ) {
				// Jscolor, chosen.
				$optjsurl = get_bloginfo('template_url'). '/lib/options/js/';
				wp_enqueue_script('jscolor', $optjsurl . '/jscolor/jscolor.js');
			}
			
			if ( $desc != '' )
				echo '<br /> ' . $desc;
			break;

			case 'separator':
				echo '<br /></tr></table><hr color="#D5D5D5"><table class="form-table"><tbody><tr>';
				break;
		
			////////////////////////////////////////////////
			////////////////// Textbox /////////////////////
			////////////////////////////////////////////////
			case 'text':
			default:
			if ($text_length != '') {
				$text_length = ' size="' . $text_length . '"';
			}
			echo '<input' . $field_class . $text_length .  ' type="text" id="' . $id . '" name="' . $this->db_prefix . '_options[' . $id . ']" value="' . $options[$id] . '" />';
			if ( $desc != '' )
				echo '<br /> ' . $desc;
			break;


		} // END switch $type.
		
	}
	

	public function validate_options( $input ) {
		// echo '<pre>';
		// print_r($input);
		return $input;
	}
	

	
	
	public function set_sections( $sections ) {
		return $this->sections = $sections;
	}
	public function get_sections() {
		return $this->sections;
	}
	
	public function set_fields( $fields ) {
		return $this->fields = $fields;
	}
	public function get_fields() {
		return $this->fields;
	}
	
	public function set_plugin_details( $plugin_details = array() ) {
		return $this->plugin_details = $plugin_details;
	}
	public function get_plugin_details() {
		return $this->plugin_details;
	}
	
	public function set_page_id( $page_id ) {
		return $this->page_id = $page_id;
	}
	
	public function get_page_id() {
		return $this->page_id;
	}
	
	public function set_admin_scripts( $admin_scripts = array() ) {
		return $this->admin_scripts = $admin_scripts;
	}
	
	public function get_admin_scripts() {
		return $this->admin_scripts;
	}
} // END class plugin_options.



// }
?>