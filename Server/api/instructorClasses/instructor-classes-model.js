
const db = require('../../data/db-config.js');

module.exports = {

    findAll,
    getAllClassesByInstructorId,
    getInstructorClassById,
    create,
    //joinClass,
    update,
    remove
}

const instructorClassColumns = [
    "id",
    "instructor_id",
    "class_type_id",
    "intensity_id",
    "class_name",
    "start_time",
    "duration",
    "location",
    "price",
    "class_size",
    "class_capacity"
]


function findAll() {
    return db.from({ ic: 'instructor_classes' })
        .join({ i: 'instructors' }, 'ic.instructor_id', 'i.instructor_id')
        .join({ ct: 'rf_class_type' }, 'ic.class_type_id', 'ct.id')
        .join({ ci: 'rf_class_intensity' }, 'ic.intensity_id', 'ci.id')
        .select(
            'i.instructor_name',
            'ic.instructor_id',
            'ic.class_name',
            'ic.id',
            'ct.class_type',
            'ci.intensity',
            'ic.start_time',
            'ic.duration',
            'ic.location',
            'ic.price',
            'ic.class_size',
            'ic.class_capacity'
        );
}


function getAllClassesByInstructorId(instructorId) {
    return db.from({ ic: 'instructor_classes' })
        .join({ i: 'instructors' }, 'ic.instructor_id', 'i.instructor_id')
        .join({ ct: 'rf_class_type' }, 'ic.class_type_id', 'ct.id')
        .join({ ci: 'rf_class_intensity' }, 'ic.intensity_id', 'ci.id')
        .select(
            'i.instructor_name',
            'ic.instructor_id',
            'ic.class_name',
            'ic.id as class_id',
            'ct.class_type',
            'ic.class_type_id',
            'ci.intensity',
            'ic.intensity_id',
            'ic.start_time',
            'ic.duration',
            'ic.location',
            'ic.price',
            'ic.class_size',
            'ic.class_capacity')
        .where({ 'ic.instructor_id': instructorId })
}

function getInstructorClassById(instructorClassId) {
    return db.from({ ic: 'instructor_classes' })
        .join({ i: 'instructors' }, 'ic.instructor_id', 'i.instructor_id')
        .join({ ct: 'rf_class_type' }, 'ic.class_type_id', 'ct.id')
        .join({ ci: 'rf_class_intensity' }, 'ic.intensity_id', 'ci.id')
        .select(
            'i.instructor_name',
            'ic.instructor_id',
            'ic.class_name',
            'ic.id as class_id',
            'ct.class_type',
            'ic.class_type_id',
            'ci.intensity',
            'ic.intensity_id',
            'ic.start_time',
            'ic.duration',
            'ic.location',
            'ic.price',
            'ic.class_size',
            'ic.class_capacity')
        .where("ic.id", instructorClassId)
        .first()
}

function create({
    instructorId,
    classType,
    intensity,
    className,
    startTime,
    duration,
    location,
    price,
    classSize,
    classCapacity
}) {
    return db.insert({
        instructor_id: instructorId,
        class_type_id: classType,
        intensity_id: intensity,
        class_name: className,
        start_time: startTime,
        duration: duration,
        location: location,
        price: price,
        class_size: classSize,
        class_capacity: classCapacity
    }, ["id"])
        .into('instructor_classes')
        .then(queryResult => {
            const createdId = queryResult[0].id
            return { newInstructorClassId: createdId }
        })
}

// async function joinClass(clientId, classId) {
//     await db.transaction(async trx => {
//         const classUpdate = await trx('instructor_classes')
//         .where({id: classId})
//         .increment('class_size', 1)
//         .returning('*');

//         if(!classUpdate.length) {
//             throw new Error('Class not found');
//         }
//         await trx('client_classes').insert({
//             client_id: clientId,
//             class_id: classId,
//         })
//     })
// }

async function update({
    class_id,
    instructorId,
    classType,
    intensity,
    className,
    startTime,
    duration,
    location,
    price,
    classSize,
    classCapacity
}) {
    const result = await db('instructor_classes')
        .where({ id: class_id })
        .update({
            instructor_id: instructorId,
            class_type_id: classType,
            intensity_id: intensity,
            class_name: className,
            start_time: startTime,
            duration: duration,
            location: location,
            price: price,
            class_size: classSize,
            class_capacity: classCapacity
        }, [...instructorClassColumns])

    console.log("Update result:", result);

    return result[0]
}

// async function remove(instructorClassId) {
//     const result = await db('instructor_classes')
//         .where({ id: instructorClassId })
//         .del();
//     return result; // return the count of deleted rows
// }

async function remove(instructorClassId) {
    const result = await db('instructor_classes')
        .where({ id: instructorClassId })
        .del([...instructorClassColumns])
    return result[0]
}
