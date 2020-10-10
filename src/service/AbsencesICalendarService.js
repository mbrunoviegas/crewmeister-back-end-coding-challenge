const ics = require('ics');
const { writeFileSync } = require('fs');
const absenceFactory = require('../factories/AbsenceFactory')

const createICalendarObject = (absences) => {
    if (absences)
        return absences.map((absence) => {
            return absenceFactory.calendarObjects(absence);
        })
    else
        throw 'absences error'
}

const createAbsenceICalendar = (absences) => {
    if (absences) {
        const calendarObjects = createICalendarObject(absences)
        const { error, value } = ics.createEvents(calendarObjects)

        if (error) {
            throw error
        } else {
            writeFileSync(`${__dirname}/../../download-absences/AbsencesCalendar.ics`, value)
            return `${__dirname}/../../download-absences/AbsencesCalendar.ics`
        }
    } else {
        throw 'absences error'
    }
}

module.exports = {
    createAbsenceICalendar, createICalendarObject
}