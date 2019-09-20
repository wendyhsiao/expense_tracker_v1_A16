const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

// 載入 model
const Record = require('../models/record.js')
// const User = require('./models/user.js')

router.get('/', (req, res) => {
  const category = req.query.category
  Handlebars.registerHelper('ifhome', function(arg1, arg2, arg3, options) {
    if (arg1 == arg2 || arg3 == arg2) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  })

  category
    ? Record.find({ category })
        .sort({})
        .exec((err, records) => {
          if (err) return console.error(err)
          return res.render('index', { records: records, item: records[0] })
        })
    : Record.find({})
        .sort({})
        .exec((err, records) => {
          if (err) return console.error(err)
          return res.render('index', { records: records, it: '類別 / 全部' })
        })
})

module.exports = router
