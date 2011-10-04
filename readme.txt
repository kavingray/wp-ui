=== WP UI - Tabs, Accordions, Sliders ===
Contributors: kavingray
Donate link: http://pledgie.com/campaigns/16073
Plugin URI: http://kav.in/wp-ui-for-wordpress
Tags: posts, tabs, accordion, sliders, spoilers, collapsibles, posts, jquery, jquery ui, dialogs, custom themes, themeroller, CSS3, pagination, capability
Requires at least: 3.0
Tested up to: 3.2.1
Stable tag: 0.7.3

Easily add Tabs, Accordion, dialogs and collapsibles to your posts. With 14 fresh & Unique CSS3 styles and 24 multiple jQuery UI custom themes.

== Description ==

WP UI is an advanced interface widgets plugin that channels the power of jQuery UI over the stability of wordpress for achieving awesome posts. Widgets or components of WP UI - Tabs, Accordions, Spoilers, Collapsibles, Dialogs can make any lengthy posts easy on eyes and to digest and is the way to greater user interactivity. Tabs and accordions are also most common widgets found everywhere in the digital world today - Browsers on Desktop/Mobile/Operating systems, e-Commerce sites, administration etc. 

[Plugin page](http://kav.in/wp-ui-for-wordpress)

[Documentation/Usage/Demo](http://kav.in/projects/blog/tag/wp-ui/)

[Plugin Support](http://kav.in/forum)

== Installation ==

1. Upload the `wp-ui` folder to the `/wp-content/plugins/` directory.
1. Activate the plugin through the 'Plugins' menu in WordPress.
1. Add shortcodes to the post editor and enjoy!

== Frequently Asked Questions ==

= Where can i find recent & up-to-date FAQ? =

Can be found [here](http://kav.in/projects/blog/wp-ui-faq/).

= How do i use multiple jQuery UI themes? =
It is possible from WP UI 0.5.5 to use multiple jQuery UI themes on the same page. Check out this [guide](http://kav.in/wp-ui-using-jquery-ui-custom-themes/).

= Where can i demo the custom CSS3 styles? =

Demo with the *style switcher* can be found [here](http://kav.in/projects/plugins/wp-ui).

= What if the user does not have Javascript enabled? =

All the code will **degrade gracefully** when javascript is disabled. Try disabling the Javascript in your browser to take a look yourselves.

= Can i use all the available jQuery UI themes? =

Yes. Just enter the name of jQuery UI theme as value to the shortcode [wptabs] style argument. From Version 0.5.5, it is now possible to use multiple UI themes, with this [guide](http://kav.in/wp-ui-using-jquery-ui-custom-themes/).

= Why are some of my shortcodes appear on the rendered page? =

Make sure each one of your shortcodes is in the **separate line** but please do avoid empty lines. eg. 

    [wptabs]
      [wptabtitle]Tab 1[/wptabtitle]
      [wptabcontent]Contents of the first tab goes here. Any thing, blah blah.[/wptabcontent]
      [wptabtitle]Tab 2[/wptabtitle]
      [wptabcontent]Content inside the second tab is here.[/wptabcontent]
    [/wptabs]


= Why do i see closing shortcodes in the rendered page? =

Shortcodes should be entered into the wordpress post editor's HTML mode. WP Visual mode editor can insert additional paragraph `<p>` tags before and after the shortcodes, thereby rendering those invalid.

= Why do my font's look blurry / Why can not i see any text ? =

Styling inconsistencies. Probably because the background color of the CSS3 style and your wordpress theme's text color are near same. Please try switching to some other tab style or jQuery UI theme.

= Why does the widgets behave strangely sometimes? =

This can be related to lot of white space between the shortcodes, which are converted by wordpress into empty space enclosed within `<p>` tags. Remove the unwanted space between the shortcodes.

= Where can i get help about this plugin? =

Documentation is available right within the wordpress admin. It is present in the 

* Post editor - look for the menu button in Visual mode and "?" icon in the HTML mode. This opens a document with common usage of the plugin shortcodes and their arguments.
* Contextual Help - Available on the options page on the top right corner, below the username. Click each tab and information related to that tab will appear.

Help 

* [Detailed Documentation & Demos](http://kav.in/projects/).
* [Support forums ](http://kav.in/forum)

= I have some exciting idea/suggestion about this plugin! =

I would love to hear about it. Please drop me a note [here](http://kav.in/contact) or [here](http://kav.in/forum)

= How can i support this plugin? =

* Give this plugin a nice rating - Stars on the right!
* Tell others that it works, with the compatibility box on the right
* We'd really appreciate, if you [link](http://kav.in/wp-ui-for-wordpress) to the plugin site or share.
* Maybe, you can like us on [Facebook](http://www.facebook.com/pages/Capability/136970409692187) or follow us on [twitter](http://twitter.com/cpblty), if you think we are doing a good job!

== Screenshots ==

1. Preview of some of the CSS3 styles.
2. Editor Buttons and help.
3. Step by Step Help available right within the wordpress editor.
4. Style chooser available from within the post editor.

== Changelog ==

= 0.7.3 =
* Tons of compatibility fixes.
* jQuery version requirement relaxed to 1.4.4. 
* Another Tabs design option - no-background tabs. Use background="false" to try it with any style.
* Style Fixes - Jumpy text, uniform feel. Use the custom css panel to input your font size.
* New shortcode [wpui_loop] gets you custom loop can be used anywhere, not limited to WP UI.
* Pagination for posts inside tabs. Basic pagination for now to be used with the [wpui_loop] shortcode.
* Twitter and e-commerce widgets blank page fix. 
* Please Save The Options.

= 0.7.2 =
* Detailed Preview of jQuery UI themes and CSS3 styles.
* Dialog positions, style conflicts fixed.
* Bug fixes, including Line breaks fix, and improved security.
* Auto fix the missing options that are essential.
* Optional scroll follow navigation for tabs
* Numerous style conflicts are fixed across multiple wordpress themes.

= 0.7 =
* Display post/posts and pages within Tabs/accordion/dialogs/sliders.
* Mousewheel support and vertical styling for Tabs.
* Dialogs completely styled and ready for action. 
* Template feature for the posts.
* Sliders/dialogs rewritten.
* Various bugfixes.

= 0.5.6 =
* Fix: array_key_exists error when there are no custom themes listed.

= 0.5.5 =
* jQuery UI custom themes, manageable through options page.
* Tabs/accordion events choice - Mouseover/Click(default)
* UI Dialog, some basic support.
* Complete Linking and history.
* Tabs/accordion custom styles were modified to cooperate with the jQuery UI themes.
* Accordion/Tabs - contact form 7 related bug totally fixed - ( Missing submit button )
* Additional fix for preventing thickbox from breaking jQuery UI functionality (originally unrelated to WP UI).

= 0.5.2 =
* Accordion easing effects added.
* Many other options were added to the options page.
* Tab name special characters fix.

= 0.5.1 =
* Fixed "Unable to attach Media - Images to the post with the plugin activated" problem. 
* Fixed the options page contextual help and other documentation.
* License copy added.

= 0.5 =
* The First public release.
* Custom CSS3 styles.
* Uses jQuery 1.6.1 and jQuery UI 1.8.12.
* Added more features to tabs - Nested, AJAX loading etc.
* Plugin now supports Tabs, Accordion, Sliders, Collapsibles.

= 0.1 =
* Plugin scripts rewritten with reusability in mind. IE support, from IE6.


== Upgrade Notice ==

= 0.7.3 =
Pagination, new anywhere loop shortcode, Tons of compatibility fixes, style fix etc. Please save the options.

= 0.7.2 =
Detailed preview of jQuery UI themes & CSS3 styles. Dialog positions, linebreak fix, Buttons for page editor, Improved security. Auto Fix the missing options.

= 0.7 =
Now, load posts into tabs/acc/dialogs/sliders. Mousewheel scrolling thro tabs. Dialogs styles, Vertical tabs. Please resave the options.

= 0.5.6 =
Fixed : array_key_exists error fixed. Please resave the options.

= 0.5.5 =
Multiple jQuery UI custom themes, Linking and history for the tabs, tabs/accordion events. Fixed: Contact form 7 related bug/wpui custom themes - jQuery UI themes compatibility. Choose a jQuery UI theme as default for update.

= 0.5.2 =
A lot of Accordion effects/options added. You can now use special characters in Tab titles. Please update and re save the options.

= 0.5.1 =
**Fixed** the problem, where unable to attach images to a post with the plugin enabled. Important fix.

= 0.5 =
This is the first stable version to be released.


== Demos ==

= Demos =
* [complete demo](http://kav.in/projects/blog/wp-ui-tabs-accordion-sliders-demo/)
* [styles demo ](http://kav.in/projects/blog/wp-ui-css3-styles-demo/)
* [ Including the posts ](http://kav.in/projects/blog/wp-ui-display-posts-wordpress/)

Please **rate** the plugin if you find it useful.


= Credits =
Following scripts have been included with this plugin.

* Includes jQuery cookie plugin by Klaus Hartl.
* Includes hashchange event plugin by Ben Alman.
* Includes Mousewheel event plugin by Brandon Aaron.

Thanks to respective authors for their great work.