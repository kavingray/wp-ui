(function($){
    if(!$.wpui){
        $.wpui = new Object();
    };
    
    $.wpui.jquiThemeManage = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
		// base.fileListBak = JSON.parse( base.$el.val());
		base.fileList = {};
		base.valid = true;
		base.validMsg = {};
		base.ajaxError = false;
		
		base.fileList = ( base.$el.val() != '' ) ? JSON.parse( base.$el.val()) : {};

        base.$el.data("wpui.jquiThemeManage", base);

        base.init = function(){
            base.options = $.extend({},$.wpui.jquiThemeManage.defaultOptions, options);
			base.$el.hide();
            
			if( jQuery( '#jqui_theme_list' ).length != 1 ) {
				base.$el.after('<div id="jqui_theme_list" />');
			}
			base.tableC = jQuery( '#jqui_theme_list' );
		
			base.createStructures();
			base.formBinders();
			
	
			jQuery( base.fileList ).bind('change', function() {
				base.$el.val( JSON.stringify( base.fileList ) );
			});

        };


		/*
		 *	Create the required structures.
		 */
		base.createStructures = function() {
			
			
			// Add the table, and its header.
			base.tableC
				.append( '<table class="widefat"><thead /><tbody /></table>' )
				.find( 'thead' )
				.append( '<tr><th class="column-name">Name</th><th class="column-link">Stylesheet URL</th><th class="column-manage">Manage</th></tr>');
		base.table = base.tableC.find( 'table.widefat' );
		
		
			// if the fileList is empty,insert the placeholder.
			if ( jQuery.isEmptyObject( base.fileList ) ) {
			
				base.table
					.find( 'tbody' )
					.append( '<tr class="placeholder" />')
					.find( 'tr.placeholder' )
					.append( '<td colspan="3">Custom themes list is empty. Click "Add themes" to add one. If you have uploaded the files to wp-content/uploads, click "Scan Uploads" to add them.</td>');
			
			} else {
				// So there are keys in there! Insert em.
					for ( keyz in base.fileList ) {
						value = base.fileList[ keyz ];
						base.table
							.append( '<tr />' )
							.find( '<tr:last' )
							.append( '<td>' + keyz + '</td><td><a target="_blank" href="' + value + '">' + value + '</a></td><td><a class="jqui_theme_delete" title="Remove this theme" href="#">Delete</a></td>');
					}
			
			}

			// Add a hidden dialog form to the body, later used for add or delete.
			base.themeForm = jQuery( '<div style="display : none; " title="" id="jqui_theme_form" />')
				.append( '<form><fieldset /></form>' )
				.find( 'form fieldset' )
				.append( '<div class="theme_add_notes" />')
				.append( '<label for="jqui_theme_name">Name (CSS scope) <span> that will be used with the style argument</span></label>' )
				.append( '<input id="jqui_theme_name" type="text" name="theme_name" class="ui-widget-content ui-corner-all" />' )
				.append( '<label for="jqui_theme_url">Link <span>Absolute URL of the stylesheet</label>' )
				.append( '<input id="jqui_theme_url" type="text" name="theme_url"  class="ui-widget-content ui-corner-all" />' )
				// .append( '<input id="jqui_theme_multiple" type="checkbox" name="theme_multiple"  class="ui-widget-content ui-corner-all" /><label for="jqui_theme_multiple">Keep on adding</label>' )
				.end()
				.appendTo( 'body' );
		};


		/**
		 *	Binding functions for - Add/Edit forms, delete link and uploads.
		 */
		base.formBinders = function( ) {
			
			// Adding a theme 
			jQuery( '#jqui_add_theme' ).click(function() {
				
				base.themeForm
					.attr( 'title' , 'Add a jQuery UI custom theme' )
					.dialog({
						width : 400,
						modal : true,
						buttons : {
							"Cancel" : function( ) {
								jQuery( this ).dialog('destroy');
								jQuery( this ).attr( 'title' , '' );
							},
							"Add" : function() {
								base.validate();
								if ( base.valid )
									base.addDetails();
							
							}
						},
						open : function() {
							jQuery( 'div.theme_add_notes' ).find('ol').remove();
							jQuery( '.ui-button:first' , '.ui-dialog-buttonset' )
								.addClass('cancel-button');
							jQuery( '.ui-button:last' , '.ui-dialog-buttonset' )
								.addClass('save-button');
							jQuery( '#jqui_theme_form' ).find( 'input' ).val('');							
						}
					
						
					});
				
				return false;
			});
		
			base.table.find('tr:not(.placeholder)').live('dblclick.wpui', function( e ) {
				e.stopPropagation();
				tableTr = jQuery(this);
				editName = jQuery( this ).find('td').eq( 0 ).text();
				editUrl = jQuery( this ).find( 'td' ).eq( 1 ).text();
				
				base.themeForm
					.attr( 'title' , 'Edit the theme - ' + editName )
					.dialog({
						width : 400,
						modal : true,
						buttons : {
							"Cancel" : function() {
								jQuery( this ).dialog('destroy');
							},
							"Save"	: function( ) {
								newName = jQuery( '#jqui_theme_name' ).val();
								newUrl = jQuery( '#jqui_theme_url' ).val();
								base.validate();
								if( base.valid ) {
									base.editDetails(
										tableTr,
										[ newName , newUrl , editName , editUrl ]
									);
								}

							}
						},
						open : function() {
							jQuery( 'ol' , 'div.theme_add_notes' ).remove();
							// Fillup the text fields.
							jQuery( 'input#jqui_theme_name' )
								.val( editName );
							jQuery( 'input#jqui_theme_url' )
								.val( editUrl );							
							
							// Add class to the buttons
							jQuery( '.ui-button:first' , '.ui-dialog-buttonset' )
								.addClass('cancel-button');
							jQuery( '.ui-button:last' , '.ui-dialog-buttonset' )
								.addClass('save-button');

						},
						close : function( ) {
							jQuery( this ).attr( 'title', '' );
						}
						
					});
					
				
				return false;
			});
		
			jQuery( 'a.jqui_theme_delete' ).live('click', function() {
				
				// Unclick the counterparts.
				jQuery( this )
					.parent()
					.parent()
					.siblings()
					.find('a.action-delete-cancel')
					.trigger('click');
					
				// Add the class.
				jQuery( this )
					.removeClass( 'jqui_theme_delete' )
					.addClass( 'action-delete-confirm' )
					.after( '<br /><a title="Cancel the action" class="action-delete-cancel" href="#">Cancel</a>');
					
				
				return false;
				
			});
		
		
			jQuery( '.action-delete-confirm' ).live( "click", function() {
				
				keyName = jQuery( this ).parent().parent().children().eq(0).text();
				
				delete base.fileList[ keyName ];
				
				if ( typeof jQuery.ui !== "undefined" ) {
					jQuery( this )
						.parent()
						.parent()
						.hide('pulsate', {times : '3'} , 'fast', function() {
							jQuery( this ).remove();
						});
				}
				jQuery( base.fileList ).trigger("change");				
				return false;
			});
			
			jQuery( '.action-delete-cancel' ).live('click', function() {
				jQuery( this )
					.parent()
					.children()
					.eq( 0 )
					.removeClass('action-delete-confirm')
					.addClass( 'jqui_theme_delete' );
					
				jQuery( this ).prev().remove().end().remove();				
				return false;
			});
		
			
			jQuery( '#jqui_scan_uploads' ).click( function() {
				base.themeUploads();
				return false;
			});
			
		};


		/**
		 *	Query the directory wp-uploads/wp-ui for themes.
		 */	
		base.themeUploads = function() {
			jQuery( 'div.jqui_ajax_info').remove();
			
			jQuery( '#jqui_scan_uploads' )
				.before( '<div class="jqui_ajax_info"></div>');
				
			$msg = jQuery( '.jqui_ajax_info' );
				
			$msg
				.append( '<span class="ajax_success" />' )
				.find( 'span.ajax_success')
				.html( '<img width="30px" height="30px" src="' + initOpts.pluginUrl + 'images/scanning-white.gif" />Scanning the uploads folder for themes..</span>' );
						
			var data = {
				action : 'jqui_css',
				upNonce : jqui_admin.upNonce
			}, response;			
			
				jQuery.post( ajaxurl, data, function( response ) {

					$msg.find( 'span' ).remove();
					
					// No directory!
					if ( /NO_DIR.*/i.test(response) ) {
						base.ajaxError = "The directory wp-ui does not exist.";
						base.ajaxPath = response.replace( /NO_DIR\s:::::\s/gm, '')
						
						$msg.hide()
							.append( '<span class="ajax_error" />')
							.find( 'span.ajax_error' )
							.html( base.ajaxError + " Create the following folder through FTP or hosting's file manager.<br /><code>" + base.ajaxPath + '</code>' )
							.end()
							.slideDown( 500 );
							
					// Directory found, but empty.
					} else if ( /EMPTY_DIR.*/i.test( response ) ) {
						// console.log( response ); 
						base.ajaxError = "The wp-ui folder is probably empty. Upload the theme folders to this location.";
						base.ajaxPath = response.replace( /EMPTY_DIR\s:::::\s/gm, '')
						
						$msg.hide()
							.append( '<span class="ajax_error" />')
							.find( 'span.ajax_error' )
							.html( base.ajaxError + '<br /><code>' + base.ajaxPath + '</code>' )
							.end()
							.slideDown( 500 );
				
					// Ha! we found some themes atlast!
					} else {
						
					upList = JSON.parse( response );
					// Remove the placeholder
					base.table.find('tr.placeholder').remove();
					for ( keyss in upList ) {
						// Check if the file already exists
						if( typeof base.fileList[ keyss ] == "undefined" ) {
							vales = upList[ keyss ]
							base.fileList[ keyss ] = vales;
							base.table
								.append('<tr />')
								.find( 'tr:last' )
								.append( '<td>' + keyss + '</td><td><a target="_blank" href="' + vales + '">' + vales + '</a></td><td><a class="jqui_theme_delete" title="Remove this theme" href="#">Delete</a></td>');
						} else {
							// gather the refused files!
							if ( typeof base.rej == "undefined" ) base.rej = {};
							// console.log( "The value already exists!" ); 
							delete upList[ keyss ];
							value = upList[ keyss ];
							base.rej[ keyss ] = value;

						}
						
						}
						
						jQuery( 'div.jqui_ajax_info span.ajax_info' ).html('');
						
						// Display the files added
						if ( ! jQuery.isEmptyObject( upList ) ) {
						$msg
							.hide()
							.append( '<span class="ajax_success">The following styles found were added successfully to the list. Click "Save Changes" to save them.<ol /></span>');
							for( keysz in upList ) {
								jQuery( 'div.jqui_ajax_info ol')
									.append('<li>' + keysz + '</li>' );
							}
						}
						
						// display the rejected files
						if ( typeof base.rej != "undefined" ) {
							// console.log( $msg ); 
							$msg
								.append('<span class="ajax_info" />')
								.find( 'span.ajax_info' )
								.html( 'The following styles are already on the list, hence were not added.' );
							for ( rejKeys in base.rej ) {
								$msg
								.find( 'span.ajax_info' )
									.append('<li>' + rejKeys + '</li>' );
							}						
							
						}
						
						$msg.slideDown( 300 );
						jQuery( base.fileList ).trigger( "change" );
						
						setTimeout( function() {
							jQuery( 'div.jqui_ajax_info' ).slideUp(300, function() {
								jQuery( 'div.jqui_ajax_info').remove();
							});
							delete base.rej;
							delete upList;
							delete base.ajaxError;
						}, 10000);					
						
						// console.log( upList ); 
						
						
						// // console.log( base.rej ); 
					}
					return false;
				});
		};


		base.validate = function( ) {
			base.validMsg = {};
			base.valid = true;
			
			theme_name = jQuery( '#jqui_theme_name' ).val();
			theme_url = jQuery( '#jqui_theme_url' ).val();
			theme_notes = jQuery( 'div.theme_add_notes' );
			theme_notes.find('ol').remove();
			
			if ( theme_name == '' ) {
				base.valid = false;
				base.validMsg.name = "Name(CSS scope) must not be empty.";
			} else if ( ! /^[\w\-_]*$/im.test( theme_name ) ) {
				base.valid = false;
				base.validMsg.name = "Name shall contain only alphabets, digits, hyphens and underscore. It is the CSS scope you selected while downloading the theme.";
			}
		
			if ( theme_url == '' ) {
				base.valid = false;
				base.validMsg.url = "Link to the stylesheet is needed.";
			} else if ( ! /\b(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)[\-A-Z0-9+&@#\/%=~_|$?!:,.]*[A-Z0-9+&@#\/%=~_|$]/i.test(theme_url) ) {
				base.valid = false;
				base.validMsg.url = "Please verify the link.";
			}
		
			// if ( typeof base.fileList[ theme_name ] != "undefined" ) {
			// 	base.valid = false;
			// 	base.validMsg.name = "Name conflict."
			// }
			
			if ( ! base.valid ) {
				if ( typeof jQuery.ui != "undefined" )
					jQuery( '.ui-dialog' ).effect('shake', { times : 5 }, 60 );
				theme_notes
					.append('<ol style="display : none "/>');
				tempOl = theme_notes.find('ol');
				for ( zeus in base.validMsg ) {
					tempOl
						.append( '<li>' + base.validMsg[zeus] + '</li>' )
				}
				tempOl.animate({
					height : 'toggle',
					opacity : 'toggle'
				}, 300);
				
			}

		};



		base.addDetails = function() {
			nameExists = false;
			
			if ( typeof base.fileList[ theme_name ] == "undefined" ) {
			base.fileList[ theme_name ] = theme_url;
			
			jQuery(base.fileList).trigger('change');
			base.table.find('tbody tr.placeholder').remove();
			
			base.table
				.find('tbody')
				.append( '<tr />')
				.find( 'tr:last' )
				.hide()
				.append( '<td>' + theme_name + '</td><td><a href="' + theme_url + '" target="_blank">' + theme_url + '</a></td><td><a href="#" class="jqui_theme_delete" >Delete</a></td>' )
				.fadeIn( 600 );
			// console.log( base.fileList ); 
			}
			base.themeForm.attr( 'title' , '' );
			base.themeForm.dialog('destroy');		

		};

		base.editDetails = function( element, arr ) {
			if ( arr[0] ===  arr[2] && arr[1] === arr[3] ) {
				base.themeForm.attr( 'title' , '' );
				base.themeForm.dialog('destroy');	
				return false;			
			}
			// base.validate();
			
			// if ( base.valid ) {
				nameExists = false;

				for( key in base.fileList ) {
					if ( arr[ 2 ] == key ) 
					nameExists = true;
				}

				if ( nameExists ) {
					delete base.fileList[ arr[ 2 ] ];
				}

				element
					.find( 'td' ).eq( 0 )
					.text( arr[ 0 ] );
				tableTr
					.find( 'td' ).eq( 1 )
					.html( '<a target="_blank" href="' + arr[ 1 ] + '">' + arr[ 1 ] + '</a>'	);

				base.fileList[ arr[ 0 ] ] = arr[ 1 ];
				jQuery( base.fileList ).trigger( 'change' ); 
			
			
			// }
			
			base.themeForm.attr( 'title' , '' );
			base.themeForm.dialog('destroy');
			
		};



		base.init();
    };
    
    $.wpui.jquiThemeManage.defaultOptions = {
			
    };
    
    $.fn.wpui_jquiThemeManage = function(options){
        return this.each(function(){
            (new $.wpui.jquiThemeManage(this, options));
        });
    };
    
    
	$.wpui.selectStyles = function( el, options ) {
        var base = this;
        base.$el = $(el);
        base.el = el;

        base.$el.data("wpui.jquiThemeManage", base);
		
		base.init = function( ) {
			base.o = $.extend( {}, $.wpui.selectStyles.defaults , options );
			
			base.addForm();
			base.formBinders();
			
			
			
		};

		base.addForm = function() {
			var data = {
				action : 'selectstyles_list',
			}, response;
			
			// Add a hidden dialog form to the body, later used for add or delete.
			base.selectForm = jQuery( '<div style="display : none; " title="" id="multiple_styles_form" />')
				.append( '<form><fieldset /></form>' )
				.find( 'form fieldset' )
				.append( '<div class="theme_add_notes" />')
				.append( '<div class="check_styles_lists">Uncheck the styles you don\'t want to load. Drag to reorder the styles. These are loaded only if "Load Multiple Styles" is checked.<ul id="wpui-sortable"></ul></div>')
				.end()
				.appendTo( 'body' );
			
			
			// jQuery.post(ajaxurl, data, function( response ) {
				if ( response == '404' ) return false;		
				base.stylesList = ["wpui-light", "wpui-blue", "wpui-red", "wpui-green", "wpui-dark", "wpui-quark", "wpui-cyaat9", "wpui-android", "wpui-safle", "wpui-alma", "wpui-macish", "wpui-achu", "wpui-redmond", "wpui-sevin"];
				
				base.storedList = [];
				if ( jQuery( '#selected_styles' ).val() )
					base.storedList = JSON.parse( jQuery( '#selected_styles' ).val() );
				liDStr = '';
				
				// console.log( base.stylesList );
				for( i =0; i < base.stylesList.length; i++ ) {
					addScore = base.stylesList[ i ].replace( /\-/im, '_' );
					isDis = (jQuery.inArray( base.stylesList[ i ], base.storedList ) == '-1');
					if (  isDis ) {
						liClass = 'checkbox-holder ui-state-disabled';
						checKed = '';
					} else {
						liClass = 'checkbox-holder';
						checKed = 'checked="checked"';
					}
					liStr = '<li class="' + liClass + '" id="' + base.stylesList[ i ] + '"><input type="checkbox" name="' + addScore + '" id="' + addScore + '" value="on" ' + checKed + ' /><label for="'+ addScore + '">' + base.stylesList[ i ] + '</label></li>';
					if ( isDis ) {
						liDStr += liStr;
					} else {					
					jQuery( '.check_styles_lists ul' )
						.append( liStr );
					}
				}
				
				jQuery( '.check_styles_lists ul' )
					.append( liDStr );
				
				
			// });
			
			
			base.formBinders = function() {
				jQuery( '#wpui-combine-css3-files' ).click(function() {

					base.selectForm
						.attr( 'title' , 'Select multiple styles' )
						.dialog({
							width : 400,
							modal : true,
							buttons : {
								"Cancel" : function( ) {
									jQuery( this ).dialog('destroy');
									jQuery( this ).attr( 'title' , '' );
								},
								"Select" : function() {
									jQuery( '#wpui-sortable' ).trigger( 'sortchange' );
									jQuery( this ).dialog( 'destroy' );
								}
							},
							open : function() {
								jQuery( 'div.theme_add_notes' ).find('ol').remove();
								jQuery( '.ui-button:first' , '.ui-dialog-buttonset' )
									.addClass('cancel-button');
								jQuery( '.ui-button:last' , '.ui-dialog-buttonset' )
									.addClass('save-button');
							}


						});

					return false;
				});				
			};



			jQuery( '#wpui-sortable' ).sortable({
				items : "li:not(.ui-state-disabled)",
				cancel : ".ui-state-disabled",
				containment : 'parent'				
			});

			jQuery( '#wpui-sortable' ).bind( 'sortchange', function() {
				SLarr = jQuery( this ).sortable( 'toArray' );

				jQuery( 'textarea#selected_styles' )
					.val( JSON.stringify( SLarr ) );				
			});


			jQuery( '#wpui-sortable li input' ).live( 'change', function() {

				
				if ( jQuery( this ).is(':checked') ) {
					jQuery( this ).parent().removeClass( 'ui-state-disabled' );
				} else {
					jQuery( this ).parent().addClass( 'ui-state-disabled' );
					jQuery( this ).parent()
						.fadeOut( 300, function() {
							jQuery( this )
							.appendTo( jQuery( this ).parent() )
							.fadeIn( 300 );
						});
				}
				jQuery( '#wpui-sortable' ).sortable( 'refresh' );			
				jQuery( '#wpui-sortable' ).trigger( 'sortchange' );			
				
					
			});
			
			
			
			
			
		};
		

		
		
		base.init();
	};
	
	$.wpui.selectStyles.defaults = {
		
	};
	
	$.fn.wpui_selectStyles = function( options ) {
	 	return this.each(function() {
			(new $.wpui.selectStyles( this, options ) );
		});
	};
	
	
})( jQuery );

jQuery( document ).ready(function() {

	jQuery( '#jqui_custom_themes' ).wpui_jquiThemeManage();
	jQuery( 'textarea#selected_styles' ).parent().parent().hide();
	jQuery( '#wpui-combine-css3-files' ).wpui_selectStyles();
	
});

