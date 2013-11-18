korz.js
==

never get cross origin ajax errors again

###what is does
it routes through [our](//tomodo.com) servers all request that may be cross origin, so they are return to client with ```Access-Control-Allow-Origin:"*"```.

###use
add:
```<script src="http://tomodokorz.s3.amazonaws.com/korz-0.5.js"></script>``` and never get cross origin ajax errors again.

###more details

```korz.SuperHttpRequest ``` is basiclly a wrapper around XMLHttpRequest. and
```korz.OriginalHttpRequest ``` is a varible holding ```XMLHttpRequest```. 
