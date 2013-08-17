/**
 *	Kav Admin options supplementary JavaScript
 *	http://kav.in
 *
 *	Copyright (c) 2011 "Kavin Gray"
 *
 */



/**
 *	Section 1 : Colorpicker
 */
jQuery(function( $ ) {
	
	if ( $( '.farbtastic' ).length ) {
		
		$( '.farbtastic' ).each( function() {
			$( this ).farbtastic( "#" + $( this ).prev( ".colorpicker" ).attr( "id" ) );
		});
	}
	if ( $( ".colorpicker-iris" ).length && typeof jQuery.fn.iris != 'undefined' ) {
		$( '.colorpicker-iris' )
			.iris()
			.focus( function() {
				$( this ).iris( 'toggle' );

			});
			
		$( ".colorpicker-iris" ).each( function() {
			$( this ).next( '.iris-picker' ).wrap( "<div class='iris-picker-holder' style='position:absolute; z-index : 10000;' />" );
		});
			
	}


	/**
	 *	Section 2 : File Uploader.
	*/	
	if ( $( '.media-uploader' ).length ) {
		var post_id	= 12200;	

		/**
		 *	3.5+ WP uploader.
		 */
		if ( typeof wp != 'undefined' ) {
			$( '.media-uploader-button' ).on( 'click', function( e ) {
				var upid;
			
				upid = $( this ).attr( 'id' ).replace( '_button', '' );			
			
				// Create an instance.
				if ( typeof upLoader == "undefined" ) {
			
					upLoader = wp.media.frames[ upid ] = wp.media({
						title : "Upload your background Image",
						button : {
							text : "Choose this image"
						},
						multiple : false
					});
				}
			
				// Open the media uploader.
				upLoader.open();
			
				// Insert the URL
				upLoader
				.off( 'select' )
				.on( 'select', function( e ) {
					att = upLoader.state().get( 'selection' ).first().toJSON();
			
					$( '#' + upid ).val( att.url );
				});

				return false;
			});
	
		} else {
			/**
			 *	Pre 3.5 media upload.
			 */
			var media_instance = 0,
			reverSend = function() {
				window.send_to_editor = orig_send;
			};
		
			$( '.media-uploader-button' ).live( 'click', function( e ) {
				// media_instance++;
				// if ( media_instance > 1 ) return false;
				tisID = $( this ).prev().attr( 'id' );
				orig_send = window.send_to_editor;
				window.send_to_editor = window[ "send_to_editor_" + tisID ] = function( html ) {
					imgURL = jQuery( 'img', html ).attr( 'src' );
					$( '#' + tisID ).val( imgURL );
					
					tb_remove();
					reverSend();
					return false;
				};
								
				tb_show('Upload images for ' + ( $( 'label[for=' + tisID + ']' ).text() ), 'media-upload.php?post_id=0&type=image&amp;TB_iframe=true');
				return false;
						
			});
			
			
			
			
		} // END media uploader variety.
		
	}
	
});