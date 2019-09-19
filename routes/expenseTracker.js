const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

// 載入 model
const Record = require('../models/record.js')
// const User = require('./models/user.js')

router.get('/', (req, res) => {
  return res.redirect('/')
})

// 新增支出頁面
router.get('/new', (req, res) => {
  var now = new Date()
  var day = ('0' + now.getDate()).slice(-2) //格式化日，如果小於9，前面補0
  var month = ('0' + (now.getMonth() + 1)).slice(-2) //格式化月，如果小於9，前面補0
  var today = now.getFullYear() + '-' + month + '-' + day //拼裝完整日期格式

  res.render('new', { today: today })
})

router.post('/', (req, res) => {
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

router.get('/:id/edit', (req, res) => {
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

router.post('/:id', (req, res) => {
  res.send('修改頁面')
})

// 刪除支出頁面
router.post('/:id/delete', (req, res) => {
  res.send('刪除頁面')
})

module.exports = router

// 修改 new collection (預設今日)
//下載handlebars
