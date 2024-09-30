const express = require('express');
const InstructorName = require('./instructors-model.js');

const router = express.Router();

router.get('/names', (req, res, next) => {
    InstructorName.find(req.query)
        .then(instructorNames => {
            res.status(200).json(instructorNames)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Message: "The instructor names could not be retrieved." });
        });
});

module.exports = router;
