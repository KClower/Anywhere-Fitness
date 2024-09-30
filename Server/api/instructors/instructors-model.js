const db = require('../../data/db-config.js');

module.exports = {
    find,
    getLast,
}

function find() {
    return db('instructors as i')
        .select('i.instructor_name')
}

function getLast() {
    return db('instructors')
        .orderBy("id", "desc")
        .first()
}

