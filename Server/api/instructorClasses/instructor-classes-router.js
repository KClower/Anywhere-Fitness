
const express = require('express');
const Joi = require('joi');
const InstructorClasses = require('./instructor-classes-model.js');
const ClassTypes = require('../classType/rf-class-type-model.js');
const ClassIntensity = require('../classIntensity/rf-class-intensity-model.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    InstructorClasses.findAll(req.query)
        .then(classes => {
            return res.status(200).json(classes);
        });
});

router.get('/:id', (req, res, next) => {
    InstructorClasses.getAllClassesByInstructorId(req.params.id)
        .then(instructorClass => {
            res.json(instructorClass)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Message: "Could not find class with id" })
        })
})


router.post('/', async (req, res, next) => {
    const classtype = await ClassTypes.getLast();
    const classintensity = await ClassIntensity.getLast();

    const instructorClassSchema = Joi.object({
        instructor_id: Joi.string().required(),
        class_name: Joi.string().required(),
        class_type_id: Joi.number().required().min(1).max(classtype.id),
        intensity_id: Joi.number().required().min(1).max(classintensity.id),
        start_time: Joi.date().iso().required(),
        duration: Joi.number().required().multiple(30).max(120),
        location: Joi.string().required(),
        class_size: Joi.number().min(1).max(20),
        class_capacity: Joi.number().required().min(1).max(20),
    })

    const validationResult = instructorClassSchema.validate(req.body);
    if (validationResult.error) {
        res.status(422).json({ Message: validationResult.error })
    }
    InstructorClasses.create(validationResult.value)
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





router.delete('/:id', (req, res, next) => {
    InstructorClasses.remove(req.params.id)
        .then(count => {
            res.json({ Revmoved: count })
        })
})

module.exports = router;