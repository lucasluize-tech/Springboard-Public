# Relationships between db.
---
### **One-to-Many**  (1:M)
When there's a lot of duplication on a column of a table, that's probably a
One-to-Many relationship. like one Studio have many movies , but a movies have
only one studio.

|id|title|studio_id|    
|--|-----|---------|
|1|Star-wars|1|
|2|Avatar|2|
|3|Lord of the rings|3|

|id|name|
|--|----|
|1|FOX  
|2|DreamWorks
|3|Goldwin

>**PRIMARY KEY** -> Unique ID of the table.  
>**FOREIGN KEY** -> Primary key used on a different table.

  
**Workflow**  
as always, we CREATE a TABLE with a SERIAL as primary key, then we
select the of the input of the columns, and finally put the table_id
as a column that REFERENCES to table(id).

## **Many-to-Many (M:M)**
When Objects overlaps many times. (ex: actors and movies , many actors in many movies and vice-versa). We create a seperate table where they Overlap:

|id|table1_id|table2_id|
|--|---------|---------|
|1|2|1|
|2|2|1|
|3|1|2|

### **Selecting what to see in a M:M relationship**
First we need to see the columns and tables that we want to work with their relational_db,
select the columns in each. now pick a table to start joining. It gets easier with aliases.

```
SELECT [table1.column], [table2.column]...[]
FROM [M:M table] [alias_MM]
JOIN [table] [alias_table1]
ON [alias_MM].column = [alias_table1].column
JOIN [table2] [alias_table2]
ON [alias_MM].column = [alias_table2].column

```


## **Outer JOINS**  
LEFT JOIN --> everything from left , but overlaping right.  
RIGHT JOIN --> everything from right , but overlaping left.  
FULL JOIN --> everything from all tables

_Start to write queries on the text editor , because they are going to be long !!!_




