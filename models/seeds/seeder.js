const mongoose = require('mongoose')
const Record = require('../record.js')
const User = require('../user.js')
const bcrypt = require('bcryptjs')

const record = require('../../record.json')
const user = require('../../user.json')[0]

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
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash

      newUser
        .save()
        .then(users => {
          record.forEach(item => {
            Record.create({
              name: item.name,
              category: item.category,
              date: item.date,
              amount: item.amount,
              userId: users._id
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
      console.log('done')
    })
  })
})
