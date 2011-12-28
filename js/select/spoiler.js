jQuery.fn.wpspoiler = function( options ) {
	
	var o, defaults, holder, hideText, showText, currText, hideSpan;

	o = jQuery.extend({}, jQuery.fn.wpspoiler.defaults, options );

	this.each(function() {
		var base = this,
		$this = jQuery( this );
		
		if ( typeof convertEntities == 'function' ) {
			hideText = convertEntities( o.hideText );
			showText = convertEntities( o.showText );
		} else {
			hideText = o.hideText; showText = o.showText;
		}

		$this.addClass( 'ui-widget ui-collapsible' );
		
		$header = $this.children( o.headerClass );
		
		$header.each(function() {
			jQuery( this )
				.addClass( 'ui-state-default ui-corner-all ui-helper-reset' )
				.find( 'span.ui-icon', this )
				.addClass( o.openIconClass );
		
			jQuery( this )
				.append( '<span class="' +  o.spanClass.replace(/\./, '') + '" style="float:right"></span>' )
				.find( o.spanClass )
				.html( showText );
				
			base.aniOpts = {};
			if ( o.fade ) base.aniOpts[ 'opacity' ] = 'toggle';
			if ( o.slide ) base.aniOpts[ 'height' ] = 'toggle';
			
			if ( o.slide || o.fade ) {
				if ( jQuery(this + '[class*=speed-]').length ) {
					animSpeed = jQuery(this)
									.attr('class')
									.match(/speed-(.*)\s|\"/, "$1");
					if ( animSpeed ) {
						speed = animSpeed[1];
					} else {
						speed = o.speed;
					}
				}				
				
			}
	
		
				
		}).next( 'div.ui-collapsible-content' )
		.addClass( 'ui-widget-content ui-corner-bottom' )
		.find( '.close-spoiler')
		.addClass('ui-state-default ui-widget ui-corner-all ui-button-text-only' )
		.end()
		.hide(); // end headerClass each.	


		$header.hover( function() {
			jQuery( this ).addClass( 'ui-state-hover' ).css({ cursor : 'pointer' });
		}, function() {
			jQuery( this ).removeClass( 'ui-state-hover' );
		});
		
		
		$header.click(function() {
			base.headerToggle( this );
		});

		$this.find( 'a.close-spoiler' ).click(function( e ) {
			e.stopPropagation();
			e.preventDefault();
			heads = jQuery( this ).parent().siblings( o.headerClass ).get(0);
			base.headerToggle( heads );
			return false;						
		});
		
		base.headerToggle = function( hel ) {
			spanText = jQuery( hel ).find( o.spanClass ).html();

			// Toggle the header and icon classes.
			jQuery( hel )
				.toggleClass( 'ui-state-active ui-corner-all ui-corner-top' )
				.children( 'span.ui-icon' )
				.toggleClass( o.closeIconClass )
				.siblings( o.spanClass )
				.html( ( spanText == hideText) ? showText : hideText )
				.parent()
				.next( 'div.ui-collapsible-content' )
				.animate( base.aniOpts , 500 )
				.addClass( 'ui-widget-content' );

			
		}; // END headerToggle function.
	
		if ( $this.find( o.headerClass).hasClass( 'open-true' ) ) {
			h3 = $this.children( o.headerClass ).get(0);
			base.headerToggle( h3 );		
		} // end check for open-true
		
		
	}); // this.each function.
	
	return this;
	
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
	headerClass : 'h3.ui-collapsible-header',
	openIconClass : 'ui-icon-triangle-1-e',
	closeIconClass : 'ui-icon-triangle-1-s'
};