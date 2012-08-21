(function( $ ) {

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
			if ( this.isVertical ) {
				
				
				
			}
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
			
			// console.log( e.fragment ); 
			if ( typeof( $.wpui.ids.children ) != 'undefined' && typeof( $.wpui.ids.children[ finalT ] ) != 'undefined'
			// $.inArray( finalT, $.wpui.ids.children ) != -1 
			) {
				// console.log( $.wpui.ids ); 
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
			
			if ( $( '#' + finalT ).is( ':ui-dialog' ) ) {
				if ( ! $( '#' + finalT ).dialog( 'isOpen' ) )
				$( '#' + finalT ).dialog( 'open' );
				return false;
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
			// console.log( hashObj ); 
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
		// console.log( id ); 
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