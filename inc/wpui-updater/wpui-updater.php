<?php
/*
Plugin Name: WP UI Updater
Plugin URI: http://kav.in
Description: Update WP UI from GitHub or toggle versions from WordPress repository.	
Version: 0.1
Author: Kavin
Author URI: http://kav.in
*/


/**
 *	WP UI Updater
 *
 *		Through GitHub.
 *
 *
 *
 * @since $Id$
 * @package wp-ui
 * @subpackage wpui-git-updater
 **/




$wpui_git_updater = new wpui_git_updater;

/**
 * Update WP UI through GIT.
 *
 * @package default
 * @author Kavin Gray
 **/
class wpui_git_updater
{
	var $args;

	/**
	 * Constructor
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function __construct( $config=array() ) {

		add_action( 'admin_menu', array( &$this, 'register_update_page' ) );

	} // END function __construct


	/**
	 * Register the admin page.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function register_update_page() {
		add_submenu_page(
			// null,
			'index.php',
			'WP UI Updater',
			'Update WP UI from GitHub',
			'update_plugins',
			'wpui_updates',
			array( &$this, 'wpui_update_page_callback' ) );
	} // END function register_update_page


	/**
	 * Render the page.
	 *
	 * @return void
	 * @author Kavin Gray
	 **/
	function wpui_update_page_callback() {
		?>
		<!-- .wrap -->
		<div class="wrap">
			<div class="icon32" id="icon-plugins"></div>
			<h2>WP UI Custom Update</h2>
			<p>This page toggles between WordPress and GitHub distributed WP UI versions. GitHub version is usually the most recent.</p>
		<?php
		global $wpui_fs;

		// $wpui_fs = new WP_Filesystem();
		// $filename = '';
		
		echo '<p>Downloading WP UI from GitHub 1/2 <span class="ajax-loading"></span></p>';
		// $resp = wp_remote_get( "https://github.com/kavingray/wp-ui/zipball/master" );
		// $resp = download_url( "https://raw.github.com/kavingray/wp-ui/master/wp-ui.php" );

		echo '<pre>';
		echo '$resp';
		echo "\n=========================================\n";
		var_export($resp);
		echo '</pre>';

		// $resp = wp_remote_get( "http://kav.in/favicon.ico" );

		// if ( ! is_wp_error( $resp ) && $resp[ 'response' ][ 'code' ] == 200 ) {
		//
		// 	if ( ! empty( $resp[ 'filename' ] ) ) {
		// 		$filename = $resp[ 'filename' ];
		// 	} elseif ( isset( $resp[ 'headers' ][ 'content-disposition' ] ) ) {
		// 		$contdisp = $resp[ 'headers' ][ 'content-disposition' ];
		// 		preg_match( '/filename=(.*)$/im', $contdisp, $matches );
		// 		echo '<pre>';
		// 		echo '$matches';
		// 		echo "\n=========================================\n";
		// 		var_export($matches);
		// 		echo '</pre>';
		// 	}
		//
		// }



		die();

		?>

			<form method="post">

				<label for="github"><input type="radio" id="github" value="github" value="github"/> <span>GitHub Version</span></label> <br />
				<label for="wp"><input type="radio" id="wp" value="wp" value="wp"/><span>Roll back to WordPress distributed Version</span></label> <br />

				<!-- .submit-action -->
				<div class="submit-action">
					<input type="submit" id="perform" name="perform" class="button-primary" />
				</div>
				<!-- /.submit-action -->

			</form>


			<hr />
			<p>Return to <a href="<?php echo admin_url( "options-general.php?page=wpUI-options" ); ?>" title="Return to WP UI Options">WP UI Options page</a> | Visit <a href="<?php echo site_url(); ?>"><?php bloginfo( 'name' ); ?></a></p>
		</div>
		<!-- /.wrap -->

		<?php
	} // END function wpui_update_page_callback



} // END class wpui_git_updater

?>