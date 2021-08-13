from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post
from flask_migrate import Migrate

app = Flask(__name__)

migrate = Migrate(app, db)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']  =  False
app.config['SQLALCHEMY_ECHO'] =  True
app.config['SECRET_KEY'] = "%yabadabadull%HAUHAUHAUHU%"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
migrate.init_app(app, db)

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
    posts = Post.query.filter_by(user_id=user_id).all()

    return render_template('profile.html', user=user, posts=posts)

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

@app.route('/new-post/<int:user_id>')
def new_post_page(user_id):
    """ should redirect user to a posting form page """
    
    user = User.query.get(user_id)
    return render_template('new-post.html', user=user)

@app.route('/create-post/<int:user_id>', methods=["POST"])
def post_to_database(user_id):
    """ Create a new post to user into database return to profile"""
    
    title = request.form['title']
    content = request.form['content']
    
    new_post = Post(title=title, content=content, user_id=user_id)
    db.session.add(new_post)
    db.session.commit()
    
    return redirect(f'/{user_id}')

@app.route('/post/<int:post_id>')
def show_post(post_id):
    """should show a page with the user's post"""
    
    user = Post.query.get_or_404(post_id).user
    post = Post.query.get_or_404(post_id)
    
    return render_template('post-details.html', user=user, post=post)

@app.route('/delete/post/<int:post_id>')
def delete_user_post(post_id):
    """ it should delete the post from database of the user """
    user = Post.query.get_or_404(post_id).user
    post = Post.query.filter_by(id=post_id).delete()
    db.session.commit()
    
    return redirect(f'/{user.id}')

@app.route('/edit/post/<int:post_id>')
def edit_post_page(post_id):
    """ it should render the edit page of that post """
    post = Post.query.get_or_404(post_id)
    
    return render_template('edit-post.html', post=post)

@app.route('/edit/post-edit/<int:post_id>', methods=["POST"])
def edit_post(post_id):
    """ edit the post and submit to database return user page """

    title = request.form["title"]
    content = request.form["content"]

    post = Post.query.get_or_404(post_id)
    post.title = title if title else post.title
    post.content = content if content else post.content

    db.session.add(post)    
    db.session.commit()
    
    return redirect(f'/{post.user_id}')