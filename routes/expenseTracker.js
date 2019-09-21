const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

// 載入 model
const Record = require('../models/record.js')
// const User = require('./models/user.js')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

// 新增支出頁面
router.get('/new', authenticated, (req, res) => {
  let objDate = new Date()
  var mm = objDate.getMonth() + 1
  var dd = objDate.getDate()
  var today = [
    objDate.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('-')
  res.render('new', { today: today })
})

router.post('/', authenticated, (req, res) => {
  const newRecord = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount
  })

  newRecord
    .save()
    .then(item => {
      return res.redirect('/')
    })
    .catch(err => console.log(err))
})

// 修改支出頁面
Handlebars.registerHelper('ifselect', function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, item) => {
    if (err) return console.error(err)

    let objDate = item.date
    var mm = objDate.getMonth() + 1
    var dd = objDate.getDate()
    var date2 = [
      objDate.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-')
    console.log('date2', date2)

    res.render('edit', { item: item, date2: date2 })
  })
})

router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, item) => {
    console.log('item', item)
    if (err) return console.error(err)
    item.name = req.body.name
    item.category = req.body.category
    item.date = req.body.date
    item.amount = req.body.amount

    item
      .save()
      .then(item => {
        return res.redirect('/')
      })
      .catch(err => console.log(err))
  })
})

// 刪除支出頁面
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, item) => {
    if (err) return console.error(err)
    item.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
