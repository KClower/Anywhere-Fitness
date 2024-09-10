
const db = require('../../data/db-config.js');

module.exports = {
    findAll,
    getAllClassesByInstructorId,
    getInstructorClassById,
    create,
    update,
    remove
}

function findAll() {
    return db('instructor_classes')
}

function getAllClassesByInstructorId(instructor_id) {
    return db('instructor_classes')
        .where({ instructor_id: instructor_id })
}

function getInstructorClassById(instructorClassId) {
    return db('instructor_classes')
        .where({ id: instructorClassId })
        .first()
}

function create({
    instructor_id,
    class_type_id,
    intensity_id,
    class_name,
    start_time,
    duration,
    location,
    class_size,
    class_capacity
}) {
    return db.insert({
        instructor_id,
        class_type_id,
        intensity_id,
        class_name,
        start_time,
        duration,
        location,
        class_size,
        class_capacity
    }, ["id"])
        .into('instructor_classes')
        .then(queryResult => {
            const createdId = queryResult[0].id
            return { newInstructorClassId: createdId }
        })
}

async function update({
    id,
    instructor_id,
    class_type_id,
    intensity_id,
    class_name,
    start_time,
    duration,
    location,
    class_size,
    class_capacity
}) {
    const result = await db('instructor_classes')
        .where({ id })
        .update({
            instructor_id,
            class_type_id,
            intensity_id,
            class_name,
            start_time,
            duration,
            location,
            class_size,
            class_capacity
        }, ["id",
            "instructor_id",
            "class_type_id",
            "intensity_id",
            "class_name",
            "start_time",
            "duration",
            "location",
            "class_size",
            "class_capacity"
        ])

    console.log("Update result:", result);

    return result[0]
}

function remove(instructorClassId) {
    return db('instructor_classes')
        .where({ id: instructorClassId })
        .del()
}
