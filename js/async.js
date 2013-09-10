var getMyJS = function( url, callback, id ) {
	if ( document.getElementById( id ) ) return;
	if ( typeof( callback ) != 'function' )
		callback = function() {};
	var njs = document.createElement( 'script' ),
	pjs = document.getElementsByTagName( 'script' )[ 0 ];
	njs.src = url;
	njs.type = "text/javascript";
	njs.async = true;
		
	
	njs.onload = njs.onreadystatechange = function() {
		rs = this.readyState;
		if ( rs && rs != 'complete' && rs != 'loaded' ) return;
		try { callback(); } catch( e ) { }
	};
	
	pjs.parentNode.insertBefore( njs, pjs );	
	
};

if ( typeof jQuery != 'undefined' && typeof wpuiJQ == 'undefined' ) wpuiJQ = jQuery;


wpuiJQ.wpuiGetScript = function( url, callback ) {
	wpuiJQ.ajax({
		url : url,
		dataType : 'script',
		success : callback,
		async : false
	});
};

wpuiJQ(function() {

	scr_nee = {};
	scr_nee.tabs = false;
	scr_nee.acc = false;
	scr_nee.spoiler = false;
	scr_nee.ktabs = false;
	// scr_nee.dialog = false;
	
	
	wpuiJQ.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/init.js', function() {
		if ( scr_nee.tabs != false ) wpuiJQ( '.wp-tabs' ).wptabs();
		if ( scr_nee.acc != false ) wpuiJQ( '.wp-accordion' ).wpaccord();
		if ( scr_nee.spoiler != false ) wpuiJQ( '.wp-spoiler' ).wpspoiler();
		// if ( scr_nee.ktabs != false ) wpuiJQ( '.ktabs' ).ktabs();
		// if ( scr_nee.dialog != false ) wpuiJQ( '.wp-dialog' ).wpDialog();
	});
	
	if ( wpuiJQ( '.wp-tabs' ).length > 0 ) {
		wpuiJQ.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/tabs.js', function() {
			scr_nee.tabs = true;
		});
	}

	if ( wpuiJQ( '.wp-accordion' ).length > 0 ) {
		wpuiJQ.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/acc.js', function() {
			scr_nee.acc = true;	
		});
	}

	
	if ( wpuiJQ( '.wp-spoiler' ).length > 0 ) {
		wpuiJQ.wpuiGetScript( wpUIOpts.pluginUrl + 'js/select/spoiler.js', function() {
			scr_nee.spoiler = true;
		});
	}	

	// if ( wpuiJQ( '.ktabs' ).length > 0 ) {
	// 	wpuiJQ.wpuiGetScript( wpUIOpts.pluginUrl + 'js/qtabs.js', function() {
	// 		scr_nee.ktabs = true;
	// 	});
	// }

});


