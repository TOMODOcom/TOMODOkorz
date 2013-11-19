TOMODOkorz - Enables cross-origin requests
==

###What is TOMODOkorz
TOMODOkorz allows you to make cross-origin requests to any domain. It will removes any CORS restrictions from your site once you add to your site.

###Use
Add to end of ```<head>```:
```html
  <script src="http://tomodokorz.s3.amazonaws.com/tomodokorz-0.5.js"></script>
```

That's it!

###How it works
TOMODOkorz overrides XMLHttpRequest. Normal http same-origin requests are left intact but cross-origin requests are rerouted through a proxy with ```Access-Control-Allow-Origin:"*"```.
Since every JS http call is built on top of XMLHttpRequest, you can make cross-origin requests regardless of what JS library your'e using(jQuery.ajax for example).

###Contact, Queries and Bugs
TOMODOkorz is powered by [TOMODO](http://tomodo.com)

Contact us at info@tomodo.com

