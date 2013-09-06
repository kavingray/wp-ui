/*!
 *	WP UI version 0.8.7
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
!*/

(function( $ ) {
	
	if ( ! $.wpui ) $.wpui = {};
	
	var tabOpts = $.extend({}, window.wpuiOpts, {
		header			:		'h3.wp-tab-title',
		ajaxClass		:		'a.wp-tab-load',
		singleLineTabs	: 		(typeof wpUIOpts != "undefined"  && wpUIOpts.singleLineTabs == 'on' ) ? true : false,
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
	}),
	tabCount = 0;
	

	///////////////////////////////////////////////////
	//////////////////// WP TABS //////////////////////
	///////////////////////////////////////////////////		
	// Extend the tabs proto.
	$.widget( "idQrk.wptabs", {
		options			: tabOpts,
		_create			: function() {
			var baset = this, $this = this.element;
			
			this.jqui = ( this.element.hasClass( 'jqui-styles' ) ) ? true : false;
			this.o = this.options;
			this.header = $this.children( this.o.header );
			this.isVertical = $this.hasClass( 'wpui-tabs-vertical' ) ? true : false;
			this.mode = this.isVertical ? 'vertical' : 'horizontal';
			this.id =  $this.attr( 'id' );
			
			if ( typeof($.wpui.ids[ this.id ] ) == 'undefined' )
					$.wpui.ids[ this.id ] = [];

			
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
			
			// this.element.wrapInner( '<div class="ui-tabs-panels-wrapper" />' );


			// Add the list.
			this.ul = $( '<ul class="ui-tabs-nav" />' ).prependTo( this.element );
						
			// Iterate through headers and add the styles.
			this.header.each(function( index ) {
				var elId,
					toLoad = $( this ).find( baset.o.ajaxClass ),
					img = $( this ).find( 'img' ),
					linkStr = '';
					

				elId = ( this.id ) ? this.id : $( this ).text();

				if ( this.id )
					$( this ).removeAttr( 'id' );

				// Get this tabs's ID.
				elId = $.wpui.getIds( elId, baset.id );
				// elId = 'wpui-tab-' + ( index + 1 );
				

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
						elId = $.wpui.getIds( img.attr( 'title' ), baset.id ); 
					linkStr = '<a href="#' + elId + '"><img src="' + img.attr( 'src' ) + '" title="' + img.attr( 'title' ) + '" />'  + $( this ).text() + '</a>';
				
				} else {
					linkStr = '<a href="#' + elId + '">' + $( this ).text() + '</a>';
				}
				
				
				linkStr = '<li>' + linkStr + '</li>';
				
				baset.ul.append( linkStr );
				
				if ( ! toLoad.length ) {
					$( this ).parent().attr( 'id', elId );
				} else {
					$( this ).parent().remove();
				}
				
				
				// $.wpui.ids[ baset.id ].push( elId ); 
				
				// Another tab added.
				// $.wpui.tabsNo++;
							
			}).hide();	
			
			if ( ! $this.find( '.ui-tabs' ).length ) {
				$this.wrapInner( '<div class="ui-tabs" />' );
			}


		},
		_init			: function() {
			var baset = this, $this = this.element, options = {};
			
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

			this.navigation();
			
			this.$tabs = $this.children( '.ui-tabs' ).tabs( options );
			
			this.setClasses();
			
			if ( this.isVertical ) {
				this.$tabs
					.addClass( 'ui-tabs-vertical ui-helper-clearfix' );
				this.goVertical();
			}
			
		
			if ( typeof( $.wpui.ids.children ) == 'undefined' )
				$.wpui.ids.children = {};
			$this.find( '.wp-tab-content-wrapper' ).find( '.wpui-hashable' ).each(function() {
				if ( this.id )
					$.wpui.ids.children[ this.id ] = $( this ).closest( '.ui-tabs-panel' ).attr('id');
					

			});		

			if ( $this.hasClass( 'wpui-sortable' ) ) {
				this.$tabs.find( 'ul.ui-tabs-nav' ).sortable({ axis : 'x' });
			}
			
			// this.rotate();
			
			if ( $this.hasClass( 'tabs-bottom' ) ) {
				this.ul.appendTo( this.ul.parent() );
			}
			
		},
		setClasses		: function() {
			var baset = this, $this = this.element;
			
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
			var baset = this,
				$this = this.element,
				ulWidth = 10000,
				navFunc;
						
			if ( ( this.o.singleLineTabs || $this.hasClass( 'tabs-single-line' ) ) && !  $this.hasClass( 'tabs-single-line-false' ) && ! this.isVertical && ! $this.hasClass( 'wpui-alma' ) ) {
				
				$this.addClass( 'wpui-navbar-scrolling' );
				
				baset.ul
				.width( ulWidth )
				.wrap( '<div class="ui-tabs-nav-wrapper" />' )
				.css({
					// width : '1000px',
					// 'float' : 'left',
					// paddingLeft : '25px'
				})
				.parent()
				.css({
					// overflowX : 'hidden'
				})
				.prepend( '<a href="#" class="wpui-nav wpui-nav-prev"><span class="ui-icon ui-icon-triangle-1-w"></span></a>' )
				.append( '<a href="#" class="wpui-nav wpui-nav-next"><span class="ui-icon ui-icon-triangle-1-e"></span></a>' );
				
				try {
					ulWidth = baset.ul.children().last().width() + baset.ul.children().last().position().left;
				} catch( err ) {
					console.error( err ); 
					return false;
				}
				
				baset.ul.parent()
				.on( 'click.wpui', 'a.wpui-nav', function() {
					if ( $( this ).hasClass( 'wpui-nav-next' ) ) {
						baset.goTo( 'forward' );
					} else {
						baset.goTo( 'backward' );
					}
					return false;
				});
				
				
				navFunc = function( e, ui ) {
					var tabb, tabbRight, parWidth, links, linkWidth, pos = 0;
					
					tabb = ( typeof ui.tab == 'undefined' ) ? ui.newTab : $( ui.tab );
					tabbRight = tabb.position().left + tabb.outerWidth();
					parWidth = tabb.parent().parent().width();
					links = tabb.parent().siblings( 'a.wpui-nav' );
					linkWidth = links.width() + links.eq( 0 ).position().left;
			
					if ( tabbRight > parWidth - linkWidth ) {
						pos = ( tabbRight - ( parWidth - linkWidth ) ) * -1;
						baset.ul.animate({
							left : pos
						}, 'fast' );
					}

					if ( tabb.position().left < ( -1 * tabb.parent().position().left ) + linkWidth ) {
						baset.ul.animate({
							left : (tabb.index() == 0 ) ? 0 : ( tabb.position().left - linkWidth ) * -1 
						}, 'fast' );
					}

				};
				
				
				// $this.children().bind( 'tabsselect', navFunc );
				$this.children().on( 'tabsbeforeactivate', navFunc );

				// $this.children().tabs( 'option', 'active', actv );
				
				
				// console.log( $this.children().tabs( 'option' ).active ); 
				if ( this.o.cookies ) {
					$this.children( '.ui-tabs' ).on( 'tabscreate', function() {
						actv = $this.children().tabs( 'option', 'active' );
						if ( actv > 0 ) {
							$this.children().tabs( 'option', 'active', actv - 1 );
							$this.children().tabs( 'option', 'active', actv );
						}
					});
				}

				// console.log( 'tabsactivate' in $._data( $this.children().get( 0  ), "events" ) ); 

				
				// 
				// baset.ul.parent()
				// .on( 'click', 'a.wpui-nav', function() {
				// 	var pos = parseInt(baset.ul.css( 'left' ), 10 );
				// 	if ( $( this ).is( '.wpui-nav-next' ) ) {
				// 		if ( ( ulWidth + pos ) < baset.ul.parent().innerWidth() )
				// 		return false;
				// 		pos -= 50; 
				// 	} else {
				// 		if ( pos >= 0 ) return false;
				// 		pos += 50;
				// 	}
				// 	
				// 	$( this ).siblings( 'ul.ui-tabs-nav' )
				// 	.animate({
				// 	 	left : pos
				// 	}, 'fast' );
				// 
				// 	return false;
				// });
				
			} 
			
			if ( this.o.bottomNav ) {

				prevLink = $( '<a href="#" class="wpui-tabs-nav wpui-tabs-nav-prev ui-button ui-widget ui-corner-all"><span class="ui-icon ui-icon-circle-triangle-w" />  ' + baset.o.tabPrevText + '</a>' );
				nextLink = $( '<a href="#" class="wpui-tabs-nav wpui-tabs-nav-next ui-button ui-widget ui-corner-all">' + baset.o.tabNextText + '  <span class="ui-icon ui-icon-circle-triangle-e" /></a>' );
				
				$( '<div class="wpui-tabs-nav-holder" />' )
				.append( prevLink )
				.append( nextLink )
				.appendTo( $this.find( '.ui-tabs-panel' ) );
				
				$this
				.find( '.ui-tabs-panel' )
				.eq( 0 )
				.find( '.wpui-tabs-nav' )
				.eq( 0 )
				.remove();
				
				$this
				.find( '.ui-tabs-panel' )
				.last()
				.find( '.wpui-tabs-nav' )
				.last()
				.remove();
				
				$this.on( 'click', '.wpui-tabs-nav' , function() {
					baset.goTo( $( this ).hasClass( 'wpui-tabs-nav-next' ) ? 'forward' : 'backward' );
					return false;
				}).on( 'hover', '.wpui-tabs-nav' , function() {
					$( this ).toggleClass( 'ui-state-hover' );
				});

			}		
		},
		goTo		: function( dir ) {
			var baset = this, $this = this.element, mrel;
			
			dir = dir || 'forward';
			mrel = $this.find('.ui-tabs').tabs('option', 'active');
			
			mrel = ( dir == 'backward' ) ? mrel - 1 : mrel + 1;
			
			if ( dir == "forward" && mrel == $this.panelength ) mrel = 0;
			if ( dir == "backward" && mrel < 0 ) mrel = $this.panelength - 1;
			
			this.$tabs.tabs( 'option' , "active", mrel );
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
			// if ( this.isVertical ) {
			// 	
			// 	
			// 	
			// }
		},
		goVertical		: function() {
			var baset = this, $this = this.element;
			// ulWidth, getListWidth, ulHeight, parWidth, PaneWidth, maxPane, paneCount;
			// 
			this.$tabs
				.addClass( 'ui-tabs-vertical ui-helper-clearfix' );
					
			// this.adjust();
			listWidth = $this.attr( 'class' ).match(/listwidth-(\d{2,4})/, "$1");
			
			if ( listWidth ) {
				listWidth = listWidth[ 1 ];
				this.ul.width( listWidth );
				
			} else {
				listWidth = this.ul.outerWidth();
			}			
			

						
		},
		adjust			: function( mode ) {
			var baset = this, $this = this.element, listWidth;
			
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
				
				// this.$tabs
				// 	.find( '.ui-tabs-panel' )
				// 	.css({ 'float' : 'right' })
				// 	.width( paneWidth );				
			
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
		base.$el = $(this);
		base.opts = $.extend({},
		$.fn.wpuiScroller.defaults, options);
		base.startTop = parseInt(base.$el.css('top'), 10);
		if (base.opts.limiter) {
			base.limiter = $(base.opts.limiter);
		} else {
			base.limiter = base.$el.parent().parent();
		}
		base.startAt = parseInt(base.limiter.offset().top, 10);
		$(window).scroll(function() {
			base.endAt = parseInt((base.limiter.height() + $(window).height() / 2), 10);
			base.moveTo = base.startTop;
			if ($(document).scrollTop() >= base.startAt) {
				base.moveTo = base.startTop + ($(window).scrollTop() - base.startAt);
				if (($(window).scrollTop() + $(window).height() / 2) >= (base.limiter.height() + base.limiter.offset().top - base.startTop)) {
					base.moveTo = base.limiter.height() - base.startTop;
				}
			}
			base.$el.css('top', base.moveTo);
		});
		return this;
	};
	$.fn.wpuiScroller.defaults = {
		limiter: false,
		adJust: 50
	};



	$.idQrk.hashWatch = function() {
		if ( typeof( $.bbq ) == 'undefined' ) return false;
		
		if ( typeof wpUIOpts != 'undefined' 
			&& typeof wpUIOpts.linking_history != 'undefined' 
			&& wpUIOpts.linking_history == 'off' )
				return false;
		
				
		$( window ).bind( 'hashchange', function() {
			var hsh = $.bbq.getState(), el;
			
			for ( su in hsh ) {
				var argu = [], fn_name;
				
				el = $( '#' + su ); 
				aEl = el.parent();


				// Tabs panel
				if ( el.is( '.ui-tabs-panel' ) ) {
					// el.parent().tabs( 'select', ( el.index() - 1 ) );
					fn_name = 'tabs';
					argu = [  'option', 'active', ( el.index() - 1 ) ];
				}
				
				// Tabs
				if ( el.is( ".wp-tabs" ) ) {
					aEl = el.children( '.ui-tabs' );
					fn_name = 'tabs';
				}
				
				// Accordion header.
				if ( el.is( 'h3.wp-tab-title.ui-accordion-header' ) ) {
					// el.parent().accordion( 'activate', ( el.index() - 1 ) );
					fn_name = 'accordion';
					argu = [ 'activate', ( el.index() - 1 ) ];
				}
				
				// Accordions
				if ( el.is( '.wp-accordion' ) ) {
					fn_name = 'accordion';
					aEl = el.children( '.ui-accordion' );
				}
				
				// Spoiler
				if ( el.parent().is( '.wp-spoiler' ) ) {
					// el.parent().wpspoiler( 'toggle' );
					fn_name = 'wpspoiler';
					argu = [ 'toggle' ];
				}
				
				// Dialog		
				if ( el.is( '.wp-dialog' ) ) {
					aEl = el;
					fn_name = 'dialog';
					// el.dialog( 'close' );
					argu = [ ( el.dialog( "isOpen" ) ) ? "close" : 'open' ];
				}
				
				if ( hsh[su] != false ) {
					argu = hsh[ su ].split( "::" );
				}
				
				try {
					if ( typeof fn_name != 'undefined' )
						$.fn[ fn_name ].apply( aEl, argu );					
				} catch ( err ) {
					console.log( "WP UI error: " + err );
				} 

				
			};

			if ( typeof el == 'object' && el.length )
			$.wpui.scrollTo( el.attr( 'id' ) );
			
		}).trigger( 'hashchange' );

		
	};


	$( function() {
		var tmout = 1000;
		if ( typeof( wpUIOpts ) != 'undefined' && 
		 		typeof( wpUIOpts.misc_opts ) != 'undefined' &&
		 		typeof( wpUIOpts.misc_opts.hashing_timeout ) != 'undefined' ) {
					tmout = wpUIOpts.misc_opts.hashing_method;
		}
		setTimeout(function() {
			$.idQrk.hashWatch();
		}, tmout);
	
	});


	$.wpui.scrollTo = function( id, callback ) {
		callback = callback || false;
		
		id = ( typeof( id ) == 'string' ) ? $( '#' + id ) : id;
		
		if ( ! id.length ) return false;
		// console.log( id ); 
		$( 'html' ).animate({
			scrollTop : id.offset().top - 30
		}, ( typeof( wpUIOpts ) != "undefined" ? wpUIOpts.effectSpeed : 100 ), function() {
			if ( typeof( callback ) == 'function' ) callback();
		});
		
		return id;
	};
	
	$.fn.styleSwitcher = function() {
		return this.each( function() {

			var list = $( '<select id="wpui_style_switcher" />' )
						.prependTo( this ),
				stylez = [ 'wpui-achu', 'wpui-alma','wpui-android','wpui-blue','wpui-cyaat9','wpui-dark','wpui-gene','wpui-green','wpui-light','wpui-macish','wpui-narrow','wpui-quark','wpui-red','wpui-redmond','wpui-safle','wpui-sevin'],
				clsRep = function() {
					var cls = $( this ).attr( 'class' ).replace( /wpui\-[^\s]*\s/, $( this ).data( 'wpui-style' ) + " " ); 
					$( this ).attr( 'class', cls ); 		
				};
				
			for ( i=0; i < stylez.length; i++ ) {
				list.append( '<option value="' + stylez[ i ] + '">' + stylez[ i ] + '</option>' ); 
			}
			
			list.change( function() {
				$( '.wp-tabs' ).data( 'wpui-style', this.value ).each( clsRep );
			}).trigger( 'change' );
						
			
		});
	};
	
})( wpuiJQ );
wpuiJQ( function() {
	wpuiJQ( 'div#insert_styles' ).styleSwitcher();
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
			// heightStyle		: 	(typeof wpUIOpts != "undefined"  && wpUIOpts.accordAutoHeight == 'on' ) ? 'content' : '',
			collapse		: 	(typeof wpUIOpts != "undefined"  && wpUIOpts.accordCollapsible == 'on' ) ? true : false,
			easing			: 	(typeof wpUIOpts != "undefined" ) ? wpUIOpts.accordEasing : '',
			accordEvent		:   ( typeof wpUIOpts != "undefined" ) ? wpUIOpts.accordEvent : '',
			wpuiautop		: 	true,
			hashChange 		: 	true,
			template		: 	'<div class="wp-tab-content"><div class="wp-tab-content-wrapper">{$content}</div></div>'		
		},
		_create			: function() {
			baset = this;
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
				var elId,
					toLoad = $( this ).children( baset.o.ajaxClass ),

					img = $( this ).find( 'img' ),
					linkStr = '';
					
		
				elId = ( this.id ) ? this.id : $( this ).text();

				if ( this.id )
					$( this ).removeAttr( 'id' );

				
				$( this )
					// .next()
					.attr( 'id', elId );
				
				if ( toLoad.length ) {
					$( '<div />' )
					.load( toLoad.attr( 'href' ), function( data ) {
						$( this ).html( baset.o.template.replace( /\{\$content\}/, data ) );
					})
					.insertAfter( this );
				}
			
								
			});
			
			
		},
		_init			: function() {
			var options = {}, accClass;
			
			options.autoHeight = this.o.autoHeight ? true : false;
			
			if ( ! options.autoHeight ) {
				options.heightStyle = 'content';
			}
				
			if ( this.o.collapsible ) {
				options.collapsible = true;
				options.active = false;
			}
			
			if ( this.o.easing && this.o.easing !== 'false' ) options.animate = this.o.easing;
			
			options.event = this.o.accordEvent;
			
			this.accordion = $this.children( '.accordion' ).accordion( options );
			
			accClass = $this.attr( 'class' );
						
			if ( activePanel = accClass.match(/acc-active-(\d){1}/im) ) {
				this.accordion.accordion( 'activate', parseInt( activePanel[ 1 ], 10 ) );
			}			
			
			if ( $this.hasClass( 'wpui-skkkkortable' ) ) {
				this.header.each(function() {
					$( this ).wrap( '<div class="acc-group" />' );
					$( this ).parent().next().insertAfter( this );
				});

				this.accordion
				.accordion({
					header: "> div.acc-group > " + baset.o.header
				}).sortable({
					handle : baset.o.header,
					axis	: 'y',
					stop: function( event, ui ) {
							ui.item.children( "h3" ).triggerHandler( "focusout" );
						}
				});
				
			}
			
			if ( $this.hasClass( 'wpui-collapsible' ) ) {
				this.accordion
					.accordion( 'option', {
						collapsible : true,
						active		: false
					});
			}
			
			// return !1;
			
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
			
			var baset = this, rSpeed = this.element.attr( 'class' ).match( /tab-rotate-(.*)/, "$1" ), aRot, rotac;
			
			if ( rSpeed ) {
				rSpeed =  rSpeed[1];
				if ( rSpeed.match(/(\d){1,2}s/, "$1") ) rSpeed = rSpeed.replace(/s$/, '') * 1000;				
				cPanel = this.accordion.accordion( 'option', 'active' );
				tPanel = this.accordion.children().length / 2 -1;
				
				rotac = setInterval(function() {
					baset.accordion.accordion( 'activate', ( cPanel > tPanel ) ? 0 : cPanel++ );
				}, rSpeed );
				
				baset.accordion.children(":nth-child(odd)").bind( 'click', function() {
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
	
	
	
})( wpuiJQ );
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
			this.reFresh = false;


			// $.wpui.wpspoiler.instances.push( this.element );
			$.wpui.wpspoiler.instances[ this.element.attr('id') ] = this.element;
			
			setTimeout(function() {
				if ( base.element.closest( '.ui-accordion' ).length )
					base.reFresh = base.element.closest( '.ui-accordion' );
			}, 300);
			
		},
		
		_spoil : function( init ) {
			var self = this, hID;
			self.o = this.options;
			this._trigger( 'init' );
			self.element.addClass( 'ui-widget ui-collapsible ui-helper-reset' );
			
			this.header = this.element.children( 'h3' ).first();
			this.content = this.header.next( 'div' );

			hID = ( this.header.attr( 'id' ) ) ? this.header.attr( 'id' ) : this.header.text();
			
			hID = $.wpui.getIds( hID, self.id );
			
			this.header
			.prepend( '<span class="ui-icon ' + self.o.closeIconClass + '" />' )
			.append( '<span class="' + this._stripPre( self.o.spanClass )   + '" />')
			.attr( 'id', hID );
							
			// this.header.addClass( 'ui-collapsible-header ui-state-default ui-widget-header ui-helper-reset ui-corner-top ui-state-active' )
			this.header.addClass( 'ui-collapsible-header ui-state-default ui-widget-header ui-helper-reset ui-corner-all' )
					.children( self.o.spanClass )
					.html( self.o.showText );

			this.content
				.addClass( 'ui-helper-reset clearfix ui-widget-content ui-collapsible-content ui-collapsible-hide' )
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
			
			// self.toggle();
			
		},
		_stripPre : function( str ) {
			return str.replace( /^(\.|#)/, '' );
		},		
		toggle : function() {
			var TxT = ( this.isOpen() ) ? this.options.showText : this.options.hideText;

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
			var base = this;
			this.content.animate( this.animOpts, this.options.speed, this.options.easing, function() {
				if ( base.reFresh != false ) {
					base.reFresh.accordion( 'refresh' );
				}
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

	
	
	
	
})( wpuiJQ );
wpuiJQ( document ).ready(function( $ ) {
		$( '.wpui-click-reveal' ).wpuiClickReveal();
		
});
/*!
 *	WP UI version 0.8.7
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
!*/

/*!
 *	WP UI version 0.8.7
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
!*/

/**
 *	The included files and init below. 
 */

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}



(function( $ ) {
	var msieTemp;
	if ( typeof $.browser == 'undefined' ) {
		$.browser = {};
		msieTemp = /msie ([^\.])./.exec( navigator.userAgent.toLowerCase() );
		if ( $.isArray( msieTemp ) && msieTemp.length > 1 ) {
			$.browser = {
				msie : true,
				version : parseInt( msieTemp[ 1 ], 10 )
			};
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
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: '$.com', secure: true });
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
$.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = $.extend({}, options);

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
  document.write = function( dWT ) {
    docWriteTxt += dWT;
  };
  
  // document.write("");
  $( docWriteTxt ).appendTo( 'body' );

} // END doc write fix.



/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,r){var h,n=Array.prototype.slice,t=decodeURIComponent,a=$.param,j,c,m,y,b=$.bbq=$.bbq||{},s,x,k,e=$.event.special,d="hashchange",B="querystring",F="fragment",z="elemUrlAttr",l="href",w="src",p=/^.*\?|#.*$/g,u,H,g,i,C,E={};function G(I){return typeof I==="string"}function D(J){var I=n.call(arguments,1);return function(){return J.apply(this,I.concat(n.call(arguments)))}}function o(I){return I.replace(H,"$2")}function q(I){return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(K,P,I,L,J){var R,O,N,Q,M;if(L!==h){N=I.match(K?H:/^([^#?]*)\??([^#]*)(#?.*)/);M=N[3]||"";if(J===2&&G(L)){O=L.replace(K?u:p,"")}else{Q=m(N[2]);L=G(L)?m[K?F:B](L):L;O=J===2?L:J===1?$.extend({},L,Q):$.extend({},Q,L);O=j(O);if(K){O=O.replace(g,t)}}R=N[1]+(K?C:O||!N[1]?"?":"")+O+M}else{R=P(I!==h?I:location.href)}return R}a[B]=D(f,0,q);a[F]=c=D(f,1,o);a.sorted=j=function(J,K){var I=[],L={};$.each(a(J,K).split("&"),function(P,M){var O=M.replace(/(?:%5B|=).*$/,""),N=L[O];if(!N){N=L[O]=[];I.push(O)}N.push(M)});return $.map(I.sort(),function(M){return L[M]}).join("&")};c.noEscape=function(J){J=J||"";var I=$.map(J.split(""),encodeURIComponent);g=new RegExp(I.join("|"),"g")};c.noEscape(",/");c.ajaxCrawlable=function(I){if(I!==h){if(I){u=/^.*(?:#!|#)/;H=/^([^#]*)(?:#!|#)?(.*)$/;C="#!"}else{u=/^.*#/;H=/^([^#]*)#?(.*)$/;C="#"}i=!!I}return i};c.ajaxCrawlable(0);$.deparam=m=function(L,I){var K={},J={"true":!0,"false":!1,"null":null};$.each(L.replace(/\+/g," ").split("&"),function(O,T){var N=T.split("="),S=t(N[0]),M,R=K,P=0,U=S.split("]["),Q=U.length-1;if(/\[/.test(U[0])&&/\]$/.test(U[Q])){U[Q]=U[Q].replace(/\]$/,"");U=U.shift().split("[").concat(U);Q=U.length-1}else{Q=0}if(N.length===2){M=t(N[1]);if(I){M=M&&!isNaN(M)?+M:M==="undefined"?h:J[M]!==h?J[M]:M}if(Q){for(;P<=Q;P++){S=U[P]===""?R.length:U[P];R=R[S]=P<Q?R[S]||(U[P+1]&&isNaN(U[P+1])?{}:[]):M}}else{if($.isArray(K[S])){K[S].push(M)}else{if(K[S]!==h){K[S]=[K[S],M]}else{K[S]=M}}}}else{if(S){K[S]=I?h:""}}});return K};function A(K,I,J){if(I===h||typeof I==="boolean"){J=I;I=a[K?F:B]()}else{I=G(I)?I.replace(K?u:p,""):I}return m(I,J)}m[B]=D(A,0);m[F]=y=D(A,1);$[z]||($[z]=function(I){return $.extend(E,I)})({a:l,base:l,iframe:w,img:w,input:w,form:"action",link:l,script:w});k=$[z];function v(L,J,K,I){if(!G(K)&&typeof K!=="object"){I=K;K=J;J=h}return this.each(function(){var O=$(this),M=J||k()[(this.nodeName||"").toLowerCase()]||"",N=M&&O.attr(M)||"";O.attr(M,a[L](N,K,I))})}$.fn[B]=D(v,B);$.fn[F]=D(v,F);b.pushState=s=function(L,I){if(G(L)&&/^#/.test(L)&&I===h){I=2}var K=L!==h,J=c(location.href,K?L:{},K?I:2);location.href=J};b.getState=x=function(I,J){return I===h||typeof I==="boolean"?y(I):y(J)[I]};b.removeState=function(I){var J={};if(I!==h){J=x();$.each($.isArray(I)?I:arguments,function(L,K){delete J[K]})}s(J,2)};e[d]=$.extend(e[d],{add:function(I){var K;function J(M){var L=M[F]=c();M.getState=function(N,O){return N===h||typeof N==="boolean"?m(L,N):m(L,O)[N]};K.apply(this,arguments)}if($.isFunction(I)){K=I;return J}else{K=I.handler;I.handler=J}}})})($,this);
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

$.fn.extend({
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
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(f){var d=[].slice.call(arguments,1),g=0,e=true;f=c.event.fix(f||window.event);f.type="mousewheel";if(f.wheelDelta){g=f.wheelDelta/120}if(f.detail){g=-f.detail/3}d.unshift(f,g);return c.event.handle.apply(this,d)}})($);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
$.easing.jswing=$.easing.swing;$.extend($.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return $.easing[$.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-$.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return $.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return $.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});




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
		
			str = $.trim( str.replace( /[^A-Za-z0-9\s_\-]/gm, '' ) )
					.replace(/\s{1,}/gm, '_')
					.toLowerCase();
					
			if ( str == false ) {
				if ( /wp-tabs/.test( par ) )
					str = 'wpui-tab-panel';
				if ( /wp-accordion/.test( par ) )
					str = 'wpui-acc-title';
				if ( /wp-spoiler/.test( par ) )
					str = 'wpui-spoiler-title';			
				// return;
			}		
		

			// characters.
			if ( /[^\x00-\x80]+/.test( str ) ) {
				str = 'wpui-tabs-' + num;
			}
		
			for ( dup in $.wpui.ids ) {
				if ( $.inArray( str, $.wpui.ids[ dup ] ) != '-1' || $( '#' + str ).length ) {
					str = str + '-' + num;
				}
			}

			$.wpui.ids[ par ].push( str );
			$.wpui.tabsNo++;
	
			return str;
		};
	}


})( wpuiJQ );
/**
 *	Init the scripts.
 */
wpuiJQ(document).ready(function( $ ) {
	
	if ( typeof wpUIOpts == 'object' ) {	
		if ( wpUIOpts.enablePagination == 'on' &&
		 	typeof $.fn.wpuiPager == 'function' )
			$( 'div.wpui-pages-holder' ).wpuiPager();
	
		if ( wpUIOpts.enableTabs == 'on' &&
			 	typeof $.fn.wptabs == 'function')
			$('div.wp-tabs').wptabs();
	
		if ( wpUIOpts.enableSpoilers == 'on' &&
			 	typeof $.fn.wpspoiler == 'function')
			$('.wp-spoiler').wpspoiler();
	
		if ( wpUIOpts.enableAccordion == 'on' &&
			 	typeof $.fn.wpaccord == 'function')
			$('.wp-accordion').wpaccord();
	}

});
