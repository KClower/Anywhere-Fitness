const bcrypt = require('bcryptjs');
const router = require("express").Router();

const Users = require('../users/users-model.js');



router.post('/register', async (req, res, next) => {
    let newUser = req.body;
    if (!newUser.email || !newUser.password || newUser.isInstructor === undefined || newUser.instructorName === undefined) {
        return res.status(422).json({ message: "Please provide the necessary information." });
    }


    try {
        const existingUser = await Users.findBy({ email: newUser.email })

        if (existingUser.length > 0) {
            return res.status(422).json({ message: "This email is already registered. Please sign in." })
        }


    }
    catch (error) {
        return res.status(500).json({ message: "Can not find user." })
    }


    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;

    Users.create(newUser)
        .then(result => {
            return Users.findById(result.id)
                .then(createdUser => {
                    req.session.loggedIn = true;
                    req.session.userId = result.id;
                    const createdUserInfo = {
                        userId: createdUser.id,
                        isInstructor: createdUser.isInstructor,
                    }
                    res.status(201).json({ message: "Created new user in database.", createdUser: createdUserInfo });
                })
        })
        .catch((error) => {
            console.log("/api/users/register::err: ", error);
            return res.status(500).json({ message: "There was an error saving new user to database." });
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
                req.session.save()
                const userInfo = {
                    userId: user.id,
                    isInstructor: user.isInstructor,
                }
                res.status(200).json({ message: "Welcome", userInfo });
            } else {
                res.status(401).json({ message: "Invalid credentials." })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an issue logging in" })
        })
})

router.post('/logout', (req, res) => {
    // if (req.session && req.session.userId) {
    // knexStore.destroy(req.sessionID)
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ message: "Error logging out." })
        } else {
            res.clearCookie("monster", { httpOnly: true })
            res.status(204).end()
        }
    })
    // } else {
    //     res.status(200).json({ message: "Already logged out" })
    // }
});

module.exports = router;