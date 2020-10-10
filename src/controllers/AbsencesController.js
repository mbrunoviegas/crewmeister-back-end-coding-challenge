const api = require('../api');
const absencesService = require('../service/AbsencesService')
const absencesICalendarService = require('../service/AbsencesICalendarService')

const getAbsenceICalendar = async (request, response) => {
    const absences = await api.absences()
    const members = await api.members()
    let result = absences

    result = absencesService.getAbsenceEmployees(members, result)

    const file = absencesICalendarService.createAbsenceICalendar(result)
    if (file)
        response.download(file)
    else
        console.log("Error File")
}

const getAbsences = async (request, response) => {
    const absences = await api.absences()
    const members = await api.members()
    let result = absences

    if (Object.keys(request.query).length > 0) {
        result = absencesService.filterAbsence(absences, request.query, absencesService.createFilterDate())
    }

    result = absencesService.getAbsenceEmployees(members, result)

    return response.json(result)
};

module.exports = {
    getAbsences, getAbsenceICalendar
};