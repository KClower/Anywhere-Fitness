const knex = require("knex");

const config = require("../knexfile.js");


const environment = process.env.NODE_ENV || "development";
console.log("DB CONFIG:: EVIRONMENT: ", environment)
console.log("configuration details")
console.log(config[environment])
module.exports = knex(config[environment]);