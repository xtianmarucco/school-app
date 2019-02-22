
const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database("./my.db");

module.exports = function () {

    const createUsersTable = () => {
        const sqlQuery = `
        CREATE TABLE IF NOT EXISTS users (
        integer NOT NULL PRIMARY KEY AUTOINCREMENT,
        name text NOT NULL,
        email text NOT NULL UNIQUE,
        password text NOT NULL,
        role integer NOT NULL)`;

        return database.run(sqlQuery);
    }

    const findUserByEmail = (email, cb) => {
        return database.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            cb(err, row)
        });
    }

    const createUser = (user, cb) => {
        return database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', user, (err) => {
            cb(err)
        });
    }

    getGrades = (cb) => {
        return database.all('SELECT * FROM grades', (err, rows) => {
            cb(err, rows)
        });
    }
}