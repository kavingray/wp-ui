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