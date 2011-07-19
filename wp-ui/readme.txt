=== WP UI - Tabs, Accordions, Sliders ===
Contributors: kavingray
Donate link: http://kav.in/
Plugin URI: http://kav.in
Tags: tabs, accordion, sliders, spoilers, posts, jquery, ui, capability
Requires at least: 2.9
Tested up to: 3.2.1
Stable tag: 0.5

Easily add Tabs, Accordion, Collapsibles to your posts. With 14 fresh Unique *CSS3* styles. 

== Description ==

WP UI is an advanced interface widgets plugin that channels the power of jQuery UI widgets into Wordpress posts. 

The plugin is named after WordPress(WP) and jQuery UI (UI). Tabs are common widgets found in almost every graphical browser and Desktop/Mobile Operating systems. These widgets can maximize the potential for greater user interactivity. Please remember, Great content deserves great presentation too!

== Installation ==

1. Upload the `wp-ui` folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress.
1. Add shortcodes to the post editor and enjoy!

== Frequently Asked Questions ==

= Up-to-date FAQ =

Can be found [here](http://kav.in/projects/plugins/blog/wp-ui-faq).

= Where can i check out the custom CSS3 styles? =

Demo with the *style switcher* can be found [here](http://kav.in/projects/plugins/wp-ui).

= What if i have Javascript disabled? =

All the code will degrade gracefully when javascript is disabled. Try disabling the Javascript in your browser to take look.

= Can i use all the available jQuery UI themes? =

Yes. Just enter the name of jQuery UI theme as value to the wptabs style argument. 

= Why aren't my tabs working? / Why are some of my shortcodes not getting parsed? =

Make sure each one of your shortcodes is in the **separate line**. eg. 

    [wptabs]
    [wptabtitle]Tab 1[/wptabtitle]
    [wptabcontent]Contents of the first tab goes here. Any thing, blah blah.[/wptabcontent]
    [wptabtitle]Tab 2[/wptabtitle]
    [wptabcontent]Content inside the second tab is here.[/wptabcontent]
    [/wptabs]


= Why do i see closing shortcodes in the rendered page? =

Shortcodes should be entered into the wordpress post editor's HTML mode. WP Visual mode editor can insert additional paragraph `<p>` tags before and after the shortcodes, thereby rendering those invalid.

= Why can't i see the text in my tabs? =

Style inconsistencies. Probably because the background color of the CSS3 style and your wordpress theme's text color are near same. Please try switching to some other tab style or jQuery UI theme.

= Why does the widgets behave strangely sometimes? =

This can be related to lot of white space between the shortcodes, which are converted by wordpress into empty space enclosed within `<p>` tags. Remove the unwanted space between the shortcodes.

= I have tried everything, but why these still doesnot work? =

Okay, drop me a note with the code you used. I'll be glad to help.

= Why can't i select the other option tabs after using "Visualize and select" in the options panel? =

This is because another copy of jQuery UI was loaded in the stylechooser. Please save changes and try again. It should work now. So does, after page refresh.

= Where can i get help about this plugin? =

Documentation is available right within the wordpress admin. It is present in the 
* Post editor - look for the menu button in Visual mode and "?" icon in the HTML mode. This covers the common usage of the plugin shortcodes and their arguments.
* Contextual Help - you can access this on the options page, if you are unsure about one of the options. Click the tab and click the help button on the topright corner of the page, below your username.

Documentation & Demos can be found at [my projects site](http://kav.in/projects/).

You can contact me if you need any help or use the wordpress support forums.

= I have some exciting idea/suggestion about this plugin! =

I would love to hear about it. Please contact me [here](http://kav.in/contact)

= I need exclusive skins for my site dedicated to open source! =

Long live the Open Source! Contact me [here](http://kav.in/contact) straight away.

= How can i support this plugin? =

You can start off by recommending this plugin! Feel free to distribute the plugin or atleast an word about it. You could start with the social networks [here](http://kav.in/donation), maybe. 

== Screenshots ==

1. Preview of some of the CSS3 styles.
2. Editor Buttons and help.
3. Step by Step Help available right within the wordpress editor.
4. Style chooser available from within the post editor.

== Changelog ==

= 0.5 =
* The First public release.
* Custom CSS3 styles.
* Uses jQuery 1.6.1 and jQuery UI 1.8.12.
* Added more features to tabs - Nested, AJAX loading etc.
* Plugin now supports Tabs, Accordion, Sliders, Collapsibles.

= 0.1 =
* Plugin scripts rewritten with reusability in mind. IE support, from IE6.


== Upgrade Notice ==

= 0.5 =
This is the first stable version to be released.


== Demos ==

It is recommended that you check out the [complete demo](http://kav.in/projects/blog/wp-ui-tabs-accordion-sliders-demo/) here. Please do check out the CSS3 styles, along with [style switcher here](http://kav.in/projects/blog/wp-ui-css3-styles-demo/).