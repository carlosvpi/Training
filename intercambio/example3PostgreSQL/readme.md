# Example 3

## Content

* Added a postgreSQL integration

## Instructions

1. [Install postgreSQL](https://www.postgresql.org/)
2. Start postgreSQL
3. In your database, create table `users` like so:

```
CREATE TABLE IF NOT EXISTS users ( id BIGSERIAL PRIMARY KEY, name VARCHART(128), encryptedzero VARCHART(128))
```

(BIGSERIAL autoincrements)

4. Insert one tuple like so:

```
INSERT INTO users (name, encryptedzero) VALUES ('admin', 'admin')
```

5. Start the server (`node server` in this directory). It should log `Example app listening at http://localhost:3000`
6. Navigate in your browser to `localhost:3000`
7. Type `admin` and `admin` as name and password
8. Click `login` and observe the page update
10. Click `log out`
11. Type `other` and `pass` as name and password
12. Click `login` and observe the error alert
13. Click `signup` and observe the page update
14. In postgreSQL terminal, select all rows for users:

```
SELECT * FROM users
```

15. Observe the new row "other".
