const express = require('express');
const Account = require('./accounts-model');

const router = express.Router();

async function validateId(req, res, next) {
    const { id } = req.params
    const validId = await Account.getById(id)
    if (validId) {
        next()
    } else {
        res.status(400).json({
            message: `The id ${id} does not exist.`
        })
    }
}

function validateAccount(req, res, next) {
    const { name, budget } = req.body
    if (name && budget) {
        next()
    } else {
        res.status(400).json({
            message: 'Name and budget are required.'
        })
    }
}

router.get('/', async (req, res, next) => {
    try {
        const accounts = await Account.get()
        res.status(200).json(accounts);
    } catch (error) {
        next(error);
    };
});

router.get('/:id', validateId, async (req, res, next) => {
    try {
        const { id } = req.params
        const account = await Account.getById(id)
        res.status(200).json(account)
    } catch (error) {
        next(error);
    };
});

router.post('/', validateAccount, async (req, res, next) => {
    try {
        const account = req.body
        const newAccount = await Account.create(account)
        res.status(201).json(newAccount)
    } catch (error) {
        next(error);
    };
});

router.put('/:id', validateId, validateAccount, async (req, res, next) => {
    try {
        const { id } = req.params
        const changes = req.body
        const account = await Account.update(id, changes)
        res.status(200).json((account))
    } catch (error) {
        next(error);
    };
});

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const { id } = req.params
        const account = await Account.remove(id)
        res.status(200).json(account)
    } catch (error) {
        next(error);
    };
});

router.use((error, req, res, next) => {
    res.status(500).json({message: error.message, stack: error.stack})
})


module.exports = router;