"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config["SECRET_KEY"] = "oh-so-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///cupcakes_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
connect_db(app)


@app.route('/')
def show_page():
    return render_template('cupcakes.html')


@app.route('/api/cupcakes')
def show_all_cupcakes():
    ''' it should return JSON with all cupcake data '''
    
    cupcakes = Cupcake.query.all()
    
    return (jsonify(cupcakes=[cupcake.serialize() for cupcake in cupcakes]), 200)

@app.route('/api/cupcakes/<int:id>')
def show_cupcake(id):
    ''' it should return JSON with single cupcake data '''
    
    cupcake = Cupcake.query.get_or_404(id)
    
    return (jsonify(cupcake=cupcake.serialize()), 200)

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    ''' should create new cupcake , return JSON describing cupcake '''
    
    new_cupcake = Cupcake(
        flavor=request.json.get('flavor'),
        size=request.json.get('size'),
        rating=request.json.get('rating'),
        image=request.json.get('image')
    )
    db.session.add(new_cupcake)
    db.session.commit()
    
    return (jsonify(cupcake=new_cupcake.serialize()), 201)
    
@app.route ('/api/cupcakes/<int:id>', methods=["PATCH"])
def update_cupcake(id):
    ''' Should update the cupcake and return JSON describing cupcake '''
    
    cupcake = Cupcake.query.get_or_404(id)
    db.session.query(Cupcake).filter_by(id=id).update(request.json)
    db.session.commit()
    
    return (jsonify(cupcake=cupcake.serialize()), 200)

@app.route('/api/cupcakes/<int:id>', methods=["DELETE"])
def delete_cupcake(id):
    
   Cupcake.query.filter_by(id=id).delete()
   db.session.commit()
   
   return (jsonify(message="Deleted"), 200)
    