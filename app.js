const express = require("express");
const mysql = require("mysql");


const app = express();
app.use(express.json());

const PORT = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rocky246!',
    database: 'employee_db',
})

db.query("CREATE DATABASE IF NOT EXISTS employee_db;", (err, result) => {if (err) throw err;})

db.query("USE employee_db;", (err, result) => {if (err) throw err;})

db.query(`
    CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50)
    );
`, (err, result) => {if (err) throw err;})

db.query(`
    INSERT INTO employees(title)
    VALUES ('John'), ('Jane'), ('Mike'), ('Emily'), ('David');
`, (err, result) => {if (err) throw err;})

db.query(`
    CREATE TABLE IF NOT EXISTS positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50)
    );
`, (err, result) => {if (err) throw err;})

db.query(`
    INSERT INTO positions(title)
    VALUES ('Manager'), ('Produce'), ('Grocery'), ('Apparel'), ('Clerk');
`, (err, result) => {if (err) throw err;})


db.query(`
    CREATE TABLE IF NOT EXISTS employee_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    position_id INT NOT NULL
    );
`, (err, result) => {if (err) throw err;})



app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees;', (err, rows) => {
      if (err) throw err;    
      res.json(rows);
    });
  });



  app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    db.query('SELECT * FROM employees WHERE id = ?', [employeeId], (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
    });
    });


    app.post('/user', (req, res) => {
        console.log("Creating the following user: ", req.body)
        const { first_name, last_name, username, age } = req.body;
        db.query('INSERT INTO users (first_name, last_name, username, age) VALUES (?, ?, ?, ?)', [first_name, last_name, username, age], (err, result) => {
        if (err) throw err;
        res.send('User added successfully');
        });
        });


app.delete('/users/:id', (req, res) => {
     const userId = req.params.id;
     // Delete all user_roles with the given user_id
     db.query('DELETE FROM user_roles WHERE user_id = ?', [userId], (err, rows) => {
         if (err) throw err;
         res.json(rows[0]);
        })});       









app.listen(PORT,() => {
    console.log('servers up and running baby!')
})