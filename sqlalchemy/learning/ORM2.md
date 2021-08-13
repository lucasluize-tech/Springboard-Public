# Modeling Relationships on SQLAlchemy

## Related tables:
```python

class Department(db.Model):
""" Department has many employees """

    __tablename__ = 'departments'
    dept_code = db.Column(db.Text, primary_key=True)
    
    dept_name = db.Column(db.Text, nullable=False, unique=True)
    
    phone = db.Column(db.Text)

class Employee(db.Model):
""" Employee Model """

    __tablename__= 'employees'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    name = db.Column(db.Text, nullable=False, unique=True)

    state = db.Column(db.Text, nullable=False, default='CA')

    dept_code = db.Column(db.Text, db.foreignKey('departments.dept_code'))

```

So basically the format is:  
**db.foreignKey('[tablename].[column]')**  

---  

## Adding a relationship:
  
  ```python
  class Employee(db.Model):

       dept_code = db.Column(db.Text, db.foreignKey('departments.dept_code'))

       dept = db.relationship('Department')
  ```
Now we have access from the employee class the tables from Department class

```python
    emp = Employee.query.get(1)
    emp.dept
    > 'mktg'
    emp.dept.phone
    > 'xxx-xxx-xxxx'
```  
if we needed a **many-to-many** relationship, all we need to to is define relationship on the Department class :
```python

employee = db.relationship('Employee')
```  

## Short-hand with Backref

Will make a M:M relationship in one Model.

```python
class Employee(db.Model):
    dept = db.relationship('Department', backref='employees')
```
  
---

## Some Examples on querying:
```python
def get_directory():
    all_emps = Employee.query.all()

    for emp in all_emps:
        if emp.dept is not None
            print(emp.name, emp.dept.dept_name, emp.dept.phone)
        else:
            print(emp.name, '--', '--')

> get_directory()
> #...showing a bunch of data... 
```

not efficient though... because we are doing a lot of queries to database as we scale up.

## Chaining Queries
```python
new_hires = Employee.query.filter(Employee.id >=4)

ca_new_hires = new_hires.filter(Employee.state == 'CA')

ca_new_hires.count() # get only the count
```
## Operators 
```python
# the ilike statement, more useful than like because does not care about lower/upper case. but you could use like.

Employee.query.filter(Employee.name.ilike('% lucas')).all()

# using the IN

Employee.query.filter(Employee.state.in_(['CA','WA','OR'])).all()

# AND operator

Employee.query.filter(Employee.state =='CA', Employee.dpt_code=='it').all()

Employee.query.filter((Employee.state =='CA') & (Employee.dpt_code=='it')).all()

# OR Operator

Employee.query.filter((Employee.state =='CA') | (Employee.dpt_code=='it')).all()

# so many more...SUM, BETWEEN...

```
## Getting tuples with db.session
```python
db.session.query(Employee.id , Employee.name).all()

>[(1,'lucas')]
```
This is a way to get specific columns from the employees table, instead of using Employee.query which gets all columns.