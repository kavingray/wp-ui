<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Choose your WPTabs options</title>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js"></script>
<script type="text/javascript" src="../wp-content/plugins/wp-ui/js/wp-ui.js"></script>
<link rel="stylesheet" href="../wp-content/plugins/wp-ui/wp-ui.css" media="screen">
<link rel="stylesheet" href="../wp-content/plugins/wp-ui/css/wpui-all.css" media="screen">
<script type="text/javascript">
jQuery(document).ready(function($) {
	jQuery('.wp-tabs').wptabs({
		h3Class			:		'h3.wp-tab-title',
		linkAjaxClass	:		'a.wp-tab-load',
		topNav			: 		true,
		bottomNav		: 		true
	});
	
	var i = 0;
	classList = new Array;
	classList[i++] = 'wpui-light';
	classList[i++] = 'wpui-blue';
	classList[i++] = 'wpui-red';
	classList[i++] = 'wpui-green';
	classList[i++] = 'wpui-dark';
	classList[i++] = 'wpui-achu';
	classList[i++] = 'wpui-quark';
	classList[i++] = 'wpui-cyaat9';
	classList[i++] = 'wpui-redmond';
	classList[i++] = 'wpui-sevin';
	classList[i++] = 'wpui-alma';
	classList[i++] = 'wpui-macish';
	classList[i++] = 'wpui-android';
	classList[i++] = 'wpui-safle';
	
	jQuery('#chosentab').tabsThemeSwitcher( classList );
});
</script>
<style type="text/css">
body {
	background: #C9D0DE;
	font: 12px 'Arial', sans-serif;
	margin: 0;
	padding: 0;
}
p.submit {
	text-align: center;
	margin: 20px auto;
}
p.submit #submit {
	background: -moz-linear-gradient(top, #7A8DA4, #425E7E);
	background: -webkit-gradient(linear, left top, left bottom, from(#7A8DA4), to(#425E7E));
	background: -webkit-linear-gradient(top, #7A8DA4, #425E7E);
	background: -o-linear-gradient(top, #7A8DA4, #425E7E);
	color: #C9D0DE;
	text-shadow: 0 -1px 0 #000;
	font-size: 1.1em;
	font-weight : bold;
	padding: 5px 10px;
	border: #1C3D5C 2px solid;
	border-radius          : 15px;
	-moz-border-radius     : 15px;
	-webkit-border-radius  : 15px;
	-o-border-radius       : 15px;
	box-shadow         : 0 1px 3px #28303D;
	-moz-box-shadow    : 0 1px 3px #3A7D9E;
	-webkit-box-shadow : 0 1px 3px #28303D;
	-o-box-shadow      : 0 1px 3px #28303D;
}
input#selected_skin {
	height: 1px;
}
p.submit #submit:hover {
	border-color: #FFF;
	color: #FFF;
}

p.submit #submit:active {
	border: 2px solid #FFF;
	box-shadow         : 0 2px 3px #28303D inset;
	-moz-box-shadow    : 0 2px 3px #28303D inset;
	-webkit-box-shadow : 0 2px 3px #28303D inset;
	-o-box-shadow      : 0 2px 3px #28303D inset;
}
.styler-title {
	background:#E2E2E2;
	background: rgba( 250, 250, 250, 0.5);
	margin-top: 0;
	padding: 10px;
	text-align:center;
	text-shadow: 0 1px 0 #FFF;
	color: #28303D;
	box-shadow         : 0 2px 5px #888;
	-moz-box-shadow    : 0 2px 5px #888;
	-webkit-box-shadow : 0 2px 5px #888;
	-o-box-shadow      : 0 2px 5px #888;
}
div.tab-top-nav a,
div.tab-bottom-nav a {
	padding: 4px 10px;
}
#chosentab {
	width: 500px;
	min-height: 400px;
	margin: 0 auto;
	text-align: center;
}
.ui-effects-transfer {
	border: #687D9E 1px dotted;
}
#chosentab > .wp-tabs {
	text-align: left;
}

#choosetabs {
	float:right;
	width: 100%;
}

#choosetabs div.skin_name {
	min-height: 16px !important;
	margin: 2px !important;
}

#choosetabs .stacklist {
    list-style: none outside none;
    margin: 0 auto;
    position: relative;
    width: 550px;
}

#choosetabs .stacks {
	position: relative;
	width: 130px;
	height: 100px;
	float: left;
}

#choosetabs .stacks img {
	width: 100px;
	text-align:center;
	border: 6px solid #FFF;
	box-shadow         : 0 1px 2px #999;
	-moz-box-shadow    : 0 1px 2px #999;
	-webkit-box-shadow : 0 1px 2px #999;
	-o-box-shadow      : 0 1px 2px #999;
	position: absolute;
	top: 10px;
	left:10px;
	-ms-interpolation-mode : 'bicubic'
}

#choosetabs .stacks img.active {
	border: 6px solid #000;
	box-shadow         : 0 2px 4px #444;

}

#choosetabs {
	display: block;
	background:#E2E2E2;
	background: rgba( 250, 250, 250, 0.5);
	margin-top: 0;
	padding: 10px;
	text-align:center;
	text-shadow: 0 1px 0 #FFF;
	color: #28303D;
	box-shadow         : 0 2px 5px #888;
	-moz-box-shadow    : 0 2px 5px #888;
	-webkit-box-shadow : 0 2px 5px #888;
	-o-box-shadow      : 0 2px 5px #888;	
	bottom: 0;
	
}
.zero-hider {
	display: none;
}
</style>
<script type="text/javascript">
function submit_form() {
	var win = window.dialogArguments || opener || parent || top;
	win.send_to_editor(document.forms[0].selected_skin.value);
	return false;
}
</script>
</head>
<body class="options-noise">
<h2 class="styler-title">WP UI skin chooser</h2>
<p style="text-align: center; padding: 5px;">Welcome to WP UI Tabs for wordpress. Click any image or use the select box to preview the skins. Click "Choose this skin" to confirm.</p>

<form onsubmit="submit_form()" action="#">
<p class="submit"><input type="submit" value="Choose this skin" id="submit"/></p>
<?php 
/**
 * @TODO Remove this fn in the next version. Too much unorthodox.
 */
function get_plgn_url() {
	$plgn_url = 'http';
	if ( $_SERVER['HTTPS'] == 'on' )
			$plgn_url .= "s";
	$plgn_url .= "://";
	$script_url = str_ireplace('/'. basename(dirname(__FILE__)) . '/' . basename(__FILE__), '', $_SERVER['REQUEST_URI']);
	if ( $_SERVER['SERVER_PORT'] != '80' ) {
		$plgn_url .= $_SERVER["SERVER_NAME"].":".$_SERVER['SERVER_PORT'].$script_url;
	} else {
		$plgn_url .= $_SERVER['SERVER_NAME'] . $script_url;
	}
	return $plgn_url . '/';	
} // END function get_page_url.

$skins = array(
	'light'	=>	array(
		'slug'	=>	'light',
		'title'	=>	'WPUI light',
		'desc'	=>	'light!',
		'image'	=>  get_plgn_url() . 'images/preview/wpui-light.png'
	),


	'blue'	=>	array(
		'slug'	=>	'blue',
		'title'	=>	'WPUI Blue',
		'desc'	=>	'blue!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-blue.png'
	),	

	'red'	=>	array(
		'slug'	=>	'red',
		'title'	=>	'WPUI red',
		'desc'	=>	'red!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-red.png'
	),

	'green'	=>	array(
		'slug'	=>	'green',
		'title'	=>	'WPUI Green',
		'desc'	=>	'green!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-green.png'
	),


	'dark'	=>	array(
		'slug'	=>	'dark',
		'title'	=>	'WPUI dark',
		'desc'	=>	'dark!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-dark.png'
	),	

			
	'achu'	=>	array(
		'slug'	=>	'achu',
		'title'	=>	'WPUI Achu',
		'desc'	=>	'Awesome blend of colors - Peocock blue and green. Peaceful, exhilarating read.',
		'image'	=>	get_plgn_url() . 'images/preview/wpui-achu.png'
	),
	
	'quark'	=>	array(
		'slug'	=>	'quark',
		'title'	=>	'WPUI Quark',
		'desc'	=>	'Dark chocolaty theme.',
		'image'	=>	get_plgn_url() . 'images/preview/wpui-quark.png'
	),
	
	
	'redmond'	=>	array(
		'slug'	=>	'redmond',
		'title'	=>	'WPUI Redmond',
		'desc'	=>	'Right from redmond!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-redmond.png'
	),
	
	'cyaat9'	=>	array(
		'slug'	=>	'cyaat9',
		'title'	=>	'WPUI C ya at 9',
		'desc'	=>	'C Ya!!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-cyaat9.png'
	),


	'alma'	=>	array(
		'slug'	=>	'alma',
		'title'	=>	'WPUI Alma',
		'desc'	=>	'Alma',
		'image'	=> get_plgn_url() . 'images/preview/wpui-alma.png'
	),

	'macish'	=>	array(
		'slug'	=>	'macish',
		'title'	=>	'WPUI Macish',
		'desc'	=>	'macish',
		'image'	=> get_plgn_url() . 'images/preview/wpui-macish.png'
	),

	'safle'	=>	array(
		'slug'	=>	'safle',
		'title'	=>	'WPUI safle',
		'desc'	=>	'safle!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-safle.png'
	),
	
	'android'	=>	array(
		'slug'	=>	'android',
		'title'	=>	'WPUI android',
		'desc'	=>	'android!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-android.png'
	),
	
	'sevin'	=>	array(
		'slug'	=>	'sevin',
		'title'	=>	'WPUI sevin',
		'desc'	=>	'sevin!',
		'image'	=> get_plgn_url() . 'images/preview/wpui-sevin.png'
	),


	
);
?>
<div id="chosentab">
	<div class="wp-tabs wpui-safle"> <h3 class="wp-tab-title">First</h3> <div class="wp-tab-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed elit ut erat viverra dapibus. Cras at blandit sem. Nullam in augue non ipsum fermentum consequat. Nulla eu orci velit. Cras eu neque non justo malesuada pretium ut nec arcu. Curabitur viverra mollis risus vel convallis. Sed et felis dolor. Mauris semper faucibus ipsum non porta. Proin erat quam, congue a venenatis nec, volutpat nec leo. Nam vehicula lorem quis nulla tristique tempor. </div><!-- end div.wp-tab-content --> <h3 class="wp-tab-title">Second</h3><br>
	<div class="wp-tab-content">Vestibulum rhoncus ligula est. Nam nisi velit, vestibulum eget fermentum vitae, bibendum vitae velit. Sed ac ante eget nisl elementum varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ut leo eget leo volutpat placerat vitae at est. Mauris vestibulum ligula vel ante rhoncus luctus. Fusce sagittis, nisi at faucibus eleifend, sapien mauris semper arcu, eget aliquam justo enim sit amet turpis. Nulla fringilla, nunc in hendrerit volutpat, massa leo laoreet lectus, a vehicula odio ligula quis metus.</div><!-- end div.wp-tab-content --> <h3 class="wp-tab-title">Third</h3><br>
	<div class="wp-tab-content">Donec non sem nibh, ut euismod urna. Morbi accumsan scelerisque est sed rutrum. In dictum tortor id ipsum tempus dictum. In laoreet tempus ante eu consectetur. Nunc auctor, orci quis aliquam rutrum, quam ligula vestibulum nunc, vestibulum laoreet enim urna in libero. Integer vitae augue at ante tristique luctus. Quisque dolor orci, aliquet a feugiat id, rhoncus non orci. Curabitur varius lectus in enim facilisis ut tincidunt nibh malesuada. Aliquam erat volutpat. Vestibulum id nibh nisl. Nam faucibus eros in quam ultricies vel accumsan neque aliquam. </div><!-- end div.wp-tab-content --> </div>
</div>
<div id="choosetabs">
	<div class="skin_name"><p>Mouse over any image and click!</p></div>
	
<ul class="stacklist">
<?php
foreach( $skins as $skin ) {
	echo '<li class="stacks">';
	echo "<img src='" . $skin['image'] . "' alt='" . $skin['slug'] . "' />"; 
	echo '</li>';
}

?>
</ul>
</div>
<br />
<input type="hidden" id="selected_skin" name="selected_skin" type="text" />		

</form>
</body>
<script type="text/javascript">
(function($) {
jQuery.fn.tabsThemeSwitcher = function(classArr) {
	return this.each(function() {
		var $this = jQuery(this);

		$this.prepend('<div class="selector_tab_style">Switch skin : <select id="tabs_theme_select" /></div>');
	
	for( i=0; i< classArr.length; i++) {
		jQuery('#tabs_theme_select', this).append('<option value="' + classArr[i] + '">' + classArr[i] + '</option');
	} // END for loop.
	
	if ( jQuery.cookie && jQuery.cookie('tab_demo_style') != null ) {
		currentVal = jQuery.cookie('tab_demo_style');
		$this.find('select#tabs_theme_select option').each(function() {
			if ( currentVal == jQuery(this).attr("value") ) {
			 	jQuery(this).attr( 'selected', 'selected' );
			}
		});
		jQuery('#choosetabs .stacklist .stacks img').each(function() {
			if ( currentVal.replace(/wpui\-/, '') == jQuery(this).attr('alt').replace(/wpui\-/, '') )
				jQuery(this).addClass('active');
		});
	} else {
		currentVal = classArr[0];
	} // END cookie value check.

	
	$this.children('.wp-tabs').attr('class', 'wp-tabs').addClass(currentVal, 500);
	$this.children('.wp-accordion').attr('class', 'wp-accordion').addClass(currentVal, 500);
	$this.children('.wp-spoiler').attr('class', 'wp-spoiler').addClass(currentVal, 500);
	
	jQuery('#tabs_theme_select').change(function(e) {
		newVal = jQuery(this).val();
		
		$this.children('.wp-tabs')
			.hide('drop', {direction: 'up'}, 600)
			.css({ '-moz-rotate' : '45deg'})
			.switchClass(currentVal, newVal, 20)
			.show('drop', {direction: 'up'}, 300)
			.css({ '-moz-rotate': '0deg'});
			
		jQuery( 'input#selected_skin' ).val(newVal);		
		currentVal = newVal;
		
		jQuery('#choosetabs .stacklist .stacks img').each(function() {
			jQuery(this).removeClass( 'active' );
			if ( newVal.replace(/wpui\-/, '') == jQuery(this).attr('alt').replace(/wpui\-/, '') )
				jQuery(this).addClass('active');
		});		
		
		if ( jQuery.cookie ) jQuery.cookie('tab_demo_style', newVal, { expires : 2 });
	}); // END on select box change.
	
	jQuery('#choosetabs .stacks img').css({
		marginTop : '0',
		marginLeft : '0'
	});
	
	jQuery('#choosetabs .stacks img').mouseover(function() {
		jQuery(this).parent().css({ 'z-index' : '1002'});
		jQuery(this).css({ 'z-index' : '100'});
		jQuery(this).stop().animate({
			marginLeft : '-26px',
			marginTop : '-15px',
			width : '160px'
		}, 200).css({'box-shadow'	: '0 2px 7px #333'});

		jQuery('#choosetabs div.skin_name p').html("WP UI - " + jQuery(this).attr('alt').replace( /(^|\s)([a-z])/g , function(m,k,v){ return k+v.toUpperCase(); } ));
	}).mouseleave(function() {
		jQuery(this).parent().css({ 'z-index' : '500'});
		
		jQuery(this).stop().animate({
			marginLeft : '0',
			marginTop : '0',
			width : '100px'
		}, 200, function () {
			jQuery(this).css({'z-index' : '0'});
		}).css({'box-shadow'	: '0 1px 2px #999'});
		jQuery('#choosetabs div.skin_name p').html('Mouse over any image and click!');
	});


	jQuery('#choosetabs .stacks img').click(function() {
		// newVal = jQuery(this).val();
		newVal = 'wpui-' + jQuery(this).attr('alt');
		
		origWdth = $this.children('.wp-tabs').width();
		jQuery('.stacks img').each(function() { jQuery(this).removeClass('active') });
		
		jQuery(this).addClass('active').effect('pulsate', { times : 3}, 50);
		
		$this.children('.wp-tabs').fadeOut(300).switchClass(currentVal, newVal, 20);
		$this.children('.wp-tabs').fadeIn(700);
		
		jQuery(this).effect('transfer', { to : jQuery('.wp-tabs .ui-tabs') } , 300);
		
		jQuery('#tabs_theme_select option').each(function() {
			if ( newVal == jQuery(this).attr("value") )
						jQuery( this ).attr( 'selected', 'selected' );
		});

		jQuery( 'input#selected_skin' ).val("wpui-" + jQuery(this).attr('alt'));
		currentVal = newVal;
		
		if ( jQuery.cookie ) jQuery.cookie('tab_demo_style', newVal, { expires : 2 });		
	});

	}); // END each function.	
	
};
})(jQuery);
</script>
</html>
