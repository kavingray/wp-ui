/*!
 *	WP UI - Bridge v 0.5.2
 *	http://kav.in
 *	
 *	Copyright 2011, Kavin Amuthan
 *	Licensed under GPLv2.
 *	
 *	Includes jQuery cookie plugin by Klaus Hartl.
 *	Includes hashchange event plugin by Ben Alman.
 *	
 *	Requires : jQuery v1.5, jQuery UI v1.8.10 or later.
 */

// No longer used, removed on the next version.
function getUID() {
    var S4 = function() {
       return (((1+Math.random())*0x1000)|0);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4());
}

tabSet = 0;
function getNextSet() {
	return ++tabSet;
}

var tabNames = [];

jQuery.fn.wptabs = function( options ) {

	var linkAttrs;
	var o = jQuery.extend({} , jQuery.fn.wptabs.defaults, options);
	
	// Assign $this.
	
	this.each(function() {
		uid = getNextSet();
		base = this;
		var $this = jQuery(this);
		base.jqui = false;
		
		if ( $this.hasClass( 'jqui-styles' ) ) {
			base.jqui = true;
		}

		// Add an empty UL element.
		$this.prepend('<ul class="ui-tabs-nav" />');	
		
		var wrapper = $this.children(o.h3Class).wrap('<div class="ui-tabs-panel"></div>');
		
		$this.find('div.ui-tabs-panel:last-child').after('<p id="jqtemp">');
		
		$this.find('br').filter(function() {
			return jQuery.trim(jQuery(this).text()) === ''
		}).remove();
		
		wrapper.each(function() {
			jQuery(this).parent().append( jQuery(this).parent().nextUntil("div.ui-tabs-panel") );
		});	

		
		// Add the respective IDs to the ui-tabs-panel(content) and remove the h3s.
		$this.find('.ui-tabs-panel').children(o.h3Class).each(function( index ) {
			dup = getNextSet();
			
			// var h3Val = jQuery(this).text().replace(/\s/gm, '_') + '_' + uid++;
			// jQuery(this).parent().attr('id', h3Val);			
			
			if ( jQuery(this).children(o.linkAjaxClass).length != 0 ) {
				
				
				linkAttrs = ' href="' + jQuery(this).children(o.linkAjaxClass).attr('href') + '" title="' + jQuery(this).text() + '"';
				
				parID = jQuery(this).text().replace(/\s{1,}/gm, '_');
				parID = parID.replace( /[^\-A-Za-z0-9\s_]/mg, '');
				
				if ( jQuery.inArray( parID, tabNames ) != '-1' )
					parID = parID + '_' + dup;
				
				// Add the links to the UL.
				jQuery(this)
					.parent()
					.parent()
					.children('ul.ui-tabs-nav')
					.append('<li><a '+ linkAttrs + '>' + jQuery(this).text() + '</a></li>');
				
				jQuery(this)
					.parent()
					.attr('id', parID);
				 
			} else {
				
				
				parID = jQuery(this).text()
							.replace( /[^\-A-Za-z0-9\s_]/mg, '')
							.replace( /\s{1,}/gm, '_' )
							.toLowerCase();				
				
				if ( jQuery.inArray( parID, tabNames ) != '-1' )
					parID = parID + '_' + dup;
				
				linkAttrs = ' href="#' + parID + '"';
				
				jQuery(this)
					.parent()
					.parent()
					.children('ul.ui-tabs-nav')
					.append('<li><a ' + linkAttrs  + '>' + jQuery(this).text() + '</a></li>');

				jQuery(this)
					.parent()
					.attr('id', parID);				

			}
		
			panelWidth = jQuery(this).width() - 20;
			jQuery(this).find('img').css({ width :  panelWidth });
			jQuery(this).find('iframe').css({ width : '600px' });
			
			tabNames = tabNames.concat(parID);
		}).hide();
		
		// Wrap everything inside div.ui-tabs
		if ( $this.find('div.ui-tabs').length == 0) {
			$this.find('ul').before("<div class='ui-tabs'>");
			$this.find('.ui-tabs').each(function() {
				jQuery(this).append( jQuery(this).nextUntil('p#jqtemp'));
			});		
		}
		
		tabsobj = {};
	
		if ( o.effect == 'slideDown' ) {
		 	tabsobj.fx = { height: 'toggle', speed: o.effectSpeed};
		} else if ( o.effect == 'fadeIn' ) {
			tabsobj.fx = {opacity: 'toggle', speed: o.effectSpeed};
		}
		
		if ( o.cookies ) {
			tabsobj.cookie = { expires : 30 };
		}	
	
		if ( o.tabsEvent ) {
			tabsobj.event = o.tabsEvent;
		}
	
		////////////////////////////////////////////////
		///////////// Initialize the tabs /////////////
		//////////////////////////////////////////////
		var $tabs = $this.children('.ui-tabs').tabs(tabsobj);

		jQuery('ul.ui-tabs-nav').each(function() {
			jQuery('li:first', this).addClass('first-li');
			jQuery('li:last', this).addClass('last-li');
		});
		
		if ( o.alwaysRotate != 'disable' ) {
			jQuery( this + '[class*=tab-rotate]').each(function() {
				rotateSpeed = jQuery(this).attr('class').match(/tab-rotate-(.*)/, "$1");
				if (rotateSpeed != null ) {
					if (rotateSpeed[1].match(/(\d){1,2}s/, "$1")) rotateSpeed[1] = rotateSpeed[1].replace(/s$/, '')*1000 ;
					rotateSpeed = rotateSpeed[1];
					alwaysRotate = ( o.alwaysRotate == 'always' ) ? true : false;
			}
				jQuery(this).find('.ui-tabs')
					.tabs( 'rotate', rotateSpeed, alwaysRotate );
			});
			 
 		}
		
		
	
		if ( o.topNav || o.bottomNav ) {
		// Add previous/next navigation.
		$this.find('div.ui-tabs-panel').each(function(i) {
			base.navClass = '';
			base.navNextSpan = '';
			base.navPrevSpan = '';
			if ( base.jqui ) {
				base.navClass = ' ui-button ui-widget ui-state-default ui-corner-all';
				base.navPrevSpan = '<span class="ui-icon ui-icon-circle-triangle-w"></span>';
				base.navNextSpan = '<span class="ui-icon ui-icon-circle-triangle-e"></span>';
			} 
			
			! o.topNav || jQuery(this).prepend('<div class="tab-top-nav" />');
			! o.bottomNav || jQuery(this).append('<div class="tab-bottom-nav" />');
			
			var totalLength = jQuery(this).parent().children('.ui-tabs-panel').length -1;
		
			if ( i != 0 ) {
				! o.topNav || jQuery(this).children('.tab-top-nav').prepend('<a href="#" class="backward prev-tab ' + base.navClass + '">' + base.navPrevSpan + o.tabPrevText + '</a>');
				! o.bottomNav || jQuery(this).children('.tab-bottom-nav').append('<a href="#" class="backward prev-tab ' + base.navClass + '">' + base.navPrevSpan  + o.tabPrevText + '</a>');		
			}
			
			if ( i != totalLength ) {
				! o.topNav || jQuery(this).children('.tab-top-nav').append('<a href="#" class="forward next-tab ' + base.navClass + '">' + o.tabNextText + base.navNextSpan + '</a>');
				! o.bottomNav || jQuery(this).children('.tab-bottom-nav').append('<a href="#" class="forward next-tab ' + base.navClass + '">' + o.tabNextText +  base.navNextSpan + '</a>');			
			}
			
			
		}); //END div.ui-tabs-panel each.
	
		jQuery('a.forward, a.backward').hover(function() {
			if ( base.jqui )
			jQuery(this).addClass('ui-state-hover');
		}, function() {
			if ( base.jqui )
			jQuery( this ).removeClass('ui-state-hover');
		}).focus(function() {
			if ( base.jqui )
			jQuery(this).addClass('ui-state-focus ui-state-active');
		}).click(function() {
			var rel = $this.find('.ui-tabs').tabs('option', 'selected');
			rel = (jQuery(this).hasClass('backward')) ? rel - 1 : rel + 1;
			$tabs.tabs("select", rel);
			return false;
		}).blur(function() {
			if ( base.jqui )
			jQuery(this).removeClass('ui-state-focus ui-state-active');
			
		});
	} // END if o.navigation

	 	$tabs.tabs('option', 'disabled', false);
		
	if ( o.position == 'bottom' || jQuery(this).hasClass('tabs-bottom') ) {
		jQuery('ul.ui-tabs-nav', this).each(function() { 					
				jQuery(this)
				.appendTo(jQuery(this).parent())
				.addClass('ul-bottom');
		});
		
		$this.children('.ui-tabs')
			.addClass('bottom-tabs')
			.children('.ui-tabs-panel')
			.each(function() { 
			jQuery(this).addClass('bottom-tabs');
		});
	} // END BottomTabs check.

	if (typeof WPUIOpts != 'undefined')
	$this.append('<a class="thickbox cap-icon-link" title="" href="http://kav.in"><img src="' + wpUIOpts.pluginUrl  + '/images/cquest.png" alt="Cap" /></a>');

		
	}); // END return $this.each.	
	
	if ( o.hashChange && typeof jQuery.event.special.hashchange != "undefined" ) {
		
		jQuery( window ).hashchange(function() {
			if ( jQuery( window.location.hash ).length != 1 )
				return false;
			hashed = jQuery(window.location.hash).prevAll().length - 1;
			jQuery( window.location.hash )
					.parent()
					.tabs({ selected : hashed });
			return false;
		});

		jQuery( window ).hashchange();

	} // END check availability for hashchange event.
	
	return this;
	
}; // END function jQuery.fn.wptabs.


jQuery.fn.wptabs.defaults = {
	h3Class			:		'h3.wp-tab-title',
	linkAjaxClass	:		'a.wp-tab-load',
	topNav			: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.topNav == 'on' ) ? true : false,
	bottomNav		: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.bottomNav == 'on' ) ? true : false,
	position		: 		'top',
	navStyle		: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.tabsLinkClass : '',
	effect			: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.tabsEffect : '', 
	effectSpeed		: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.effectSpeed : '',
	alwaysRotate	: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.alwaysRotate : '', // True - will rotate inspite of clicks. False - will stop.
	tabsEvent		: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.tabsEvent : '',
	tabPrevText		: 		(typeof wpUIOpts != "undefined" && wpUIOpts.tabPrevText != '' ) ? wpUIOpts.tabPrevText : '&laquo; Previous',		
	tabNextText		: 		(typeof wpUIOpts != "undefined" && wpUIOpts.tabNextText != '' ) ? wpUIOpts.tabNextText : 'Next &raquo;',
	cookies			: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.cookies == 'on' ) ? true : false,
	hashChange		: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.hashChange == 'on' ) ? true : false
};



jQuery.fn.wpaccord = function( options ) {
	
	var wrapper,
	loadLinks,
	getAjaxUrl, 
	o = jQuery.extend({} , jQuery.fn.wpaccord.defaults, options );
	
	
	this.each(function() {
		var $this = jQuery(this);
		
		$this.append('<p id="jqtemp" />');
		
		$this.find('br').filter(function() {
			return jQuery.trim(jQuery(this).text()) === ''
		}).remove();
		
		
		// var wrapcontent = $this.find('h3').next().wrap('<div class="accordion-pre">');
		wrapper = $this.find('h3:first').wrap('<div class="accordion">');
		
		// $this.find('p, br').filter(function() {
		// 	return jQuery.trim(jQuery(this).text()) === ''
		// }).remove();
		
		wrapper.each(function() {
			jQuery(this).parent().append( jQuery(this).parent().nextUntil( 'p#jqtemp' ));
		});
		
	
		
		$this.find(o.h3Class).each(function() {
			loadLinks = jQuery(this).children(o.linkAjaxClass);
			

			if ( loadLinks.length != 0) {
				getAjaxUrl = loadLinks.attr("href");
			
				loadLinks.parent().after('<div></div>');
			
				jQuery(this).next().load(wpUIOpts.wpUrl + "/" + getAjaxUrl);
			
				
				jQuery(this).text(jQuery(this).children().text());
				
			} // END check loadLinks.length

		}); // END $this h3class.

	
		accordOpts = {};

		if ( o.autoHeight ) {
			accordOpts.autoHeight = true;
		} else {
			accordOpts.autoHeight = false;
		}
		
		if ( o.collapse ) {
			accordOpts.collapsible = true;
			accordOpts.active = false;
		}
		
		accordOpts.animated = o.easing;
		
		accordOpts.event = o.accordEvent;
		
		jQuery( '.accordion' ).accordion(accordOpts);

		
		jQuery('.accordion h3.ui-accordion-header:last').addClass('last-child');
		
		// $this.find('p#jqtemp').remove();
		
	});	
	
	
	
}; // END Function wpaccord. 

jQuery.fn.wpaccord.defaults = {
	h3Class			: 	'h3.wp-tab-title',
	linkAjaxClass	: 	'a.wp-tab-load',
	effect			: 	(typeof wpUIOpts != "undefined") ? wpUIOpts.accordEffect : '',
	autoHeight		: 	(typeof wpUIOpts != "undefined"  && wpUIOpts.accordAutoHeight == 'on' ) ? true : false,
	collapse		: 	(typeof wpUIOpts != "undefined"  && wpUIOpts.accordCollapsible == 'on' ) ? true : false,
	easing			: 	(typeof wpUIOpts != "undefined" ) ? wpUIOpts.accordEasing : '',
	accordEvent			:   ( typeof wpUIOpts != "undefined" ) ? wpUIOpts.accordEvent : ''
}; // END wpaccord defaults.




jQuery.fn.wpspoiler = function( options ) {
	
	var o, defaults, holder, hideText, showText, currText, hideSpan;
	

	o = jQuery.extend({}, jQuery.fn.wpspoiler.defaults, options );
	return this.each(function() {
		var base = this,
		$this = jQuery(this);
		$this.addClass('ui-widget')


		if ( $this.hasClass('wpui-styles') )
			base.jqui = true;
		else
			base.jqui = false;

		$this.addClass('ui-collapsible');

		$this.children(o.headerClass).each(function() {
		
		jQuery(this)
			.addClass('ui-state-default ui-corner-all ui-helper-reset');
			
		jQuery( 'span.ui-icon', this ).addClass('ui-icon-triangle-1-e')
		
		jQuery(this)
				.append('<span class="' +  o.spanClass.replace(/\./, '') + '" style="float:right"></span>').find(o.spanClass).css({ fontSize : '0.786em'});
	
		jQuery(this).hover(function() {
			jQuery(this).addClass('ui-state-hover').css({ cursor: 'pointer'});
		}, function() {
			jQuery(this).removeClass('ui-state-hover');
		});
		
		jQuery(this).click(function() {
				jQuery(this)
					.delay(2000).toggleClass('ui-state-active ui-corner-all  ui-corner-top');
				
				jQuery( 'span.ui-icon', this ).toggleClass('ui-icon-triangle-1-s')
				
				o.fade = ( jQuery(this).hasClass('fade-false') ) ? false : true;
				o.slide = ( jQuery(this).hasClass('slide-false') ) ? false : true;

				aniOpts = {};
				if ( o.fade ) aniOpts.opacity = 'toggle';
				if ( o.slide ) aniOpts.height = 'toggle';


				// Show the selected Effect.
 				if ( o.slide || o.fade ) {
					if ( jQuery(this + '[class*=speed-]').length ) {
						animSpeed = jQuery(this).attr('class').match(/speed-(.*)\s|\"/, "$1");
						if ( animSpeed ) {
							speed = animSpeed[1];
						} else {
							speed = o.speed;
						}
					}	
	
	
					jQuery(this)
						.next('div.ui-collapsible-content')
						.animate(aniOpts, o.speed )
						.addClass('ui-widget-content');
				
				} else {
					jQuery(this)
						.next('div.ui-collapsible-content')
						.toggle(o.speed)
						.addClass('ui-widget-content');
				}
				
				
				// Toggle the text.
				currText = jQuery(this).children(o.spanClass).text();
				
				jQuery(this)
					.find(o.spanClass)
					.text( ( currText == o.showText ) ? o.hideText : o.showText );
					
			}).next().hide()
			  .prev()
			  .find(o.spanClass).text(o.showText);

			if ( jQuery( this ).hasClass( 'open-true' ) ) {
				console.log( jQuery(this).next() );
				jQuery( this )
					.removeClass( 'ui-corner-all' )
					.addClass( 'ui-corner-top' )
					.find( 'span.ui-icon' )
					.addClass( 'ui-icon-triangle-1-s')
					.text( o.hideText )
					.end()
					.next()
					.addClass( 'ui-widget-content' )
					.show();
				 // jQuery(this).addClass('ui-state-active').next().show();
			}
			
			
		});
	
		
	}); // end return each.
	
};

jQuery.fn.wpspoiler.defaults = {
	// hideText : 'Click to hide',
	// showText : 'Click to show',
	hideText : (typeof wpUIOpts != "undefined") ? wpUIOpts.spoilerHideText : '',
	showText : (typeof wpUIOpts != "undefined") ? wpUIOpts.spoilerShowText : '',
	fade	 : true,
	slide	 : true,
	speed	 : 600,
	spanClass: '.toggle_text',
	headerClass : 'h3.ui-collapsible-header'
};



jQuery.fn.wpDialog = function( options ) {
	
	var o = jQuery.extend( {} , jQuery.fn.wpDialog.defaults, options );
		
		
	var wpfill = function( el, index ) {
		kel = el.replace( /wpui-(.*)-arg/mg, '$1' )
				.replace(/(.*)-(.*)/, '$1 : $2');
		return kel;
	};
	
	return this.each(function() {
		var base = this;
		$base = jQuery( base );
	
		// dtitle = $base.find('h4.wp-dialog-title').text();

		dialogArgs = $base.find('h4.wp-dialog-title')
						.toggleClass('wp-dialog-title')
						.attr('class').split(' ');
		
		$base.find('h4:first').remove();
		
		kel = {};	
		
		
		for( i = 0; i < dialogArgs.length; i++ ) {
			dialogArgs[i] = dialogArgs[i].replace( /wpui-(.*)-arg/mg, '$1' );
			key = dialogArgs[i].replace(/([\w\d\S]*):([\w\d\S]*)/mg, '$1');
			value = dialogArgs[i].replace(/(.*):(.*)/mg, '$2').replace( /\*_\*/mg , ' ');
			kel[key] = value;			
		}

		
		dialogCloseFn = function() {
			$(this).dialog("close");
		};
		
		
		if ( kel.button ) {
			buttonLabel = kel.button;
			delete kel.button;
			kel.buttons = {};
			kel.buttons[ buttonLabel ] = dialogCloseFn
		}
		
		console.log( kel ); 
		
		( kel.autoOpen == 'true' ) ? kel.autoOpen = true : kel.autoOpen = false;
		( kel.modal == 'false' ) ? kel.modal = false : kel.modal = true;
		
		// kel.autoOpen = false;
	
		$base.dialog( kel );
				
	}); // return this.each.

};

jQuery.fn.wpDialog.defaults = {
	title	: 'Information'
};


jQuery.fn.extend({
		
		tooltips: function(	optionz ) {
			
			var defaults = {
				background	: '#000',
				gradient	: '',
				bordercolor	: '#888',
				textcolor	: '#EEE',
				shadow		: '0 1px 3px #000',
				effect		: 'fade',
				forceUse	: false,
				disableOn	: ''
			},
			
			options = $.extend(defaults, optionz);
			
			return this.each(function() {
				
				var o = options;
				
				var $this = jQuery(this);
				
				attrName = ($this.is('img')) ? 'alt' : 'title';
				
				$this.not(o.disableOn).mouseover(function(e) {
					getAttr = $this.attr(attrName);
					
					if ( getAttr.length == 0 ) {
						if ( o.useValue == true )
						{
							getAttr = $this.text();
						}
						else
						{
							return;
						}						
					}
					
					$this.append('<div id="toolztip"><div class="tooltip-arrow-up"></div>' + getAttr + '<div class="tooltip-arrow-down"></div></div>');
					
					jQuery('#toolztip').css({
						backgroundImage	: o.background,
						borderColor		: o.bordercolor,
						color			: o.textcolor
					
					})
					.attr('style', 'box-shadow: ' + o.shadow + '; -moz-border-shadow:' + o.shadow + ';')
					.attr('style', 'background-image: ' + o.gradient + '; background-image:' + o.gradient + ';');
					jQuery('#toolztip div.tooltip-arrow-down').hide();
					
					// var hVal = e.pageY;
					// var wVal = e.pageX;
					// if ( e.pageY >= (jQuery(document).height() - 50)) {
					// 	jQuery('#tooltip:before').css({'content': 'none'});
					// 	hVal = e.pageY - ($this.height() * 6);
					// 	wVal = e.pageX - ($this.width() * 2);
					// 	jQuery('#tooltip div.tooltip-arrow-up').hide();
					// 	jQuery('#tooltip div.tooltip-arrow-down').show();
					// }								
					// 
					// 
					// jQuery('#tooltip').css('top', hVal);
					// jQuery('#tooltip').css('left', wVal).hide();
		
					
					if (o.effect == 'slide') {
						jQuery('#tooltip').slideDown('500');
					} else if (o.tipEffect == 'fade') {
						jQuery('#tooltip').fadeIn(500);
					} 

				
				}).mousemove(function(e){
					// 
					// var hVal = e.pageY;
					// var wVal = e.pageX;
					// if ( e.pageY >= (jQuery(document).height() - 50)) {
					// 	jQuery('#tooltip:before').css({'content': 'none'});
					// 	hVal = e.pageY - ($this.height() * 4);
					// 	wVal = e.pageX - ($this.width() * 0.5);
					// 	jQuery('#toolztip div.tooltip-arrow-up').hide();
					// 	jQuery('#toolztip div.tooltip-arrow-down').show();
					// }
					// 		
					// jQuery('#toolztip').css('top', hVal);
					// jQuery('#toolztip').css('left', wVal);
					
				}).mouseleave(function(e) {
					
					$this.find('#toolztip').remove();
				});
				
				
			}); // END return each.	
			
			
		} // END function tooltips.		
		
	});	




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

if (! ('console' in window) || !('firebug' in console)) {
    var names = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
    window.console = {};
    for (var i = 0; i < names.length; ++i) window.console[names[i]] = function() {};
}

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
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);