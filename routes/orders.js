const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Order = require('../models/Order')

router.get('/', ensureAuth, async (req, res) => {
  try {
    const orders = await Order.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('orders/index', {
      orders,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id).populate('user').lean()

    if (!order) {
      return res.render('error/404')
    }

    if (order.user._id != req.user.id && order.status == 'private') {
      res.render('error/404')
    } else {
      res.render('stories/show', {
        order,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

module.exports = router
