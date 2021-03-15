const Account = require('./accounts-model')

async function validateId(req, res, next) {
    const { id } = req.params
    const accountId = await Account.getById(id)
    if(!accountId) {
        res.status(404).json({
            message: `The account with id: ${id} does not exist`,
        })
    } else{
        next()
    }
}

function validateAccount(req, res, next) {
    const { name, budget } = req.body
    if(!name || !budget) {
        res.status(400).json({
            message: 'Name and budget are required'
        })
    } else {
        next()
    }
}

module.exports = {
    validateId,
    validateAccount
}