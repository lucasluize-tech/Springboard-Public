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
    created_at = db.Column(db.DateTime, default=str(datetime.datetime.today()))
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user = db.relationship('User')
    tags = db.relationship('Tag', secondary='post_tag', backref='posts')
    post_tag = db.relationship('PostTag', backref='post')
    
    def __repr__(self):
        
        return f'<{self.title}, {self.created_at}, {self.user.first_name} >'
    
class PostTag(db.Model):
    
    __tablename__='post_tag'
    
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)
    
    def __repr__(self):
        return f'< post = {self.post.title}, tag = {self.tag.name} >'
    
class Tag(db.Model):
    
    __tablename__='tags'
    
    id = db.Column(db.Integer,
                   primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    
    post_tag = db.relationship('PostTag', backref='tag')
    
    def __repr__(self):
        return f'< tag: {self.name}, {self.posts} >'