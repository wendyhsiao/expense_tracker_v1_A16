const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

// 載入 model
const Record = require('../models/record.js')

const { authenticated } = require('../config/auth')

Handlebars.registerHelper('select', function(selected, options) {
  return options
    .fn(this)
    .replace(
      'value="/?category=' + selected + '"',
      'value="/?category=' + selected + '" selected="selected"'
    )
})

// icon選擇
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  if (arg1 == arg2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

router.get('/', authenticated, (req, res) => {
  let category = req.query.category
  let filterObject = { userId: req.user._id }
  if (req.query.category) {
    filterObject.category = category
  }

  Record.find(filterObject).exec((err, records) => {
    console.log('records', records)
    if (err) return console.error(err)
    let totalAmount = 0
    records.forEach(recordsOne => {
      totalAmount += recordsOne.amount
    })

    return res.render('index', {
      records: records,
      item: records[0],
      itemAll: '類別 / 全部',
      totalAmount
    })
  })
})

module.exports = router
