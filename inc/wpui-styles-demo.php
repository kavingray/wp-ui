<?php
/**
 *	WP UI Styles Demo
 *
 *		Demo the styles
 *
 *
 *
 * @since $Id$
 * @package wp-ui
 * @subpackage wpui-styles-demo
 **/
?>
<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php wp_head(); ?>
<script src="<?php echo wpui_url(); ?>/js/wpui-styles-demo.js" type="text/javascript"></script>

<script type="text/javascript">
if ( typeof wpuiJQ == 'undefined' ) {
	var wpuiJQ = jQuery.noConflict();
}

// if ( typeof jQuery.fn.wpuiThemeSwitcher != 'undefined' ) {

setTimeout(function () {
		jQuery( '#wpui-theme-switcher-trigger' )
			.wpuiThemeSwitcher( <?php echo json_encode( wpui_get_skins_list() ) ?> );
}, 200);

// }


var wpui_submit_form = function() {
	var win = window.dialogArguments || opener || parent || top;
	parent.jQuery( '#tab_scheme' ).val( document.forms[ 0 ].wpui_selected_style.value );
	parent.jQuery.fn.colorbox.close();
	parent.document.forms[ 0 ].submit();
	return false;
};

</script>
</head>
<body <?php body_class(); ?>>
<div id="page" class="page-plain">
	<div class="wpui-demo-overlay">
		<div class="wpui-demo-loading"><span>Loading WP UI - Styles Demo</span></div>
	</div>
	<!-- content -->
		<article>
			<header class="entry-header">
				<h1 class="entry-title">WP UI themes Demo</h1>
			</header>


	<form onsubmit="wpui_submit_form()" action="#">

	<div class="entry-content">
		<p>Try WP UI and jQuery UI themes here.<br>
	<span id="wpui-theme-switcher-trigger"></span>

	<input class="wpui-style-demo-submit" type="submit" value="Choose this skin" id="submit"/>
	</p>

	<div class="wpui-demo-wrap wpui-demo-wrap-1 "><p></p>
	<h2 id="wpui-styles-demo-tabs-title">Tabs</h2>
	<p></p><div id="wp-tabs-1" class="wp-tabs wpui-light wpui-styles wpui-tabs-horizontal tabs-single-line-false" data-style="wpui-light"><h3 class="wp-tab-title">Writing</h3> <div class="wp-tab-content"><div class="wp-tab-content-wrapper"><p></p>
	<div class="wp-caption" style="width: 130px; float: right; clear: right;"><img alt="Image by Dr.Bala" src="http://kav.in/demo/ex3.jpg" width="120"><p></p>
	<p class="wp-caption-text">The child by <a href="http://500px.com/photonforge" target="_blank">Photonforge</a></p>
	</div>
	<p>Sed tristique ipsum eget feugiat mollis. Morbi euismod porttitor fermentum. Aenean quis arcu quis ipsum venenatis vulputate. Aenean accumsan, turpis ac fringilla rhoncus, est libero iaculis magna, et eleifend augue massa sed turpis. Ut sed gravida urna. Duis malesuada nibh eu risus eleifend auctor. Quisque semper nisl sed blandit feugiat. Aenean placerat leo quis sapien lacinia facilisis.</p>
	<p></p></div></div><!-- end div.wp-tab-content --> <h3 class="wp-tab-title">Quotes</h3> <div class="wp-tab-content"><div class="wp-tab-content-wrapper">A blockquote!<p></p>
	<blockquote><p>
	Pellentesque eget tortor sit amet lorem faucibus ullamcorper. Proin est lectus, ullamcorper sit amet nisl ut, cursus dignissim nulla. Nam est ligula, dignissim sit amet tincidunt sed, tempus id sapien. </p></blockquote>
	<p>And some trailing text.</p></div></div><!-- end div.wp-tab-content --><br>
	<h3 class="wp-tab-title">Align</h3> <div class="wp-tab-content"><div class="wp-tab-content-wrapper"><br>
	Left-aligned image with no caption, and text before and after. <img style="margin: 10px;" alt="" src="http://wpthemetestdata.files.wordpress.com/2008/09/test-image-landscape.jpg" width="300" height="199" align="left"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed odio nibh, tincidunt adipiscing, pretium nec, tincidunt id, enim. Fusce scelerisque nunc vitae nisl. Quisque quis urna in velit dictum pellentesque. Vivamus a quam. </div></div><!-- end div.wp-tab-content --><br>
	</div><!-- end div.wp-tabs --><br>
	</div>
	<div class="wpui-demo-wrap wpui-demo-wrap-2 "><p></p>
	<h2 id="wpui-styles-demo-accordion-title">Accordion</h2>
	<p></p><div id="wp-accordion-2" class="wp-accordion wpui-light wpui-styles wpui-tabs-horizontal" data-style="wpui-light"><h3 class="wp-tab-title">Writing</h3> <div class="wp-tab-content"><div class="wp-tab-content-wrapper"><p></p>
	<div class="wp-caption" style="width: 130px; float: right; clear: right;"><img alt="Image by Dr.Bala" src="http://kav.in/demo/ex3.jpg" width="120"><p></p>
	<p class="wp-caption-text">The child by <a href="http://500px.com/photonforge" target="_blank">Photonforge</a></p>
	</div>
	<p>Sed tristique ipsum eget feugiat mollis. Morbi euismod porttitor fermentum. Aenean quis arcu quis ipsum venenatis vulputate. Aenean accumsan, turpis ac fringilla rhoncus, est libero iaculis magna, et eleifend augue massa sed turpis. Ut sed gravida urna. Duis malesuada nibh eu risus eleifend auctor. Quisque semper nisl sed blandit feugiat. Aenean placerat leo quis sapien lacinia facilisis.</p>
	<p></p></div></div><!-- end div.wp-tab-content --> <h3 class="wp-tab-title">Quotes</h3> <div class="wp-tab-content"><div class="wp-tab-content-wrapper">A blockquote!<p></p>
	<blockquote><p>
	Pellentesque eget tortor sit amet lorem faucibus ullamcorper. Proin est lectus, ullamcorper sit amet nisl ut, cursus dignissim nulla. Nam est ligula, dignissim sit amet tincidunt sed, tempus id sapien. </p></blockquote>
	<p>And some trailing text.</p></div></div><!-- end div.wp-tab-content --><br>
	<h3 class="wp-tab-title">Align</h3> <div class="wp-tab-content"><div class="wp-tab-content-wrapper"><br>
	Left-aligned image with no caption, and text before and after. <img style="margin: 10px;" alt="" src="http://wpthemetestdata.files.wordpress.com/2008/09/test-image-landscape.jpg" width="300" height="199" align="left"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed odio nibh, tincidunt adipiscing, pretium nec, tincidunt id, enim. Fusce scelerisque nunc vitae nisl. Quisque quis urna in velit dictum pellentesque. Vivamus a quam. </div></div><!-- end div.wp-tab-content --><br>
	</div><!-- end div.wp-tabs --><br>
	</div>
	<div class="wpui-demo-wrap wpui-demo-wrap-3 "><p></p>
	<h2 id="wpui-styles-demo-spoiler-title">Spoiler</h2>
	<p></p><div id="wp-spoiler-1" class="wp-spoiler wpui-hashable wpui-light wpui-styles" data-style="wpui-light">  <h3 class="wp-spoiler-title wpui-hashable fade-true slide-true open-false" id="SDSDDSSDSD">Writing</h3><div class="wpui-hidden wp-spoiler-content">
	<div class="wp-caption" style="width: 130px; float: right; clear: right;"><img alt="Image by Dr.Bala" src="http://kav.in/demo/ex3.jpg" width="120"><p></p>
	<p class="wp-caption-text">The child</p>
	</div>
	<p>All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother. I suppose she must have looked rather delightful, for Mrs. Darling put her hand to her heart and cried, “Oh, why can’t you remain like this for ever!” This was all that passed between them on the subject, but henceforth Wendy knew that she must grow up. You always know after you are two. Two is the beginning of the end.</p></div>  </div><!-- end div.wp-spoiler --><p></p>
	<p></p></div>
	<div class="wpui-demo-wrap wpui-demo-wrap-4 "><p></p>
	<h2 id="wpui-styles-demo-dialog-title">Dialog</h2>
	<p><a data-style="wpui-light" class="wpui-button wpui-light wpui-open-dialog" id="wpui-button-1" rel="wp-dialog-1" href="#" onclick="">Show Information</a><script type="text/javascript">wpuiJQ( function() {wpuiJQ(  "#wpui-button-1" ).button({icons : {primary : "ui-icon-newwin"},});});</script></p><div id="wp-dialog-1" class="wp-dialog wp-dialog-1 wpui-light wpui-styles" title="Awesome Dialog" data-style="wpui-light"><p></p>
	<p>Nulla vulputate ullamcorper nulla, quis semper risus eleifend sed. Etiam et ligula gravida, sagittis nibh non, cursus felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec faucibus ipsum. Maecenas quis magna ac nisl laoreet vestibulum. Sed eget ligula faucibus, fermentum quam eget, aliquet felis. Maecenas quis est aliquam, cursus tellus vitae, porttitor turpis. Integer lobortis, diam ut convallis posuere, massa nisl aliquam mauris, non facilisis magna orci et urna. Integer eu fringilla velit. Maecenas ut nibh lorem. Quisque arcu sem, pulvinar quis hendrerit nec, rutrum ut elit.</p>
	<p></p></div><!-- end .wp-dialog --><script type="text/javascript">
	wpuiJQ( function() {
	wpDialogArgs1 = JSON.parse('{"dialogClass":"wpui-light wpui-styles","width":"300px","height":"auto","autoOpen":false,"show":null,"hide":null,"modal":false,"resizable":true,"draggable":true,"closeOnEscape":true,"position":["center"]}');
	wpuiJQ(  "#wp-dialog-1" ).dialog( wpDialogArgs1 );  });
	wpuiJQ(  "#wp-dialog-1" ).attr( "data-style", "wpui-light" );
	wpuiJQ( ".wpui-open-dialog" ).live( "click", function() {
	var tisRel = wpuiJQ(  this ).attr( "rel" );
	wpuiJQ(  "#" + tisRel ).dialog( "open" );
	return false;
	});
	</script>
	</div>
						</div><!-- .entry-content -->

						<input type="hidden" id="wpui_selected_style" name="wpui_selected_style" />

			</form>
		</article><!-- #post -->

			<!-- </div>
		</div> -->


				<div style="clear : both;"></div>
	</div>





	<!-- end content  -->
</div><!-- #page -->
<style type="text/css">

.page-plain {
/*  height: 100%;*/
}

.page-template-page-demo-php {
	margin-top : -28px;
}

.page-template-page-demo-php #wpadminbar {
	margin-top : none;
	display : none;
}

.page-plain header {
	padding: 20px;
	background: rgba( 255, 255, 255, 0.2 );
	font-size: normal;
	background: -moz-linear-gradient( top, #DEDEDE, #E0E0E0 10%, #EFEFEF);
	background: -webkit-linear-gradient( top, #DEDEDE, #E0E0E0 10%, #EFEFEF);
	background: -o-linear-gradient( top, #DEDEDE, #E0E0E0 10%, #EFEFEF);
	background: -ms-linear-gradient( top, #DEDEDE, #E0E0E0 10%, #EFEFEF);
	background: linear-gradient( top, #DEDEDE, #E0E0E0 10%, #EFEFEF);
	text-align: center;
	box-shadow: 0 1px 0 #FFF, 0 2px 2px rgba( 0, 0, 0, 0.07 );
	text-transform: uppercase;

}

.page-plain header h1 {
	font-size : normal;

}

.page-plain h1,
.page-plain h2 {
	text-shadow : 0 1px 0 #FFF;
	color : #777;
}

.page-plain .entry-content {
	max-width : 1000px;
	margin : auto;
	overflow : hidden;
}

.page-plain .entry-content > p {
	text-align : center;
}

.page-plain .wpui-demo-wrap {
	width: 46%;
	float: left;
	margin: 10px;
	min-height: 500px;
	background: rgba( 255,255,255,0.3);
	padding: 20px;
	box-shadow : 6px 8px 0 rgba( 0, 0, 0, 0.02 );
	-moz-box-sizing : border-box;
	-webkit-box-sizing : border-box;
	-o-box-sizing : border-box;
	-ms-box-sizing : border-box;
	box-sizing : border-box;
}

.page-plain .wpui-demo-wrap-3 {
	clear: left;
}

.page-plain .wpui-demo-wrap-4 {
	text-align : center;
}

.page-plain .wpui-demo-wrap > h2 {
	text-align : center;
	margin-top : 0px;
}


@media (max-width : 768px ) {
	.entry-content {
		min-width : 300px;
		padding : 50px;
	}
	.page-plain .wpui-demo-wrap {
		width : 100%;
		margin : 10px 0;
/*		padding : 0px;*/
	}
}
/*article {
	position : relative;
	top : -10000em;
}*/
body, html {
  background : #e6e6e6;
  background : url( <?php echo wpui_url(); ?>images/pattern-gray.png ) repeat #FFFEFF;
}

div.wpui-demo-overlay {
	display : none;
}

/*
div.wpui-demo-overlay {
	position: fixed;
	background: url( <?php echo wpui_url(); ?>images/pattern-gray.png ) rgba(0,0,0,0.4);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index : 10002;
}

div.wpui-demo-loading {
	background : rgba( 255, 255, 255, 0.5);
	padding: 20px;
	text-align: center;
	margin-top: 15%;
	width: 300px;
	box-shadow: 6px 6px 0 rgba( 0, 0, 0, 0.15 );
	margin: 15% auto;
}

div.wpui-demo-loading span {
	background: url( "<?php echo wpui_url(); ?>images/wpspin_light.gif") no-repeat;
	padding-left : 20px;
	color : #555;
	text-shadow : 0 1px 0 #EEE;
}*/
input[type="submit"].wpui-style-demo-submit {
	font-size : 14px;
	padding : 0.4em;
}
</style>
<script type="text/javascript">
jQuery( window ).load( function() {

	// jQuery( '.wpui-demo-overlay' ).slideUp();

	jQuery( '#wpui-styles-demo-select' ).change( function() {
		jQuery( "#wpui_selected_style" ).val( jQuery( this ).val() );
	});

	parVal = parent.jQuery( '#tab_scheme' ).val();

	if ( typeof parVal != 'undefined' ) {
		jQuery( '#wpui-styles-demo-select' )
			.val( parent.jQuery( '#tab_scheme' ).val() )
			.trigger( 'change' );
	}



});
</script>
<?php wp_footer(); ?>
</body>
</html>