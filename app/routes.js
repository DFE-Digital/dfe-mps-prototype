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

router.post('/teacher-still-teaching', function (req, res) {
  let stillTeaching = req.session.data['still-teaching']

  if (stillTeaching === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/teacher-route')
  }
})

router.post('/teacher-qualified', function (req, res) {
  let qualificationRoute = req.session.data['qualification-route']

  let question = ''

  switch (qualificationRoute) {
    case 'pgce' :
      question = 'What subject did you specialise in during your PGCE?'
      break

    case 'school-direct' :
      question = 'What subject did you specialise in during your School Direct teacher training?'
      break

    case 'scitt' :
      question = 'What subject did you specialise in during your School-centred initial teacher training?'
      break

    case 'teach-first' :
      question = 'What subject did you specialise in during your Teach First initial teacher training?'
      break
  }

  res.render('teacher-qualified', { 'questionText': question })
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

router.post('/teacher-qualified-teach-first-ske', function (req, res) {
  let teachFirstSke = req.session.data['teach-first-ske']

  if (teachFirstSke === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/teacher-location')
  }
})

// Prototype E
router.post('/e/teacher-when', function (req, res) {
  let eligible = req.session.data['eligible']

  if (eligible === 'false') {
    res.redirect('/e/ineligible')
  } else {
    res.redirect('/e/teacher-route')
  }
})

router.post('/e/teacher-location', function (req, res) {
  let teachingSubject = req.session.data['teachingSubject']

  if (teachingSubject === 'false') {
    res.redirect('/e/ineligible')
  } else {
    res.redirect('/e/teacher-location')
  }
})

router.get('/e/teacher-location', function (req, res) {
  var schoolData = require('./data/gias_all.min.json')
  var schoolList = schoolData.map(function (school) {
    return school.est_name
  })

  res.render('e/teacher-location', { 'schoolList': schoolList })
})

module.exports = router
