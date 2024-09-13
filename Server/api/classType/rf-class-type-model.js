const db = require('../../data/db-config.js');

module.exports = {
    find,
    getLast
}

function find() {
    return db('rf_class_type')
}

function getLast() {
    return db('rf_class_type')
        .orderBy("id", "desc")
        .first()
}


