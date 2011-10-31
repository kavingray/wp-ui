(function() {


	tinymce.PluginManager.requireLangPack('wptabs');
	
	// Create the wptabs plugin.
	tinymce.create( 'tinymce.plugins.wptabs', {
		
		createControl : function( n , cm ) {
			
			switch( n ) {
				
			case 'wpuimce' :
			var c = cm.createSplitButton( 'wpuimce', {
				title	: "WP UI tabs",
				image	: pluginVars.pluginUrl + "images/wptabs_mce.png",
				 onclick: function() {
					// tinyMCE.activeEditor.windowManager.alert( 'Button was clicked!' );					
				}
				
			});
			
			c.onRenderMenu.add( function(c, m) {
				m.add({
					title	: 	'WP-Tabs',
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
						
						// editorButtonsHelp = pluginVars.wpUrl + '/wp-admin/admin-ajax.php?action=editor_buttons_help&TB_iframe=true';
						// 					
						// tb_show('choosing tab names', editorButtonsHelp);
						
						
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
	
	tinymce.PluginManager.add( 'wptabs', tinymce.plugins.wptabs);
	
})();


tinyMCEPopup.requireLangPack();

var wptabsDialog = {
	init : function() {
		var f = document.forms[0];
	
		
	},
	
	insert : function() {
		// window.console.log(document.forms[0]);
		var tabOpts = new Array();

		if ( document.forms[0].tabType.value != '')
			tabOpts[0] = 'type="' + document.forms[0].tabType.value + '"';

		tabOpts[1] = 'style="' + document.forms[0].colorScheme.value + '"';
		tabOpts[2] =  'effect="' + document.forms[0].effectType.value + '"';

		if ( document.forms[0].effectSpeed.value != '')
			tabOpts[3] = 'speed="' + document.forms[0].effectSpeed.value + '"';

		if ( document.forms[0].rotateTabs.value == 'on'
		 	 && document.forms[0].rotateDuration.value != '' ) {
			tabOpts[5] = 'rotate="' + document.forms[0].rotateDuration.value + '"';
		}
		
		var achu = tinyMCE.activeEditor.selection.getContent();
		
		// alert(achu);
		
		var tabOptsStr = tabOpts.join(' ');

		insertCont = ' [wptabs ' + tabOptsStr + ']' + achu + '[/wptabs]';
		
		
		
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, insertCont);
		

		// tinyMCEPopup.editor.execCommand('mceInsertContent', false, document.forms[0].colorScheme.value);
		tinyMCEPopup.close();
		
	}
	
	
}

tinyMCEPopup.onInit.add(wptabsDialog.init, wptabsDialog);

var wptabtitleDialog = {
	init : function() {
		var f = document.forms[0];
	},
	
	insert : function() {
	
		tabname = document.forms[0].tabname.value;
		loadURL = '';
		if ( document.forms[0].loadAjax.value != '' )
			loadURL = ' load="' + document.forms[0].loadAjax.value + '"';
		
		insertCont = ' [wptabtitle' + loadURL + ']' + tabname + '[/wptabtitle]';
		
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, insertCont);
		
		tinyMCEPopup.close();
	}

} // wptabtitleDialog

tinyMCEPopup.onInit.add(wptabtitleDialog.init, wptabtitleDialog);