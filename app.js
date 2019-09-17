const express = require('express')
const app = express()

app.use('/', require('./routes/home.js'))
app.use('/expenseTracker', require('./routes/expenseTracker.js'))

app.listen(3000, () => {
  console.log('App is running')
})
