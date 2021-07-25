# SQL ( Structure Query Lanaguage)

- _Sintrgs in SQL:_
    1. case-sensitive.
    2. single-quotes, not double around strings.

-  _Commands ends with ';'_
    > SELECT * FROM movies;

## SQL DML (Data Manipulation Language)
| letter | verb | sql commands|
|--------|------|-------------|
| C | Create | _INSERT INTO_|
| R | Read | _SELECT FROM_|
|U| Update | _UPDATE SET_|
|D| Delete | _DELETE FROM_|

# SELECT command:
1. FROM
2. COUNT( * = all)
3. WHERE
4. GROUP BY
5. SELECT (required)
6. ORDER BY
7. LIMIT
8. OFFSET
9. HAVING

> You are probably going to have the workflow , **SELECT** a category **FROM** a database, do something like **ORDER BY** , optional **LIMIT** by a number.



## Some Example SELECTs

- Select all rows and all columns from the books table
```
SELECT * FROM books;
```
- Select all rows and two columns from the books table
```
SELECT title, author FROM books;
```

- Select ten rows and two columns from the books table
```
SELECT title, author FROM books LIMIT 10;
```

- Select all columns from short books
```
SELECT * FROM books WHERE page_count < 150;
```

## SQL Operators
- IN
- NOT IN
- BETWEEN
- AND
- OR
  
# SQL Aggregates
- COUNT
- AVG
- SUM
- MIN
- MAX
  
# Modifying Data
Create data with **_INSERT_**
```
INSERT INTO books (title, author)
    VALUES ('The Iliad', 'Homer');
```

Updating data with **_UPDATE_**
```
UPDATE books SET author = 'Jane austen' WHERE title = 'Emma';
```

Deleting data with **_DELETE_**
```
DELETE FROM books WHERE num_pages > 200;
```

**That's it!**
