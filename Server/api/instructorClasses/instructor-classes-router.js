
const express = require('express');
const Joi = require('joi');
const InstructorClasses = require('./instructor-classes-model.js');
const ClassTypes = require('../classType/rf-class-type-model.js');
const ClassIntensity = require('../classIntensity/rf-class-intensity-model.js');
const { authorize } = require('../auth/auth-middleware.js')
const router = express.Router();


router.get('/classes', (req, res, next) => {
    InstructorClasses.findAll(req.query)
        .then(classes => {
            return res.status(200).json(classes);
        });
});

router.get('/classes/:instructorId', (req, res, next) => {
    InstructorClasses.getAllClassesByInstructorId(req.params.instructorId)
        .then(instructorClasses => {
            res.json(instructorClasses)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Could not find classes with that instructor id" })
        })
})

router.get('/class/:id', (req, res, next) => {
    InstructorClasses.getInstructorClassById(req.params.id)
        .then(instructorClass => {
            res.json(instructorClass)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Could not find class with that id." })
        })
})


router.post('/class', async (req, res, next) => {
    const classtype = await ClassTypes.getLast();
    const classintensity = await ClassIntensity.getLast();

    const instructorClassSchema = Joi.object({

        instructorId: Joi.string().required(),
        className: Joi.string().required(),
        classType: Joi.number().required().min(1).max(classtype.id),
        intensity: Joi.number().required().min(1).max(classintensity.id),
        startTime: Joi.date().iso().required(),
        duration: Joi.number().required().multiple(30).max(120),
        location: Joi.string().required(),
        price: Joi.number().precision(2).positive().min(10.00).max(40.00).required(),
        classCapacity: Joi.number().required().min(1).max(20),
    })

    const validationResult = instructorClassSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(422).json({ Message: validationResult.error })
    }
    InstructorClasses.create({ ...validationResult.value, classSize: 0 })
        .then(result => {
            InstructorClasses.getInstructorClassById(result.newInstructorClassId)
                .then(createdClass => {
                    return res.status(201).json({ message: "Created new class in database.", createdClass });
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error saving the new class to the database." });
        });
});




router.put('/class/:id', async (req, res, next) => {

    const classtype = await ClassTypes.getLast();
    const classintensity = await ClassIntensity.getLast();

    const instructorClassUpdateSchema = Joi.object({
        instructorId: Joi.string(),
        className: Joi.string(),
        classType: Joi.number().min(1).max(classtype.id),
        intensity: Joi.number().min(1).max(classintensity.id),
        startTime: Joi.date().iso(),
        duration: Joi.number().multiple(30).max(120),
        location: Joi.string(),
        price: Joi.number().precision(2).positive().min(10.00).max(40.00),
        classCapacity: Joi.number().min(1).max(20),
    })

    const updateValidationResult = instructorClassUpdateSchema.validate(req.body);
    if (updateValidationResult.error) {
        return res.status(422).json({ message: updateValidationResult.error })
    }

    const id = req.params.id;
    const foundClass = await InstructorClasses.getInstructorClassById(id);

    const changes = { ...foundClass, ...updateValidationResult.value };

    try {
        const updatedClass = await InstructorClasses.update(changes)
        console.log(updatedClass)
        const foundClass = await InstructorClasses.getInstructorClassById(updatedClass.id)
        console.log(foundClass)
        return res.status(200).json(foundClass);
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "There was an error while updating the class." });
    }
})




router.delete('/class/:id', (req, res, next) => {
    InstructorClasses.remove(req.params.id)
        .then(count => {
            res.json({ Removed: count })
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Could not remove class" })
        })
})

module.exports = router;