/*!
 *	WP UI version 0.8.5
 *	
 *	Copyright (c) 2011, Kavin ( http://kav.in )
 *	@license - Dual licensed under the MIT and GPL licenses.
 *	
 *	Below components Copyright and License as per the respective authors. 
 *	
 *	Includes jQuery cookie plugin by Klaus Hartl.
 *	Includes jQuery BBQ plugin by Ben Alman.
 *	Includes Mousewheel event plugin by Brandon Aaron.
 *	
 *	
 *	Requires : jQuery v1.4.2, jQuery UI v1.8 or later.
 */

(function( $ ) {


	if ( ! $.wpui ) $.wpui = {};
	if ( ! $.wpui.ids ) $.wpui.ids = {};
	if ( ! $.wpui.tabsNo ) $.wpui.tabsNo = 0;
	var wpUIOpts = window.wpUIOpts || {}, console = window.console;


	/// Enable Misc options. 
	if ( typeof( wpUIOpts.misc_options ) != 'undefined' ) {
		var misc_opts = wpUIOpts.misc_options.split( "\n" ), misc_opts1={};
		for ( var i=0; i<misc_opts.length; i++ ) {
			doo = misc_opts[ i ].split('=');
			misc_opts1[ doo[ 0 ] ] = doo[ 1 ]; 
		}
		wpUIOpts.misc_opts = misc_opts1;	
	}


	// Return treated ID strings.
	if ( typeof( $.wpui.getIds ) == 'undefined' ) {
		$.wpui.getIds = function( str, par ) {
			var num = $.wpui.tabsNo, dup;

			if ( typeof($.wpui.ids[ par ] ) == 'undefined' )
					$.wpui.ids[ par ] = [];

			str = $.trim(str).replace(/\s{1,}/gm, '_')
					.replace( /[^\-A-Za-z0-9\s_]/mg, '')
					.toLowerCase();

			for ( dup in $.wpui.ids ) {
				if ( $.inArray( str, $.wpui.ids[ dup ] ) != '-1' || $( '#' + str ).length ) {
					str = str + '-' + num;
				}
			}

			// characters.
			if ( str.match( /[^\x00-\x80]+/ ) ) {
				str = 'tabs-' + num;
			}

			$.wpui.ids[ par ].push( str );
			$.wpui.tabsNo++;

			return str;
		};
	}



	///////////////////////////////////////////////////
	//////////////////// WP TABS //////////////////////
	///////////////////////////////////////////////////
	// Extend the tabs proto.
	$.widget( "wpui.wptabs", {
		options			: {
			header			:		'h3.wp-tab-title',
			ajaxClass	:		'a.wp-tab-load',
			topNav			: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.topNav == 'on' ) ? true : false,
			bottomNav		: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.bottomNav == 'on' ) ? true : false,
			position		: 		'top',
			navStyle		: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.tabsLinkClass : '',
			effect			: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.tabsEffect : '', 
			effectSpeed		: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.effectSpeed : '',
			alwaysRotate	: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.alwaysRotate : '', // True - will rotate inspite of clicks. False - will stop.
			tabsEvent		: 		(typeof wpUIOpts != "undefined") ? wpUIOpts.tabsEvent : '',
			collapsibleTabs	: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.collapsibleTabs == 'on' ) ? true : false,

			tabPrevText		: 		(typeof wpUIOpts != "undefined" && wpUIOpts.tabPrevText != '' ) ? wpUIOpts.tabPrevText : '&laquo; Previous',		
			tabNextText		: 		(typeof wpUIOpts != "undefined" && wpUIOpts.tabNextText != '' ) ? wpUIOpts.tabNextText : 'Next &raquo;',
			cookies			: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.cookies == 'on' ) ? true : false,
			hashChange		: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.hashChange == 'on' ) ? true : false,
			mouseWheel		: 		(typeof wpUIOpts != "undefined" ) ? wpUIOpts.mouseWheelTabs : '',
			wpuiautop		: 		true,
			followNav: false			
		},
		_create			: function() {
			var self = this, $this = this.element;

			this.jqui = ( this.element.hasClass( 'jqui-styles' ) ) ? true : false;
			this.o = this.options;
			this.header = $this.children( this.o.header );
			this.isVertical = $this.hasClass( 'wpui-tabs-vertical' ) ? true : false;
			this.mode = this.isVertical ? 'vertical' : 'horizontal';
			this.id =  $this.attr( 'id' );

			if ( typeof($.wpui.ids[ this.id ] ) == 'undefined' )
					$.wpui.ids[ this.id ] = [];

			// Add the ul.
			this.ul = $( '<ul class="ui-tabs-nav" />' ).prependTo( this.element );

			if ( this.o.wpuiautop ) {

				$this.children('p, br')
					.not( 'div.wp-tab-content > br, div.wp-tab-content > p' )
					.filter(function() {
						return( $.trim( $(this).html() ) === '' );
				}).remove();

			}

			this.wrap = this.header.wrap( '<div class="ui-tabs-panel" />' );

			this.wrap.each(function() {
				$( this ).parent().append( $( this ).parent().nextUntil( "div.ui-tabs-panel" ) );
			});

			// Iterate through headers and add the styles.
			this.header.each(function( index ) {
				var elId = $( this ).text(),
					toLoad = $( this ).find( self.o.ajaxClass ),
					img = $( this ).find( 'img' ),
					linkStr = '';

				// Get this tabs's ID.
				elId = $.wpui.getIds( elId, self.id );

				if ( toLoad.length ) {
					// IT IS an AJAX LINK
					linkStr = '<a href="' + toLoad.attr( 'href' ) + '">' + toLoad.text() + '</a>';
				} else if ( $( this ).find( 'img' ).length == 1 ) {
					// IT IS AN IMAGE!!!!!!!!!!!!
					// Unwrap it.
					while ( img.parent().is( 'h3' ) ) img.unwrap();
					// Remove styles.
					img.removeAttr( 'style' ).css( 'vertical-align', 'middle' );
					// Get the id if no header text.
					if ( img.attr( 'title' ) != 'undefined' && img.attr( 'title') != '' && $( this ).text() == '' )
						elId = $.wpui.getIds( img.attr( 'title' ), self.id ); 
					linkStr = '<a href="#' + elId + '"><img src="' + img.attr( 'src' ) + '" title="' + img.attr( 'title' ) + '" />'  + $( this ).text() + '</a>';

				} else {
					linkStr = '<a href="#' + elId + '">' + $( this ).text() + '</a>';
				}


				linkStr = '<li>' + linkStr + '</li>';

				self.ul.append( linkStr );

				if ( ! toLoad.length ) {
					$( this ).parent().attr( 'id', elId );
				} else {
					$( this ).parent().remove();
				}


				// $.wpui.ids[ self.id ].push( elId ); 

				// Another tab added.
				// $.wpui.tabsNo++;

			}).hide();	

			if ( ! $this.find( '.ui-tabs' ).length ) {
				$this.wrapInner( '<div class="ui-tabs" />' );
			}


		},
		_init			: function() {
			var self = this, $this = this.element, options = {};

			if ( this.o.effect == 'slideDown' ) {
			 	options.fx = { height: 'toggle', speed: this.o.effectSpeed };

			} else if ( this.o.effect == 'fadeIn' ) {
				options.fx = { opacity: 'toggle', speed: this.o.effectSpeed};
			}

			if ( this.o.cookies ) {
				options.cookie = { expires : 30 };
			}	

			if ( this.o.tabsEvent ) {
				options.event = this.o.tabsEvent;
			}

			if ( this.o.collapsibleTabs ) {
				options.collapsible = true;
			}

			this.$tabs = $this.children( '.ui-tabs' ).tabs( options );

			this.setClasses();
			this.navigation();

			if ( this.isVertical ) this.goVertical();


			if ( typeof( $.wpui.ids.children ) == 'undefined' )
				$.wpui.ids.children = {};
			$this.find( '.wp-tab-content-wrapper' ).find( '.wpui-hashable' ).each(function() {
				if ( this.id )
					$.wpui.ids.children[ this.id ] = $( this ).closest( '.ui-tabs-panel' ).attr('id');


			});		

			if ( $this.hasClass( 'wpui-sortable' ) ) {
				this.$tabs.find( 'ul.ui-tabs-nav' ).sortable({ axis : 'x' });
			}

			this.rotate();

			if ( $this.hasClass( 'tabs-bottom' ) ) {
				this.ul.appendTo( this.ul.parent() );
			}


		},
		setClasses		: function() {
			var self = this, $this = this.element;

			this.ul.children().eq(0).addClass( 'first-li' );
			this.ul.children().last().addClass( 'last-li' );
		},
		rotate			: function() {

			var rSpeed = this.element.attr( 'class' ).match( /tab-rotate-(.*)/, "$1" ), aRot;

			if ( rSpeed ) {
				rSpeed =  rSpeed[1];
				if ( rSpeed.match(/(\d){1,2}s/, "$1") ) rSpeed = rSpeed.replace(/s$/, '') * 1000;
				aRot = ( this.o.alwaysRotate == "always" ) ? true : false;
				this.$tabs.tabs( 'rotate', rSpeed, aRot );
			}


		},
		navigation		: function() {
			var self = this, $this = this.element;

			// if ( this.o.topNav || this.o.bottomNav ) return false;

			$this.find( 'div.ui-tabs-panel' ).each( function(i) {
				var navClass = ' ui-button ui-widget ui-state-default ui-corner-all',
				navPrevSpan = '<span class="ui-icon ui-icon-circle-triangle-w"></span>',
				navNextSpan = '<span class="ui-icon ui-icon-circle-triangle-e"></span>',
				totalLength = $( this ).parent().children('.ui-tabs-panel').length -1;

				! self.o.topNav || $( this )
					.prepend( '<div class="tab-top-nav" />');

				! self.o.bottomNav || $( this )
					.append( '<div class="tab-bottom-nav" />' );				

				if ( i != 0 ) {
					! self.o.topNav || $( this )
						.children('.tab-top-nav')
						.prepend('<a href="#" class="backward prev-tab ' + navClass + '">' + navPrevSpan + self.o.tabPrevText + '</a>' );
					! self.o.bottomNav || $( this )
						.children('.tab-bottom-nav')
						.append('<a href="#" class="backward prev-tab ' + navClass + '">' + navPrevSpan  + self.o.tabPrevText + '</a>');		
				}

				if ( i != totalLength ) {
					! self.o.topNav || $( this )
						.children('.tab-top-nav')
						.append('<a href="#" class="forward next-tab ' + navClass + '">' + self.o.tabNextText + navNextSpan + '</a>');
					! self.o.bottomNav || $( this )
						.children('.tab-bottom-nav')
						.append('<a href="#" class="forward next-tab ' + navClass + '">' + self.o.tabNextText +  navNextSpan + '</a>');			
				}				

			});

			$this.find( 'a.next-tab, a.prev-tab' ).hover(function() {
				$( this ).addClass( 'ui-state-hover' );
			}, function() {
				$( this ).removeClass( 'ui-state-hover' );
			});

			$this.find( 'a.next-tab, a.prev-tab' ).click(function() {
				if ( $( this ).is('a.next-tab') )
					self.goTo( "forward" );
				else	
					self.goTo( "backward" );
				return false;
			});		


		},
		goTo		: function( dir ) {
			var self = this, $this = this.element, mrel;

			dir = dir || 'forward';
			mrel = $this.find('.ui-tabs').tabs('option', 'selected');

			mrel = ( dir == 'backward' ) ? mrel - 1 : mrel + 1;

			if ( dir == "forward" && mrel == $this.panelength ) mrel = 0;
			if ( dir == "backward" && mrel < 0 ) mrel = $this.panelength - 1;

			this.$tabs.tabs( "select", mrel );
		},
		changeMode		: function( mode ) {
			// mode = mode || this.mode;
			// if ( mode == this.mode ) return false;

			window._oldO = this.o;

			this.destroy();

			this.element
				.toggleClass( 'wpui-tabs-vertical' )
				.wptabs( window._oldO );

		},
		binders			: function() {

		},
		// goVertical		: function() {
		// 	var self = this, $this = this.element;
		// 	
		// 	
		// 	
		// },
		goVertical		: function() {
			var self = this, $this = this.element,
			ulWidth, getListWidth, ulHeight, parWidth, PaneWidth, maxPane, paneCount;

			this.$tabs
				.addClass( 'ui-tabs-vertical ui-helper-clearfix' );

			this.adjust();



		},
		adjust			: function( mode ) {
			var self = this, $this = this.element, listWidth;

			mode = mode || this.mode;


			if ( this.mode == 'vertical' ) {

				this.ul.find('li')
					.removeClass('ui-corner-top').addClass( 'ui-corner-left' );

				this.ul
					.css({ position : 'absolute' })
					.removeClass( 'ui-corner-all' )
					.addClass( 'ui-corner-left' )
					.children()
					.css({ 'float' : 'left', clear: 'left', position : 'relative' });


				listWidth = $this.attr( 'class' ).match(/listwidth-(\d{2,4})/, "$1");

				if ( listWidth ) {
					listWidth = listWidth[ 1 ];
				} else {
					listWidth = this.ul.outerWidth();
				}

				listHeight = this.$tabs.height() / this.$tabs.outerHeight() * 100;

				ulHeight = this.ul.height();

				// Set the width and height.
				this.ul.width( listWidth )
					// .height( '99%' )
					.height( listHeight + '%' )
					.css({
						zIndex : '100'
					});

				// Fix the outermost width ( For Fluid width themes )
				this.$tabs.width( this.$tabs.parent().innerWidth() );

				paneWidth = this.$tabs.width() - this.ul.width();

				this.$tabs
					.find( '.ui-tabs-panel' )
					.css({ 'float' : 'right' })
					.outerWidth( paneWidth );				

				this.$tabs
					.css({
						minHeight : ulHeight
				});


				if ( $this.hasClass( 'wpui-autoheight' ) ) {
					maxHeight = 0;
					$this.find( '.ui-tabs-panel' ).each(function() {
						maxHeight = Math.max( $( this ).height(), maxHeight );
					}).height( maxHeight );

				}




			} else {
				this.ul.find( 'li' )
					.toggleClass( 'ui-corner-top ui-corner-left' );

				this.ul
					.toggleClass( 'ui-corner-all ui-corner-left' )
					.children()
					.css({
						'position' : 'static',
						'clear' : none,
						'float' : none
					});

				this.ul.height( "auto" ).width( "auto" );


			} 



			// this.$tabs.find( '.ui-tabs-panel' ).each(function() {
			// 	if ( $( this ).outerHeight() > maxPane ) {
			// 		maxPane = $( this ).outerHeight();
			// 	}
			// });

			if ( this.o.effect == 'slideDown' )
				$this.find('.ui-tabs').tabs({ fx : null });		

		},
		resize			: function() {
			// this.goVertical();
		},
		_setOption		: function( key, value ) {
			switch( key ) {
				// Mode 
				case "mode":
					if ( ( value == 'horizontal' || value == 'vertical' ) && value != this.mode )
					this.changeMode( value );
					break;
				case "destroy":
					this.destroy();
					break;


			}
		},
		destroy			: function() {
			this.header.show();

			// $this
			// 	.children( 'div' )
			// 	.filter(function() {
			// 		return( $.trim( $(this).html() ) === '' );
			// 	}).remove();

			while ( ! this.header.parent().is( this.element ) ) {
				this.header.unwrap();
			}

			this.ul.remove();

			this.element
			.find( '.tab-top-nav, .tab-bottom-nav' )
			.remove();

			if ( typeof( $.wpui.ids[ this.id ] ) != 'undefined' ) {
				delete $.wpui.ids[ this.id ];
			}

			$.Widget.prototype.destroy.call( this );
		}

	});



	$.fn.wpuiScroller = function(options) {
		var base = this;
		base.$el = jQuery(this);
		base.opts = jQuery.extend({},
		jQuery.fn.wpuiScroller.defaults, options);
		base.startTop = parseInt(base.$el.css('top'), 10);
		if (base.opts.limiter) {
			base.limiter = jQuery(base.opts.limiter);
		} else {
			base.limiter = base.$el.parent().parent();
		}
		base.startAt = parseInt(base.limiter.offset().top, 10);
		jQuery(window).scroll(function() {
			base.endAt = parseInt((base.limiter.height() + jQuery(window).height() / 2), 10);
			base.moveTo = base.startTop;
			if (jQuery(document).scrollTop() >= base.startAt) {
				base.moveTo = base.startTop + (jQuery(window).scrollTop() - base.startAt);
				if ((jQuery(window).scrollTop() + jQuery(window).height() / 2) >= (base.limiter.height() + base.limiter.offset().top - base.startTop)) {
					base.moveTo = base.limiter.height() - base.startTop;
				}
			}
			base.$el.css('top', base.moveTo);
		});
		return this;
	};
	jQuery.fn.wpuiScroller.defaults = {
		limiter: false,
		adJust: 50
	};



	// Common hash change function.
	$.wpui.hasher = function() {
		if ( typeof( $.bbq ) == 'undefined' ) return false;		
		if ( typeof( 'wpUIOpts' ) != 'undefined' && typeof( 'wpUIOpts.linking_history' ) != 'undefined' && wpUIOpts.linking_history == 'off' ) return false;	

		$( window ).bind( 'hashchange', function( e ) {
			// this.progressed = this.progressed || false;
			// if ( this.progressed ) return false;

			var state = [], 
				finalT = window.location.hash.replace( /#/, '' ),
				preT = false;

			if ( typeof( $.wpui.ids.children ) != 'undefined' && typeof( $.wpui.ids.children[ finalT ] ) != 'undefined'
			// $.inArray( finalT, $.wpui.ids.children ) != -1 
			) {
					// && ( $( '#' + e.fragment ).is( ':wpui-wpspoiler' ) ) ) {
				preT = finalT;
				finalT = $.wpui.ids.children[ finalT ];
			}

			for ( var ins in $.wpui.ids ) {
				if ( $.inArray( finalT, $.wpui.ids[ ins ] ) != '-1' ) {
					// get the index.
					var index = $.wpui.ids[ ins ].indexOf( finalT ), tab, acc;

					// Do tabs.
					tab = $( '#' + ins ).children( ".ui-tabs" );
					if ( tab.length ) {
						$.wpui.scrollTo( tab, function() {
							tab.tabs( 'select', index );
						});
					}

					// Do accordions
					acc = $( '#' + ins ).children( '.ui-accordion' );
					if ( acc.length ) {
						$.wpui.scrollTo( acc, function() {
							acc.accordion( 'activate', index );
						});
					} 
				}			
			}

			if ( preT ) finalT = preT;

			if ( $( '#' + finalT ).parent().is( '.wp-spoiler' ) ) {
				$( '#' + finalT ).parent().wpspoiler( 'toggle' );
			}
			if ( $( '#' + finalT ).is( '.wp-spoiler' ) ) {
				$( '#' + finalT ).wpspoiler( 'toggle' );
			}

			if ( typeof( finalT ) != 'undefined' && finalT != '' ) {
				window.location.hash = finalT;
			//	return false;

			}

			// state[ id ] = finalT;
		}).trigger( 'hashchange' );
	};	


	$.wpui.hasher2 = function() {
		if ( typeof( $.bbq ) == 'undefined' ) return false;


		$( window ).bind( 'hashchange', function() {
			var hashObj = $.bbq.getState(), el = $({}), scrollTar = false;
			for( kin in hashObj ) {
				el = $( '#' + kin );

				if ( kin == 'scrollto' ) {
				 	$.wpui.scrollTo( hashObj[ kin ] );
				}

				if ( el.is( '.wp-tabs' ) ) {
					el.children( '.ui-tabs' ).tabs( 'select', parseInt( hashObj[ kin ], 10 ) );
					scrollTar = el.children( '.ui-tabs' );
				}
				if ( el.is( '.wp-accordion' ) ) {
					el.children( '.ui-accordion' ).accordion( 'activate', parseInt( hashObj[ kin ], 10 ) );
					scrollTar = el.children( '.ui-accordion' );

				}

				if ( el.is( '.wp-spoiler' ) ) {
					el.wpspoiler( 'toggle' );
					scrollTar = el;

				}

			}
			if ( scrollTar )
				$.wpui.scrollTo( scrollTar );

		}).trigger( 'hashchange' );		


	};



	$.wpui.scrollTo = function( id, callback ) {
		callback = callback || false;

		id = ( typeof( id ) == 'string' ) ? $( '#' + id ) : id;

		if ( ! id.length ) return false;
		$( 'html' ).animate({
			scrollTop : id.offset().top - 30
		}, ( typeof( wpUIOpts ) != "undefined" ? wpUIOpts.effectSpeed : 100 ), function() {
			if ( typeof( callback ) == 'function' ) callback();
		});

		return id;
	};



})( jQuery );
jQuery( function() {
	if ( typeof( wpUIOpts ) != 'undefined' && 
	 		typeof( wpUIOpts.misc_opts ) != 'undefined' &&
				wpUIOpts.misc_opts.hashing_method == 2 )
		jQuery.wpui.hasher2();
	else
		jQuery.wpui.hasher();
});

(function( $ ) {

	////////////////////////////////////////////////////
	//////////////////// WP Accordion //////////////////
	///////////////////////////////////////////////////	
	$.widget( 'wpui.wpaccord', {
		options			: {
			header			: 	'h3.wp-tab-title',
			content			: 	'div.wp-tab-content',
			ajaxClass		: 	'a.wp-tab-load',
			effect			: 	(typeof wpUIOpts != "undefined") ? wpUIOpts.accordEffect : '',
			autoHeight		: 	(typeof wpUIOpts != "undefined"  && wpUIOpts.accordAutoHeight == 'on' ) ? true : false,
			collapse		: 	(typeof wpUIOpts != "undefined"  && wpUIOpts.accordCollapsible == 'on' ) ? true : false,
			easing			: 	(typeof wpUIOpts != "undefined" ) ? wpUIOpts.accordEasing : '',
			accordEvent		:   ( typeof wpUIOpts != "undefined" ) ? wpUIOpts.accordEvent : '',
			wpuiautop		: 	true,
			hashChange 		: 	true,
			template		: 	'<div class="wp-tab-content"><div class="wp-tab-content-wrapper">{$content}</div></div>'		
		},
		_create			: function() {
			self = this;
			$this = this.element;
			this.o = this.options;
			this.header = $this.find( this.o.header );
			this.id = $this.attr( 'id' );


			if ( this.o.wpuiautop ) {
				$this.find('p, br')
					.not( this.o.content + ' > br, ' + this.o.content + '.wp-tab-content > p' )
					.filter(function() {
						return( $.trim( $(this).html() ) === '' );
				}).remove();
			}

			$this.find( this.o.header + ',' + this.o.content ).wrapAll( '<div class="accordion" />' );

			this.header.each( function() {
				var elId = $( this ).text(),
					toLoad = $( this ).children( self.o.ajaxClass ),
					img = $( this ).find( 'img' ),
					linkStr = '';


				elId = $.wpui.getIds( elId, self.id );

				$( this )
					// .next()
					.attr( 'id', elId );

				if ( toLoad.length ) {
					$( '<div />' )
					.load( toLoad.attr( 'href' ), function( data ) {
						$( this ).html( self.o.template.replace( /\{\$content\}/, data ) );
					})
					.insertAfter( this );
				}


			});


		},
		_init			: function() {
			var options = {}, accClass;

			options.autoHeight = this.o.autoHeight ? true : false;


			if ( this.o.collapsible ) {
				options.collapsible = true;
				options.active = false;
			}

			if ( this.o.easing ) options.animated = this.o.easing;

			options.event = this.o.accordEvent;


			this.accordion = $this.children( '.accordion' ).accordion( options );

			accClass = $this.attr( 'class' );

			if ( activePanel = accClass.match(/acc-active-(\d){1}/im) ) {
				this.accordion.accordion( 'activate', parseInt( activePanel[ 1 ], 10 ) );
			}			

			if ( $this.hasClass( 'wpui-sortable' ) ) {
				this.header.each(function() {
					$( this ).wrap( '<div class="acc-group" />' );
					$( this ).parent().next().insertAfter( this );
				});

				this.accordion
				.accordion({
					header: "> div.acc-group > " + self.o.header
				}).sortable({
					handle : self.o.header,
					axis	: 'y',
					stop: function( event, ui ) {
							ui.item.children( "h3" ).triggerHandler( "focusout" );
						}
				});

			}

			// Auto rotate the accordions
			this.rotate();


			if ( typeof( $.wpui.ids.children ) == 'undefined' )
				$.wpui.ids.children = {};
			$this.find( '.wp-tab-content-wrapper' ).contents().each(function() {
				if ( this.id )
					$.wpui.ids.children[ this.id ] = $( this ).closest( '.ui-accordion-content' ).attr('id');

			});		


		},
		_setOption		: function( key, value ) {
			switch( key ) {
				case "destroy":
					this.destroy();
					break;

			}

			$.Widget.prototype._setOption.apply( this, arguments );
		},
		rotate		: function() {

			var self = this, rSpeed = this.element.attr( 'class' ).match( /tab-rotate-(.*)/, "$1" ), aRot, rotac;

			if ( rSpeed ) {
				rSpeed =  rSpeed[1];
				if ( rSpeed.match(/(\d){1,2}s/, "$1") ) rSpeed = rSpeed.replace(/s$/, '') * 1000;				
				cPanel = this.accordion.accordion( 'option', 'active' );
				tPanel = this.accordion.children().length / 2 -1;

				rotac = setInterval(function() {
					self.accordion.accordion( 'activate', ( cPanel > tPanel ) ? 0 : cPanel++ );
				}, rSpeed );

				self.accordion.children(":nth-child(odd)").bind( 'click', function() {
					clearInterval( rotac );
				});
			}

		},
		destroy		: function() {

			this.header.unwrap();

			this.header.attr( 'class', this.o.header.replace( /.{1,6}\./, '' ) );
			this.header.siblings( this.o.content ).attr( 'class', this.o.content.replace( /.{1,6}\./, '' ) ).removeAttr( 'id' ).show();




			$.Widget.prototype.destroy.call( this );
		}


	});



})( jQuery );

(function( $ ) {

	////////////////////////////////////////////////////
	//////////////////// WP Spoilers ///////////////////
	///////////////////////////////////////////////////
	if ( ! $.wpui ) $.wpui = {};

	$.wpui._spoilerHashSet = false;

	$.widget( 'wpui.wpspoiler', {
		options : {
			hideText : ( typeof wpUIOpts != "undefined" ) ? wpUIOpts.spoilerHideText : '',
			showText : ( typeof wpUIOpts != "undefined" ) ? wpUIOpts.spoilerShowText : '',
			fade	 : true,
			slide	 : true,
			speed	 : 600,
			spanClass: '.toggle_text',
			headerClass : 'h3.ui-collapsible-header',
			openIconClass : 'ui-icon-triangle-1-s',
			closeIconClass : 'ui-icon-triangle-1-e',
			autoOpen : false
		},

		_create	: 	function() {
			var base = this;
			this._isOpen = false;
			this._trigger( 'create' );
			this._spoil(); 
			this._hashSet = false;

			// $.wpui.wpspoiler.instances.push( this.element );
			$.wpui.wpspoiler.instances[ this.element.attr('id') ] = this.element;
		},

		_spoil : function( init ) {
			var self = this;
			self.o = this.options;
			this._trigger( 'init' );
			self.element.addClass( 'ui-widget ui-collapsible ui-helper-reset' );

			this.header = this.element.children( 'h3' ).first();
			this.content = this.header.next( 'div' );

			this.header.prepend( '<span class="ui-icon ' + self.o.openIconClass + '" />' )
					.append( '<span class="' + this._stripPre( self.o.spanClass )   + '" />');	

			this.header.addClass( 'ui-collapsible-header ui-state-default ui-widget-header ui-helper-reset ui-corner-top ui-state-active' )
					.children( self.o.spanClass )
					.html( self.o.showText );

			this.content
				.addClass( 'ui-helper-reset ui-state-default ui-widget-content ui-collapsible-content ui-collapsible-hide' )
				.wrapInner( '<div class="ui-collapsible-wrapper" />' );

			this.animOpts = {};
			if ( self.o.fade ) this.animOpts.opacity = 'toggle';
			if ( self.o.slide ) this.animOpts.height = 'toggle';


		},

		_init : function() {
			var self = this;
			this._isOpen = false;

			if ( this.header.data('showtext') )
				this.options.showText = this.header.data( 'showtext' );
			if ( this.header.data('hidetext') )
				this.options.hideText = this.header.data( 'hidetext' );

			// this.hashGo();		

			if ( this.options.autoOpen || this.header.hasClass( 'open-true' ) ) this.toggle();

			self.header.bind( 'click.wpspoiler', function() {
				self.toggle();
			})
			.hover( function() { $( this ).toggleClass( 'ui-state-hover' ); });

			this.content.find( '.close-spoiler' )
				.wrapInner( '<span class="ui-button-text" />')
				.addClass('ui-state-default ui-widget ui-corner-all ui-button-text-only' )
				.click(function() {
					self.toggle(); return false;
				});			

			self.toggle();

		},
		_stripPre : function( str ) {
			return str.replace( /^(\.|#)/, '' );
		},		
		toggle : function() {
			var TxT = ( ! this.isOpen() ) ? this.options.showText : this.options.hideText;

			this.header
				.toggleClass( 'ui-corner-top ui-corner-all ui-state-active' )
				.children( '.ui-icon' )
				.toggleClass( this.options.openIconClass + ' ' + this.options.closeIconClass )
				.siblings( 'span' )
				.html( TxT );

			this.animate();

			if ( this.isOpen() ) {
				this._trigger( 'close' );
				this._isOpen = false;
			} else {
				this._trigger( 'open' );
				this._isOpen = true;
			}
		},
		open : function() {
			if ( this.isOpen() ) this.toggle();
		},
		close : function() {
			if ( ! this.isOpen() ) this.toggle();
		},
		animate : function() {
			this.content.animate( this.animOpts, this.options.speed, this.options.easing, function() {
			});			
		},	
		isOpen : function() {
			return this._isOpen;
		},

		destroy : function() {

			this.header
				.removeClass( 'ui-collapsible-header ui-state-default ui-corner-all ui-helper-reset' )
				.find( 'span' )
				.remove();

			this.header.unbind( 'click.wpspoiler' );

			this.content
				.children()
				.unwrap()
				.end()
				.removeClass( 'ui-collapsible-content ui-corner-bottom ui-helper-reset');

			this.removeClass( 'ui-collapsible ui-widget' );

			$.Widget.prototype.destroy.call( this );
		},
		_getOtherInstances : function( dall ) {
			var element = this.element,
			all = dall || false;

			if ( ! all  ) {			
				return $.grep( $.wpui.wpspoiler.instances, function( el ) {
					return el != element;
				});
			} else {
				return $.wpui.wpspoiler.instances;
			}			
		},		
		_setOption : function( key, value ) {
			this.options[ key ] = value;

			switch( key ) {
				case 'open':
				case 'close':
				case 'toggle':
					this.toggle();
					break;
				case 'destroy':
					this.destroy();
					break;
				case 'status':
					return (this._isOpen() ? 'open' : 'closed' );
					break;
				case 'goto':
					return this.hashGo( value );
					break;
			}
		}
	});

	$.extend( $.wpui.wpspoiler, {
		instances : {}
	});


	$.fn.wpspoilerHash = function() {
		if ( $.wpui._spoilerHashSet ) return this;

		$( window ).bind( 'hashchange', function() {
			var some = $.bbq.getState(),
			spoils = $.wpui.wpspoiler.instances;

			if ( typeof( some ) == 'object' && typeof( spoils ) == 'object' ) {

				for ( so in some ) {
					if ( some[ so ] instanceof Array ) {
						var i = some[so].length;
						while( i-- ) {
							if ( spoils[ some[ so ] ] )
							spoils[ some[ so ][ i ] ].wpspoiler( so ); 
						}
					} else {
						if ( spoils[ some[ so ] ] )
						spoils[ some[so] ].wpspoiler( so );
					}							
				}
				return false;
			}
		});			

		$( window ).trigger( 'hashchange' );

		$.wpui._spoilerHashSet = true;


		return this;
	};


	$.widget( 'wpui.wpuiClickReveal', {
		options : {
			spanClass : 'span.wpui-click-reveal',
			showText : '<b>spoiler!</b>',
			hideText : '<b>Hide</b>',
			autoShow : false
		},
		_state : 'off',
		instances : {},
		_create : function() {
			var self = this, el = this.element;
			this.handle = $( '<span class="wpui-click-handle">' + this.options.showText + '</span>' )
							.insertBefore( el );

		},
		_init : function() {
			var self = this;
			if ( ! this.options.autoShow ) {
				this.element.toggle();
				this._getState( 'off' );
			} else {
				this._getState('on');
			}
			this.handle.click( function() {
				self.element.toggle( 'fast', function() {
					self._getState( this._state == 'on' ? 'off' : 'on' );
				});
			});
		},
		_getState : function( stat ) {
			if ( ! stat ) {
				return this._state;
			} else {
				return this._state = stat;
			}
		},
		_destroy : function() {

		}
	});	





})( jQuery );
jQuery( document ).ready(function() {
		jQuery( '.wpui-click-reveal' ).wpuiClickReveal();
});





/**
 *	The included files and init below. 
 */

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

if(!Array.indexOf){
	Array.prototype.indexOf = function(obj){
		for(var i=0; i<this.length; i++){
			if(this[i]==obj){
				return i;
			}
		}
	}
}



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




if ( typeof wpUIOpts == 'object' && wpUIOpts.docWriteFix == 'on' ) {
var docWriteTxt = "";

jQuery(function() {
  document.write = function( dWT ) {
    docWriteTxt += dWT;
  }
  // document.write("");
  jQuery( docWriteTxt ).appendTo( 'body' );

});
} // END doc write fix.



/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);


/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);

jQuery.fn.extend({
    hashchange : function(fn) {
        return fn ? this.bind("hashchange", fn) : this.trigger("hashchange");
    }
});

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
	}

});