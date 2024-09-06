const { query } = require('express');
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

function create(user) {
    return db('users')
        .insert(user, ["id"])
        .then(queryResult => {
            return { id: queryResult[0].id }
        });
}
