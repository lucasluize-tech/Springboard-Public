from models import db, User, connect_db
from app import app

#connect to db
connect_db(app)

# creating a backup file with the data I have.
users = User.query.all()
with open('users.txt', 'w') as f:
    for user in users:
        f.write(f'{user.first_name},{user.last_name},{user.image_url}\n')


# dropping table and creating new table     
db.drop_all()
db.create_all()

#Seeding the table again
new_users = []
with open('users.txt', 'r') as f:
    for line in f:
        first_name, last_name, image_url = line.split(",")
        
        UserObject = User(first_name=first_name, 
        last_name=last_name,
        image_url=image_url)
        
        new_users.append(UserObject)

for user in new_users:
    db.session.add(user)
    db.session.commit()

