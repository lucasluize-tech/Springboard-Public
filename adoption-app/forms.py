from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField, TextAreaField
from wtforms.validators import InputRequired, Email, Optional, URL




class PetForm(FlaskForm):

    name = StringField("Pet name", validators=[InputRequired(message='Please enter a name for this Pet')])
    species = SelectField("Species", choices=[('dog','Dog'),('cat','Cat'),('porcupine','Porcupine')])
    photo_url = StringField("Photo Url", validators=[Optional()])
    age = SelectField("Age", choices=[(a,a) for a in range(31)])
    notes = TextAreaField("Notes")
    available = BooleanField("Available")