const assert = require('assert')
const absencesService = require('../service/AbsencesService');
const api = require('../api');
const absencesMock = require('./mock/AbsencesMock');

describe('AbsenceServie.js Tests', () => {
  describe('getAbsenceEmployees() test', () => {
    it("should return a list of absences with right employees' names", async () => {
      const absences = await api.absences()
      const members = await api.members()
      const mockedAbsences = absencesMock.membersAbsencesMocked()
      const result = absencesService.getAbsenceEmployees(members, absences)
      assert.deepStrictEqual(result, mockedAbsences)
    })
  })

  describe('filterAbsence() test', () => {
    it('should return a list of absences from user 2664', async () => {
      const absences = await api.absences()
      const query = { userId: 2664 }
      const absencesFromUser2664 = absencesMock.absencesFromUser2664Mocked()
      const result = absencesService.filterAbsence(absences,
        query,
        absencesService.createFilterDate())

      assert.deepStrictEqual(result, absencesFromUser2664)
    })

    it('should return nothing', async () => {
      const absences = await api.absences()
      const query = { userId: 999999 }
      const result = absencesService.filterAbsence(absences,
        query,
        absencesService.createFilterDate())

      assert.deepStrictEqual(result, [])
    })

    it('should throw an error', async () => {
      try {
        const query = { userId: 999999 }
        const result = absencesService.filterAbsence([],
          query,
          absencesService.createFilterDate())
      } catch (error) {
        assert.deepStrictEqual(error, 'absences error')
      }
    })

    it('should return a list of absences from absences between 2020-01-10 and 2020-02-10', async () => {
      const absences = await api.absences()
      const query = { startDate: '2020-01-10', endDate: '2020-02-10' }
      const absencesFromUser2664 = absencesMock.absencesBetween20200110and20200210Mocked()
      const result = absencesService.filterAbsence(absences,
        query,
        absencesService.createFilterDate())

      assert.deepStrictEqual(result, absencesFromUser2664)
    })
  })

  describe('createFilterDate() test', () => {
    it("should return a startDate funtion and endDate function", async () => {
      const result = await absencesService.createFilterDate()
      assert(typeof result.startDate === 'function')
      assert(typeof result.endDate === 'function')
    })
  })
  
})