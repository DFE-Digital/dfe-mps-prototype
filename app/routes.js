const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/supply-teacher', function (req, res) {
  let supplyTeacher = req.session.data['supplyTeacher']

  if (supplyTeacher === 'No') {
    res.redirect('/qualified')
  } else {
    res.redirect('/supply-teacher-term')
  }
})

router.post('/supply-teacher-term', function (req, res) {
  let supplyTeacherTerm = req.session.data['supplyTeacherTerm']

  if (supplyTeacherTerm === 'No') {
    res.redirect('/ineligible-term')
  } else {
    res.redirect('/private-agency')
  }
})

router.post('/private-agency', function (req, res) {
  let supplyTeacherAgency = req.session.data['supplyTeacherAgency']

  if (supplyTeacherAgency === 'I am contracted by the school') {
    res.redirect('/qualified')
  } else {
    res.redirect('/ineligible-agency')
  }
})

router.post('/qualified', function (req, res) {
  let qualified = req.session.data['qualified']

  if (qualified === 'No') {
    res.redirect('/degree')
  } else {
    res.redirect('/subject')
  }
})

router.post('/degree', function (req, res) {
  let degree = req.session.data['degree']

  if (degree === 'No') {
    res.redirect('/ineligible-degree')
  } else {
    res.redirect('/subject')
  }
})

router.post('/subject', function (req, res) {
  let teachingSubject = req.session.data['teachingSubject']

  if (teachingSubject === 'No') {
    res.redirect('/ineligible-subject')
  } else {
    res.redirect('/awarded')
  }
})

router.post('/awarded', function (req, res) {
  let awarded = req.session.data['awarded']

  if (awarded === 'Before 1 September 2014') {
    res.redirect('/ineligible-awarded')
  } else {
    res.redirect('/school')
  }
})

router.get('/school', function (req, res) {
  var schoolData = require('./data/gias_all.min.json')
  var schoolList = schoolData.map(function (school) {
    return school.est_name
  })

  res.render('school', { 'schoolList': schoolList })
})

router.post('/school', function (req, res) {
  res.redirect('/disciplinary')
})

router.post('/disciplinary', function (req, res) {
  let teacherAction = req.session.data['teacherAction']

  if (teacherAction === 'No') {
    res.redirect('/verify')
  } else {
    res.redirect('/ineligible-disciplinary')
  }
})

module.exports = router
