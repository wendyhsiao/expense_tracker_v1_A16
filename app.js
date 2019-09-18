const express = require('express')
const app = express()
const mongoose = require('mongoose')

// 設定 mongoDB
mongoose.connect('mongodb://localhost/expenseTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// 載入 model
// const Record = require('./models/record.js')
// const User = require('./models/user.js')

// 設定路由
app.use('/', require('./routes/home.js'))
app.use('/expenseTracker', require('./routes/expenseTracker.js'))

app.listen(3000, () => {
  console.log('App is running')
})
