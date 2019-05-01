const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/supply-teacher', function (req, res) {
  let supplyTeacher = req.session.data['supplyTeacher']

  if (supplyTeacher === 'false') {
    res.redirect('/qualified')
  } else {
    res.redirect('/supply-teacher-term')
  }
})

router.post('/supply-teacher-term', function (req, res) {
  let supplyTeacherTerm = req.session.data['supplyTeacherTerm']

  if (supplyTeacherTerm === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/private-agency')
  }
})

router.post('/private-agency', function (req, res) {
  let supplyTeacherAgency = req.session.data['supplyTeacherAgency']

  if (supplyTeacherAgency === 'false') {
    res.redirect('/qualified')
  } else {
    res.redirect('/ineligible')
  }
})

router.post('/qualified', function (req, res) {
  let qualified = req.session.data['qualified']

  if (qualified === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/subject')
  }
})

router.post('/subject', function (req, res) {
  let teachingSubject = req.session.data['teachingSubject']

  if (teachingSubject === 'false') {
    res.redirect('/ineligible')
  } else {
    res.redirect('/awarded')
  }
})

router.post('/awarded', function (req, res) {
  let awarded = req.session.data['awarded']

  if (awarded === 'false') {
    res.redirect('/ineligible')
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

  if (teacherAction === 'false') {
    res.redirect('/verify')
  } else {
    res.redirect('/ineligible-action')
  }
})

module.exports = router
