const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/teacher-when', function (req, res) {
  let eligible = req.session.data['eligible']

  if (eligible === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/teacher-route')
  }
})

router.post('/teacher-route', function (req, res) {
  let qualificationRoute = req.session.data['qualificationRoute']

  if (qualificationRoute === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/teacher-subject')
  }
})

router.post('/teacher-subject', function (req, res) {
  let teachingSubject = req.session.data['teachingSubject']

  if (teachingSubject === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/teacher-location')
  }
})

router.post('/teacher-qualified-teach-first-ske', function (req, res) {
  let teachFirstSke = req.session.data['teach-first-ske']

  if (teachFirstSke === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/teacher-location')
  }
})

router.post('/teacher-location', function (req, res) {
  let qualifiedSubject = req.session.data['qualified-subject']
  let qualificationRoute = req.session.data['qualification-route']

  if (qualificationRoute === 'teach-first' && qualifiedSubject === 'science') {
    res.redirect('/teacher-qualified-teach-first-ske')
  } else {
    res.redirect('/teacher-location')
  }
})

router.get('/teacher-location', function (req, res) {
  var schoolData = require('./data/gias_all.min.json')
  var schoolList = schoolData.map(function (school) {
    return school.est_name
  })

  res.render('teacher-location', { 'schoolList': schoolList })
})

router.post('/teacher-supply', function (req, res) {
  let supplyTeacher = req.session.data['supplyTeacher']

  if (supplyTeacher === 'true') {
    res.redirect('/other-question')
  } else {
    res.redirect('/teacher-action')
  }
})

module.exports = router
