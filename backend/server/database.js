const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./users.db', (err) => {
   if (err) {
      console.error('Database opening error: ', err.message);
   } else {
      console.log('Connected successfully');
   }
});

const saltRound = 10;

db.serialize(() => {
   db.run(`
      CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL,
         role TEXT NOT NULL DEFAULT "user"         
      );      
   `);

   //check admin user in database
   const q1 = db.prepare('SELECT * FROM users WHERE role="admin"');
   q1.get(async (err, row) => {
      if (err) return console.log('Error retrieving data from database');
      if (!row) {                  
         bcrypt.hash('admin1', saltRound, (err, hashPassword) => {
            if (err) console.log('Bad hash ' + err.message);         
      
            const q2 = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
            q2.run('admin', hashPassword, 'admin', function (err) {
               if (err) return console.log(err.message);      
               console.log('Admin user registered successfully');
            });
            q2.finalize();
         })
      }
   });
   q1.finalize();
});

module.exports = db;