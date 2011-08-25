var tb_remove = function() {
	// console.log( "Thickbox close fix" );
 	jQuery("#TB_imageOff").unbind("click");
	jQuery("#TB_closeWindowButton").unbind("click");
	jQuery("#TB_window")
		.fadeOut("fast",function(){
				jQuery('#TB_window,#TB_overlay,#TB_HideSelect')
					.unload("#TB_ajaxContent")
					.unbind()
					.remove();
		});
	jQuery("#TB_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		jQuery("body","html").css({height: "auto", width: "auto"});
		jQuery("html").css("overflow","");
	}
	jQuery(document).unbind('.thickbox');
	return false;
} // END function tb_remove()
