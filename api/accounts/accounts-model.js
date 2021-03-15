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
    return db('accounts').where('id', id).first()
}

async function insert(account) {
    const [id] = await db('accounts').insert(account)
    return getById(id)
    
}

async function update(id, account) {
    await db('accounts').where('id', id).update(account)
    const newAccount = await db('accounts').where('id', id).first()
    return newAccount
}

async function remove(id) {
    const removed = await getById(id)
    await db('accounts').where('id', id).del()
    return removed
}
