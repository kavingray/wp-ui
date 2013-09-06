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