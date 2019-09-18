const express = require('express')
const router = express.Router()

// 載入 model
const Record = require('../models/record.js')
// const User = require('./models/user.js')

router.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render('index', { records: records })
  })
})

module.exports = router
