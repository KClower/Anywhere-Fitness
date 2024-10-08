const express = require('express');
const ClassType = require('./rf-class-type-model.js');

const router = express.Router();

router.get('/class', (req, res, next) => {
    ClassType.find(req.query)
        .then(classType => {
            res.status(200).json(classType)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The class types could not be retrieved." });
        });
});



module.exports = router;