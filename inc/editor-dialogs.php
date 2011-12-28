<div style="display:none;" id="wpui-editor-dialog">

</div>	
<?php $skins_list = wpui_get_skins_list(); ?>
<div style="display:none; !important" id="_wpui-editor-dialog">
	<?php $wpuiPNonce = wp_create_nonce( 'wpui-editor-post-nonce' ); ?>
	<?php $wpuiTNonce = wp_create_nonce( 'wpui-editor-tax-nonce' ); ?>
	<input type="hidden" id="wpui-editor-post-nonce" value="<?php echo $wpuiPNonce; ?>">
	<input type="hidden" id="wpui-editor-tax-nonce" value="<?php echo $wpuiTNonce; ?>">
	<input type="hidden" id="wpui-dialog-mode" value="0">
	<div id="wpui-new-tabset" class="wpui-dialog-wrapper">
	<p class="howto">Each tab is the combination of [wptabtitle] and [wptabcontent] shortcodes.</p>
	<div>
		<label>
			<span>Title of the tab</span>
		</label>
		<input class="widefat" id="wpui-tab-name" type="text" name="tabname" tabindex="10" />
		<span class="error-message"></span>
	</div>
	<p class="howto toggle-arrow wpui-reveal">Contents of the tab</p>
	<div>
		<label>
			<span>Contents of the tab</span>
		</label>
		<textarea rows="6" class="widefat" id="wpui-tab-contents" name="tabcontents" tabindex="10"></textarea>
	<span class="error-message"></span>
	</div>

	</div>

	<div id="wpui-wrap-tabs" class="wpui-dialog-wrapper">
	<p class="howto wpui-reveal toggle-arrow">Wrap the previously created tabsets, using [wptabs]. </p>
	<div>
	<table class="widefat">
		<thead>
		</thead>
		<tbody>
			<tr>
			<td>
				<label><span>Type</span></label>
				<select name="type" id="tabs-type">
					<option value="tabs">Tabs</option>
					<option value="accordion">Accordion</option>
				</select></label>				
			</td>
			<td>
			<label><span>Style<span></label>
			<select name="style" id="tabs-style">
				<option value="default">Default</option>
				<?php	
				foreach( $skins_list as $skin=>$name ) {
					if ( stristr( $skin, 'startoptgroup' ) ) {
						echo '<optgroup label="' . $name . '">';
					} else if ( stristr( $skin, 'endoptgroup') ) {
						echo '</optgroup>';
					} else {
					echo '<option value="' . $skin . '">' . $name . '</option>';
					}
				}	

				 ?>
			</select>
			</td>
			</tr>
			<tr>
				<td>
				<label><span>Effects</span>
				<select name="effect" id="tabs-effect">
					<option value="disable">None</option>
					<option value="fade">Fade</option>
					<option value="slide">Slide</option>
				</select></label>				
				</td>
				<td>
				<label><span>Mode</span>
				<select name="mode" id="tabs-mode">
					<option value="horizontal">Horizontal</option>
					<option value="vertical">Vertical</option>
				</select><br /></label>				
				</td>
				
			</tr>	
			<tr>
				<td colspan="2">
		<label>
			<span>Auto rotation</span>
		<input name="rotate" type="text" id="tabs-rotate" />	
		<p class="howto">Set a valid microsecond value( e.g. 6000 for 6 seconds ) to enable. Leave blank to disable.</p>
		</label>
		<span class="error-message"></span>					
		</td>		
		</tr>		
		<tr>
			<td colspan="2">
				<label>
					<span>Seamless tabs : </span>

				<input type="checkbox" name="no-bg" id="tabs-no-bg">Inits tabs without background, suitable for long articles.</label>		
			</td>
		</tr>
		</tbody>
	</table>
	</div>
	<p class="howto wpui-reveal toggle-arrow">or Display posts</p>
	<div style="display : none;">
	<form id="wpui-tax-search-form">
		<label><span>Search</span>
		<input type="text" id="wpui-tax-search-field">
		</label>
		<select id="wpui-tax-search-type">
		<option value="cat">Categories</option>
		<option value="tag">Tags</option>
		<option value="recent">Recent</option>
		<option value="popular">Popular</option>
		<option value="Random">Random</option>
		</select>
	</form>
	<div id="wpui-search-tax">
		<p class="howto display-type">Type and enter to search. Click to toggle selection.</p>
		<div id="wpui-tax-search-results" class="wpui-search-results">
			<ul class="wpui-tax-list"></ul>
			<div style="display : none;" class="wpui-waiting" style="text-align: center;"><img src="<?php echo admin_url('/images/wpspin_light.gif' ); ?>"></div>
		</div>
		<input type="text" id="wpui-selected-tax" class="wpui-selected">
		<label><span>Number of tabs to display</span><input type="text" id="wpui-tax-number" name="wpui-tax-number" value="5"></label>
<style type="text/css">
#wpui-editor-dialog #wpui-tax-number { width : 30px; }
#wpui-tax-search-results { background : #FFF; border : 1px solid #DFDFDF; height : 185px; margin : 0 5px 5px; overflow : auto; position : relative; overflow : auto;}
#wpui-editor-dialog ul.wpui-tax-list { list-style : none;} 
#wpui-editor-dialog ul.wpui-tax-list li { border-bottom: 1px solid #F1F1F1; padding : 4px 6px; position : relative; cursor : pointer; margin-bottom : 0;}
#wpui-editor-dialog ul.wpui-tax-list li.selected {  background : #DDD; font-weight : bold !important; }
#wpui-editor-dialog ul.wpui-tax-list li a { text-decoration : none; color : #777; text-shadow: 0 1px 0 #FFF; display : block; width : 300px; overflow : hide;}
span.info { position : absolute; top : 0; right : 0;  height: 100%; padding : 4px; }
</style>		
		<!-- <?php $wpui_cats = get_categories( array( 'taxonomy' => 'tag') ); ?>
		
		<select name="wpui-cat-list" id="wpui-cat-list">
			<?php
			foreach( $wpui_cats as $wcat ) {
				echo '<option value="' . $wcat->term_id  . '">' . $wcat->category_nicename . '</option>';
			}
			?>
		</select> -->
		
	</div>
	</div>
	</div><!-- .wpui-wrap-tabs -->



	<div id="wpui-add-spoiler" class="wpui-dialog-wrapper">
	<p class="howto">Select some text, enter a name.</p>
	
		<div>
			<label>
			<span><abbr title="Clickable part of the tab">Title of the spoiler</abbr></span>
			</label>
			<input class="widefat" type="text" name="spoil-title" id="spoil-title">
			<span class="error-message"></span>
		</div>
		<p class="howto toggle-arrow wpui-reveal">Enter the content</p>

		<div>
			<label>
			<textarea rows="6" class="widefat" name="spoil-content" id="spoil-content"></textarea>	
		</label>
		<p class="howto" style="display: none;">Select some text and click open this panel, text will be added automatically.</p>
		<span class="error-message"></span>
		
		</div>	
	
		<h5> + <a href="" onclick="jQuery( this ).parent().next('div').toggle(); return false;">Show advanced options</a></h5>
		<div class="show-advanced-spoiler-options" style="display :none;">
		<table class="widefat">
		<tbody>
		<tr>
			<td>
			<label>
			<span>Style</span>
			<select name="style" id="spoils-style">
				<option value="default">Default</option>
			<?php foreach( $skins_list as $skin=>$name ) {
					if ( stristr( $skin, 'startoptgroup' ) ) {
						echo '<optgroup label="' . $name . '">';
					} else if ( stristr( $skin, 'endoptgroup') ) {
						echo '</optgroup>';
					} else {
						echo '<option value="' . $skin . '">' . $name . '</option>';
					}
				} ?>
			</select>			
			</label>
			</td>
		</tr>
		<tr>
		<td>
			<label>
			<span>Open at load</span>
				<input type="checkbox" id="spoils-open" name="spoils-open">Check here to open spoilers at page load.
			</label>
			<span class="error-message"></span>
		</td>
		</tr>
		<tr>
		<td>
			<label>
			<span>Close button Label</span>
				<input type="text" id="spoils-closebtn" name="spoils-closebtn"><br/>This button allows you to close the spoiler.Leave blank to disable. 
			</label>
			<span class="error-message"></span>
		</td>
		</tr>		
		
		
		</table>
		
		</div><!-- end show advanced spoiler options -->
			
				<!-- <td>
					<label>
						<span> </span>
						
					</label>
				</td> -->
	</div>


	<div id="wpui-add-dialog" class="wpui-dialog-wrapper">
	<p class="howto">Select some text, enter a title for the dialog.</p>
	
	<div>
		<label>
			<span>Title</span>
			<input class="widefat" type="text" name="title-dialog" id="dialog-title" />
			<span class="error-message"></span>
		</label>
	</div>
	<p class="howto toggle-arrow wpui-reveal">Enter the content</p>
	
	<div>
		<label>
			<textarea rows="6" class="widefat" name="content-of-dialog" id="dialog-contents"></textarea>
		</label>
		<p class="howto" style="display: none;">Select some text in editor and click open this panel, text will be added automatically.</p>
		<span class="error-message"></span>
		
	</div>
	

	<h5> + <a href="" onclick="jQuery( this ).parent().next('div').toggle(); return false;">Show advanced options</a></h5>
	<div class="show-advanced-dialog-options" style="display :none;">
		<table class="widefat">
			<tbody>
				<tr>
					<td colspan="2">
						<label>
							<span>Style</span>
						</label>
							<select name="style" id="dialog-style">
								<option value="default">Default</option>								
							<?php foreach( $skins_list as $skin=>$name ) {
									if ( stristr( $skin, 'startoptgroup' ) ) {
										echo '<optgroup label="' . $name . '">';
									} else if ( stristr( $skin, 'endoptgroup') ) {
										echo '</optgroup>';
									} else {
										echo '<option value="' . $skin . '">' . $name . '</option>';
									}
								} ?>
							</select>						
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<label>
							<span>Auto open Button label</span>
						</label>
							<input type="text" name="dialog-openlabel" id="dialog-openlabel" value="">
						<p class="howto">Disables autoopen at load and displays button for manually opening dialog. Leave blank to auto open.</p>
					</td>
				</tr>
				<tr>
					<td>
						<label>
							<span>Width</span>
							<input type="text" name="dialog-width" id="dialog-width" value="" />
						</label>
					</td>
					<td>	
						<label>
							<span>Height</span>
							<input type="text" length="10" name="dialog-height" id="dialog-height" value="" />
						</label>
					</td>
				</tr>				
			</tbody>
		</table>
	</div><!-- end show-advanced-dialog-options -->	
	
	

	</div><!-- end .wpui-add-dialog -->


	<div style="display: none;" class="wpui-search-posts">
	<p class="howto toggle-arrow wpui-reveal">Or choose a post</p>
		
		<form id="wpui-search-posts-form">
			<label><span>Search</span>
			<input type="text" id="wpui-post-search-field" tabindex="60" autocomplete="off">
			</label>
		</form>
		<input id="wpui-selected-post" class="wpui-selected" type="hidden">
		<p class="howto display-type">Displaying recent posts</p>
		<div id="wpui-search-results" class="wpui-search-results">
			<ul class="wpui-post-list"></ul>
			<div style="display : none;" class="wpui-waiting" style="text-align: center;"><img src="<?php echo admin_url('/images/wpspin_light.gif' ); ?>"></div>
		</div>
<style type="text/css">
#wpui-editor-dialog #wpui-post-search-number { width : 30px; }
#wpui-search-results { background : #FFF; border : 1px solid #DFDFDF; height : 185px; margin : 0 5px 5px; overflow : auto; position : relative; overflow : auto;}
#wpui-editor-dialog ul.wpui-post-list { list-style : none;} 
#wpui-editor-dialog ul.wpui-post-list li { border-bottom: 1px solid #F1F1F1; padding : 4px 6px; position : relative; cursor : pointer; margin-bottom : 0;}
#wpui-editor-dialog ul.wpui-post-list li.selected {  background : #DDD; font-weight : bold !important; }
#wpui-editor-dialog ul.wpui-post-list li a { text-decoration : none; color : #777; text-shadow: 0 1px 0 #FFF; display : block; width : 300px; overflow : hide;}
span.info { position : absolute; top : 0; right : 0;  height: 100%; padding : 4px; }
</style>		
	</div>




</div><!-- end .wpui-editor-dialog -->

<style type="text/css">
.wpui-dialog-wrapper {
	margin : 10px;
}
label {
	font-size : 12px;
}
label input[type="text"],
label textarea {
	background-color : #FFF;
	border-color : #DFDFDF;
	border-radius : 4px;
	margin : 1px;
	padding : 3px;
	font-size : 12px;
}

#wpui-wrap-tabs table label span {
	width : 70px;
	display : inline-block;
}

#wpui-add-spoiler table label span {
	width : 120px;
	display : inline-block;
	
}
#wpui-add-dialog table label span {
	display : inline-block;
	width : 120px;
}

span.error-message.active {
	color : #F00 ;
	background : pink;
	display : block;
	padding : 2px 5px;
	font-size : 12px;
}

#wpui-editor-dialog .toggle-arrow {
	background: url("<?php echo wpui_url( '/images/toggle-arrow.png' ) ?>") no-repeat scroll left top transparent;
    height: 23px;
    line-height: 23px;
	padding-left : 18px;
	cursor : pointer;
}
#wpui-editor-dialog .toggle-arrow-active {
	background-position : left center !important;
}


</style>