const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/user.js')

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Email or Password incorrect' })
          }
        })
      })
    })
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile)
        User.findOne({ email: profile._json.email }).then(user => {
          if (!user) {
            let randomPassword = Math.random()
              .toString(36)
              .slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                const newUser = new User({
                  name: profile._json.email,
                  email: profile._json.email,
                  password: hash
                })

                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => console.log(err))
              })
            })
          } else {
            return done(null, user)
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
