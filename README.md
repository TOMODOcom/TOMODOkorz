
TOMODOkorz - Enables cross-origin requests
==

### What is TOMODOkorz
TOMODOkorz allows you to make cross-origin requests to any domain. It will remove any cross-origin restrictions from your site once you add it to your site. Allows easy Cross-origin resource sharing (CORS). 

### How it works
TOMODOkorz overrides XMLHttpRequest. Normal http same-origin requests are left intact but cross-origin requests are rerouted through a proxy with ```Access-Control-Allow-Origin:"*"```.
Since every JS http call is built on top of XMLHttpRequest, you can make cross-origin requests regardless of what JS library your'e using(jQuery.ajax for example).

# Use

## client
download [tomodo.korz.js](//github.com/TOMODOcom/TOMODOkorz/blob/master/tomodo.korz.js) and edit it at line 13 ```router:"[korz server address]"``` change ```[korz server address]``` to ```http://your-domain.com/some/path/in/your/server/``` where you will be routing the requests.
then, Add to end of ```<head>```:
```html
  <script src="/path/to/your/static/folders/lib/tomodo.korz-0.5.js"></script>
```


## server
write the server side code that handle the request and fetches it on behalf of the client.

**python example**, using **Django** and **requests**:	

```python
import re

import requests

from django.http import HttpResponse

def korz_handler(request):
	"""
		handles '/some/path/in/your/server/'
		request path is something like "/some/path/in/your/server/http://big.baa.com"
	"""
	path = request.path
	p = re.compile('/some/path/in/your/server/(.*)')
	url_to_fetch = p.find_all(path)[0]
	response = requests.get(url_to_fetch)
	return HttpResponse(response.content)
```

---
Contact us at info@tomodo.com

