const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dbName = process.env.DB_NAME;

const db = new sqlite3.Database('./' + dbName, (err) => {
   if (err) {
      console.error('Database opening error: ', err.message);
   } else {
      console.log('Connected successfully');
   }
});

const saltRound = 10;
const adminName = process.env.ADMIN_USERNAME;
const adminPass = process.env.ADMIN_PASSWORD;
const adminRole = process.env.ADMIN_ROLE;
const userRole = process.env.USER_ROLE;

db.serialize(() => {
   //users table
   db.run(`
      CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL,
         role TEXT NOT NULL DEFAULT ${userRole},
         blocked INTEGER DEFAULT 0
      );      
   `);

   //tasks table
   db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
         id INTEGER PRIMARY KEY AUTOINCREMENT,         
         title TEXT NOT NULL,
         description TEXT,
         expiration TEXT,
         completed INTEGER DEFAULT 0,
         user_id INTEGER NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id)
      );      
   `);

   //check admin user in database
   const checkAdmin = db.prepare('SELECT * FROM users WHERE role=?');
   checkAdmin.get(adminRole, async (err, row) => {
      checkAdmin.finalize();
      if (err) return console.log('Error retrieving data from database: ', err.message);
      if (!row) {                  
         bcrypt.hash(adminPass, saltRound, (err, hashPassword) => {
            if (err) console.log('Bad hash: ' + err.message);         
      
            const newAdmin = db.prepare('INSERT INTO users (username, password, role, blocked) VALUES (?, ?, ?, ?)');
            newAdmin.run(adminName, hashPassword, adminRole, 0, function (err) {
               newAdmin.finalize();
               if (err) return console.log("Error inserting data to database: ", err.message);      
               console.log('Admin registered successfully');
            });
         })
      }
   });
});

module.exports = db;