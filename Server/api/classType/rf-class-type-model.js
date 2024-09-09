const db = require('../../data/db-config.js');

module.exports = {
    find
}

function find() {
    return db('rf_class_type')
}



