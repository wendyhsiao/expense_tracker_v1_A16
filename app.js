const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

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
app.use('/expenseTrackers', require('./routes/expenseTracker.js'))
app.use('/users', require('./routes/user.js'))

app.listen(3000, () => {
  console.log('App is running')
})
