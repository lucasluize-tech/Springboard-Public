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
>