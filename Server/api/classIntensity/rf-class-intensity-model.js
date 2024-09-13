const db = require('../../data/db-config.js');

module.exports = {
    find,
    getLast
}

function find() {
    return db('rf_class_intensity')
}

function getLast() {
    return db('rf_class_intensity')
        .orderBy("id", "desc")
        .first()
}
