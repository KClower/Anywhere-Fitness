
const db = require('../../data/db-config.js');

module.exports = {
    find,
    getAllClassesByInstructorId,
    getInstructorClassById,
    create,
    update,
    remove
}

function find() {
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
    class_type,
    intensity_id,
    class_name,
    start_time,
    duration,
    location,
    class_size,
    class_capacity
}) {
    db.insert({
        instructor_id,
        class_type,
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

function update(instructorClassId, {
    instructor_id,
    class_type,
    intensity_id,
    class_name,
    start_time,
    duration,
    location,
    class_size,
    class_capacity
}) {
    return db('instructor_classes')
        .where({ id: instructorClassId })
        .update({
            instructor_id,
            class_type,
            intensity_id,
            class_name,
            start_time,
            duration,
            location,
            class_size,
            class_capacity
        })
        .then(() => {
            return getInstructorClassById(instructorClassId)
        })
}

function remove(instructorClassId) {
    return db('instructor_classes')
        .where({ id: instructorClassId })
        .del()
}
