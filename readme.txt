=== WP UI - Tabs, Accordions, Sliders ===
Contributors: kavingray
Donate link: http://kav.in/
Plugin URI: http://kav.in/wp-ui-for-wordpress
Tags: posts, tabs, accordion, sliders, spoilers, collapsibles, posts, jquery, jquery ui, dialogs, custom themes, themeroller, CSS3, capability
Requires at least: 2.9
Tested up to: 3.2.1
Stable tag: 0.5.5

Easily add Tabs, Accordion, Collapsibles to your posts. With 14 fresh & Unique CSS3 styles and Support for multiple jQuery UI custom themes.

== Description ==

WP UI is an advanced interface widgets plugin that combines the power of jQuery UI widgets into Wordpress posts. Tabs are common widgets found in almost every graphical browser and Desktop/Mobile Operating systems. These widgets can increase your post's potential for greater user interactivity. And please do remember, Great content deserves great presentation too! 

[Documentation/Usage/Demo](http://kav.in/projects/blog/tag/wp-ui/)

[Plugin page](http://kav.in/wp-ui-for-wordpress)

[Plugin Support](http://kav.in/discuss)

== Installation ==

1. Upload the `wp-ui` folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress.
1. Add shortcodes to the post editor and enjoy!

== Frequently Asked Questions ==

= Where can i find recent & up-to-date FAQ? =

Can be found [here](http://kav.in/projects/plugins/blog/wp-ui-faq).

= How do i use multiple jQuery UI themes? =
It is possible from WP UI 0.5.5 to use multiple jQuery UI themes on the same page. Check out this [guide](http://kav.in/wp-ui-using-jquery-ui-custom-themes/).

= Where can i demo the custom CSS3 styles? =

Demo with the *style switcher* can be found [here](http://kav.in/projects/plugins/wp-ui).

= What if the user does not have Javascript enabled? =

All the code will **degrade gracefully** when javascript is disabled. Try disabling the Javascript in your browser to take a look yourselves.

= Can i use all the available jQuery UI themes? =

Yes. Just enter the name of jQuery UI theme as value to the shortcode [wptabs] style argument. From Version 0.5.5, you can use multiple UI themes.

= Why aren't my tabs working? / Why are some of my shortcodes not getting parsed? =

Make sure each one of your shortcodes is in the **separate line** and avoid empty lines. eg. 

    [wptabs]
    [wptabtitle]Tab 1[/wptabtitle]
    [wptabcontent]Contents of the first tab goes here. Any thing, blah blah.[/wptabcontent]
    [wptabtitle]Tab 2[/wptabtitle]
    [wptabcontent]Content inside the second tab is here.[/wptabcontent]
    [/wptabs]


= Why do i see closing shortcodes in the rendered page? =

Shortcodes should be entered into the wordpress post editor's HTML mode. WP Visual mode editor can insert additional paragraph `<p>` tags before and after the shortcodes, thereby rendering those invalid.

= Why can't i see the text in my tabs? =

Styling inconsistencies. Probably because the background color of the CSS3 style and your wordpress theme's text color are near same. Please try switching to some other tab style or jQuery UI theme.

= Why does the widgets behave strangely sometimes? =

This can be related to lot of white space between the shortcodes, which are converted by wordpress into empty space enclosed within `<p>` tags. Remove the unwanted space between the shortcodes.

= I have tried everything, but why these still doesn't work? =

Okay, drop me a note with the code you used. I'll be glad to help.

= Why can't i select the other option tabs after using "Visualize and select" in the options panel? =

This is because another copy of jQuery UI was loaded for the stylechooser. Please save changes and try again. It should work now. So will it, after page reload.

= Where can i get help about this plugin? =

Documentation is available right within the wordpress admin. It is present in the 

* Post editor - look for the menu button in Visual mode and "?" icon in the HTML mode. This opens a document with common usage of the plugin shortcodes and their arguments.
* Contextual Help - Available on the options page on the top right corner, below the username. Click each tab and information related to that tab will appear.

Detailed Documentation & Demos can be found at [my projects site](http://kav.in/projects/).

You can contact me if you need any help or use the wordpress support forums.

= I have some exciting idea/suggestion about this plugin! =

I would love to hear about it. Please share it [here](http://kav.in/discuss)

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

= 0.5.5 =
Multiple jQuery UI custom themes, Linking and history for the tabs, tabs/accordion events. Fixed: Contact form 7 related bug/wpui custom themes - jQuery UI themes compatibility. Choose a jQuery UI theme as default for update.

= 0.5.2 =
A lot of Accordion effects/options added. You can now use special characters in Tab titles. Please update and re save the options.

= 0.5.1 =
**Fixed** the problem, where unable to attach images to a post with the plugin enabled. Important fix.

= 0.5 =
This is the first stable version to be released.


== Demos ==

It is recommended that you check out the [complete demo](http://kav.in/projects/blog/wp-ui-tabs-accordion-sliders-demo/) here. Please do check out the CSS3 styles, along with [style switcher here](http://kav.in/projects/blog/wp-ui-css3-styles-demo/).

Please **rate** the plugin if you find it useful.