const bcrypt = require('bcryptjs');
const express = require('express');
const Users = require('./users-model.js');

const router = express.Router();


router.get('/', (req, res, next) => {
    Users.find(req.query)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Message: "The users could not be retrieved." });
        });
});

router.get('/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ Message: "User not found." });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Error finding user from database." });
        });
});

router.post('/register', (req, res, next) => {
    let newUser = req.body;
    if (!newUser.email || !newUser.password || newUser.isInstructor === undefined || newUser.instructorName === undefined) {
        return res.status(422).json({ Message: "Please provide the necessary information." });
    }

    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;

    Users.create(newUser)
        .then(result => {
            Users.findById(result.id)
                .then(createdUser => {
                    res.status(201).json({ Message: "Created new user in database.", createdUser });
                })
        })
        .catch((error) => {
            console.log("/api/users/register::err: ", error);
            return res.status(500).json({ Message: "There was an error saving new user to database." });
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    Users.findBy({ email })
        .then(users => {
            const user = users[0];

            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.loggedIn = true;
                req.session.userId = user.id;

                res.status(200).json({ Message: "Welcome", session: req.session });
            } else {
                res.status(401).json({ Message: "Invalid credentials" })
            }
        })
        .catch(error => {
            res.status(500).json({ Message: "There was an issue logging in" })
        })
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ Message: "Error logging out." })
            } else {
                res.status(204).end()
            }
        })
    } else {
        res.status(200).json({ Message: "Already logged out" })
    }
})


module.exports = router;