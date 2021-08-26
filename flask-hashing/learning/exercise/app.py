from flask import Flask, render_template, redirect, flash, session
from model import db, connect_db, User, Feedback
from sqlalchemy.exc import IntegrityError
from form import UserForm, loginForm, feedbackForm

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///auth_demo"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "Exercise"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)


@app.route('/')
def show_register():
    if not session.get("user_id"):
        session["user_id"] = None
    feedbacks = Feedback.query.all()
    return render_template('home.html', feedbacks=feedbacks)
 
    
        
@app.route('/register', methods=["GET", "POST"])
def register_page():
    form = UserForm()
    if session["user_id"]:
        flash('logout first', category='primary')
        return redirect('/')
    
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        
        new_user = User.register(username, password, email, first_name, last_name)
        
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken.  Please pick another')
            return render_template('register.html', form=form)
        
        session["user_id"] = new_user.username
        flash('Account created successfully!', category='success')
        return redirect(f'/user/{new_user.username}')
    else:
        return render_template("register.html", form=form)
    
@app.route('/login', methods=["GET","POST"])
def login_page():
    form = loginForm()
    
    if session["user_id"] != None:
        flash('logout first', category='primary')
        return redirect('/')
    
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        
        if user:
            session['user_id']= user.username
            return redirect(f'/user/{user.username}')
        else:
            flash(f'Wrong username or Password')
            return render_template('login.html', form=form)
    else:
        return render_template('login.html', form=form)
    
@app.route('/user/<user>')
def secret_page(user):
    user = User.query.filter_by(username=user).first()
    
    if session['user_id'] != user.username:
        flash("oh-oh! you can't access that account", category='danger')
        return redirect('/')
    else:    
        return render_template('user.html', user=user)
    
@app.route('/user/<user>/delete')
def delete_user(user):
    user = User.query.filter_by(username=user).first()
    
    if session['user_id'] != user.username:
        flash("oh-oh! you won't delete that account", category='danger')
        return redirect('/')
    
    db.session.delete(user)
    db.session.commit()
    
    return redirect('/logout')
    
@app.route('/logout')
def logout():
    session['user_id'] = None
    flash('You have logged out', category='warning')
    return redirect('/')

@app.route('/user/<username>/feedback', methods=["GET", "POST"])
def feedback_page(username):
    form = feedbackForm()
    user = User.query.filter_by(username=username).first()
    if session['user_id'] != user.username:
        flash("you must be logged in to create a feedback!", category='primary')
        return redirect('/login')
    
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        username = username
        
        new_fb = Feedback(title=title, content=content, username=username)
        db.session.add(new_fb)
        db.session.commit()
        
        flash("Created a new feedback!", category='primary')
        return redirect(f'/user/{username}')
    else:
        return render_template('feedback.html', form=form)
    
@app.route('/user/<username>/feedback/<int:id>/delete')
def delete_fb(id, username):
    user = User.query.filter_by(username=username).first()
    feedback = Feedback.query.get_or_404(id)
    
    if session['user_id'] != feedback.username:
        flash("Don't you dare! messing with someone's account!", category='danger')
        return redirect(f'/user/{user.username}')
    
    feedback = Feedback.query.get_or_404(id)
    Feedback.query.filter_by(id=id).delete()
    db.session.commit()
    
    flash('Feedback deleted!', category='danger')
    return redirect (f'/user/{user.username}')
    
    
@app.route('/user/<username>/feedback/<int:id>/edit', methods=["GET", "POST"])
def edit_fb(id, username):
    form = feedbackForm()
    feedback = Feedback.query.get_or_404(id)
    user = User.query.filter_by(username=username).first()
    #checking for the same user.
    if session["user_id"] != feedback.username:
        flash("oh oh! you can't edit this post", category='warning')
        return redirect(f'/user/{user.username}')
    
    if form.validate_on_submit() and session["user_id"] == feedback.username:
        feedback.title = form.title.data if form.title.data else feedback.title
        feedback.content = form.content.data if form.content.data else feedback.content
        db.session.add(feedback)
        db.session.commit()
        flash(f'Edited {feedback.title} successfully! ', category='primary')
        return redirect(f'/user/{user.username}')
    
    else:
        return render_template('edit_fb.html', form=form, feedback=feedback)
    
