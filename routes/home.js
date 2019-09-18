const express = require('express')
const router = express.Router()

// 載入 model
// const Record = require('./models/record.js')
// const User = require('./models/user.js')

router.get('/', (req, res) => {
  return res.render('index')
})

module.exports = router
