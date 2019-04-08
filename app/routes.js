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

  switch(qualificationRoute) {
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

  res.render('teacher-qualified', { 'questionText' : question });
})

module.exports = router
