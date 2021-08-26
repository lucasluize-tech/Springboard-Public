### **Authentication VS authorization**

Authenticate is to validate the user, authorization is what the user can do with the acc.

### **Hashing strings**

Use a hash function like (bcrypt) to hash strings and get a fixed-sized cryptographic string. it's also a One-Way function , which means it's not reversible, making it safer.

python has a builtin hash(), but it uses 64 bit strings which is not ideal. we can hash only immutable data-types (strings, numbers and boolean)

*Popular algorithms:*

- MD5 (fast)
- SHA (fast)
- Argon2 (slow)
- Bcrypt (slow)
- Scrypt (slow)
  
  
### flask-bcrypt library:

Let's see how to use:
```python
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
# generate pw to save
hash = bcrypt.generate_password_hash("secret")
# authenticating pw
bcrypt.check_password_hash(hash, "secret")
```

### Using session

Let's see how we keep the user logged in,
to pick and choose what to display.
```python

@app.route('/login'  methods=["GET","POST"])
def login_page():
    form = loginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        
        u = User.authenticate(username, password)
        # authenticate a class method that uses bcrypt.check_password_hash.
        if u :
            session["user_id"] = u.id
            return redirect('/user_page')
        else :
            return redirect('/login')
    else:
        return render_template("login.html", form=form)
```


