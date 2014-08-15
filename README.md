# Webcomic Reader

Webcomic Reader userscript originally hosted at [userscripts.org](http://userscripts.org/scripts/show/59842) (R.I.P.), currently also hosted at [openuserjs.org](https://openuserjs.org/scripts/ameboide/Webcomic_Reader) and [greasyfork.org](https://greasyfork.org/scripts/3008-webcomic-reader)

Script for reading webcomics easier, nicer and faster. Tested on: Firefox, Chrome+Tampermonkey/NinjaKit, Safari+NinjaKit, Opera

It can show the page as usual adding only a couple buttons and text under the image (default setting), or only the image and back/next buttons, the title text of the image (if any) and optionally some custom extra content (by toggling the layout).
Lets you navigate using the back/next buttons, left/right arrow keys, or clicking the image itself (on the right half to go forward, on the left to go backwards).
Preloads up to 5 (or more) pages ahead (in either direction, in case you want to start from the end...)

Able to remember the current page so that the next time you visit the site you can go back to where you left without having to add a bookmark, or save more than one page for whatever reason you want (maybe for saving your progress on more than one manga on the same site)

When using a download accelerator (like [DownThemAll](https://addons.mozilla.org/en-US/firefox/addon/downthemall/)) you can download all the fetched images by downloading all links with the text starting with "wcrimg" (just enter "wcrimg" as the filter in DownThemAll, other programs/extension may have similar options)

#### Keyboard shortcuts

They can be customized in the settings screen.

The deafult keys are:

* Left/right arrows to move to the previous/next page
* Ctrl+arrows to scroll
* F5 or "." to reload the current page (warning: reloading by any other mean, like using the browser's reload button, will take you back to the page where you started reading)
* "-" to toggle between the original and minimalistic layout
* Shift+"-" to toggle between showing or hiding the script's buttons (back/next, bookmarks, settings, etc...)
* "+" to toggle the fit-to-screen option (zooms in or out the image to make it fit in the window)
* Ctrl+Alt+A to add the current page to the site's bookmarks
* Ctrl+Alt+B to set the current page as the only bookmark (so on your next visit you can be auto-redirected there)
* Ctrl+Alt+S to start/stop slideshow (ESC also stops it, as well as manually turning a page)
* Ctrl+Alt+X to toggle the "debug mode" (to get alerts on errors, useful for testing settings for new sites)
* "," while in "debug mode" to see the currently preloaded links/images

#### Other browsers

This script was made for Firefox and uses some Greasemonkey-specific functions for some things, which aren't supported by other browsers. Luckily there are extensions that act as a Greasemonkey replacement and implement most of them.
#### Google Chrome / Safari

I strongly suggest you use Tampermonkey (Chrome only) or NinjaKit, which support most Greasemonkey functions.
In Chrome, it can also be installed directly without external extensions, but it will have the same limitations mentioned for Opera.

#### Opera

Can run without a Greasemonkey-like extension, but without the Greasemonkey-specific functionality. Because of the lack of a proper way to emulate GM_xmlhttpRequest and GM_setValue/GM_getValue:

* Cross-site requests can't be done, so the auto-updater doesn't work
* Settings are stored separately for each site (with localStorage), which means default settings won't be reflected across different sites (that includes custom keyboard shrotcuts, default layout options, shared site settings for pages with different hostnames). If you want to change the default settings across all sites, the only way would be to edit them directly in the script's source code

#### Android phones

There's a version of Tampermonkey for Android, but I haven't tested it, though reports seem to indicate the script doesn't work correctly yet :(

#### iPhone, iPad, and other browsers

If the browser you use doesn't support userscripts, you can use a bookmarklet to load it instead. Just copy the following code and add it as a bookmark, and when you want to use the script, go to the site you want to read and load that bookmark.
```javascript
javascript: (function(){ document.body.appendChild(document.createElement("script")).src = "http://dl.dropbox.com/u/976471/webcomic_reader.user.js"; })();
```
Notice that this will download the script everytime you want to use it, so it will take more time to start. Also, the same drawbacks mentioned for Opera will apply. Avoid this technique if you can use a proper Greasemonkeysh extension.
For step by step instructions on how to do this on an iPad, read [this topic](http://userscripts.org/topics/70361). I have only tested this on an iPad, iPhone and the major PC browsers and it works as expected, except on Internet Explorer (which you shouldn't be using anyway)
Thanks to [krunkster](http://userscripts.org/users/308335) for this trick ;)

#### Internet Explorer

To get this script and the rest of the web working correctly, use IE for what it's best at: downloading Firefox, Chrome, or another real browser.

#### Adding new sites

It works out-of-the-box with over 400 sites (full list below), but adding new ones is fairly easy in most cases.
A detailed guide can be found here, but the TL;DR version goes something like this:

1. Add an @include rule for the page (use * as a wildcard for the @included url, like "http://www.example.com/*") (*)
2. Try it, it may already work with the default settings. If it does, you're done :)
3.  If it doesn't work / works wrong / you want to specify some more settings, right click the Greasemonkey icon (or left click the NinjaKit/Tampermonkey icon) and go to "User Script Commands..."/"Webcomic Reader - Settings"
4. Click on "Site Settings" on the top of the screen, and there there's a lot of stuff you can change with xpath, css selectors, regular expressions, functions, etc

(\*) To add @include rules you must open the script source code. On Greasemonkey right click the monkey icon and go to "Manage User Scripts", then find this script, right click it and choose "Edit". On Chrome with NinjaKit/Tampermonkey, right click the extension's icon and click "Options", then select this script to edit it.

Once you have opened the code, scroll a few lines down until you find a lot of lines that look like this: "// @include http://www.example.com/*". Then just add another one with the exact same format and write your url there.

Note that after an update or reinstallation, the source code will be rewritten and any changes you made to the code will be lost, so be sure to back them up before updating. The settings themselves (from step 4) will be kept safe.

In general, it's possible to add any site that consists of a main image and links to the previous and next pages. If you have trouble adding a new site you can ask for help here, or if you succeeded you can post your settings and I can add them to the script :)
