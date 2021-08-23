# RestFUL API

**Let's understand the standard routing for rest APIs.**  
  
*routes*:

- GET /user/ get all users , /user/id get user
- POST /user/ create user
- PUT, PATCH  /user/id, update an user
- DELETE /user/id, delete an user

**Responses for each verb:**

- GET 200 OK, with JSON describing user
- POST 201 CREATED, with JSON describing user
- PUT or PATCH 200 OK, JSON describing updated user
- DELETE 200 OK, JSON describing 'success'
  
**App responds with JSON**
jsonify() -> takes a dict or a list.

**Serialization**  
Turn our instances into dictionaries:
```python
def serialize_user(user):
''' Serialize a user obj to dictionary '''

    return {
        "id": user.id,
        "name": user.name,
        "DOB" : user.dob
    }
    
@app.route("/users")
def list_all_users():

    users = User.query.all()
    serialized_users = [serialize(user) for user in users]
    
    return jsonify(users=]serialized_users)
```

## Receiving data

all data can be retrieved with request.json['data']  
```python
@app.route('/user', methods=["POST"])
def create_user():
    new_user = User(name=request.json['name'], dob=request.json['dob'])
    db.session.add(new_user)
    db.session.commit()
    
    return (jsonify(user=new_user.serialize_user()), 201)
```

## Updating data

```python
@app.route('/user/<int:id>', methods=['PATCH'])
def update_user(id):
    user = User.query.get_or_404(id)
    user.name = request.json.get('name', user.name)
    user.dob = request.json.get('done', user.dob)
    db.session.commit()
    
    # or db.session.query(User).filter_by(id=id).update(request.json)
    # update method takes a dictionary and updates if correct values.
    
    return (jsonify(user=user.serialized_user()), 200)
```

**ps: It's ok to nest routes like /user/id/comments/comment-id... but 2 routes should suffice.**

## Testing API:

We'll be testing JSON reponses using .json() instead of .data()
