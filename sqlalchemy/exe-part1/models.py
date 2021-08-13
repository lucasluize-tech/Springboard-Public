from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):

    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.Text, nullable=False, unique=True)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=True, default="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg")
    ## or should i use default='/static/default-profile.jpg' 
    post = db.relationship('Post')
    
    def __repr__(self):
        return f"This is {self.first_name} {self.last_name}"
    
    def greet(self):
        return f"Hi! I'm {self.first_name} {self.last_name}, nice to meet you!"
    
class Post(db.Model):
    
    __tablename__='posts'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False, unique=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.today())
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user = db.relationship('User')
    
    def __repr__(self):
        return f'<{self.title}, {self.created_at}, {self.user.first_name} >'
