<?php
/**
 *	Buttons!
 *	
 *	Implement jQuery UI powered buttons with wp-ui goodness.
 *	
 *	
 *		
 * @since $Id$
 * @package wp-ui
 * @subpackage wpui-button
 **/



add_shortcode( 'wpui_button', 'wpui_button_shortcode' );
/**
 * Buttons
 **/
function wpui_button_shortcode( $atts, $content=null )
{
	extract( shortcode_atts( array( 
			'type'		=>	'link',
			'url'		=>	false,
			'label'		=>	'',
			'primary'	=>	null,
			'secondary'	=>	null,
			'text'		=>	true,
			'style'		=>	false,
			'class'		=>	'',
			'onclick'	=>	'',
			'rel'		=>	''
		), $atts));
	
	static $wpui_button_id = 1;
	
	$options = get_option( 'wpUI_options' );
	
	$attr = array();
	
	if ( ! $style && isset( $options[ 'tab_scheme' ] ) )
		$style =  $options[ 'tab_scheme' ];
	
	$attr[ 'data-style' ] = $style;
	
	$attr[ 'class' ] = 'wpui-button ' . $style . ' ' . $class;
	
	$attr[ 'id' ] = 'wpui-button-' . $wpui_button_id;
	 
	$attr[ 'rel' ] = $rel;
	
	if ( $label == '' && $content != '' )
		$label = $content;
		
	if ( ! $url ) return;
		
	$attr = wpui_get_html_attrs( $attr );	
		
	if ( $type == 'link' ) {
		// $output = '<a id="wpui-button-' . $wpui_button_id . '" class="wpui-button ' . $style . '  ' . $class . '" href="' . $url . '" rel="' . $rel . '" onclick="' . $onclick . '">' . $label . '</a>';
		$output = '<a ' . $attr .  ' href="' . $url . '" onclick="' . $onclick . '">' . $label . '</a>';
	} else {
		// $output = '<button id="wpui-button-' . $wpui_button_id . '" rel="' . $rel . '" class="wpui-button" onclick="window.location.href=\'' . $url . '\'">' . $label . '</a>';
		$output = '<button ' . $attr .  ' onclick="window.location.href=\'' . $url . '\'">' . $label . '</a>';
	}
	
	$output .= '<script type="text/javascript">';
	$output .= 'wpuiJQ( function() {';
	$output .= 'wpuiJQ(  "#wpui-button-' . $wpui_button_id  . '" ).button({';
	if ( $primary ) {
		$output .= 'icons : {';
		$output .= 'primary : "' . $primary . '"';
		if ( $secondary )
			$output .= ', secondary : "' .  $secondary . '",';
		$output .= '},';
	}
	if ( $text !== true ) {
		$output .= 'text : false';
	}
	$output .= '});';
	$output .= '});';
	$output .= "</script>";	
	$wpui_button_id++;
	return $output;
} // END wpui_button_shortcode
 





?>