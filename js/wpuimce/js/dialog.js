
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
		 	 && document.forms[0].rotateDuration != '' ) {
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
		loadURL = 'load="' + document.forms[0].loadAjax.value + '"';
		
		insertCont = ' [wptabtitle ' + loadURL + ']' + tabname + '[/wptabtitle]';
		
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, insertCont);
		
		tinyMCEPopup.close();
	}

} // wptabtitleDialog

tinyMCEPopup.onInit.add(wptabtitleDialog.init, wptabtitleDialog);