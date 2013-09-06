<?php
/**
 *	Plugin Options template
 *
 *	Plugin options class using WP Settings API.
 *
 * @since $Id$
 * @package wp-ui
 * @subpackage admin-options
**/


/**
*	Plugin Options class.
*/
if ( ! class_exists( 'kav_admin_options') ) {
class kav_admin_options
{

	public $sections,
		 $fields,
		 $page_id,
		 $defaults,
		 $admin_scripts,
		 $plugin_details,
		 $plugin_db_prefix,
		 $plugin_page_prefix,
		 $help_tabs,
		 $options;


	function __construct( $plugin_details=array() )
	{
		$this->plugin_details = $plugin_details;
		foreach ( $plugin_details as $key => $value ) {
			$this->{$key} = $value;
		}

		if ( ! isset( $this->admin_scripts ) )
			$this->admin_scripts = array();


		$this->options = get_option( $this->db_prefix . '_options' );


		add_action( 'admin_init', array( &$this, 'analyze_vars' ) );
		// add_action( 'query_vars', array( &$this, 'add_queries' ) );
		// add_action( 'template_redirect', array( &$this, 'download_options' ) );




		// wp_enqueue_script( 'iris' );

		$this->kav_admin_options();

	} // END __construct


	public function kav_admin_options() {
		add_action( 'admin_menu' , array(&$this, 'menu_admin'));
		add_action( 'admin_init' , array(&$this, 'init_admin'), 1, 0 );
		$this->set_page_id($this->page_id);
	}


	public function init_admin() {
		$this->register_options();
	}

	public function menu_admin() {
		$page_str = add_options_page( $this->name . ' Options', $this->name, 'manage_options', $this->page_prefix . '-options', array(&$this, 'render_options_page') );
		if ( floatval( get_bloginfo( 'version' ) ) >= 3.3 )
		add_action( 'admin_print_styles-' . $page_str, array( &$this, 'provide_help' ) );
		$this->page_id = $page_str;
		add_action( 'admin_print_styles-' . $page_str , array( &$this, 'script_action' ) );
	}

	function script_action() {
		do_action( 'plugin_' . $this->page_prefix . '_load_scripts' );

		if ( file_exists( str_ireplace( ".php", ".js", __FILE__ ) ) ) {
			$HOST = ( is_ssl() ? 'https' : 'http' ) . '://' .  $_SERVER[ 'HTTP_HOST' ];
			$js_file = $HOST . str_ireplace( $_SERVER[ 'DOCUMENT_ROOT' ], '', str_ireplace( '.php', '.js', __FILE__ ) );

			wp_enqueue_script( $this->page_prefix . "_option_js", $js_file );
		}
	}



	public function render_options_page() {
		$icon = '<div class="icon32" id="icon-options-general"></div>';

		echo '<div class="wrap">';

		// echo apply_filters( $this->page_prefix . "_options_title", $icon . $page_title );

		$options_title =  apply_filters( $this->page_prefix . "_options_title", '%1$s <h2>%2$s</h2>' );

		echo sprintf( $options_title, $icon, $this->name );

		/**
		 * Hook for inserting info *above* your plugin's option page.
		 * 	Can be used for information about the plugin, warnings etc.
		 */
		// do_meta_boxes( 'top-' . $this->db_prefix, 'normal', null );
		do_action( $this->page_prefix . '_above_options_page' );

		/**
		 * Start the form tag.
		 */
		echo '<form id="optionsform" action="options.php"  enctype="multipart/form-data" method="post">
				<div id="options-wrap">';

			// Above options tables.
			do_action( $this->page_prefix . '_above_options_tables' );

			/**
			 * Display the options.
			 */
			settings_fields( $this->db_prefix . '_options');
			do_settings_sections( $_GET['page'] );

			// Below options tables.
			do_action( $this->page_prefix . '_below_options_tables' );


		echo '</div><!-- end #options-wrap -->
				<p class="submit">
				<input name="' . $this->db_prefix . '_options[submit]" type="submit" class="button-primary" value="' . __( 'Save Options', 'idq-general' ) . '" />
					<input name="' . $this->db_prefix . '_options[reset]" type="submit" class="button-secondary" value="' . __( 'Reset Defaults', 'idq-general' ) . '" />
					</p><!-- end p.submit -->
			</form><!-- end form#optionsform -->';

		/**
		 * Hook for inserting info *below* your plugin's option page.
		 * 	Useful for credits and similar.
		 */
		// do_meta_boxes( 'below-' . $this->db_prefix, 'normal', null );
		do_action( $this->page_prefix . '_below_options_page' );

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

		$this->defaults  = array(
			'id'            =>	'default_field',
			'title'         =>	'Default Field',
			'desc'          =>	'Description, nonetheless.',
			'type'          =>	'text',
			'subtype'       =>	'',
			'std'           =>	'',
			'section'       =>	'general',
			'choices'       =>	array(),
			'label_for'     =>	'',
			'field_class'   =>	'',
			'text_length'   =>	'',
			'textarea_size' =>	array(),
			'driver'        =>	'iris',
			'extras'        =>	'',
			'fields'        =>	array(),
			'enclose'       =>	array( 'before' => '', 'after' => '' )
		);

		// extract( wp_parse_args( $args, $defaults) );

		// $option_args = array(
		// 	'type'					=>	$type,
		// 	'subtype'				=>	$subtype,
		// 	'id'					=>	$id,
		// 	'desc'					=>	$desc,
		// 	'std'					=>	$std,
		// 	'driver'				=>	$driver,
		// 	'choices'				=>	$choices,
		// 	'label_for'				=>	$id,
		// 	'field_class'			=>	$field_class,
		// 	'text_length'			=>	$text_length,
		// 	'textarea_size'			=>	$textarea_size,
		// 	'extras'				=>	$extras,
		// 	'fields'				=>	$fields,
		// 	'enclose'				=>	$enclose
		// );

		extract( $args );

		$option_args = wp_parse_args( $args, $this->defaults );

		// echo '<pre>';
		// echo 'Exporting : $args' . "\n";
		// echo "====================\n";
		// var_export($option_args);
		// echo '</pre>';

		$option_args[ 'label_for' ]	= $id;

		add_settings_field( $id, $title, array( &$this, 'display_option'), $this->page_prefix . '-options', $section, $option_args);

	} // END method create_option.


	/**
	 * Display the option.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function display_option( $args=array() ) {
		extract( $args );

		$options = get_option( $this->db_prefix . '_options');

		// if ( !isset( $options[$id] ) && 'type' != 'checkbox' )
		// 	$options[$id] = $std;
		
		
		echo '<div id="option-' . $id . '" class="option-field option-' . $args[ 'type' ] . '">';


		// Before the option
		echo '<div class="encloser encloser-before">' . $enclose[ 'before' ] . '</div>';

		// echo '<pre>';
		// echo 'Exporting :  $args ' . "\n";
		// echo "====================\n";
		// var_export( $args );
		// echo '</pre>';

		$option_args = array(
			'id'	=>	$id,
			'name'	=>	$this->db_prefix . '_options[' . $id . ']',
			'desc'	=>	'&nbsp;&nbsp;' . $desc
		);

		// echo '<pre>';
		// echo 'Exporting : $option_args' . "\n";
		// echo "====================\n";
		// var_export($option_args);
		// echo '</pre>';

		if ( $type == 'select' || $type == 'checkbox' || $type == 'radio' ) {
			$option_args[ 'choices' ] = $choices;
			$option_args[ 'extras' ] = $extras;
		}


		// echo '<pre>';
		// echo 'Exporting : $extras' . "\n";
		// echo "====================\n";
		// var_export($extras);
		// echo '</pre>';
		if ( $type == 'colorpicker' ) {
			$option_args[ 'driver' ] = $driver;
		}

		if ( $type == 'text' ) {
			$option_args[ 'text_length' ] = $text_length;
		}

		if ( $type == 'textarea' ) {
			$option_args[ 'textarea_size' ] = $textarea_size;
		}



		if ( $type == 'multiple' ) {
			if ( count( $args[ 'fields' ] ) ) {
				foreach( $fields as $field ) {
					$field = wp_parse_args( $field, $this->defaults );
					$field[ 'id' ] = $args[ 'id' ] .  "][" . $field[ 'id' ];
					// $field[ 'name' ] = $args[ 'name' ] . '[' . $field[ 'id' ]. ']';
					$this->display_option( $field );
				}
			}
		}


		if ( method_exists( $this, $type ) ) {
			call_user_func_array( array( &$this, $type ), array( $option_args ) );
		}

		// After the option.
		echo '<div class="encloser encloser-after">' . $enclose[ 'after' ] . '</div>';


		echo '</div>';

	} // END function display_options


	public function display_optsion( $args = array() ) {
		extract( $args );

		$options = get_option( $this->db_prefix . '_options');

		if ( !isset( $options[$id] ) && 'type' != 'checkbox' )
			$options[$id] = $std;

		echo $enclose[ 'before' ];

		if ( method_exists( $this, $type ) ) {
			call_user_func_array( array( &$this, $type ), $args );
		}

		echo $enclose[ 'after' ];


		return;

		switch( $type ) {

			////////////////////////////////////////////////
			//////////////// Checkbox //////////////////////
			////////////////////////////////////////////////
			case 'checkbox':
			$this->checkbox( array(
				'id'	=>	$id,
				'name'	=>	$this->db_prefix . '_options[' . $id . ']',
				'desc'	=>	$desc,
				 ));
			// $this->checkbox( $id, $this->db_prefix . '_options[' . $id . ']', $desc );
			break;

			////////////////////////////////////////////////
			/////////// Combo boxes (select) ///////////////
			////////////////////////////////////////////////
			case 'select':
			$this->select( array(
				'id'	=>	$id,
				'name'	=>	$this->db_prefix . '_options[' . $id . ']',
				'desc'	=>	$desc,
				'choices'	=> $choices,
				'extras'	=>	$extras

				 ));
			// $this->select( $id, $this->db_prefix . '_options[' . $id . ']', $desc, $choices, $extras );
			break;


			////////////////////////////////////////////////
			//////////////// Radio buttons /////////////////
			////////////////////////////////////////////////
			case 'radio':
			$this->radio( array(
				'id'	=>	$id,
				'name'	=>	$this->db_prefix . '_options[' . $id . ']',
				'desc'	=>	$desc,
				'choices'	=> $choices,
				'extras'	=>	$extras
				 ));
			break;


			////////////////////////////////////////////////
			//////////////// Text areas ////////////////////
			////////////////////////////////////////////////
			case 'textarea':
			$this->textarea( array(
				'id'	=>	$id,
				'name'	=>	$this->db_prefix . '_options[' . $id . ']',
				'desc'	=>	$desc,
				'textarea_size'	=> $textarea_size,
				 ));
			break;


			////////////////////////////////////////////////
			//////////////// Colorpicker ///////////////////
			////////////////////////////////////////////////
			case 'colorpicker':
			$this->colorpicker( array(
				'id'	=>	$id,
				'name'	=>	$this->db_prefix . '_options[' . $id . ']',
				'desc'	=>	$desc,
				'textarea_length'	=> $textarea_length,
				'driver'	=>	$driver
				 ));
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
			$this->fileinput( $id, $this->db_prefix . '_options[' . $id . ']', $desc, $file );
			break;


			////////////////////////////////////////////////
			/////////// Wordpress Media uploader ///////////
			////////////////////////////////////////////////
			case 'media-upload':
			$this->textinput(array(
					'id' => $id,
					'name' => $this->db_prefix . '_options[' . $id . ']',
					'desc' => $desc,
					'text_length' => $text_length,
					'type' => 'media-upload'
			));
			break;


			////////////////////////////////////////////////
			//////////////// Export options ////////////////
			////////////////////////////////////////////////
			case 'export':
			$this->export(array(
					'id' => $id,
					'name' => $this->db_prefix . '_options[' . $id . ']',
					'desc' => $desc,
					'text_length' => $text_length,
					'type' => 'export'
			));
			break;

			////////////////////////////////////////////////
			//////////////// Import options ////////////////
			////////////////////////////////////////////////
			case 'import':
			$this->import(array(
					'id' => $id,
					'name' => $this->db_prefix . '_options[' . $id . ']',
					'desc' => $desc,
					'type' => 'import'
			));
			break;


			////////////////////////////////////////////////
			//////////////// Color picker //////////////////
			////////////////////////////////////////////////
			case 'color':
			$this->textinput(array(
					'id' => $id,
					'name' => $this->db_prefix . '_options[' . $id . ']',
					'desc' => $desc,
					'text_length' => $text_length,
					'type' => $this->color_picker ));
			break;

			case 'separator':
				echo '<br /></tr></table><hr color="#D5D5D5"><table class="form-table"><tbody><tr>';
			break;

			case 'multiple':
				foreach( $fields as $field ) {
					if ( isset( $field[ 'enclose' ] ) )
					echo $field[ 'enclose' ]['before' ];

					$args_arr = array(
						'id' => $id . 'KKKKK' . $field[ 'idkey' ],
						'name' => $this->db_prefix . '_options[' . $id . '][' . $field[ 'idkey' ] . ']',
						'desc' => $field[ 'desc' ]
						);

					if ( $field['type'] == 'textinput' ) {
						$args_arr['text_length'] = isset( $field[ 'text_length' ] ) ? $field[ 'text_length' ] : '';
						$args_arr['type'] = 'text';
					} elseif ( $field['type'] == 'media-upload' ) {
						$args_arr['text_length'] = isset( $field[ 'text_length' ] ) ? $field[ 'text_length' ] : '';
						$args_arr['type'] = 'media-upload';
						$field[ 'type' ] = 'textinput';
					} elseif ( $field['type'] == 'select' ) {
						$args_arr['choices'] = $field[ 'choices' ];
						if ( isset( $field['extras'] ) )
						$args_arr['extras'] = $field[ 'extras' ];
					} elseif ( $field['type'] == 'radio' ) {
						$args_arr['choices'] = $field[ 'choices' ];
					}



					// Nested
					$args_arr['nested'] = true;

					call_user_func_array( array( &$this, $field[ 'type' ] ), array($args_arr) );
					if ( isset( $field[ 'enclose' ] ) )
					echo $field[ 'enclose' ]['after' ];

				}
				if ( $desc != '' )
				echo $desc;

			break;


			////////////////////////////////////////////////
			////////////////// Textbox /////////////////////
			////////////////////////////////////////////////
			case 'text':
			default:
			$this->textinput(array(
					'id' => $id,
					'name' => $this->db_prefix . '_options[' . $id . ']',
					'desc' => $desc,
					'text_length' => $text_length,
					'type' => 'text' ));
			break;


		} // END switch $type.
		echo $enclose[ 'after' ];

	}




	/**
	 * Regular checkbox.
	 */
	private function checkbox( $args=array() ) {
		$defs = array(
				'id'	=>	'',
				'name'	=>	'',
				'desc'	=>	'',
				'nested'=>	false );
		extract(wp_parse_args( $args, $defs ));

		$checked = '';
		if( isset( $this->options ) && $this->get_option( $id ) == 'on' ) $checked = ' checked="checked"';
		echo '<input id="' . $id . '" type="checkbox" name="' . $name . '" value="on"' . $checked . '/><label for="' . $id . '"> ' . $desc . '</label>';
	} // end checkbox.


	/**
	 * 	Select or Combo box.
	 */
	private function select($args=array()) {
		$defs = array(
				'id'		=>	'',
				'name'		=>	'',
				'desc'		=>	'',
				'choices'	=> array(),
				'extras'	=>	'',
				'nested'	=>	false );
		extract(wp_parse_args( $args, $defs ));

		echo '<select id="' . $id . '" name="' . $name . '">';
		foreach ( $choices as $value=>$label ) {
			$selected = '';
			if ( $this->get_option($id) == $value ) $selected = ' selected';

			if ( stristr( $value, 'startoptgroup' ) ) {
				echo '<optgroup label="' . $label . '">';
			} else if ( stristr( $value, 'endoptgroup') ) {
				echo '</optgroup>';
			} else {
				echo '<option value="' . $value . '"' . $selected . '>' . $label . '</option>';
			}
		}
		echo '</select>';
		if ( $extras != '' && ! $nested )
			echo $extras;
		if( $desc != '' && ! $nested )
			echo $desc;
	}


	/**
	 * Radio boxes
	 */
	private function radio( $args=array() ) {
		$defs = array(
				'id'		=>	'',
				'name'		=>	'',
				'desc'		=>	'',
				'choices'	=>	array(),
				'extras'	=>	'',
				'nested'	=>	false
				);
		extract(wp_parse_args( $args, $defs ));

		$i = 0;
		foreach( $choices as $value => $label ) {
			$selected = '';
			if ( $this->get_option( $id ) == $value )
				$selected = ' checked="checked"';
		echo '<input type="radio" name="' . $name . '" value="' . $value . '"' . $selected . '>  &nbsp;<label for="' . $id . $i . '">' . $label . '</label>';
		if ( $i < count( $choices ) -1 )
			echo '<br />';
		$i++;
		}
		if( $desc != '' && ! $nested  )
			echo '<br /> ' . $desc;

	} // I am radio. End.


	/**
	 * Textareas
	 */
	private function textarea($args=array()) {
		$defs = array(
				'id'			=>	'',
				'name'			=>	'',
				'desc'			=>	'',
				'textarea_size'	=>	array(),
				'nested'		=>	false );
			extract(wp_parse_args( $args, $defs ));

		$text_cols = ''; $text_rows = ''; $autocomplete = 'on';
		if (!empty($textarea_size)) {
			$text_cols = ' cols="' . $textarea_size['cols'] . '"';
			$text_rows = ' rows="' . $textarea_size['rows'] . '"';
			if( isset( $textarea_size[ 'autocomplete' ] ) )
				$autocomplete = $textarea_size[ 'autocomplete' ];
		}
		echo '<textarea' . $text_cols . $text_rows . ' autocomplete="' . $autocomplete . '" id="' . $id . '" name="' .  $name . '">' . $this->get_option( $id ) . '</textarea>';
		if( $desc != ''  && ! $nested )
			echo '<br /> ' . $desc;
	} // end fun textarea.


	private function fileinput( $id, $name, $desc, $nested=false ) {
		$defs = array(
				'id'	=>	'',
				'name'	=>	'',
				'desc'	=>	'',
				'nested'=>	false );
		wp_parse_args( $args, $defs );
		echo '<input type="file" id="' . $id . '" name="' . $id . '" />';
		if ( $desc != ''  && ! $nested )
			echo '<br /> ' . $desc;
		if ( $file = $this->get_option( $id ) ) {
			// var_dump($file);
			echo '<br /> <br /><a class="thickbox" href=' . $file['url'] . '>' .  __('Currently uploaded image', 'idq-general' ) . '</a>';
		}
	}



	/**
	 * Include a colorpicker widget. Based on text input.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function colorpicker( $args=array() ) {
		$defs = array(
				'id'	=>	'',
				'name'	=>	'',
				'desc'	=>	'',
				'text_length'	=>	'',
				'driver'	=>	'iris',
				'nested'=>	false
			);

		extract(wp_parse_args( $args, $defs ));
		static $colorz = 1;

		$args[ 'class' ] = 'colorpicker';
		// echo '<pre>';
		// echo 'Exporting : $args' . "\n";
		// echo "====================\n";
		// var_export($args);
		// echo '</pre>';
		// if ( in_array( $driver, array( "iris", "jscolor", "farbtastic" ) ) ) {
			// $this->admin_scripts[] = $driver;

			// echo '<pre>';
			// echo 'Exporting : microtime()' . "\n";
			// echo "====================\n";
			// var_export(microtime());
			// echo '</pre>';


			wp_enqueue_script( $driver );
			wp_enqueue_style( $driver );

			$args[ 'class' ] .= " colorpicker-" . $colorz . " colorpicker-" . $driver;
		// } else {
			// return;
		// }

		$this->text( $args );

		if ( $driver == 'farbtastic' )
			echo "<div id='farbtastic-" . $colorz . "' class='farbtastic'></div>";

		$colorz++;
	} // END function colorpicker


	/**
	 * Media Uploader.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function upload( $args=array() ) {
		$defs = array(
				'id'	=>	'',
				'name'	=>	'',
				'desc'	=>	'',
				'text_length'	=>	'',
				'type'	=>	'text',
				'class'	=>	'',
			);
		extract(wp_parse_args( $args, $defs ));

		$args[ 'class' ] = 'media-uploader media-uploader-input';


		$args[ 'extra' ] = '<input id="' . $id . '_button" class="button-secondary media-uploader-button" value="Choose" type="button" />';

		$this->text( $args );


		if ( $this->get_option($id) != '' ) {
			// echo '<br /> <br /><a class="thickbox" href=' . $this->get_option($id) . '>' .  __('Currently uploaded image', 'idq-general') . '</a>';
			echo '<br /> <br /><a class="thickbox" href=' . $this->get_option($id) . '><img class="wpui-uploaded-image" src="' . $this->get_option( $id ) . '" height="40px" />' .  __('Currently uploaded image', 'idq-general') . '</a>';
		}

	} // END function upload


	/**
	 * Textinput.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function text( $args=array() ) {
		$defs = array(
				'id'	=>	'',
				'name'	=>	'',
				'desc'	=>	'',
				'text_length'	=>	'',
				'type'	=>	'text',
				'class'	=>	'',
				'extra'	=>	''
			);
		extract(wp_parse_args( $args, $defs ));

		$value = ($this->get_option( $id )) ? $this->get_option( $id ) : '';

		$attrs = ' type="text"';

		if ( ! empty( $class ) )
			$attrs .= ' class="' . $class . '"';

		if ( ! empty( $text_length ) )
			$attrs .= ' size="' . $text_length . '"';

		echo '<input' . $attrs  . ' id="' . $id . '" name="' . $name . '" value="' . $value . '" />';

		if ( $extra != '' ) echo $extra;

		if ( $desc != '' )
			echo $desc;
	} // END function text



	/**
	 * Regular text input - Default.
	 */
	private function textinput( $args=array() ) {
		$defs = array(
				'id'	=>	'',
				'name'	=>	'',
				'desc'	=>	'',
				'text_length'	=>	'',
				'type'	=>	'text',
				'nested'=>	false );
		extract(wp_parse_args( $args, $defs ));

		$style = '';
		if ( $type == 'farbtastic' )
			$style = ' style="position:relative" ';
		elseif( $type == 'jscolor' )
			$style = ' class="color {hash:true}" ';
		elseif ( $type == 'media-upload' )
			$style = ' style="text-align : right;"';

		if ($text_length != '') {
			$text_length = ' size="' . $text_length . '"';
		}
		$thisVal = ($this->get_option( $id )) ? $this->get_option( $id ) : '';

		echo '<input' . $text_length . $style  . ' type="text" id="' . $id . '" name="' . $name . '" value="' . $thisVal . '" />';
		$nid = $id;

		if ( $type == 'farbtastic' ) {
			// Init farbtastic color-picker.
			echo '<div id="colorpicker"></div>';
			echo '<script type="text/javascript">
				// Hide the colorpicker first.
				jQuery("#colorpicker").hide();
				// Open the color picker on clicking the textfield.
				jQuery("#' . $nid . '").click(function() {
					jQuery("#colorpicker").farbtastic("#' . $nid . '").slideDown(500);
				});
				// Hide the color-picker on Double click.
				jQuery("#' . $nid . '").dblclick(function() {
					jQuery("#colorpicker").slideUp(300);
				});
		</script><!-- End farbtastic init script. -->';
		} else if( $type == 'jscolor' ) {
			// Jscolor, chosen.
			$optjsurl = get_bloginfo('template_url'). '/lib/options/js/';
			wp_enqueue_script('jscolor', $optjsurl . '/jscolor/jscolor.js');
		} else if( $type == 'media-upload' ) {
			echo '<input id="' . $nid . '_trigger" type="button" class="button-secondary" value="Upload" />';
			$post_id = 0;
			echo "<script type=\"text/javascript\">
			instance = 0;
			jQuery('#" . $nid . "_trigger').click(function() {
				instance++; if ( instance > 1 ) return false;
				backup_send = window.send_to_editor;
				formfield = jQuery('label[for=$nid]').text();
				window.send_to_editor = window.send_to_editor_$nid;

				tb_show('Upload images for ' + formfield, 'media-upload.php?post_id=0&type=image&amp;TB_iframe=true');
				return false;


			});
			window.send_to_editor_$nid  = function(html) {
				imgURL = jQuery('img', html).attr('src');
				jQuery('#$nid').val(imgURL);
				tb_remove();
				reverseSend();
				return false;
			}
			var reverseSend = function() {
				window.send_to_editor = backup_send;
			};
			</script>";
			if ( $this->get_option($id) != '' ) {
				echo '<br /> <br /><a class="thickbox" href=' . $this->get_option($id) . '>' .  __('Currently uploaded image', 'idq-general') . '</a>';
			}
		}
		if ( $desc != '' && ! $nested )
			echo '<br /> ' . $desc;
	} // END good ol` regular text input.



	/**
	 * Analyse the vars.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function analyze_vars() {
		if ( empty( $_GET ) ||  ! isset( $_GET[ 'page' ] ) || $_GET[ 'page' ] != $this->page_prefix . "-options" )
			return;


		if ( isset( $_GET[ $this->db_prefix . '-export-options' ] ) ) {
			$this->download_options();
		}

	} // END function analyse_vars


	/**
	 * Export the options.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	private function export( $args=array() ) {
		$nonce = wp_create_nonce( $this->db_prefix . '-export-options' );
		echo '<a href="' . admin_url( 'options-general.php?page=' . $this->db_prefix .  '-options&' . $this->db_prefix . '-export-options=download&security=' . $nonce ) . '" class="button-secondary">' . __( 'Export Options', 'idq-general' ) . '</a>';

	} // END function export

	/**
	 * Import exported options via file or text.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function import( $args='' ) {
		$defs = array(
				'id'	=>	$this->db_prefix . '-options-importer',
				'name'	=>	$this->db_prefix . '-options-importer',
				'desc'	=>	'',
				'nested'=>	false );
		$r = wp_parse_args( $args, $defs );

		echo '<input type="file" id="' . $r['id'] . '" name="' . $r[ 'name' ] . '" />';
		if ( $r['desc'] != ''  && ! $r['nested'] )
			echo '<br /> ' . $r['desc'];

		// echo '<pre>';
		// var_export( $_FILES );
		// echo '</pre>';

		if ( $file = $this->get_option( $r['id'] ) ) {
			var_dump($file);
			echo '<br /> <br /><a class="thickbox" href=' . $file['url'] . '>' .  __('Currently uploaded image', 'idq-general' ) . '</a>';
		}

	} // END function import

	/**
	 * Add query vars.
	 *
	 * @return ( array ) $vars
	 * @author Kavin Gray
	 **/
	function add_queries( $vars ) {
		array_push( $vars, $this->db_prefix . '-export-options' );
		return $vars;
	} // END function add_queries

	/**
	 * Download options as file.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function download_options( $content=null ) {
		// $vars = get_query_var( $this->db_prefix . '-export-options' );
		$vars = $_GET[ $this->db_prefix . '-export-options' ];

		if ( ! isset( $vars ) || $vars == '' ) return;

		$sec = ( isset( $_REQUEST ) && isset( $_REQUEST[ 'security' ] )) ? $_REQUEST[ 'security' ] : false;

		if ( ! isset( $_REQUEST ) || ! isset( $_REQUEST[ 'security' ] ) )
			wp_die( '<p>' . __( 'Sorry, I\'m afraid that\'s not allowed yet.', 'idq-general' ) . '</p>' );


		if ( $vars == 'download' ) {

			if ( ! wp_verify_nonce( $sec, $this->db_prefix . '-export-options' ) ) {
				wp_die( '<p>' . __( 'Sorry, That\'s not possible yet.', 'idq-general' ) . '</p>' );
			}

			$content = "<%" . $this->db_prefix . ":OPTIONS:start%>\n" . base64_encode( serialize( $this->options ) ) . "\n<%" . $this->db_prefix . ":OPTIONS:end%>";

			$file_name = $this->db_prefix . "_options.txt";

			if ( ! current_user_can( 'manage_options' ) )
				wp_die( '<p>' . __( 'You do not appear to have sufficient permissions to export/import plugin\'s options.', 'idq-general' ) . '</p>' );

			header( 'HTTP/1.1 200 O.K' );
	    $file_size = strlen( $content );
	    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	    header('Content-Description: File Transfer');
			header( 'Content-Type: text/plain' );
	    header("Content-Disposition: attachment; filename=" . $file_name );
	    header("Content-Length: $file_size" );
	    header("Expires: 0");
	    header("Pragma: public");
	    echo $content;
	    exit;
		}


	} // END function download_options


	/**
	 * Retrieve the stored option.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	private function get_option( $id, $keyname=false ) {
		if ( empty( $this->options ) )
			return false;

		$keyz = explode( "][", $id );

		if ( $keyname && count( $keyz ) > 1 ) return $keyz[ 1 ];

		if ( count( $keyz ) > 1 ) {
			if ( ! empty( $this->options[ $keyz[ 0 ] ] ) && isset( $this->options[ $keyz[ 0 ] ][ $keyz[ 1 ] ] ) ) {
				return $this->options[ $keyz[ 0 ] ][ $keyz[ 1 ] ];
			}
		} else {
			return ( isset( $this->options[ $id ] ) ? $this->options[ $id ] : false );
		}

		return false;

	} // END function get_optionn


	public function validate_options( $input ) {

		// $newinput = array();
		// $import_fields = array();
		// foreach( $this->fields as $option=>$field ) {
		// 	if ( $field[ 'type' ] == 'import' ) {
		// 		$import_fields[] = $field[ 'id' ];
		// 	}
		// }

		// echo '<pre>';
		// var_export($import_fields);
		// echo '</pre>';

		// echo '<pre>';
		// var_export( $input );
		// echo '</pre>';
		// die();

		// echo '<pre>';
		// var_export($_REQUEST);
		// echo '</pre>';
		// echo '<pre>';
		// var_export($_POST);
		// echo '</pre>';

		// echo '<pre>';
		// var_export( $this->fields );
		// echo '</pre>';

		foreach ( $this->fields as $fields=>$field ) {
			if ( $field[ 'type' ] == 'checkbox' ) {
				if ( ! isset( $input[ $field[ 'id' ] ] ) )
					$input[ $field[ 'id' ] ] = 'off';
			}
		}

		// echo '<pre>';
		// var_export($_POST);
		// echo '</pre>';
		if (
		isset( $_REQUEST ) && $_REQUEST[ 'action' ] == 'update' &&
			! empty( $_FILES ) &&
				$_FILES[ $this->db_prefix . '_options' ][ 'size' ][ 'options_import' ]
		) {

			$overrides = array( "test_form" => false, "mimes" => array( 'txt' => 'text/plain' ) );

			$files = array(
				"{$this->db_prefix}_options" => array(
					'options_import' => array(
			      'name' => false,
			      'type' => false,
			      'tmp_name' => false,
			      'error' => 0,
			      'size' => 0,
					)
				)
			);

			foreach( $_FILES[ $this->db_prefix . '_options' ]['error'] as $key=>$name ) {
					$files[ $this->db_prefix . '_options' ][ $key ][ 'name' ] = $_FILES[ $this->db_prefix . '_options' ][ 'name' ][ $key ];
					$files[ $this->db_prefix . '_options' ][ $key ][ 'type' ] = $_FILES[ $this->db_prefix . '_options' ][ 'type' ][ $key ];
					$files[ $this->db_prefix . '_options' ][ $key ][ 'tmp_name' ] = $_FILES[ $this->db_prefix . '_options' ][ 'tmp_name' ][ $key ];
					$files[ $this->db_prefix . '_options' ][ $key ][ 'error' ] = $_FILES[ $this->db_prefix . '_options' ][ 'error' ][ $key ];
					$files[ $this->db_prefix . '_options' ][ $key ][ 'size' ] = $_FILES[ $this->db_prefix . '_options' ][ 'size' ][ $key ];
				}


			if ( isset( $files[ $this->db_prefix . '_options' ][ 'options_import' ] ) &&  $files[ $this->db_prefix . '_options' ][ 'options_import' ]['size'] > 0 ) {
				$file = wp_handle_upload( $files[ $this->db_prefix . '_options' ][ 'options_import' ], $overrides );
				if ( isset( $file[ 'error' ] ) )
					wp_die( '<h2>Wait.. What??</h2><pre>' . $file[ 'error' ] . "</pre>\n\n<p>" . __( 'Please try only with exported options text file. No tricks, Mister!', 'idq-general' ) );


				$input = $this->handle_import( $file[ 'file' ] );
			}


		}
		// echo '<pre>';
		// echo 'Exporting : $input' . "\n";
		// echo "====================\n";
		// var_export($input);
		// echo '</pre>';
		return $input;
	}

	/**
	 *
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function handle_import( $file ) {
		if ( ! $file ) return false;

		$contents = file_get_contents( $file );

		$import = str_replace( array( '<%' . $this->db_prefix .  ':OPTIONS:start%>', '<%' . $this->db_prefix .  ':OPTIONS:end%>' ), "", $contents );

		$import = unserialize( base64_decode( $import ) );

		if ( ! is_array( $import ) ) return false;

		return $import;
	} // END function handle_import


	public function provide_help( $input ) {

		$screen = get_current_screen();

		if ( ! is_array( $this->help_tabs ) ) return;

		foreach( (array)$this->help_tabs as $help=>$tab ) {
			if ( ! isset( $tab[ 'id'] ) || !isset( $tab[ 'title' ]) || ! isset( $tab[ 'content' ] ) ) continue;
			$screen->add_help_tab( array(
				'id' => strip_tags($tab[ 'id' ]),
				'title' => $tab['title'],
				'content' => $tab['content']
			));

		}


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

	public function set_help_tabs( $help_tabs=array() ) {
		return $this->help_tabs = $help_tabs;
	}


} // END class kav_admin_options.

} // END if class_exists check for kav_admin_options.
?>
