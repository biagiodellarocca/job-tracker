const express = require('express')
const router = express.Router()
const AppError = require('../utils/AppError')

router.get('/', (req, res) => {
   res.send('All Users')
})

router.get('/:id', (req, res, next) => {
   const id = Number(req.params.id)
   if(isNaN(id)) return next(new AppError('Invalid ID', 400))
   res.send(`Your ID is: ${req.params.id}`)
})

module.exports = router