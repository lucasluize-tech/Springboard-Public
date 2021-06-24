from flask import Flask, request, render_template, session, make_response
app = Flask(__name__)
# to read cookies we use
cookies = request.cookies

#to pass cookies from sever do browser
@app.route('/')
def set_cookies():
    # we have a template do render
    html = render_template('sometemplate.html', variables=variables)

    #now we pass the render on a response object
    response = make_response(html)

    #now we can set a cookie inside the response object
    response.set_cookie('key','value')

    return response

#but sessions are way easier to work.
# so first remember to set the secret key
app.config['SECRET_KEY'] = 'some-really-hard-key'

# and now in any route we can set cookies using sessions as a dict.

@app.route('/index')
def sessions():
    session['username'] = 'usertest'
    session['leaderboard'] = ['user1', 'user2', 'user3']

    return render_template('othertemplate.html')

# we can also read the values using session['key'] , so that's way easier than cookies