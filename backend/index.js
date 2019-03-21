"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const app = express();
const router = express.Router();
app.use(cors())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const database = new sqlite3.Database("./my.db");

const sqlSvc = require('./sqlite-service.js');

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
    return database.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        cb(err, row)
    });
}

const createUser = (user, cb) => {
    return database.run('INSERT INTO users (name, email, role, password) VALUES (?,?,?,?)', user, (err) => {
        cb(err)
    });
}
const getGrades = (cb) => {
    return database.all('SELECT * FROM grades', (err, rows) => {
        cb(err, rows)
    });
}

const getClassByGradeId = (gradeId, cb) => {
    return database.all(`SELECT c.id, c.name, c.shift FROM classes c 
    WHERE c.grade_id = ?`, [gradeId], (err, rows) => {
            cb(err, rows)
        });
}

createUsersTable();

router.get('/', (req, res) => {
    res.status(200).send('This is school-app server');
});

router.get('/api/v1/grades', (req, res) => {
    getGrades((err, rows) => {
        if (err) return res.status(500).send('Server error!');
        res.status(200).send({
            "grades": rows
        });
    });
});

router.get('/api/v1/classes/:gradeId', (req, res) => {
    getClassByGradeId(req.params.gradeId, (err, rows) => {
        if (err) return res.status(500).send('Server error!');
        res.status(200).send({
            "classes": rows
        });
    });
});

router.post('/api/auth/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password; // bcrypt. hashSync(req.body.password);

    createUser([name, email, role, password], (err) => {
        if (err) return res.status(500).send("Server error!");
        findUserByEmail(email, (err, user) => {
            if (err) return res.status(500).send('Server error!');
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
                expiresIn: expiresIn
            });
            res.status(200).send({
                "user": user, "access_token": accessToken, "expires_in": expiresIn
            });
        });
    });
});


router.post('/api/auth/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password; // bcrypt.hashSync(req.body.password);
    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send('Server error!');
        if (!user) return res.status(404).send('User not found!');
        const result = password == user.password;
        if (!result) return res.status(401).send('Password not valid!');

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        res.status(200).send({ 
            "user": user, "access_token": accessToken, "expires_in": expiresIn 
        });
    });
});

app.use(router);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
}); 