const express = require('express')
const router = express.Router()

// 載入 model
// const Record = require('./models/record.js')
// const User = require('./models/user.js')

router.get('/', (req, res) => {
  res.send('首頁')
})

router.get('/:id', (req, res) => {
  res.send('詳細頁面')
})

router.get('/new', (req, res) => {
  res.send('新增頁面')
})

router.post('/', (req, res) => {
  res.send('新增頁面')
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
