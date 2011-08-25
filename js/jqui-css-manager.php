<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Manage jQuery UI CSS themes</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js"></script>
<script type="text/javascript" src="../wp-content/plugins/wp-ui/js/wp-ui.js"></script>
<link rel="stylesheet" href="../wp-content/plugins/wp-ui/wp-ui.css" media="screen">
<link rel="stylesheet" href="../wp-content/plugins/wp-ui/css/wpui-all.css" media="screen">
<script type="text/javascript">
jQuery(document).ready(function($) {

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
<p style="text-align: center; padding: 5px;">Manage your jQuery UI custom themes through here. Click here to know how to use a custom jQuery UI theme.</p>

<form onsubmit="submit_form()" action="#">
<?php 
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



$upload_dir = wp_upload_dir();
$udir = preg_replace( '/(\d){4}\/(\d){2}/i' , '' , $upload_dir['path'] ) . 'wp-ui/';
if ( ! is_dir( $udir ) )
$response = "No directory found. Create directory 'wp-ui' under the uploads directory.";

print_r(wpui_jqui_dirs( $udir ));


?>


	

</form>
</body>
<script type="text/javascript">




</script>
</html>
