jQuery(document).ready(function() {

	// // REMOVE
	// jQuery('#content').css({ 'margin-right' : '400px'});
	// jQuery('.wp-tab-content').css({ 'font-size' : '12px'});

	
	jQuery('div.wp-tabs p, div.wp-tabs br').filter(function() {
		return jQuery.trim(jQuery(this).html()) === ''
	}).remove();
	
	if ( wpUIOpts.enableTabs == 'on')
		jQuery('div.wp-tabs').wptabs();
	
	if ( wpUIOpts.enableSpoilers == 'on' )
		jQuery('.wp-spoiler').wpspoiler();
	
	if ( wpUIOpts.enableAccordion == 'on')
		jQuery('.wp-accordion').wpaccord();
	
	// jQuery('div.ui-tabs-panel pre').wpuipre();


	// var creditText = '<p>Like these tabs? Click here to get one!</p>';
	// var creditImg = initOpts.pluginUrl + 'images/cap-icon.png';
	// 
	// jQuery('a.cap-icon-link').toolztip({
	// 	width	 : '250px',
	// 	imgWidth : "72px" 
	// }, creditText , 'WP UI for WordPress', creditImg);

	

	
	// jQuery('table.form-table tr:odd').addClass('odd');
	// 
	// jQuery('table.form-table').each(function() {
	// 	var totalTr = jQuery(this).find('tr').length;
	// 	if ( totalTr >= 2 )
	// 	jQuery(this).find('tr:odd').addClass('odd');
	// });
	
	// jQuery('p.switch-editors a').css({ cursor: 'pointer'});
	// jQuery('p.switch-editors a.toggleVisual').addClass( 'active' );
	// jQuery('p.switch-editors a').click(function() {
	// 	jQuery(this).toggleClass('active').siblings().toggleClass('active');
	// 	
	// });

	
});



jQuery.fn.tabsThemeSwitcher = function(classArr) {
	
	return this.each(function() {
		var $this = jQuery(this);

		$this.prepend('<div class="selector_tab_style">Switch Theme : <select id="tabs_theme_select" /></div>');
	
	for( i=0; i< classArr.length; i++) {
		jQuery('#tabs_theme_select', this).append('<option value="' + classArr[i] + '">' + classArr[i] + '</option');
		
	} // END for loop.
	

	if ( jQuery.cookie && jQuery.cookie('tab_demo_style') != null ) {
		currentVal = jQuery.cookie('tab_demo_style');
		$this.find('select#tabs_theme_select option').each(function() {
			if ( currentVal == jQuery(this).attr("value") ) {
			 	jQuery(this).attr( 'selected', 'selected' );
			}
		});
	} else {
		currentVal = classArr[0];
	} // END cookie value check.

	
	$this.children('.wp-tabs').attr('class', 'wp-tabs').addClass(currentVal, 500);
	$this.children('.wp-accordion').attr('class', 'wp-accordion').addClass(currentVal, 500);
	$this.children('.wp-spoiler').attr('class', 'wp-spoiler').addClass(currentVal, 500);

	
	jQuery('#tabs_theme_select').change(function(e) {
		newVal = jQuery(this).val();
		
		$this.children('.wp-tabs, .wp-accordion, .wp-spoiler').switchClass(currentVal, newVal, 1500);
		
		currentVal = newVal;
		
		if ( jQuery.cookie ) jQuery.cookie('tab_demo_style', newVal, { expires : 2 });
	}); // END on select box change.
	

	}); // END each function.	
	
};


jQuery.fn.toolztip = function( options, data , title, image ) {
	
	var defaults ;
	
	defaults = {
		width		: '200px',
		imgWidth	: '75px'
	};
	
	var o = jQuery.extend( defaults, options );
	
	return this.each(function() {
		var $this = jQuery(this);
		
		$this.mouseover(function(e) {
			
			if ( $this.find('div#toolztip').length < 1 ) {
			
				$this.append( 	'<div id="toolztip" class=""> \
									<div class="toolztitle"> \
									</div><!-- end div.toolztitle --> \
									<div class="toolzcontent"> \
										<div class="toolz-icon"></div> \
										<div class="toolz-desc"></div> \
									</div><!-- end div.toolzcontent --> \
							  	</div><!-- end #toolztip --> \
							');

				$tool = jQuery('#toolztip');

				if ( ( $tool.offset().top + $tool.height() ) < jQuery(window).scrollTop() )
				{
					$tool.addClass( 'bottom-tip' );
				} else {
					$tool.addClass( 'top-tip');
				}
						
				$this.find( '#toolztip div.toolztitle').html( title );
			
				$tool.width( o.width );
				
				imge = document.createElement( 'img' );
				jQuery(imge).attr({
					src : image,
					width : o.imgWidth
				}).css({ 'float' : 'left', margin : '10px', marginTop : '0px'});
			

			
				$this.find( '#toolztip div.toolzcontent' ).append( data );

				$this.find( 'div#toolztip' ).hide();
			
				$this.find( 'div#toolztip' ).show('slide', {direction : 'up', easing : 'easeOutBounce' }, 1000);
				if ( image )
					$this.find( '#toolztip div.toolzcontent .toolz-icon' ).prepend( imge );
			}
			
			
			if ( ( $tool.offset().top + $tool.height() ) < jQuery(window).scrollTop() )
			{
				// $tool.removeClass('top-tip').addClass('bottom-tip');
				$tool.switchClass( 'top-tip', 'bottom-tip', 600);
			}

			
		}).mouseleave(function() {
			jQuery('#toolztip').hide('slide', {direction : 'up', easing : 'easeInExpo' }, 300, function() {
				jQuery(this).remove();
			});
		});
		
	}); // END return this each.	
	
};