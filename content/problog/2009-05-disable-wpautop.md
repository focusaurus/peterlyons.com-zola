+++
title = "How to disable wpautop in WordPress blogs"
slug = "2009/05/disable-wpautop/"
date = 2009-05-23T19:53:19.000Z
+++
So, when creating a [WordPress](http://wordpress.org) blog, even if you are editing in HTML mode, WordPress includes a feature called "wpautop" that will replace any pair of line feed characters in your post markup with a <p> tag. This is helpful I think in general for people who blog mostly paragraphs with some links and images. However, if you blog with more complex markup, this can invalidate your HTML. I run my HTML through the [W3C HTML Validator](http://validator.w3.org) to check it and wpautop can cause validation to fail. I hunted around online for an easy way to disable this and didn't see one, so I made the changes described below.

One thing to keep in mind is that if you HAVE been relying on wpautop and you have not been including your own explicit <p> tags, disabling wpautop will cause all your paragraphs to run together and thus your layout will be broken. To prepare for this, pre-edit all your posts so they have the paragraph tags and remove extra blank lines from them. You can check how they look in that state since when there are no blank lines wpautop won't do anything. Once they look good like that, you can disable wpautop.

In your WordPress installation, edit the file `wp-includes/formatting.php`. Search for "function wpautop" and insert the following two lines at the beginning of the function to disable it.

<div class="code">

<pre>function wpautop($pee, $br = 1) {
        //plyons disabling this. 20090516
        return $pee;
</pre>

</div>

Of course, this change will be undone when you upgrade to a newer WordPress release, so it's just a convenient hack. Once you have your posts with proper paragraph tags and no extra line feeds, wpautop should not change your markup and therefore you shouldn't have a problem when it is re-enabled after a WordPress upgrade.