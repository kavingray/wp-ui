(function( $ ) {
	$.fn.wpuiThemeSwitcher = function(classArr) {
	
		return this.each(function() {
			var sel, jLink, wLink, tLink, selFunc;
			
			sel = $( '<select id="wpui-styles-demo-select" />' )
						.wrap( '<div class="wpui-styles-demo" />' )
						.before( '<h3>WP UI themes switcher</h3>' )
						.insertAfter( this );
		
		
			if ( typeof classArr == 'object' ) {
				if ( classArr.length ) {
					for( i=0; i< classArr.length; i++) {
						sel.append( '<option value="' + classArr[i] + '">' + classArr[i] + '</option>' );
	
					} // END for loop.
				} else {
					for ( var skn in classArr ) {
						if ( /startoptgroup/.test( skn ) ) {
							opt = '<optgroup label="' + classArr[ skn ] + '">';
						} else if ( /endoptgroup/.test( skn ) ) {
							opt = '</optgroup>';
						} else {
							opt = '<option value="' + skn + '">' + classArr[ skn ] + '</option>';
						}
						sel.append( opt );
					}
				}
			} else {
				return false;
			}
	

			if ( ! ( jLink = $( '#wpui-jqueryui-css', 'head' )).length ) {
				jLink = $( '<link disabled="disabled" rel="stylesheet" id="wpui-jqueryui-css" href="' + wpUIOpts.pluginUrl + '/css/jquery-ui-wp-fix.css" />' ).appendTo( 'head' );
			}
			
			if ( ! ( wLink = $( '#wp-ui-css', 'head' )).length ) {
				wLink = $( '<link disabled="disabled" rel="stylesheet" id="wp-ui-css" href="' + wpUIOpts.pluginUrl + '/css/wp-ui.css" />' ).appendTo( 'head' );
			}
			
			if ( ! (tLink = $( 'link#wpui-theme-demo', 'head' )).length ) {
				tLink = $( '<link rel="stylesheet" id="wpui-theme-demo" />' ).appendTo( 'head' );
			}
			
		
		
		newVal =  ( $.cookie && $.cookie('wpui_style_demo') != null ) ? $.cookie('wpui_style_demo') : classArr[0];

		sel.find( 'option[value="' + newVal + '"]' ).attr( 'selected', 'selected' );
				
		
		selFunc = function() {
			var newVal = jQuery(this).val(), aClass, rClass;
		
			if ( /wpui\-/.test( newVal ) ) {
				wLink.removeAttr( 'disabled' );
				jLink.attr( 'disabled', 'disabled' );
				tLink.attr( 'href', wpUIOpts.pluginUrl + "/css/themes/" + newVal + ".css" );
				aClass = 'wpui-styles';
				rClass = 'jqui-styles';
			} else {
				aClass = 'jqui-styles';
				rClass = 'wpui-styles';
				wLink.attr( 'disabled', 'disabled' );
				jLink.removeAttr( 'disabled' );
				// tLink.attr( 'href', "http://kavin.dev/themes/" + newVal + "/jquery-ui.css" );
				tLink.attr( 'href', "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/" + newVal + "/jquery-ui.css" );
			}
		
			$('.wp-tabs, .wp-accordion, .wp-spoiler, .wp-dialog, .wpui-button' ).each(function() {
				var tisData = $( this ).data( 'style' ), rEl;

				$( 'head' ).find( '#' + $( this ).data( 'style' ) + '-css' ).remove();
				
				rEl = $( this ).hasClass( 'wp-dialog' ) ? $( this ).parent() : $( this );
				
				rEl.attr( 'class', rEl.attr( 'class' ).replace( $( this ).data( 'style' ), newVal ) );
				
				$( this ).data( 'style', newVal );
				
				rEl.removeClass( rClass ).addClass( aClass );
			
			});
	
			if ( $.cookie ) $.cookie('wpui_style_demo', newVal, { expires : 2 });
		};
		
		
			
		// $('.wp-tabs, .wp-accordion, .wp-spoiler' ).each(function() {
		// 	$( this ).attr( 'class', $( this ).attr( 'class' ).replace( $( this ).data( 'style' ), currentVal ) );
		// 	$( this ).data( 'style', currentVal );
		// });
		
		
		// .attr('class', 'wp-tabs wpui-styles').addClass(currentVal, 500);
		// $('').attr('class', 'wp-accordion wpui-styles').addClass(currentVal, 500);
		// $('.wp-spoiler').attr('class', 'wp-spoiler wpui-styles').addClass(currentVal, 500);

	
			sel
			.change( selFunc );
			
			setTimeout(function () {
				sel.trigger( 'change' );
			}, 2000);
	

		}); // END each function.	
	
	};




})( jQuery );
// jQuery( document ).ready(function() {
	// jQuery( '#wpui-theme-switcher-trigger' ).wpuiThemeSwitcher();
// 		 // ["wpui-light","wpui-blue","wpui-red","wpui-green","wpui-dark","wpui-quark", "wpui-achu", "wpui-alma","wpui-macish","wpui-redmond","wpui-sevin"] );
// });

