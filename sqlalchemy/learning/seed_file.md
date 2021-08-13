# Seeding a database

It's always a good idea to seed a database to test it's functionality.

we'll create a separate seed.py file to do it.

then, Let's configure:
```python
from models import db, Employee, Department

#create all tables
db.drop_all()
db.create_all()
```

We only need to import the db variable and the classes from models.

Create some data:
```python
marketing = Department(dpt_code='mktg', dpt_name='Marketing')

lucas = Employee(name='lucas luize', dpt_code='mktg')
```

Make sure to create the tables that don't foreign keys to avoid errors **first**

`db.session.add_all[(marketing])
db.session.commit()`

Then we'll add the tables with **ForeignKeys**

`db.session.add_all([lucas])
db.session.commit()`

***Note***: it's usually better to use `add_all([])`, passing a list of all the objects, then `add()` one by one.