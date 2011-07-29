/*
 *	WP UI Tinymce plugin.
 *	
 */
(function() {


	
	tinymce.create( 'tinymce.plugins.WPUIMCE', {
		
		createControl : function( n , cm ) {
			
			switch( n ) {
				
			case 'wpuimce' :
			var c = cm.createSplitButton( 'wpuimce', {
				title	: "WP UI widgets",
				image	: pluginVars.pluginUrl + "/js/wpuimce/img/wptabs_mce_red.png",
				 onclick: function() {
					// tinyMCE.activeEditor.windowManager.alert( 'Button was clicked!' );					
				}
				
			});
			
			c.onRenderMenu.add( function(c, m) {
				m.add({
					title	: 	'WP-UI',
					'class'	: 	'mceMenuItemTitle'
				}).setDisabled(1);
				
				m.add({
					title	: 	'Tab Name',
					onclick	: 	function() {
						ti = tinyMCE.activeEditor.selection.getContent();
						
						if ( typeof ti == "undefined" || ti == '') { 
							tinyMCE.activeEditor.windowManager.open({
								url: pluginVars.pluginUrl + "js/wpuimce/wptabtitle.htm",
								width: 500,
								height: 280,
								inline: 1,
								popup_css: false
							}); // END open window manager.
						
						}
						else {
							tinyMCE.activeEditor.selection.setContent(' [wptabtitle]' + ti + '[/wptabtitle] ');

						}
					} // END function onclick.
				});
				
				m.add({
					title	: 	'Tab contents',
					onclick	: 	function() {
					var uj = tinyMCE.activeEditor.selection.getContent();
						
					tinyMCE.activeEditor.selection.setContent(' [wptabcontent]' + uj + '[/wptabcontent] ');
					}
					
				});
				
				m.add({
					title	: "Wrap Tabs",
					onclick	: function() {
						// vk = tinyMCE.activeEditor.selection.getContent();
						// 		tinyMCE.activeEditor.selection.setContent(' [wptabs]' + vk + '[/wptabs] ');

						tinyMCE.activeEditor.windowManager.open({
							url: pluginVars.pluginUrl + "js/wpuimce/wptabs_options.htm",
							width: 500,
							height: 400,
							inline: 1,
							popup_css: false
						}); // END open window manager.
						
						// Process the inserted content.

					} 
				});
				
				
				m.add({
					title	: 	'WP UI - Help',
					onclick	: 	function() {
						editorHelp = pluginVars.wpUrl + '/wp-admin/admin-ajax.php?action=editorButtonsHelp&TB_iframe=true';
					
						tb_show('choosing tab names', editorHelp);				
					}
					
				});
				
				
			}); // END c.onRenderMenu.
			return c;	
		}
		
		return null;
			
		}, // END create control.
		
		getInfo : function() {
			return {
				longname : 'WP-UI Tabs plugin for TinyMCE',
				author : 'Kavin',
				authorurl : 'http://kav.in',
				infourl : 'http://kav.in',
				version : '0.1'
			}
		}
		
		
	}); // END tinymce.create  tinymce.....

	tinymce.PluginManager.add( 'wpuimce', tinymce.plugins.WPUIMCE);

})(); // END auto closure.

