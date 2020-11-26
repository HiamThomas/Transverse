const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'Samoht77515$',
    database: 'Projet_Transverse'
})

client.connect()

const express = require('express')
const router = express.Router()


router.post('/register', (req, res) => {
    const email = (req.body.email);
    const username = (req.body.username);
    const password = (req.body.password);

    hasAccountEmail(email).then((result) => {
        if (result.rowCount === 0) {
            hasAccountUsername(username).then((result2) => {
                if (result2.rowCount === 0) {
                    add(email, username, password).then((result1) => {
                        req.session.user = result1.rows[0]
                        res.json(result1.rows[0])
                    })
                } else
                    res.status(400).json({ message: 'username already used' });
            })
        } else
            res.status(400).json({ message: 'email already used' });
    })
})

async function hasAccountEmail(email) {
    return await client.query({
        text: "SELECT * FROM users WHERE email = $1",
        values: [email]
    })
}

async function hasAccountUsername(email) {
    return await client.query({
        text: "SELECT * FROM users WHERE username = $1",
        values: [email]
    })
}

async function add(email, name, password) {
    const hash = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (email, username, password) VALUES($1, $2, $3) RETURNING *";
    return await client.query({
        text: sql,
        values: [email, name, hash]
    })

}

router.post('/login', (req, res) => {
    const username = (req.body.username);
    const password = (req.body.password);
    // déjà log
    if (req.session.user !== undefined) {
        res.status(400).json({ message: 'User already log' })
        return
    }
    hasAccountUsername(username).then(result => {
        if (result.rowCount < 1) {
            res.status(400).json({ message: 'Wrong username' })
            return
        }
        const hash = result.rows[0].password;
        bcrypt.compare(password, hash).then(accept => {
            if (accept) {
                req.session.user = result.rows[0];
                res.json(result.rows[0]);
            } else {
                res.status(400).json({ message: 'Wrong password' });
            }
        })
    })
})

router.get('/logout', (req, res) => {
    req.session.user = undefined
    res.json()

})

router.get('/me', (req, res) => {
    res.json(req.session.user)
})


module.exports = router