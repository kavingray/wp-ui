<?php
header( 'Content-type: text/css' );
header( 'Cache-Control: must-revalidate' );
$offset = 72000;
header( "Expires: " . gmdate( "D, d M Y H:i:s", time() + 72000) . " GMT");

$load_styles = addslashes( $_GET['styles'] );

$styles_arr = explode( "|", $load_styles );

if ( $load_styles == 'all' ) {
	$css_content = @file_get_contents( 'themes/wpui-all.css' );
	exit;
} else {
	if ( !is_array( $styles_arr ) ) exit;
	$css_content = '';
	foreach( $styles_arr as $styles ) {
		// @readfile( 'themes/' . $styles . '.css' ) . "\n\n";
		$css_content .= @file_get_contents( 'themes/' . $styles . '.css' ) . "\n\n";

		// echo '@import "themes/' . $styles . '.css"' . "\n\n";
	}
}
if ( ! empty( $css_content ) ) {
	echo str_ireplace( array( 'url("images', 'url( "images', "url('images", "url( 'images" ), 
					array( 'url("themes/images', 'url( "themes/images', "url('themes/images", "url( 'themes/images" ), $css_content );
}


exit; // Dont remove.
?>