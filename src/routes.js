const express = require('express')
const absencesController = require('./controllers/AbsencesController')

const routes = express.Router()

routes.get('/', absencesController.getAbsences)
routes.get('/download', absencesController.getAbsenceICalendar)

module.exports = routes