from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']  =  False
app.config['SQLALCHEMY_ECHO'] =  True
app.config['SECRET_KEY'] = "%yabadabadull%HAUHAUHAUHU%"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route("/")
def index_page():
    """ Show index page with list of all users and add Button"""

    users = User.query.all()
    return render_template('index.html', users=users)

@app.route('/adduser')
def adduser_page():
    """ Show form to submit new user """
    return render_template('adduser.html')

@app.route('/create-user', methods=["POST"])
def create_user():
    """ add new user to database and redirect to the user profile page """

    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    image_url = request.form["profile_img"]
    if image_url:
        user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    else:
        user = User(first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()

    return redirect(f'/{user.id}')

@app.route('/<int:user_id>')
def user_page(user_id):
    """ show user profile page """

    user = User.query.get_or_404(user_id)

    return render_template('profile.html', user=user)

@app.route('/delete/<int:user_id>')
def delete_user(user_id):
    """ delete this user from the database """

    User.query.filter_by(id=user_id).delete()
    db.session.commit()

    return render_template('index.html')

@app.route("/edit/<int:user_id>")
def edit_page(user_id):
    """ show edit page for user """
    user = User.query.get(user_id)
    return render_template("edit.html", user=user)

@app.route('/edit/user/<int:user_id>', methods=["POST"])
def edit_user(user_id):
    """ add new user to database and redirect to the user profile page """

    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    image_url = request.form["profile_img"]

    user = User.query.get(user_id)
    user.first_name = first_name if first_name else user.first_name
    user.last_name = last_name if last_name else user.last_name
    user.image_url = image_url if image_url else user.image_url

    db.session.add(user)    
    db.session.commit()

    return redirect(f'/{user.id}')