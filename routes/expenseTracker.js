const express = require('express')
const router = express.Router()

// 載入 model
const Record = require('../models/record.js')
// const User = require('./models/user.js')

router.get('/', (req, res) => {
  return res.redirect('/')
})

router.get('/new', (req, res) => {
  res.render('new')
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

router.get('/:id', (req, res) => {
  res.send('詳細頁面')
})

router.get('/:id/edit', (req, res) => {
  res.send('修改頁面')
})

router.post('/:id', (req, res) => {
  res.send('修改頁面')
})

router.post('/:id/delete', (req, res) => {
  res.send('刪除頁面')
})

module.exports = router
