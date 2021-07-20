### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

  - Python syntax is different, it's more similar to english. But python is usually most used for backend since browsers read JavaScript, so we use a framework to render. Usually functions are defined in javaScript as CamelCase while in python we use lowercase and underscores.


- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.

  1. we could use the method get , as dict.get('c')
  2. we could do a TRY/CATCH error.

- What is a unit test?

  - A Unit test is a single function test.  

- What is an integration test?
- 
  - A integration test , tests multiple functions working together.

- What is the role of web application framework, like Flask?

  - To manage server-client reponses. it's responsible for builing a server to render the exact files/pages that the client is requesting. If we were to write everything from scratch it would be way more complex and time consuming.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

  - It depends on the content. it makes more sense to use query params for utilities like a modifier, extra information to that page subject which will be our route. /subject/q?=extrainfo

- How do you collect data from a URL placeholder parameter using Flask?

  - It would work as a dictionary structure. so we would call like this:
    ``` 
    ('/something/<variable>')
    var = OBJ[variable]
    ```

- How do you collect data from the query string using Flask?

  - We can use the request library:
    ```
    from flask import request
    data = request.args.get('querystring')
    ```

- How do you collect data from the body of the request using Flask?

  - request.data / request.form / request.json

- What is a cookie and what kinds of things are they commonly used for?

  - cookies are strings given from a server to the client to store. They are used to keep a "memory" of the client utilities like login.

- What is the session object in Flask?
  
  - session object is a dict-like structure that set's a 'cookie' to be stored in that session. But different from cookies, session preserves the type of data and its Signed so can't be tempered with.

- What does Flask's `jsonify()` do?

  - it returns data in JSON format type.
    ```
    from flask import jsonify
    jsonify(key1=value1)
    ```
