TOMODOkorz - Enables cross-origin requests
==

###What is TOMODOkorz
TOMODOkorz allows you to make cross-origin requests to any domain. It will remove any cross-origin restrictions from your site once you add it to your site. Allows easy Cross-origin resource sharing (CORS). 

###Use
Add to end of ```<head>```:
```html
  <script src="//tomodo-tools.s3.amazonaws.com/tomodo.korz-0.5.js"></script>
```

That's it!

###How it works
TOMODOkorz overrides XMLHttpRequest. Normal http same-origin requests are left intact but cross-origin requests are rerouted through a proxy with ```Access-Control-Allow-Origin:"*"```.
Since every JS http call is built on top of XMLHttpRequest, you can make cross-origin requests regardless of what JS library your'e using(jQuery.ajax for example).

###Contact, Queries and Bugs
TOMODOkorz is powered by [TOMODO](http://tomodo.com)

Contact us at info@tomodo.com

