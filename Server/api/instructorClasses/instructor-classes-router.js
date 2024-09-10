
const express = require('express');
const InstructorClasses = require('./instructor-classes-model.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    InstructorClasses.findAll(req.query)
        .then(classes => {
            return res.status(200).json(classes);
        });
});

router.get('/:id', (req, res, next) => {
    InstructorClasses.getAllClassesByInstructorId(req.params.id)
})


router.post('/', (req, res, next) => {
    const newInstructorClass = req.body;
    if ((!newInstructorClass.class_name && !newInstructorClass.class_name.length)
        !newInstructorClass.class_type_id &&
            !newInstructorClass.intensity_id &&
            !newInstructorClass.start_time &&
            !newInstructorClass.duration &&
            !newInstructorClass.location &&
            !newInstructorClass.class_capacity) {
    return res.status(404).json({ Message: "Please provide all necessary fields." });
}
InstructorClasses.create(newInstructorClass)
    .then(result => {
        InstructorClasses.getInstructorClassById(result.id)
            .then(createdClass => {
                res.status(201).json({ Message: "Created new class in database.", createdClass });
            });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ Message: "There was an error saving the new class to the database." });
    });
});

module.exports = router;