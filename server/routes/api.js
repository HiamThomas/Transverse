const bcrypt = require('bcrypt')
const { Client } = require('pg')
const games = require('../data/games');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'Samoht77515$',
    database: 'test2'
})

client.connect()

const express = require('express');
const { text } = require('express');
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

router.post('/getSiJeuxFavori', (req, res) => {
    const userId = (req.body.userId);
    const gameId = (req.body.gameId);
    getIdJeuxFavori(userId, gameId).then((result) => {
        res.json(result.rows);
    }).catch((err) => {
        res.status(400).json({ message: 'Echec' });
    });
})

async function getIdJeuxFavori(userId, gameId) {
    return await client.query({
        text: "SELECT gameid FROM public.list_games WHERE userid = $1 AND gameid = $2",
        values: [userId, gameId]
    })
}

async function addMessage(userId, gameId, receiverid, message) {

    const sql = "INSERT INTO message (message_userid, message_gameid, message_receiverid,message_content) VALUES ( $1 , $2 , $3 , $4 ) RETURNING * ";
    return await client.query({
        text: sql,
        values: [userId, gameId, receiverid, message]
    })

}
async function getUserDeMemeJeu(userId, gameId) {

    const sql = "SELECT * from list_games,users WHERE list_games.userid = users.id and list_games.gameid = $2 and users.id <> $1";
    return await client.query({
        text: sql,
        values: [userId, gameId]
    })

}
async function getMessageSimple(userId, receiverid, gameId) {

    const sql = "SELECT message_id, message_userid, message_gameid, message_receiverid,message_content,message_date, TO_CHAR(message_date, 'DD-MM-YYYY HH:MI:SS') as message_dates from message WHERE(message_userid = $1 and message_receiverid = $3) OR(message_userid = $3 and message_receiverid = $1) and message_gameid = $2 ORDER BY message_date ASC ";
    return await client.query({
        text: sql,
        values: [userId, gameId, receiverid]
    })
}

router.put('/deleteFromJeux', (req, res) => {
    const gameId = (req.body.gameId);
    const userId = (req.body.userId);
    deleteGameFromfavori(userId, gameId).then((result) => {
        res.json(result.rows);
    }).catch((err) => {});
})
async function deleteGameFromfavori(userId, gameId) {
    return await client.query({
        text: "DELETE FROM public.list_games WHERE userid = $1 AND gameid = $2",
        values: [userId, gameId]
    })
}

router.post('/addToListGames', (req, res) => {
    const userId = (req.body.userId);
    const gameId = (req.body.gameId);
    add_game_to_favorite(userId, gameId)
        .then((result) => {
            res.json({ message: "Ajouter avec succès" });
        }).catch((err) => {
            if (err.code == "23505") {
                res.status(400).json({ message: 'Ce jeu fait déjà parti de vos favoris' })
            } else {
                res.status(400).json({ message: 'Echec' })
            }
        });
})

async function add_game_to_favorite(userId, gameId) {

    const sql = "INSERT INTO list_games (userId, gameId) VALUES($1, $2) RETURNING *";
    return await client.query({
        text: sql,
        values: [userId, gameId]
    })

}

router.post('/WriteSimpleMessage', (req, res) => {
    const userId = (req.body.userId);
    const gameId = (req.body.gameId);
    const receiverid = (req.body.receiverid);
    const message = (req.body.message);
    addMessage(userId, gameId, receiverid, message)
        .then((result) => {
            res.end(JSON.stringify({ message: "Message envoyé" }));

        }).catch((err) => {
            if (err.code == "23505") {
                res.status(400).json({ message: 'Echec' })
            }
        });
})
router.post('/getAllUserByGames', (req, res) => {
    const userId = (req.body.userId);
    const gameId = (req.body.gameId);
    getUserDeMemeJeu(userId, gameId).then((result) => {
        res.json(result.rows);
    }).catch((err) => {
        res.status(400).json({ message: 'Echec lors de la récupération' });
    });

})
router.post('/getSMS', (req, res) => {
    const userId = (req.body.userId);
    const gameId = (req.body.gameId);
    const receiverid = (req.body.receiverid);
    getMessageSimple(userId, receiverid, gameId).then((result) => {
        res.json(result.rows);
    }).catch((err) => {
        res.status(400).json({ message: 'Echec lors de la récupération' });
    });

})

router.get('/games', (req, res) => {
    res.json(games)
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
    const games = (req.body.games);
    let id = parseInt(req.params.id);

    req.session.user.age = age;
    req.session.user.nationality = nationality;
    req.session.user.language = language;
    req.session.user.discord = discord;
    req.session.user.main_game = main_game;
    req.session.user.pseudo_game = pseudo_game;
    req.session.user.description = description;
    req.session.user.photo = photo;
    req.session.user.games = games;

    add_profil_info(age, nationality, language, discord, main_game, pseudo_game, description, photo, games, id).then(() => {
        res.json({ age, nationality, language, discord, main_game, pseudo_game, description, photo, games, id })
    })
})
async function add_profil_info(age, nationality, language, discord, main_game, pseudo_game, description, photo, games, id) {
    const sql = "UPDATE users SET age=$1, nationality=$2, language=$3,discord=$4, main_game=$5, pseudo_game=$6, description=$7, photo=$8, games=$9 WHERE id=$10"
    await client.query({
        text: sql,
        values: [age, nationality, language, discord, main_game, pseudo_game, description, photo, games, id]
    })
}




module.exports = router