if ( !Array.prototype.slice ) {
	Array.prototype.slice = function( i , i2 ) {
		var slc = [];
		for(; i < i2; i++)
			slc.push( this[i] );
		return slc;
	};	
}

if ( !String.prototype.slice ) {
	
	String.prototype.slice = function( i , i2 ) {
		var slc = "";
		for(; i< i2; i++)
			slc += this.chatAt(i);
		return slc;
	}
}


function getUID() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0);
    };
    return (S4()+S4()+S4()+S4());
}

jQuery.fn.wptabs = function( options ) {
	
	var linkAttrs;
	var o = jQuery.extend({} , jQuery.fn.wptabs.defaults, options);
	
	o.navStyle = ( o.navStyle == 'inherit' || o.navStyle == 'unstyled') ? '' : o.navStyle;
	o.navStyle = '-' + o.navStyle;
	
	// Assign $this.
	
	this.each(function() {
		
		var $this = jQuery(this);
		var uid = getUID();
		alert(uid);
		
		// Add an empty UL element.
		if ( $this.find('ul.ui-tabs-nav').length == 0) $this.prepend('<ul class="ui-tabs-nav" />');	

		// And populate the UL.
		$this.children(o.h3Class).each(function() {
		
			// Check if the content is to AJAX Loaded.
			if ( jQuery(this).children(o.linkAjaxClass).length != 0 ) {
				linkAttrs = ' href="' + jQuery(this).children(o.linkAjaxClass).attr('href') + '" title="' + jQuery(this).text() + '"';

			}
			// Load the normal tab(else)
			else {
				linkAttrs = ' href="#' + jQuery(this).text().replace(/\s/gm, '-') + '"';
			}
				linkTxt = jQuery(this).text();

			// Add the links to the UL.
			jQuery(this).parent().children('ul.ui-tabs-nav').append('<li><a '+ linkAttrs + '>' + jQuery(this).text() + '</a></li>');

		}).hide(); // END $this.find(h3.class).each


		var wrapper = $this.children(o.h3Class).wrap('<div class="ui-tabs-panel"></div>');
		
		$this.find('div.ui-tabs-panel:last-child').after('<p id="jqtemp">');
		
		wrapper.each(function() {
			jQuery(this).parent().append( jQuery(this).parent().nextUntil("div.ui-tabs-panel"));
		});	

		
	// Add the respective IDs to the ui-tabs-panel(content) and remove the h3s.
		$this.find('.ui-tabs-panel').children(o.h3Class).each(function() {
			var h3Val = jQuery(this).text().replace(/\s/gm, '-');
			
			jQuery(this).parent().attr('id', h3Val);
			panelWidth = jQuery(this).width() - 20;
			jQuery(this).find('img').css('width', panelWidth);
		}); //.hide().remove()
		
		// Wrap everything inside div.ui-tabs
		if ( $this.find('div.ui-tabs').length == 0) {
		
		$this.find('ul').before("<div class='ui-tabs'>");
		$this.find('.ui-tabs').each(function() {
			jQuery(this).append( jQuery(this).nextUntil('p#jqtemp'));
		});		
		
		}
	
		if ( o.effect == 'slideDown' ) effect = { height: 'toggle', speed: o.effectSpeed};
		else if ( o.effect == 'fadeIn' ) effect = {opacity: 'toggle', speed: o.effectSpeed};
		else effect = null;
		
		////////////////////////////////////////////////
		///////////// Initialize the tabs /////////////
		//////////////////////////////////////////////
		var $tabs = $this.children('.ui-tabs').tabs({fx: effect, cookie : {expires : 30 } });

		// jQuery(this).each(function() {
		// 	console.log(this + " has " + jQuery(this + '[class*=tab-rotate-]').length);	
		// 	
		// });


		// jQuery( this ).filter(function() {
		// 	// rotateSpeed = jQuery(this).attr('class').match(/tab-rotate-(.*)/, "$1");
		// 	// if (rotateSpeed != null ) {
		// 	// 	if (rotateSpeed[1].match(/(\d){1,2}s/, "$1")) rotateSpeed[1] = rotateSpeed[1].replace(/s$/, '')*1000 ;
		// 	// 		rotateSpeed = rotateSpeed[1];			
		// 	// }
		// 	// 
		// 	return jQuery(this).attr('class').match(/tab-rotate-/);
		// }).children('.ui-tabs').tabs( 'rotate', 6000, false);

		
		

		if ( o.alwaysRotate != 'disable' ) {

			jQuery( this + '[class*=tab-rotate]').each(function() {
				rotateSpeed = jQuery(this).attr('class').match(/tab-rotate-(.*)/, "$1");
				if (rotateSpeed != null ) {
					if (rotateSpeed[1].match(/(\d){1,2}s/, "$1")) rotateSpeed[1] = rotateSpeed[1].replace(/s$/, '')*1000 ;
					rotateSpeed = rotateSpeed[1];
					alwaysRotate = ( o.alwaysRotate == 'always' ) ? true : false;
			}
				jQuery(this)
					.children('.ui-tabs')
					.tabs( 'rotate', rotateSpeed, alwaysRotate );
			});
 
 		}
		
		
	
		if ( o.topNav || o.bottomNav ) {
		// Add previous/next navigation.
		$this.find('div.ui-tabs-panel').each(function(i) {
			
			jQuery(this).prepend('<div class="tab-top-nav" />').append('<div class="tab-bottom-nav" />');
			
			var totalLength = jQuery(this).parent().children('.ui-tabs-panel').length -1;
			
		
			if ( i != 0 ) {
				if ( o.topNav ) jQuery(this).children('.tab-top-nav').prepend('<a href="#" class="backward prev-tab">' + o.tabPrevText + '</a>');
				if ( o.bottomNav ) jQuery(this).children('.tab-bottom-nav').append('<a href="#" class="backward prev-tab">' + o.tabPrevText + '</a>');		
			}
			
			if ( i != totalLength ) {
				if ( o.topNav ) jQuery(this).children('.tab-top-nav').append('<a href="#" class="forward next-tab">' + o.tabNextText + '</a>');
				if ( o.bottomNav ) jQuery(this).children('.tab-bottom-nav').append('<a href="#" class="forward next-tab">' + o.tabNextText + '</a>');			
				
			}
			
			
			
			
		}); //END div.ui-tabs-panel each.
	
		jQuery('a.forward, a.backward').click(function() {
			var rel = $this.find('.ui-tabs').tabs('option', 'selected');
			var rel = (jQuery(this).hasClass('backward')) ? rel - 1 : rel + 1;
			$tabs.tabs("select", rel);
			return false;
		});
	} // END if o.navigation

	 	$tabs.tabs('option', 'disabled', false);
		
		// console.log("THIS IS!!!!!" + jQuery(this).hasClass('tabs-bottom'));
	if ( o.position == 'bottom' || jQuery(this).hasClass('tabs-bottom') ) {
		jQuery('ul.ui-tabs-nav', this).each(function() { 					
				jQuery(this).appendTo(jQuery(this).parent()).addClass('ul-bottom')
		});
		$this.children('.ui-tabs')
			.addClass('bottom-tabs')
			.children('.ui-tabs-panel')
			.each(function() { 
			jQuery(this).addClass('bottom-tabs');
		});
	} // END BottomTabs check.

	// if (typeof WPUIOpts != 'undefined')
	$this.append('<a class="thickbox cap-icon-link" title="" href="http://kav.in"><img src="' + wpUIOpts.pluginUrl  + '/images/cquest.png" alt="Cap" /></a>');

		
	}); // END return $this.each.	
	
	
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
	tabPrevText		: 		(typeof wpUIOpts != "undefined" && wpUIOpts.tabPrevText != '' ) ? wpUIOpts.tabPrevText : '&laquo; Previous',		
	tabNextText		: 		(typeof wpUIOpts != "undefined" && wpUIOpts.tabNextText != '' ) ? wpUIOpts.tabNextText : 'Next &raquo;'	
};



jQuery.fn.wpaccord = function( options ) {
	
	var wrapper,
	loadLinks,
	getAjaxUrl, 
	o = jQuery.extend({} , jQuery.fn.wpaccord.defaults, options );
	
	
	this.each(function() {
		var $this = jQuery(this);
		
		$this.append('<p id="jqtemp" />');
		
		$this.find('p, br').filter(function() {
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
			
				// if ( /http:\/\//gm.test(getAjaxUrl)) {
				// 	console.log("I was given an URL!");
				// 	loadLinks.parent().after('<div class="wp-tab-content" />').load(wpAccOpts.wpUrl + "/wp-content/plugins/wp-present/js/cross-ajax.php?url=" + getAjaxUrl);
				// } else {
					// jQuery(this).next().load(wpUIOpts.wpUrl + "/" + getAjaxUrl);
					jQuery(this).next().load(wpUIOpts.wpUrl + "/" + getAjaxUrl);
				
				// console.log(wpUIOpts.wpUrl + '::::' + getAjaxUrl);
				// 	
				// 	Furl = wpUIOpts.wpUrl + "/" + getAjaxUrl;
				// 	
				// 	jQuery.ajax({
				// 		url : Furl,
				// 		success : function( data ) {
				// 			jQuery(this).next().html( data );
				// 		},
				// 		error : function( statusText ) {
				// 			console.log(statusText );
				// 		}
				// 	});
				// 	
		
				
				// }
				
				
				
				jQuery(this).text(jQuery(this).children().text());
				
			} // END check loadLinks.length

		}); // END $this h3class.


		
		
		jQuery( '.accordion' ).accordion({
			autoHeight: false
		});


		
		jQuery('.accordion h3.ui-accordion-header:last').addClass('last-child');
		
		$this.find('p#jqtemp').remove();
		

		
	});	
	
	
	
}; // END Function wpaccord. 

jQuery.fn.wpaccord.defaults = {
	h3Class			: 'h3.wp-tab-title',
	linkAjaxClass	: 	'a.wp-tab-load',
	effect			: 	(typeof wpUIOpts != "undefined") ? wpUIOpts.accordEffect : ''
	
	
}; // END wpaccord defaults.



jQuery.fn.extend({
		
		tooltips: function(options) {
			
			var defaults = {
				background	: '#000',
				gradient	: '',
				bordercolor	: '#888',
				textcolor	: '#EEE',
				shadow		: '0 1px 3px #000',
				effect		: 'fade',
				forceUse	: false,
				disableOn	: ''
			}
			
			var options = $.extend(defaults, options);
			
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
					
					$this.append('<div id="tooltip"><div class="tooltip-arrow-up"></div>' + getAttr + '<div class="tooltip-arrow-down"></div></div>');
					
					jQuery('#tooltip').css({
						backgroundImage	: o.background,
						borderColor		: o.bordercolor,
						color			: o.textcolor
					
					})
					.attr('style', 'box-shadow: ' + o.shadow + '; -moz-border-shadow:' + o.shadow + ';')
					.attr('style', 'background-image: ' + o.gradient + '; background-image:' + o.gradient + ';');
					jQuery('#tooltip div.tooltip-arrow-down').hide();
					
					var hVal = e.pageY;
					var wVal = e.pageX;
					if ( e.pageY >= (jQuery(document).height() - 50)) {
						jQuery('#tooltip:before').css({'content': 'none'});
						hVal = e.pageY - ($this.height() * 6);
						wVal = e.pageX - ($this.width() * 2);
						jQuery('#tooltip div.tooltip-arrow-up').hide();
						jQuery('#tooltip div.tooltip-arrow-down').show();
					}								


					jQuery('#tooltip').css('top', hVal);
					jQuery('#tooltip').css('left', wVal).hide();
		
					
					if (o.effect == 'slide') {
						jQuery('#tooltip').slideDown('500');
					} else if (o.tipEffect == 'fade') {
						jQuery('#tooltip').fadeIn(500);
					} 

				
				}).mousemove(function(e){
					
					var hVal = e.pageY;
					var wVal = e.pageX;
					if ( e.pageY >= (jQuery(document).height() - 50)) {
						jQuery('#tooltip:before').css({'content': 'none'});
						hVal = e.pageY - ($this.height() * 4);
						wVal = e.pageX - ($this.width() * 0.5);
						jQuery('#tooltip div.tooltip-arrow-up').hide();
						jQuery('#tooltip div.tooltip-arrow-down').show();
					}
		
					jQuery('#tooltip').css('top', hVal);
					jQuery('#tooltip').css('left', wVal);
					
				}).mouseleave(function(e) {
					
					$this.find('#tooltip').remove();
				});
				
				
			}); // END return each.	
			
			
		} // END function tooltips.		
		
	});	


jQuery.fn.wpspoiler = function( options ) {
	
	var o, defaults, holder, hideText, showText, hideText, currText, hideSpan;
	

	o = jQuery.extend({}, jQuery.fn.wpspoiler.defaults, options );
	return this.each(function() {
		var $this = jQuery(this);
	// console.log($this);

		$this.addClass('ui-collapsible');

		$this.children(o.headerClass).each(function() {
			
		jQuery(this)
				.append('<span class="' +  o.spanClass.replace(/\./, '') + '" style="float:right"></span>').find(o.spanClass).css({ fontSize : '0.786em'});
	
		// jQuery(this).hover(function() {
		// 	jQuery(this).addClass('ui-state-hover').css({ cursor: 'pointer'});
		// }, function() {
		// 	jQuery(this).removeClass('ui-state-hover');
		// });
		
			jQuery(this).click(function() {
				jQuery(this)
					.delay(2000).toggleClass('ui-state-active');
					
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
						.animate(aniOpts, o.speed );
				} else {
					jQuery(this)
						.next('div.ui-collapsible-content')
						.toggle(o.speed);
				}
				
				// Toggle the text.
				currText = jQuery(this).children(o.spanClass).text();
				
				jQuery(this)
					.find(o.spanClass)
					.text( ( currText == o.showText ) ? o.hideText : o.showText );
					
			}).next().hide()
			  .prev()
			  .find(o.spanClass).text(o.showText);
			
			
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

// })(jQuery);