<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Untitled Document</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js"></script>
<script type="text/javascript">

jQuery(document).ready(function() {
	// jQuery('pre').wpuihilite();
});
</script>
<style type="text/css">
#zero-hider {
	display : none !important;
}
body,td,th {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 14px;
}
body {
	background-color: #EDEDED;
	margin: 0;
	padding: 0;
}
#container {
	width: 600px;
	padding: 10px;
}
a {
	color : #006699;
}
p {
	line-height: 1.5em	
}
h3 {
	color: #006699;
}
.page-title {
	background: #444;
	border-bottom: 1px solid #DDD;	
	color: #DDD;
	padding: 10px;
	margin-top: 0px;
	box-shadow: 0 2px 6px #CDCDCD;
}
.wp-kav-image {
	border: 6px solid #222;
}
.wpui-image-black-border {
	border: 6px solid #222;
}
ul, ol {
	padding-left: 1.5em;
	margin-left : 1.5em;	
}

ul li, ol li {
	margin-top: 5px;
	margin-bottom: 5px;	
}

.kav-caption {
	background: #FFF;
	display: block;
	border: 1px solid #AAA;
	box-shadow: 0 2px 5px #999;
	margin: 0 auto;
}
.kav-caption-text {
	text-align:center;
	color: #000;
	margin:0px auto 10px auto;
}

.dark {
	background: #222;
	color: #999;
	border: 1px solid #DDD;
}
.dark p {
	color: #999;
}

.dark-pre {
	background: #080808;
	color: #DDD;
}

.light-pre {
	background: #EDEDED;
	color: #222;
}
pre {
	background: #000;
	color: #FFF;
	overflow: scroll;
	padding: 5px;
}
div.roguelist {
    background: none repeat scroll 0 0 #222222;
    color: #FFFFFF;
    position: fixed;
    right: 0;
	width: 300px;
}
div.roguelist h3 {
	text-align:center;
	-moz-transform : rotate(90deg);
	-webkit-transform : rotate(90deg);
	float: left;
}
div.roguelist ul {
	margin-left:35px;
}

div.roguelist ul li > ul {
	margin-left: 10px;
}
.enclosers {
	color : #D00 !important;
}

.dark-pre .argsv {
	color: skyblue !important;
}
.light-pre .argsv {
	color: blue !important;
}
.dark-pre .argsc {
	color: #FAABDD !important;
}
.light-pre .argsc {
	color: #000 !important;
}
.melort {
	color : #0066CC;
}
</style>
</head>

<body>
<?php
/**
 * @TODO Remove this fn in the next version. Too much unorthodox.
 */
function get_plgn_url() {
	$plgn_url = 'http';
	if ( $_SERVER['HTTPS'] == 'on' )
			$plgn_url .= "s";
	$plgn_url .= "://";
	$script_url = str_ireplace('/'. basename(__FILE__), '', $_SERVER['REQUEST_URI']);
	if ( $_SERVER['SERVER_PORT'] != '80' ) {
		$plgn_url .= $_SERVER["SERVER_NAME"].":".$_SERVER['SERVER_PORT'].$script_url;
	} else {
		$plgn_url .= $_SERVER['SERVER_NAME'] . $script_url;
	}
	return $plgn_url;	
} // END function get_page_url.
?>
<div id="wrapper">
<h2 class="page-title">WP UI - Editor buttons help</h2>
<div id="container">
<p>Welcome to WP UI for wordpress. WP UI combines the power of Wordpress and jQuery UI and improves the content presentation.</p>
<div class="roguelist">
<h3 class="toggler">TOC</h3>
<ul>
	<li><a class="slide-to-id" href="#shortcode_basics" >Shortcode Basics</a></li>
	<li><a class="slide-to-id" href="#tab_name" >Tab Name</a></li>
	<li><a class="slide-to-id" href="#tab_content" >Tab Content</a></li>
	<li><a class="slide-to-id" href="#tabs_wrap" >Tab Wrap</a></li>
	<li>
		<ul>
			<li><a class="slide-to-id" href="#wptabs_args" >[wptabs] shortcode arguments</a></li>
			<li><a class="slide-to-id" href="#wptabtitle_args" >[wptabtitle] shortcode arguments</a></li>
			<li><a class="slide-to-id" href="#nested_tabs" >Nested Tabs</a></li>
		</ul>
	</li>
</ul>
</div>
<p>WP UI for wordpress comes bundled with buttons for both the HTML mode editor(Recommended)and the Visual mode editor(TinyMCE - Usable).</p>
<div class="kav-caption dark" style="width:412px"><img class="wp-kav-image" style="border-right: 0px;" src="<?php echo get_plgn_url() ?>/wpui_quicktags_button_help.png" width="400" height="250" alt="WPUI - HTML editor buttons" />
<p class="kav-caption-text" align="center"><strong>Image 1.0 </strong>WP UI - HTML mode Editor buttons and the steps</p></div><br />
<div class="kav-caption dark" style="width:412px"> <img class="wp-kav-image" src="<?php echo get_plgn_url() ?>/wpui_tinymce_buttons_help.png" width="400" height="250" alt="WP UI - TinyMCE buttons" />
<p class="kav-caption-text" align="center"><strong>Image 1.1</strong> WP UI -Visual mode Editor buttons and the steps </p></div>
<p align="left">Implementing tabs inside a post is done usually with the following steps.</p>
<ol>
  <li>Enter a Tab name ( 1 ) </li>
  <li>Enter the Tab content ( 2 )</li>
  <li>Repeat the steps 1 and 2, for as many number of tabs you need.</li>
  <li>Wrap the tabs into a tabset ( 3 )</li>
</ol>
<p align="left">It's the most easy, once you get a hang of it.</p>
<hr />
<p align="left">&nbsp;</p>
<div id="shortcode_basics">
<h3 align="left">Shortcode basics</h3>
<p align="left">WPTabs is the tabs component of the WP UI plugin. There are three shortcodes used to implement the tabs. </p>
<ol>
  <li><code>[wptabtitle]</code>  </li>
  <ul>
    <li> - Defines the tab name i.e Title. Refer to above image - Circle 1.</li>
  </ul>
  <li><code>[wptabcontent]</code> 
    <ul>
      <li>- Always recommended. Optional for small content. Refer to image - Circle 2.</li>
    </ul>
  </li>

  <li><code>[wptabs]</code>
    <ul>
      <li> - Main shortcode, Wraps the whole tabset. Multiple options can be passed through this shortcode. Refer to image - Circle - 3.</li>
    </ul>
  </li>
</ol>
<p><code>[wptabs]</code> encloses tab definitions using <code>[wptabtitle]</code> and <code>[wptabcontent]</code>.</p>
<p align="left">Sample shortcode structure.</p>
<pre align="left">[wptabs style=&quot;wpui-quark&quot;]

	[wptabtitle]First Tab[/wptabtitle]
		[wptabcontent] Contents of the first tab. [/wptabcontent]

	[wptabtitle]Second Tab[/wptabtitle]
		[wptabcontent]Content of the second tab. Roughly parallel another content[/wptabcontent]

[/wptabs]</pre>
<p>This produces beautiful tabs, as in image below.</p>
<p>&nbsp;</p>
<div class="kav-caption" style="width:550px"><img class="kav-caption-image" src="<?php echo get_plgn_url() ?>/wpui-tabs-result_help.jpg" alt="WPUI - Shortcode result" width="550" height="220" class="wpui-image-black-border" />
<p class="kav-caption-text">Tabs implemented with the shortcode  above.</p></div>
<p>&nbsp;</p>
<p>Think these are too complex? Trust me, you'll get a hang of it in no time! This structure is essential if you wish to display complex HTML inside the tabs.And not to forget, these <em>Degrades gracefully</em> where there is no javascript support.</p>
<hr />
<p>&nbsp;</p>
</div><!-- end #shortcode_basics -->

<div id="tab_name">
<h3>Step 1 . Tabs name - Shortcode : [wptabtitle]</h3>
<p>You can use the Tab title button(HTML mode) or Tab name button( Visual mode ) to define a new tab name. These are labeled as (1) in the Image 1.0 and 1.1.</p>
<p>You can select a part of text and click the button.</p>
<p>You can always enter the tab name manually. Example follows:</p>
<pre>[wptabtitle]Tab 1[/wptabtitle]</pre>
<p>This assigns the tab's name as Tab 1 and assigns the content below to this tab.</p>
<p>&nbsp;</p>
</div><!-- end #tab_name -->

<div id="tab_content">
<h3>Step 2 . Tab content - Shortcode [wptabcontent]</h3>
<p>You can use the tab's content with the buttons labeled Tab Contents( Visual and HTML ). Refer to image 1.0 and 1.1 - labelled ( 2 ).</p>
<p>[wptabcontent] shortcode can be optional when the tabs content is simple. But however, for complex HTML markup it is essential to include your content within wptabcontent shortcodes.</p>
<p>You can also define the contents manually and directly with the shortcodes.</p>
<pre>[wptabcontent]Contents of the Tab 1. Awesome, cool stuff that i love to explain about! Woooo! [/wptabcontent]</pre>
<p>This assigns the contents to the tab defined with wptabtitle that immediately precedes.</p>
<p>&nbsp;</p>
<h3>Now for each additional tab, repeat the steps 1 and 2. Most of the times it is easier to use shortcodes. </h3>
<p>&nbsp;</p>
</div><!-- end #tab_contents -->

<div id="tabs_wrap">
<h3>Step 3 - Final - Wrapping the tabset.</h3>
<p>Once you've finished defining the tabs, it is time to finish by wrapping the tabs into a tabset. This is done with the shortcode <code>[wptabs]</code> . Refer to ( 3 ) in Images 1.0 and 1.1 .</p>
<p>It is easier with the shortcode.</p>
<pre align="left">[wptabs]

	[wptabtitle]First Tab[/wptabtitle]
		[wptabcontent] Contents of the first tab. [/wptabcontent]

	[wptabtitle]Second Tab[/wptabtitle]
		[wptabcontent]Content of the second tab. Roughly parallel another content[/wptabcontent]

[/wptabs]</pre>
<p>This finishes the tabset. Now save the post, and view it on the blog!</p>
</div><!-- end #tabs_wrap -->

<hr />

<h2>Advanced options</h2>
<div id="wptabs_args">
<h3>[wptabs] shortcode arguments</h3>
<p>Arguments are passed through shortcodes as in below example.</p>
<pre>[wptabs argument=&quot;value&quot;]</pre>
<p>[wptabs] shortcode accepts the following arguments.</p>
<ul>
  <li><code>type</code> - Default is tabs. Switch to accordions by passing the argument type=&quot;accordion&quot;</li>
  <li><code>style</code> - Default is selected through wpui options page. Override for individual tabset with style=&quot;wpui-style&quot;, where style is the name of the custom style.</li>
  <li><code>effect</code> - Default is selected through options page. Valid values are fade and slide. </li>
  <li><code>speed</code> - Default is the one that is input through options page. Use the shortcode argument to override.</li>
</ul>
<p>Tabs only arguments</p>
<ul>
  <li><code>rotate</code> - If rotate argument is supplied with the time interval as value e.g. rotate=&quot;6s&quot; , Tabs will be auto rotated at specified time interval.</li>
  <li><code>position</code> - Want tabs at the bottom? Easypeasy! add the argument position=&quot;bottom&quot; . </li>
</ul>
</div><!-- end div#wptabs_args -->

<div id="wptabtitle_args">
<h3 id="wptabtitle_args">[wptabtitle] Shortcode arguments</h3>
<p>The shortcode [wptabtitle] accepts only one argument.</p>
<ul>
  <li><code>load</code> - Used to load the tabs contents through AJAX. load argument must have to be a valid path value, as defined from the root of the server.
    <ul>
      <li><code>[wptabtitle load=&quot;/files/photos.html&quot;]</code> , where <code>files/photos.html</code> is located in <code>http://yoursite.com/files/photos.html</code></li>
      <li>For AJAX loaded content, there is no need to use the shortcode [wptabcontent]</li>
    </ul>
  </li>
</ul>
<div><!-- div#wptabtitle_args -->
<hr />
<p>&nbsp;</p>
<div id="nested_tabs">
<h3 id="nested_tabs">Nested tabs</h3>
<p>If you wish to have nested tabs (tabs within a tab), you have to use the following markup. This is rather a limitation of the wordpress shortcodes and not of this plugin.</p>
<pre>&lt;div class=&quot;wp-tabs wpui-quark&quot;&gt;<br />
	&lt;h3 class=&quot;wp-tab-title&quot;&gt;First Nested Tab&lt;/h3&gt;&lt;br&gt;<br />		&lt;div class=&quot;wp-tab-content&quot;&gt; Contents of the nested first tab.
		&lt;/div&gt;&lt;!-- end div.wp-tab-content --&gt;<br />	
	&lt;h3 class=&quot;wp-tab-title&quot;&gt;Second Nested Tab&lt;/h3&gt;<br />		&lt;div class=&quot;wp-tab-content&quot;&gt;Content of the nested second tab. &lt;/div&gt;&lt;!-- end div.wp-tab-content --&gt;
<br />&lt;/div&gt;</pre>
<p>This enables the use of nested tabs.</p>
</div><!-- end #nested_tabs -->
</div>

</body>
<script type="text/javascript">
window.onload = synHilite();
function synHilite() {
	precont = document.getElementsByTagName('pre');
	for ( i = 0; i < precont.length; i++ ) {
		var matt = precont[i].innerHTML.replace(/(\[\/?wptab[\s\S]{1,8}\s?[\s\S]{1,12}\])/mg, '<span class="enclosers">$1</span>');
		precont[i].innerHTML = matt;
	}
	argc = document.getElementsByClassName('enclosers');
	for ( i = 0; i < argc.length; i++) {
		matte = argc[i].innerHTML.replace(/(\s[a-zA-Z0-9\-_="]*)/mg, '<span class="argsv">$1</span>');
		// matter = matte.replace(/(\"[a-zA-Z0-9\-]*\")[^<>]/mg, '"<span class="argsc">$1</span>"');
		argc[i].innerHTML = matte;
	}
	argvals = document.getElementsByClassName('argsv');
	for ( i = 0; i < argvals.length; i++ ) {
		argvals[i].innerHTML = argvals[i].innerHTML.replace(/"([a-zA-Z0-9\-]*)"/mg, '"<span class="argsc">$1</span>"');
	}	
} // END fn synHilite.

jQuery('pre').each(function() {
	jQuery(this).addClass('dark-pre');
	jQuery(this).wrap('<div class="pre-tools" />');
	jQuery(this).parent().prepend('<p><strong>Code</strong> : <a style="float:right" class="melort" href="#">Light</a></p>').children('p').css({ margin: '5px', paddingTop : '15px'});
	
	jQuery('.melort').each(function() {
		
		jQuery(this).click(function() {
			currentVal = jQuery(this).parent().parent().children('pre').attr('class');
			newVal =  (currentVal == 'dark-pre' ? 'light-pre' : 'dark-pre');
			newText = ( jQuery(this).text() == 'Light' ) ? 'Dark' : 'Light';
			jQuery(this).parent().parent().children('pre').switchClass(currentVal, newVal, 600);
			jQuery(this).text( newText );
		
		return false;
		});
		
	});
	
});

jQuery('.roguelist').css({ right : '-270px' });

jQuery('div.roguelist').hover(function() {
	jQuery(this).stop().animate({
		right : '0px'
	}, 600);
}, function() {
	jQuery(this).stop().animate({ right : '-270px'});
});
	
	/*
	 *	animated Scroll to function. Gets Target from href attribute.
	 *	@params elID(element ID), speed(scrolling Speed)
	 */
	scrollIn = function(elID, speed) {
		var speed = speed=='' ? '500' : speed;
		jQuery(elID).click(function() {
			var getLink = jQuery(this).attr("href");
			var getLoc = jQuery(getLink).offset().top;
			jQuery("html:not(:animated), body:not(:animated)").animate({
				scrollTop: getLoc-20			
			}, speed);
			
			jQuery(getLink).effect('highlight', {color: 'yellow'}, 'slow');
			return false;
		});
	}	
	
	scrollIn('.slide-to-id', 500);


</script>
</html>
