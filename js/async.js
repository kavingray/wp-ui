jQuery(function() {

	scr_nee = {};
	scr_nee.tabs = false;
	scr_nee.acc = false;
	scr_nee.spoiler = false;
	scr_nee.dialog = false;
	
	jQuery.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/init.js', function() {
		if ( scr_nee.tabs != false ) jQuery( '.wp-tabs' ).wptabs();
		if ( scr_nee.acc != false ) jQuery( '.wp-accordion' ).wpaccord();
		if ( scr_nee.spoiler != false ) jQuery( '.wp-spoiler' ).wpspoiler();
		if ( scr_nee.dialog != false ) jQuery( '.wp-dialog' ).wpDialog();
	});
	
	if ( jQuery( '.wp-tabs' ).length > 0 ) {
		jQuery.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/tabs.js', function() {
			scr_nee.tabs = true;
		});
	}

	if ( jQuery( '.wp-accordion' ).length > 0 ) {
		jQuery.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/acc.js', function() {
			scr_nee.acc = true;	
		});
	}

	if ( jQuery( '.wp-dialog' ).length > 0 ) {
		jQuery.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/dialog.js', function() {
			scr_nee.dialog = true;
		});
	}
	
	if ( jQuery( '.wp-spoiler' ).length > 0 ) {
		jQuery.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/spoiler.js', function() {
			scr_nee.spoiler = true;
		});
	}	


});

jQuery.wpuiGetScript = function( url, callback ) {
	jQuery.ajax({
		url : url,
		dataType : 'script',
		success : callback,
		async : false
	});
};
