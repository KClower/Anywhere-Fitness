
const express = require('express');
const ClientClasses = require('./client-classes-model.js');
const InstructorClasses = require('../instructorClasses/instructor-classes-model.js');
const { authorize } = require('../auth/auth-middleware.js')


const router = express.Router();


router.get('/classes', (req, res, next) => {
    ClientClasses.findAll(req.query)
        .then(classes => {
            return res.status(200).json(classes);
        });
});

router.get('/class/:classId', (req, res) => {
    ClientClasses.findClassById(req.params.classId)
        .then(classInfo => {
            if (!classInfo) {
                return res.status(404).json({ success: false, message: 'Class not found' });
            }
            res.status(200).json({ success: true, class: classInfo });
        })
        .catch(error => {
            res.status(500).json({ success: false, message: error.message });
        });
})

router.put('/signup/:classId', async (req, res) => {
    const { classId } = req.params;

    const clientId = req.body.userId
    if (!classId || !clientId) {
        return res.status(422).json({ message: "Unable to proccess request." })
    }
    try {
        // First, check if the class exists and if there's room
        const classInfo = await ClientClasses.findClassById(classId);

        if (!classInfo) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        if (classInfo.class_size >= classInfo.class_capacity) {
            return res.status(400).json({ success: false, message: 'Class is full' });
        }

        // Check if the client is already signed up
        const clientSignedUp = await ClientClasses.isClientSignedUp(clientId, classId);

        if (clientSignedUp) {
            return res.status(400).json({ success: false, message: 'You are already signed up for this class.' });
        }

        const instructorInfo = await InstructorClasses.getInstructorClassById(classId);

        if (instructorInfo.instructor_id === clientId) {
            return res.status(400).json({ success: false, message: "Instructors cannot sign up for their own class." })
        }



        // Sign up the client
        await ClientClasses.signUpClientForClass(clientId, classId);
        const updatedClass = await InstructorClasses.getInstructorClassById(classId)

        // Respond with success
        res.status(200).json({ success: true, message: 'Client successfully signed up for the class', updatedClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get('/classes/:clientId', (req, res) => {
    const { clientId } = req.params;

    ClientClasses.getClientClasses(clientId)
        .then(classes => {
            if (classes.length === 0) {
                return res.status(404).json({ success: false, message: 'No classes found for this client' });
            }

            res.status(200).json({ success: true, classes });
        })
        .catch(error => {
            res.status(500).json({ success: false, message: error.message });
        });
});

router.delete('/class', (req, res) => {
    const { clientId, classId } = req.body;
    ClientClasses.removeClientClass(clientId, classId)
        .then(() => {
            res.status(200).json({ success: true, message: 'Client successfully removed from the class' });
        })
        .catch(error => {
            res.status(500).json({ success: false, message: error.message });
        });
})


module.exports = router;