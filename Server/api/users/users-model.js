
const db = require('../../data/db-config.js');


module.exports = {
    find,
    findById,
    create
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        .where({ id: id })
        .first()
}

async function create(user) {
    const newUserData = {
        email: user.email,
        password: user.password,
        isInstructor: user.isInstructor
    }
    // create normal user
    if (!newUserData.isInstructor) {
        return db('users')
            .insert(newUserData, ["id"])
            .then(queryResult => {
                return { id: queryResult[0].id }
            });
    }
    // Create an instructor
    if (newUserData.isInstructor && user.instructorName.length === 0) {
        throw new Error("Instructor name required")
    }
    return db.transaction(async trx => {
        const result = await trx('users')
            .insert(newUserData, ["id"])
        const instructorId = result[0].id
        const newInstructorData = {
            instructor_id: instructorId,
            instructor_name: user.instructorName
        }
        await trx('instructors').insert(newInstructorData)
        return {
            id: instructorId
        }
    })
}
