const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/teacher-when', function (req, res) {

  let eligible = req.session.data['eligible']

  if (eligible === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/teacher-still-teaching')
  }
})

module.exports = router
