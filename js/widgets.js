jQuery( function( $ ) {
	
	$( '.widgets-sortables .wpui-editors' ).wptabs();
	
	// $( '.widgets-sortables p.wpui-widget-warning' ).remove();
	
	var $wpuiMan = $('.widgets-sortables').find('div.widget[id*=wpui-manual-]');

	
	$( '.widgets-sortables' ).on( 'sortreceive', function( e, ui ) {
		if ( /wpui\-\manual/.test( ui.item.attr( 'id' ) ) ) {
			el = $( this ).find( '.ui-draggable' );

		 // $wpuiMan = $wpuiMan.add( el );
			
			setTimeout(function() {
	   	   		 proAct = jQuery( el ).data('wpui_activetab');
	   		    		 	 
	   	   		 jQuery( el ).find( '.wpui-editors' ).wptabs();
	   		    		 	
	   	   		 jQuery( el ).find( '.wpui-editors .ui-tabs' ).tabs( 'option', 'active', proAct || 0 );
				 
			}, 400);
		
		} 
	
	});

	 $( '.wpui-search-submit', '.widgets-sortables' ).widgetGetPosts();


	$( '.widgets-sortables' )
	.not( '#wp_inactive_widgets')
	.ajaxComplete( function( d, e, f ) {
		dAta = $.deparam( f.data );
		
		
		// if ( dAta[ 'action' ] == 'save-widget')
		// 	return;
		

		if ( dAta[ 'id_base' ] == 'wpui-manual' ) {
			$( this )
			.find( 'div.widget[id*=wpui-manual-]' )
			.each( function() {
			
				 proAct = jQuery( this ).data('wpui_activetab');
			 	 
				 jQuery( '.wpui-editors' ).wptabs();
			 	
				 jQuery( '.wpui-editors .ui-tabs' ).tabs( 'option', 'active', proAct || 0 );
			 	
		
			})
			.off( 'tabsactivate' )
			.on( 'tabsactivate', function( e, ui ) {
					 jQuery( this ).data( 'wpui_activetab', ui.newPanel.index() - 1 ); 
			
			});
		}



		if ( dAta[ 'id_base' ] == 'wpui-posts' ) {

			$( this )
			.find( 'div.widget[id*=wpui-posts-]' )
			.each( function() {
				var re = new RegExp( dAta[ 'widget-id' ], "g" );
				if ( re.exec( this.id ) ) {
			   	 	$( this )
					.find( '.wpui-search-submit' )
					.widgetGetPosts();						
				}
			
			});			
		}



	});



	// $wpuiMan
	// .ajaxComplete( function() {
	// 	 proAct = jQuery( this ).data('wpui_activetab');
	// 	 	 
	// 	 jQuery( '.wpui-editors' ).wptabs();
	// 	 	
	// 	 jQuery( '.wpui-editors .ui-tabs' ).tabs( 'option', 'active', proAct || 0 );
	// 	 	
	// 
	//  })
	//  .bind( 'tabsactivate', function( e, ui ) {
	// 	 jQuery( this ).data( 'wpui_activetab', ui.newPanel.index() - 1 ); 
	//  });

	
	
	
	// $('.widgets-sortables')
	// .find( 'div.widget[id*=wpui-posts-]' )
	// .ajaxStart( function( d, e, f ) {
	// 
	// 	console.log( this ); 
	// 	// re = /wpui\-posts\-/g;
	// 	// if ( ! re.test( d.target.id ) )
	// 	// 	return;
	// 	console.log( d ); 
	// 	// if ( d.currentTarget.id.match( /wpui\-posts/ ) == null )
	// 	// return;
	// 	// 
	// 	// if ( $.deparam( f.data )[ 'action' ] == 'save-widget' ) {
	// 	// 	   	 	$( this )
	// 	// 	.find( '.wpui-search-submit' ).widgetGetPosts();			
	// 	// } 
	// 
	// });
	// 
	
	
});

(function( $, window, undefined ) {
	
	$.idQrk = $.idQrk || {};
	
	
	$.widget( "idQrk.widgetGetPosts", {
		o : {
			sfield : '.wpui-search-field',
			stype : '.wpui-search-type',
			snum : '.wpui-search-number',
			snonce : '#wpui-editor-tax-nonce',
			ssel : '.wpui-selected'
		},
		_create : function() {
			if ( this.element.next( '.widget-search-results' ).length )
				return false;
		
			if ( typeof ajaxurl == 'undefined' ) {
				console.error( "Only for use in WP Admin." );
				return false;
			}

			this.list = this.element.closest( 'ul' );
			

			
			// console.log( this.list ); 
			if ( ! this.list.length ) {
				this.list = $( '<ul class="widget-search-results-list" />' )
								.append( '<li>Enter to search</li>' )
								.insertAfter( this.element )
								.wrap( '<div class="widget-search-results" />' );
			} // end this.list.length
			
			
			// this.dialog = this.element.siblings( '.widget-search-actions' );
			
			// if ( this.dialog.length == 0 ) {
			// 	this.dialog = $( '<div class="widget-search-actions"><span><p>Are you sure you want to clear the current selection?</p><p><a class="button-primary widget-search-action widget-search-confirm" href="#">Confirm</a><a class="button-secondary widget-search-action widget-search-cancel" href="#">Cancel</a></p><p><input type="checkbox" id="widget-search-confirm-dontshow"><label>Dont show this again</label></p></span></div>').appendTo( this.element.parent() );
			// 	
			// }
			
			
			// this.dialog.hide();
			
			this.selected = [];
			
		
		},
		
		_init : function() {
			var base = this;
			this.sfield = this.element.siblings( this.o.sfield );
			
			if ( this.sfield.length != 1 ) {
				
			} else {
				this.stype = this.element.siblings( this.o.stype );
				this.snum = this.element.siblings( this.o.snum );
				this.snonce = this.element.siblings( this.o.snonce );
				this.ssel = this.element.siblings( this.o.ssel );

				this.bindQuery();		
				
				
				setTimeout(function() {
					if ( selVal = base.ssel.val() ) {
						base.selected = selVal.split( "," );
						selType = base.stype.val();
					
						if ( selType == 'cat' || selType == 'tag' ) {
							for (var w = base.selected.length - 1; w >= 0; w--){
								base.list
								.find( 'a[rel="' + selType + '-' +  base.selected[w] + '"]' )
								.parent()
								.toggleClass( 'selected' );
							};						
						}
					}					
				}, 500 ); // Settimeout
				
			}

		},
	
		bindQuery : function() {
			var base = this;
			this.element.on( 'click', function() {
				base.ssel.val( '' );
				base.selected = [];
				base.doQuery(
					base.sfield.val(),
					base.stype.val(),
					base.snum.val(),
					base.snonce.val()			
				);
			});
			base.doQuery(
				base.sfield.val(),
				base.stype.val(),
				base.snum.val(),
				base.snonce.val()			
			);
			
		},
		binders : function() {
			var base = this,
				changeFunc;
			
			// changeFunc = function() {
			// 	
			// };
			// 
			// 
			// this.element
			// .prevAll( this.o.sfield + "," + this.o.stype + ',' + this.o.snum )
			// .off( 'change' )
			// .on( 'change', function() {
			// 	console.log( "dsdsdpsdpspmdsm" ); 
			// });
			
			
			// Bind link click.
			this.list
			.find( 'li a ' )
			.off( 'click.widgetGetPosts' )
			.on( 'click.widgetGetPosts', function(e) {

				if ( ! $( this ).parent().is( '.no-select' ) ) {
					
					reL = $( this ).attr( 'rel' );
					
					relM = reL.match( /(tag|cat)\-(\d{1,5})/ );
					
					if ( relM.length > 1 ) {
						
						if ( -1 != ( ocd = $.inArray( relM[ 2 ], base.selected ) ) ) {
							base.selected.splice( ocd, 1 );
						} else {
							base.selected.push( relM[ 2 ] );
						}
						
						base.ssel.val( base.selected.join( ',' ) );							
					}
					
					
					// console.log( base.selected ); 

					$( this ).parent().toggleClass( 'selected' );
					
					
				}
				
				return false;
			});
			
			
			
			
		},		
		doQuery : function( term, type, num, nonce ) {
			var query = {
				action : 'wpui_query_meta',
				search : term,
				type : type,
				number : num,
				_ajax_tax_nonce : nonce
			}, base = this;

			$.post( ajaxurl, query, function( data ) {
				base.list
				.html( data );

				base.binders();
			});
			
			
			
			
		}
	
		
	});
	
		
	
	
	
})( jQuery, window );
