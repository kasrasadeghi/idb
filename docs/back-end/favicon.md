### Adding a Favicon
 - [link](http://flask.pocoo.org/docs/0.12/patterns/favicon/)

```python
import os
from flask import send_from_directory

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
```