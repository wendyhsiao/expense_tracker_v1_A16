const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  // 如果不是 production 模式
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// 設定 mongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/expenseTracker',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// 設定 session 認證
app.use(
  session({
    secret: 'your secret key', // secret: 定義一組屬於你的字串做為私鑰
    resave: false,
    saveUninitialized: true
  })
)
// 設定 passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)
app.use(flash())
// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()

  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 設定路由
app.use('/', require('./routes/home.js'))
app.use('/records', require('./routes/record.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auths.js'))

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running')
})
