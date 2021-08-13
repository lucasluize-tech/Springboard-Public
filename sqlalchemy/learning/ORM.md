# Object Relational Model  

Using SQLAlchemy into a flask application to create models to database.

## Workflow :  

1. we'll need flask_sqlalchemy flask and psycopg2-binary.  
   ```
   $ pip install flask_sqlalchemy flask psycopg2-binary
   ```
  
2. In the main app.py, Let's set up the proper configs
   ```python
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db'
    ```
    > database we are using:///database name
    > Make sure you have created the database before.
    ```python
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS']  =  False
        app.config['SQLALCHEMY_ECHO'] =  True 
    ```    
3. Create a Model.py file , and let's create an instance of the database.
    ```python
    from flask_sqlalchemy import SQLAlchemy

    db = SQLALchemy()

    def connect_db(app):
        db.app = app
        db.init_app(app)
    ```
  
4.  Now we can start creating our models by creating classes inheriting db.Model
    ```python
    class Pet(db.Model):
    __tablename__ = 'pets'

    # Do not forget to run db.create_all()
   
    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    name = db.Column(db.String(50),
                     nullable=False,
                     unique=True)
    ```
  
5. Do not forget to import in the main app.py file, db , connect_db and the classes.
    ```python
    from Models import db, connect_db, Pet
    ```  

6. To create the models we need to run:
    ```python
    db.create_all()
    ```  
7. And if we make modifications to the table code, we should drop the table
and run db.create_all() again.  

8. Creating an instance of the object that goes to database:
    ```python
    theo = Pet(name="Theo")
    ```
    this is just an object in python , to commit to the database we need:  
    ``` python
    db.session.add(theo)
    db.session.commit()
    ```

9. After created we can access their attributes:  
    ```python
    theo.name
    > 'Theo'
    ```  
      
10. Creating multiple objects easily:  
    ```python
    names =[]
    species =[]
    pets = [Pet(name=n, species=s)] for n,s in zip(names,species)]
    db.session.add_all(pets)
    db.session.commit()
    ```

11. If we stage some object to commit, but there's an error,
we need to rollback the session.
    ```python
    db.session.rollback()
    ```

12. We can Update the database changing the object attribute in our code:
    ```python
    theo.name = 'theodore'
    db.session.add(theo)
    db.session.commit()
    ```  

13. A good practice is to make a string representing the object
when called:
    ```python
    class Pet(db.Model):
    ...
        def __repr__(self):
            return f'<Pet id={self.id} name={self.name}>'
    
    > $ theo // object being called
    > '<Pet id=1 name=Theodore>'
    ```

14. Deleting from database 
    ```python
    Pet.query.filter_by(hunger=57).delete()
    db.session.commit()
    ```  
    if you did something wrong, instead of committing, just use session.rollback()

  
## Querying  
query is an Object with lots of methods. It is the same as SELECT from TABLE.
and to execute the query will need .all() , .get() or .first()

- **Pet.query.all()** => will return all objects on the pets table.  
- **Pet.query.get(1)** => will assume id=1.  
- **Pet.query.filter_by(species='dog').all()** => filter_by can take multiple arguments, and
we can limit to .all() or .first()
- **Pet.query.filter(Pet.species == 'dog').all()** => Using filter we can use different operators '==', '>', '<', '!=", and so on.
    - we can also pass more than 1 argument, Pet.species == 'dog', Pet.hunger < 20
    sqlalchemy will translate to AND.

## Class Methods  
It should use class methods if we don't won't a function to be used into a single object
we want to use a function to the whole class.
```python
@classmethod
def get_by_species(cls, species):
    return cls.query.filter_by(species=species).all()
```

## Testing  
We always should test from a different database.    
create a database:  
```
$ createdb test-db
```  

On test.py:  

    ```python
    from unittest import TestCase
    from app import app
    from models import PET, db

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_test'
    app.config['SQLALCHEMY_ECHO'] = False

    db.drop_all()
    db.create_all()
    ```

Now we define de test class inheriting TestCase:
```python
class PetModelTest(TestCase):

    def setUp(self)...
    def tearDown(self)...
    def test_[modelFunc]...
```

