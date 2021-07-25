# Setting up PSQL 

first install:
```
sudo apt install postgresql postgresql-contrib
```
## Initiate the server  
```
service postgresql start
```
stop and status also help.

## Create a user  
create a user with the same name of the machine and grant superuser
```
sudo -u postgres createuser --interactive
```
### Launch sql query:
```
psql
```

you should see user=# , if you see user-> , means this user does not have priviledges.

### To grant priviledges:
```
sudo -i -u postgres
psql
ALTER ROLE [usertoalter] WITH SUPERUSER;
ALTER ROLE [usertoalter] WITH CREATEDB;
```

## Common commands
- \l - list all databases
- \c DB_NAME - connect to DB_NAME
- \dt - list all tables in current db
- \d TABLE_NAME - get details about table_name
- \q - to quit or ctrl+d

On the Bash shell , we can createdb "name" or dropbd "name" to create and remove a Database.

# Dumping data from a database to new db.
```
$ pg_dum -C -c -O movies_examples > backup.sql
```





