<?php
/**
 *	WP UI Widgets.
 *
 *	Tabs and accordions for the widget areas. Rewritten.
 *
 *
 *
 * @since $Id$
 * @package wp-ui
 * @subpackage widgets
 **/



class Wpui_Base_Widget extends WP_Widget {

	function __construct() {
		add_action( 'admin_print_scripts-widgets.php', array( &$this, 'wpui_widget_scripts' ) );

	}

	// function wpui_core_Widget() {
	// 	// $widget_ops = array( 'classname' => 'wpui_core', 'description' => 'WP UI manual widget' );
	// 	// $control_ops = array( 'width' => 430, 'height' => 250, 'id_base' => 'wpui_core' );
	// 	// $this->WP_Widget( 'wpui_core', 'WP UI Base', $widget_ops, $control_ops );
	//
	//
	// }

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;

		return $new_instance;
	}

	function wpui_widget_scripts() {
		$deps = array( 'jquery', 'jquery-ui-core', 'jquery-ui-tabs' );
		wp_register_script( 'wpui-script-before', site_url( '?wpui-script=before' ), $deps );
		
		wp_enqueue_script( 'wpui-widgets-tabs', wpui_url( 'js/select/tabs.js' ), array( 'wpui-script-before' ), WPUI_VER );
		wp_enqueue_script( 'wpui-widgets-tabs-init', wpui_url( 'js/select/init.js' ), array( 'wpui-script-before' ), WPUI_VER );
		wp_enqueue_script( 'wpui-widgets-remix', wpui_url( 'js/widgets.js' ), array( 'wpui-script-before' ), WPUI_VER );
		wp_enqueue_style( 'wpui-widgets-remix-style', wpui_url( 'css/widgets.css' )  );
	} // end wpui_widget_scripts


	function form( $instance ) {
		$defaults = array(
			'title'  => 'WP UI Widget',
			'type'   =>	'tabs',
			'number' =>	4,
			'style'  =>	'default'
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<div class="wpui-base-widget-options">

			<!-- .wpui-widget-input-group -->
			<div class="wpui-widget-input-group">
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e("Title"); ?></label>
				<input id="<?php echo $this->get_field_id( 'title' ); ?>" size="10" class="widefat" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" style="width:auto;" />
			</div>
			<!-- /.wpui-widget-input-group -->


			<?php
			// Type of widget.
			?>

			<!-- .wpui-widget-input-group -->
			<div class="wpui-widget-input-group">
				<label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( "Type" ); ?></label>
				<select name="<?php echo $this->get_field_name( 'type' ); ?>" id="<?php echo $this->get_field_id( 'type' ); ?>">
					<option value="tabs" <?php selected( $instance[ 'type' ], 'tabs' ); ?>>Tabs</option>
					<option value="accordion" <?php selected( $instance[ 'type' ], 'accordion' ); ?>>Accordion</option>
					<option value="spoiler" <?php selected( $instance['type'], 'spoiler') ?> >Spoilers</option>
				</select>
			</div>
		<!-- /.wpui-widget-input-group -->

			<?php
			// Number of pages.
			?>
			<!-- .wpui-widget-input-group -->
			<div class="wpui-widget-input-group">
				<label for="<?php echo $this->get_field_id( 'number' ); ?>"><?php _e( "Number", 'wp-ui' ); ?></label>

				<select id="<?php echo $this->get_field_id( 'number' ); ?>" name="<?php echo $this->get_field_name( 'number' ) ?>">
					<?php for( $a=2; $a < 10; $a++ ) { ?>
						<option value="<?php echo $a ?>" <?php selected( $instance[ 'number' ], $a ) ?>><?php echo $a ?></option>
					<?php } ?>
				</select>

			</div>
		<!-- /.wpui-widget-input-group -->

			<?php
			// Skins.
			$skins_list = wpui_get_skins_list();
			?>
			<!-- .wpui-widget-input-group -->
			<div class="wpui-widget-input-group">
				<label for="<?php echo $this->get_field_id( 'style' ); ?>"><?php _e( "Style", 'wp-ui' ); ?></label>

				<select id="<?php echo $this->get_field_id( 'style' ) ?>" name="<?php echo $this->get_field_name( 'style' ) ?>">
					<option value="default">Default</option>
					<?php
					foreach( $skins_list as $skin=>$name ) {
						if ( stristr( $skin, 'startoptgroup' ) ) {
							echo '<optgroup label="' . $name . '">';
						} else if ( stristr( $skin, 'endoptgroup') ) {
							echo '</optgroup>';
						} else {
						$sel = ( $instance[ 'style' ] == $skin ) ? ' selected="selected"' : '';
						echo '<option value="' . $skin . '"' . $sel . '>' . $name . '</option>';
						}
					}
					?>
				</select>
			</div>
			<!-- /.wpui-widget-input-group -->

			<!-- .wpui-widget-input-group -->
			<div class="wpui-widget-input-group">
				<label for="<?php echo $this->get_field_id( 'arguments' ) ?>">Additional Arguments for the main shortcode</label><input type="text" class="widefat" name="<?php echo $this->get_field_name( 'arguments' ) ?>" value="<?php echo $instance[ 'arguments' ]; ?>" id="<?php echo $this->get_field_id( 'arguments' ) ?>" >
			</div>
			<!-- /.wpui-widget-input-group -->




		</div><!-- /.wpui-base-widget-options -->



	<?php
	}
}

function wpui_widget_func() {
	register_widget( 'wpui_manual_Widget' );
	register_widget( 'Wpui_Posts_Widget' );
}

add_action( 'widgets_init', 'wpui_widget_func' );

class wpui_manual_Widget extends Wpui_Base_Widget {

	function wpui_manual_Widget() {
		$widget_ops = array( 'classname' => 'wpui-manual', 'description' => 'Tabs, Accordions or spoilers.' );
		$control_ops = array( 'width' => 600, 'height' => 250, 'id_base' => 'wpui-manual' );
		$this->WP_Widget( 'wpui-manual', 'WP UI Manual', $widget_ops, $control_ops );

		parent::__construct();
	}



	function widget( $args, $instance ) {
		extract( $args );
		echo $before_widget;
		$title = apply_filters('widget_title', $instance['title'] );
		if ( !empty($title) ) {
			echo $before_title . $title . $after_title;
		}

		// echo '<pre>';
		// echo 'Exporting : $instance' . "\n";
		// echo "====================\n";
		// var_export($instance);
		// echo '</pre>';

		$scode = '';

		if ( $instance[ 'type' ] == 'spoiler' ) {
			foreach ($instance[ 'entries' ] as $item ) {
				$scode .= '[wpspoiler ';
				if ( $instance[ 'arguments' ] )
					$scode .= $instance[ 'arguments' ];
				$scode .= ' name="' . $item[ 'title' ] . '"] ' . $item[ 'content' ] . '[/wpspoiler]';
			}

		} else {

			$scode .= '[wptabs ';
			if ( $instance[ 'type' ] == 'accordion' )
			$scode .= 'type="accordion" ';
			if ( $instance[ 'arguments' ] )
				$scode .= $instance[ 'arguments' ];
			$scode .= '] ';
			foreach( $instance[ 'entries' ] as $item ) {
				$scode .= '[wptabtitle]' . $item[ 'title' ] . '[/wptabtitle] ';
				$scode .= '[wptabcontent] ' . $item[ 'content' ] . '[/wptabcontent] ';
			}

			$scode .= '[/wptabs]';
		}

		echo do_shortcode( $scode );



		echo $after_widget;
	}

	function form( $instance ) {
		$defaults    = array(
			'title'     => 'WP UI Widget',
			'type'      =>	'tabs',
			'number'    =>	2,
			'style'     =>	'default',
			'arguments' => '',
			'entries'   => array()
		);

		$instance = wp_parse_args( (array) $instance, $defaults );

		for ( $k = 0; $k < $instance[ 'number' ]; $k++ ) {
			if ( empty( $instance[ 'entries' ][ $k ] ) ) {
				$instance[ 'entries' ][ $k ][ 'title' ] = 'Title ' . ($k + 1);
				$instance[ 'entries' ][ $k ][ 'content' ] = 'content of ' . ($k + 1);
			}
		}


		$instance = wp_parse_args( (array) $instance, $defaults );

		?>
		<!-- .wpui-widget-left -->
		<div class="wpui-widget-left">

		<?php parent::form( $instance ); ?>

		</div>
		<!-- /.wpui-widget-left -->




		<!-- .wpui-widget-right -->
		<div class="wpui-widget-right">





		<!-- ><p class="wpui-widget-warning">Please reload the page in case widget doesn't work.</p> -->
		<!-- #wpui-widget-editors -->
		<div class="wpui-editors">
		<?php

		for ( $k = 0; $k < $instance[ 'number' ]; $k++ ) {
			echo '<h3 class="wp-tab-title">Slide ' . ( $k + 1 ) . '</h3>';
			echo '<div class="wp-tab-content" id="wpui-editor-' . $k . '">';
			echo '<label for="' . $this->get_field_id( 'entries-' . $k . '-title' ) . '" >Title of the slide</label><input class="widefat" type="text" id="' . $this->get_field_id( 'entries-' . $k . '-title' ) . '" name="' . $this->get_field_name( 'entries][' . $k . '][title' ) . '" value="' . $instance[ 'entries' ][ $k ][ 'title' ] .  '" />';

			echo '<label for="' . $this->get_field_id( 'entries-' . $k . '-content' ) . '">Content</label>';
			echo '<textarea class="widefat" rows="10" name="' . $this->get_field_name( 'entries][' . $k . '][content' ) . '" id="' . $this->get_field_id( 'entries-' . $k . '-content' ) . '">' . $instance[ 'entries' ][ $k ][ 'content' ] . '</textarea>';



			// wp_editor( $instance[ 'entries' ][ $k ][ 'content' ], $this->get_field_id( 'entries-' . $k . '-content' ), array(
			// 	'editor_class'	=>	'wpui-editor',
			// 	'textarea_name'	=>	$this->get_field_name( 'entries][' . $k . '][content' ),
			// 	'rows'	=>	20,
			// ));

			echo '</div><!-- end wpui-editor-holder -->';
		}

		?>
		</div>
		<!-- /#wpui-widget-editors -->


		</div>
		<!-- /.wpui-widget-right -->
		<?php

	}
}




/**
 * WP UI Posts widget.
 *
 * @package default
 * @author Kavin Gray
 **/
class Wpui_Posts_Widget extends Wpui_Base_Widget
{

	/**
	 * Construct.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function Wpui_Posts_Widget() {
		$widget_ops = array( 'classname' => 'wpui-posts', 'description' => 'Tabs, Accordions or spoilers - From posts.' );
		$control_ops = array( 'width' => 600, 'height' => 250, 'id_base' => 'wpui-posts' );
		$this->WP_Widget( 'wpui-posts', 'WP UI Posts', $widget_ops, $control_ops );

		parent::__construct();
	} // END function Wpui_Posts_Widget


	function widget( $args, $instance ) {
		extract( $args );
		echo $before_widget;
		$title = apply_filters('widget_title', $instance['title'] );
		if ( !empty( $title ) ) {
			echo $before_title . $title . $after_title;
		}

		$scode = '[';

		// echo '<pre>';
		// echo 'Exporting : $instance' . "\n";
		// echo "====================\n";
		// var_export($instance);
		// echo '</pre>';

		if ( $instance[ 'type' ] == 'spoiler' ) {
			include_once( wpui_dir( 'inc/class-wpui-posts.php' ) );
			$wpuiPosts = new wpuiPosts();

			$query = array();

			if( isset( $instance[ 'search_type' ] ) ) {
				$stype = $instance[ 'search_type' ];

				if ( $stype == 'cat' || $stype == 'tag' ) {
					if ( empty( $instance[ 'selected' ] ) )
						return;
					$query[ $stype ] = $instance[ 'selected' ];
				}

				if ( $stype == 'recent' || $stype == 'random' || $stype == 'popular' ) {
					$query[ 'get' ] = $stype;
				}
			}

			if ( ! empty( $instance[ 'number' ] ) ) {
				$query[ 'number' ] = $instance[ 'number' ];
			}

			$cusPosts = $wpuiPosts->wpui_get_posts( $query );

			foreach ($cusPosts as $key => $posty) {
				$scode .= 'wpspoiler name="' . $posty[ 'title' ] . '"]' . $posty[ 'content' ];
				if ( !empty ( $instance[ 'arguments' ] ) )
					$scode .= $instance[ 'arguments' ];
				$scode .= '[/wpspoiler]';
			}


		} else {
			$scode .= 'wptabposts ';
			if ( $instance[ 'type' ] == 'accordion' )
				$scode .= ' type="accordion"';


			if( isset( $instance[ 'search_type' ] ) ) {
				$stype = $instance[ 'search_type' ];

				if ( $stype == 'cat' || $stype == 'tag' ) {
					if ( empty( $instance[ 'selected' ] ) )
						return;
					$scode .= ' ' . $stype . '="' . $instance[ 'selected' ] . '"';
				}

				if ( $stype == 'recent' || $stype == 'random' || $stype == 'popular' ) {
					$scode .= ' get="' . $stype . '"';
				}
			}


			if ( isset( $instance[ 'style' ] ) && $instance[ 'style' ] !== 'default' ) {
				$scode .= ' style="' . $instance[ 'style' ] . '"';
			}


			if ( isset( $instance[ 'template' ] ) && $instance[ 'template' ] !== '1' ) {
				$scode .= ' template="' . $instance[ 'template' ] . '"';
			}


			if ( ! empty( $instance[ 'number' ] ) ) {
				$scode .= ' number="' . $instance[ 'number' ] . '"';
			}

			if ( ! empty( $instance[ 'names' ] ) ) {
				$scode .= ' names="' . $instance[ 'names' ] . '"';
			}

			if ( !empty ( $instance[ 'arguments' ] ) )
				$scode .= $instance[ 'arguments' ];

			$scode .= '] [/wptabposts]';

		}

		// echo '<pre>';
		// echo 'Exporting : $scode' . "\n";
		// echo "====================\n";
		// var_export($scode);
		// echo '</pre>';

		// echo $scode;

		echo do_shortcode( $scode );


		echo $after_widget;
	}




	function form( $instance ) {
		$defaults    = array(
			'title'     => 'WP UI Posts',
			'type'      =>	'tabs',
			'number'    =>	2,
			'style'     =>	'default',
			'arguments' => '',
			'template'	=>	1,
			'selected'	=>	'',
			'search_field' => '',
			'search_type' => 'cat',
			'search_number'	=> 5,
			'names'	=>	''
		);
		$instance = wp_parse_args( (array) $instance, $defaults );
		?>

		<!-- .wpui-widget-left -->
		<div class="wpui-widget-left">

		<?php parent::form( $instance ); ?>

		<!-- .wpui-widget-input-group -->
		<div class="wpui-widget-input-group">
			<label title="Found on Options page -> Posts -> Template no." for="<?php echo $this->get_field_name( 'template' ); ?>">Template no.</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id('template') ?>" name="<?php echo $this->get_field_name( 'template' ) ?>" value="<?php echo $instance['template'] ?>"/>
		</div>
		<!-- /.wpui-widget-input-group -->

		<!-- .wpui-widget-input-group -->

		<!-- /.wpui-widget-input-group -->
		</div>
		<!-- /.wpui-widget-left -->


		<!-- .wpui-widget-right -->
		<div class="wpui-widget-right">

			<label>Search term, type and number to display</label>
			<!--<input type="text" length="10" id="wpui-search-field" name="wpui-search-field" value="" class="widefat" />-->
			<input class="widefat wpui-search-field" type="text" id="<?php echo $this->get_field_id( 'search_field' ); ?>" class="widefat" name="<?php echo $this->get_field_name( 'search_field' ) ?>"  value="<?php echo $instance[ 'search_field' ]; ?>" />
			<select class="wpui-search-type" id="<?php echo $this->get_field_id( 'search_type' ) ?>" name="<?php echo $this->get_field_name('search_type') ?>" value="<?php echo $instance['search_type'] ?>">

				<option value="cat" <?php selected( $instance['search_type'], 'cat'); ?>>Categories</option>
				<option value="tag" <?php selected( $instance['search_type'], 'tag'); ?>>Tag</option>
				<option value="recent" <?php selected( $instance['search_type'], 'recent'); ?>>Recent</option>
				<option value="popular" <?php selected( $instance['search_type'], 'popular'); ?>>Popular</option>
				<option value="random" <?php selected( $instance['search_type'], 'random'); ?>>Random</option>
			</select>
			<!-- <input type="text" id="wpui-search-number" class="widefat" name="wpui-search-number" style="width : 30px;" value="5" /> -->
			<input type="text" id="<?php echo $this->get_field_id( 'search_number' ); ?>" class="widefat wpui-search-number" name="<?php echo $this->get_field_name( 'search_number' ) ?>"  value="<?php echo $instance[ 'search_number' ]; ?>" />
			<?php $wpuiTNonce = wp_create_nonce( 'wpui-editor-tax-nonce' ); ?>
			<input type="hidden" id="wpui-editor-tax-nonce" value="<?php echo $wpuiTNonce; ?>">

			<input type="button" class="wpui-search-submit button-secondary" value="Search" />


			<!-- .widget-search-actions
			<div class="widget-search-actions">
				<span>
					<p>Are you sure you want to clear the current selection?</p>
				<p>
					<a class="button-primary widget-search-action widget-search-confirm" href="#">Confirm</a><a class="button-secondary widget-search-action widget-search-cancel" href="#">Cancel</a>
				</p>
				<p><input type="checkbox" id="widget-search-confirm-dontshow"><label>Dont show this again</label></p>
				</span>
			</div>
			 /.widget-search-actions -->


			<label title="Please don't alter this, unless you are sure. This will be the selected Taxonomy items separated with commas." for="<?php echo $this->get_field_name( 'selected' ); ?>">Currently Selected</label>
			<input type="text" readonly="readonly" class="widefat wpui-selected" id="<?php echo $this->get_field_id( 'selected' ); ?>" name="<?php echo $this->get_field_name('selected'); ?>" value="<?php echo $instance['selected'] ?>"/>

			<label for="<?php echo $this->get_field_name('names') ?>">Names for the tabs, separated by commas. This should match the number of posts selected. </label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id('names') ?>" name="<?php echo $this->get_field_name( 'names' ) ?>" value="<?php echo $instance['names'] ?>" />


		</div>
		<!-- /.wpui-widget-right -->
		<div class="wpui-clearer"></div>



		<?php

	} // END form instance.






} // END class Wpui_Posts_Widget extends Wpui_Base_Widget

// // update_option( 'sidebars_widgets' , null );
// echo '<pre>';
// echo 'Exporting : get_option( "sidebars_widgets")' . "\n";
// echo "====================\n";
// var_export(get_option( "sidebars_widgets"));
// echo '</pre>';


?>
