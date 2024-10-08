const express = require('express');
const ClassIntensity = require('./rf-class-intensity-model');

const router = express.Router();

router.get('/type', (req, res, next) => {
    ClassIntensity.find(req.query)
        .then(classIntensity => {
            res.status(200).json(classIntensity)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The class intensity levels could not be retrieved." });
        });
});



module.exports = router;