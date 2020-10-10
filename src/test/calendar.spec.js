const assert = require('assert')
const { readFileSync } = require('fs')
const absencesICalendarService = require('../service/AbsencesICalendarService')
const absencesMock = require('./mock/AbsencesMock')
const calendarMock = require('./mock/CalendarMock')

describe('AbsencesICalendarService.js Tests', () => {
    describe('createICalendarObject() test', () => {
        it('should create an object for all absences', () => {
            try {
                const absences = absencesMock.membersAbsencesMocked()
                const calendarObjectsMocked = calendarMock.calendarObjectsMocked()
                const result = absencesICalendarService.createICalendarObject(absences)

                assert.deepStrictEqual(result, calendarObjectsMocked)
            } catch (error) {
                console.log(error)
            }
        })

        it('shoul throw an error', () => {
            try {
                absencesICalendarService.createICalendarObject()
            } catch (error) {
                assert.deepStrictEqual(error, 'absences error')
            }
        })
    })

    describe('createAbsenceICalendar() test', () => {
        it('should generate a calendar with all absences', async () => {
            try {
                const absences = absencesMock.membersAbsencesMocked()
                const result = readFileSync(await absencesICalendarService.createAbsenceICalendar(absences), 'utf-8')
                let uIds = result.match(/UID.{1,}/g, '');
                assert(Array.isArray(uIds))
                uIds = uIds.map((uId) => uId.replace(/[^0-9]{1,}/, ''))
                absences.forEach((absence) => {
                    assert(uIds.includes(`${absence.id}${absence.userId}`))
                })
            } catch (error) {
                console.log(error)
            }
        })

        it('should throw an error', async () => {
            try {
                absencesICalendarService.createAbsenceICalendar()
            } catch (error) {
                assert.deepStrictEqual(error, 'absences error')
            }
        })
    })
})
