const pgp = require('pg-promise')();

const db = pgp('postgres://postgres:1234@localhost:5432/componentesEletronicos');

module.exports = db;
