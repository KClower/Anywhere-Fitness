
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




module.exports = router;