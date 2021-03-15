const express = require('express')

const Account = require('./accounts-model')

const router = express.Router()

router.get('/', (req, res) => {
    Account.get()
      .then(accounts => {
          res.status(200).json(accounts)
      })
      .catch(err => {
          res.status(500).json({
              message: 'Could not retrieve accounts',
              actualError: err
          })
      })
})


module.exports = router;