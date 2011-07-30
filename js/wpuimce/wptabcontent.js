
(function() {
tinymce.PluginManager.add( 'wptabcontent', tinymce.plugins.wptabcontent);
	
tinymce.create( 'tinymce.plugins.wptabcontent', {
	
	init	: 	function( ed, url ) {
		ed.addCommand( 'mcewptabcontent', function() {
			tabs_sel_content = tinyMCE.activeEditor.selection.getContent();
			tinyMCE.activeEditor.selection.setContent( '[wptabcontent]' + tabs_sel_content + '[/wptabcontent]' );
		});
		
		ed.addButton( 'wptabcontent', {
			title: 'wptabcontent',
			image: 'resize-se.gif',
			cmd: 'mcewptabcontent'
		});
		// ed.addShortCut( 'alt+ctrl+shift+w', ed.getLang('wptabs_mce.php'), 'mcewptabs');
		
	},
	
	createControl : function(n , cm ){
		return null;
	},
	getInfo : function() {
		return {
			longname: 'WPTAB content',
			author: 'Kavin Amuthan',
			authorurl: 'http://kav.in',
			infourl: 'http://kav.in',
			version: '0.1'
			
		};
		
	}
	
	
});

tinymce.PluginManager.add( 'wptabcontent', tinymce.plugins.wptabcontent);
})();