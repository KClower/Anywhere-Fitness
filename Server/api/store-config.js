const dbConnection = require('../data/db-config');
const { ConnectSessionKnexStore } = require('connect-session-knex');

const knexStore = new ConnectSessionKnexStore({
    knex: dbConnection,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 30 // time to check and remove expired sessions from database. 30 mins

})

module.exports = {
    knexStore
}