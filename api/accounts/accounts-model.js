const db = require('../../data/dbConfig');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}

function get() {
    return db('accounts')
}

function getById(id) {

}

function insert(account) {

}

function update(id, account) {

}

function remove(id) {

}
