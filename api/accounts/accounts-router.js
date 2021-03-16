const express = require('express')

const Account = require('./accounts-model')
const {validateAccount, validateId} = require('./middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Account.get()
      .then(accounts => {
          res.status(200).json(accounts)
      })
      .catch(error => {
         next(error)
      })
})

router.get('/:id', validateId, (req, res, next) => {
    const { id } = req.params
    Account.getById(id)
      .then(account => {
          res.status(200).json(account)
      })
      .catch(error => {
          next(error)
      })
})

router.post('/', validateAccount, (req, res, next) => {
    Account.insert(req.body)
      .then(account => {
          res.status(201).json(account)
      })
      .catch(error => {
          next(error)
      })
})

router.put('/:id', validateId, validateAccount, async (req, res, next) => {
    try {
        const { id } = req.params
        const changes = req.body
        const account = await Account.update(id, changes)
        res.status(200).json((account))
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validateId, (req, res, next) => {
    Account.remove(req.params.id)
      .then(account => {
          res.status(200).json(account)
      })
      .catch(error => {
          next(error)
      })
})

router.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})




module.exports = router;