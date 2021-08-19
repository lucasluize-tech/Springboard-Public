from flask import Flask, redirect, render_template, flash
from models import db, connect_db, Pet
from forms import PetForm
from flask_debugtoolbar import DebugToolbarExtension



app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pets_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "petsadoption@new-project!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    """ should list all available pets for adoption """
    pets = Pet.query.all()
    
    return render_template('index.html', pets=pets)

@app.route('/add', methods=["GET", "POST"])
def add_pet():
    form = PetForm()
    
    if form.validate_on_submit():
        
        name = form.name.data
        species = form.species.data
        photo = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        
        new_pet = Pet(name=name, species=species, photo_url=photo, age=age, notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        
        return redirect('/')
    else:
        return render_template('add-pet.html', form=form)
    
@app.route('/<int:pet_id>')
def details_page(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    
    return render_template('details.html', pet=pet)
    
@app.route('/<int:pet_id>/delete')
def delete_pet(pet_id):
    """ it should delete the pet """
    
    pet = Pet.query.get_or_404(pet_id)
    Pet.query.filter_by(id=pet_id).delete()
    db.session.commit()
    
    flash(f'{pet.name} deleted!')
    
    return redirect('/')

@app.route('/<int:pet_id>/edit', methods=["GET", "POST"])
def edit_pet(pet_id):
    """ should display page to edit PET's details """
    
    pet = Pet.query.get_or_404(pet_id)
    form = PetForm(obj=pet)
    
    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.url_photo = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        
        db.session.add(pet)
        db.session.commit()
        
        return redirect(f'/{pet_id}')
        
    else:
        return render_template('edit-pet.html', form=form, pet=pet)
        