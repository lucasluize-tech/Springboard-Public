from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import InputRequired, Email, Length
from flask_wtf import FlaskForm

class UserForm(FlaskForm):
    
    username = StringField('username', validators=[InputRequired()])
    password = PasswordField('password', validators=[InputRequired(), Length(8)])
    email = StringField('Email', validators=[InputRequired(), Email()])
    first_name = StringField('First Name', validators=[InputRequired()])
    last_name = StringField('Last Name', validators=[InputRequired()])
    
class loginForm(FlaskForm):
    
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    
    
class feedbackForm(FlaskForm):
    
    title = StringField('Title', validators=[InputRequired()])
    content = TextAreaField('Content', validators=[InputRequired()])