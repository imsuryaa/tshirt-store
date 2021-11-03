const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Order = require('../models/Order')

router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      orders,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
