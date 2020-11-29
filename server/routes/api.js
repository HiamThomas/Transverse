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

router.put('/modifierInfo/:id', (req, res) => {
    const age = (req.body.age);
    const nationality = (req.body.nationality);
    const language = (req.body.language);
    const discord = (req.body.discord);
    const main_game = (req.body.main_game);
    const pseudo_game = (req.body.pseudo_game);
    const description = (req.body.description);
    const photo = (req.body.photo);
    let id = parseInt(req.params.id);

    req.session.user.age = age;
    req.session.user.nationality = nationality;
    req.session.user.language = language;
    req.session.user.discord = discord;
    req.session.user.main_game = main_game;
    req.session.user.pseudo_game = pseudo_game;
    req.session.user.description = description;
    req.session.user.photo = photo;

    add_profil_info(age, nationality, language, discord, main_game, pseudo_game, description, photo, id).then(() => {
        res.json({ age, nationality, language, discord, main_game, pseudo_game, description, photo, id })
    })
})
async function add_profil_info(age, nationality, language, discord, main_game, pseudo_game, description, photo, id) {
    const sql = "UPDATE users SET age=$1, nationality=$2, language=$3,discord=$4, main_game=$5, pseudo_game=$6, description=$7, photo=$8 WHERE id=$9"
    await client.query({
        text: sql,
        values: [age, nationality, language, discord, main_game, pseudo_game, description, photo, id]
    })
}




module.exports = router