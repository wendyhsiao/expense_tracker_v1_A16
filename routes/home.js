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
// Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
//   if (arg1 == arg2) {
//     return options.fn(this)
//   } else {
//     return options.inverse(this)
//   }
// })

const categoryIcon = {
  houseware: `<i class="fas fa-home fa-2x" id="fa-home"></i>`,
  traffic: `<i class="fas fa-shuttle-van fa-2x" id="fa-shuttle-van"></i>`,
  entertainment: `<i class="fas fa-grin-beam fa-2x" id="fa-grin-beam"></i>`,
  food: `<i class="fas fa-utensils fa-2x" id="fa-utensils"></i>`,
  other: `<i class="fas fa-pen fa-2x" id="fa-pen"></i>`
}

router.get('/', authenticated, (req, res) => {
  let category = req.query.category
  let filterObject = { userId: req.user._id }
  if (req.query.category) {
    filterObject.category = category
  }
  console.log('category1', category)
  Record.find(filterObject).exec((err, records) => {
    console.log('records', records)
    if (err) return console.error(err)
    let totalAmount = 0
    records.forEach(recordsOne => {
      totalAmount += recordsOne.amount
      recordsOne.icon = categoryIcon[recordsOne.category]
      console.log('category', category)
      console.log('recordsOne.icon', recordsOne.icon)
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
