/**
 *	The included files and init below. 
 */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);


/*
 *	JSON Library
 *	https://github.com/douglascrockford/JSON-js/blob/master/json2.js
 */
var JSON;if(!JSON){JSON={};}
(function(){"use strict";function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());


/* Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * Version: 3.0.2
 * 
 * Requires: 1.2.2+
 */
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(f){var d=[].slice.call(arguments,1),g=0,e=true;f=c.event.fix(f||window.event);f.type="mousewheel";if(f.wheelDelta){g=f.wheelDelta/120}if(f.detail){g=-f.detail/3}d.unshift(f,g);return c.event.handle.apply(this,d)}})(jQuery);


/**
 *	Init the scripts.
 */
jQuery(document).ready(function( $ ) {

if ( typeof wpUIOpts == 'object' ) {	
	if ( wpUIOpts.enablePagination == 'on' &&
	 	typeof jQuery.fn.wpuiPager == 'function' )
		jQuery( 'div.wpui-pages-holder' ).wpuiPager();
	
	if ( wpUIOpts.enableTabs == 'on' &&
		 	typeof jQuery.fn.wptabs == 'function')
		jQuery('div.wp-tabs').wptabs();
	
	if ( wpUIOpts.enableSpoilers == 'on' &&
		 	typeof jQuery.fn.wpspoiler == 'function')
		jQuery('.wp-spoiler').wpspoiler();
	
	if ( wpUIOpts.enableAccordion == 'on' &&
		 	typeof jQuery.fn.wpaccord == 'function')
		jQuery('.wp-accordion').wpaccord();
	
	if ( wpUIOpts.enableDialogs == 'on' &&
		 	typeof jQuery.fn.wpDialog == 'function')
		jQuery('.wp-dialog').wpDialog();
}

jQuery( "ul.wpui-related-posts" ).each(function() {
	allWidth = jQuery( this ).children( 'li' ).outerWidth() - jQuery( this ).children('li').width();

	if ( jQuery( this ).hasClass( 'wpui-per_3' ) ) {
		liWidth = ( jQuery( this ).innerWidth() / 3 ) - allWidth;
	} else if ( jQuery( this ).hasClass( 'wpui-per_4' ) ) {
		liWidth = ( jQuery( this ).innerWidth() / 4 ) - allWidth;
		
	} else if ( jQuery( this ).hasClass( 'wpui-per_2' ) ) {
		liWidth = ( jQuery( this ).innerWidth() / 2 ) - allWidth;
	}

	if ( typeof( liWidth ) != 'undefined' )
	jQuery( this ).children( 'li' ).width( liWidth - 1 );
	
	if ( jQuery( this ).hasClass( 'wpui-per_2' ) ) {
		jQuery( this ).children( 'li' ).find( '.wpui-rel-post-meta' ).width( liWidth  - 120 );
		
	}
	var soHgt = 0;
	jQuery( this ).children( 'li' ).each(function() {
		soHgt = Math.max( soHgt, jQuery( this ).height());
	}).height( soHgt );

});

	
});




// jQuery.fn.tabsThemeSwitcher = function(classArr) {
// 	return this.each(function() {
// 		var $this = jQuery(this);
// 
// 		$this.prepend('<div class="selector_tab_style">Switch Theme : <select id="tabs_theme_select" /></div>');
// 	
// 	for( i=0; i< classArr.length; i++) {
// 		jQuery('#tabs_theme_select', this).append('<option value="' + classArr[i] + '">' + classArr[i] + '</option');
// 		
// 	} // END for loop.
// 	
// 
// 	if ( jQuery.cookie && jQuery.cookie('tab_demo_style') != null ) {
// 		currentVal = jQuery.cookie('tab_demo_style');
// 		$this.find('select#tabs_theme_select option').each(function() {
// 			if ( currentVal == jQuery(this).attr("value") ) {
// 			 	jQuery(this).attr( 'selected', 'selected' );
// 			}
// 		});
// 	} else {
// 		currentVal = classArr[0];
// 	} // END cookie value check.
// 
// 	
// 	$this.children('.wp-tabs').attr('class', 'wp-tabs wpui-styles').addClass(currentVal, 500);
// 	$this.children('.wp-accordion').attr('class', 'wp-accordion wpui-styles').addClass(currentVal, 500);
// 	$this.children('.wp-spoiler').attr('class', 'wp-spoiler wpui-styles').addClass(currentVal, 500);
// 
// 	
// 	jQuery('#tabs_theme_select').change(function(e) {
// 		newVal = jQuery(this).val();
// 		
// 		$this.children('.wp-tabs, .wp-accordion, .wp-spoiler').switchClass(currentVal, newVal, 1500);
// 		
// 		currentVal = newVal;
// 		
// 		if ( jQuery.cookie ) jQuery.cookie('tab_demo_style', newVal, { expires : 2 });
// 	}); // END on select box change.
// 	
// 
// 	}); // END each function.	
// 	
// };
// 
// var tb_remove = function() {
// 	// console.log( "Thickbox close fix" );
//  	jQuery("#TB_imageOff").unbind("click");
// 	jQuery("#TB_closeWindowButton").unbind("click");
// 	jQuery("#TB_window")
// 		.fadeOut("fast",function(){
// 				jQuery('#TB_window,#TB_overlay,#TB_HideSelect')
// 					.unload("#TB_ajaxContent")
// 					.unbind()
// 					.remove();
// 		});
// 	jQuery("#TB_load").remove();
// 	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
// 		jQuery("body","html").css({height: "auto", width: "auto"});
// 		jQuery("html").css("overflow","");
// 	}
// 	jQuery(document).unbind('.thickbox');
// 	return false;
// } // END function tb_remove()
// 
// 
