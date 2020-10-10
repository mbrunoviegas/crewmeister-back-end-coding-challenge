const createFilterDate = () => {
    return {
        startDate: (filterStartDate, recordStartDate) => recordStartDate > filterStartDate,
        endDate: (filterEndDate, recordEndDate) => recordEndDate < filterEndDate,
    }
}

const getAbsenceEmployees = (members, absences) => {
    return absences.map(absence => {
        absence.name = members.find(member => member.userId == absence.userId).name
        return absence
    })
}

const filterAbsence = (absences, query, filterDate) => {
    if (absences) {
        const filterKeys = Object.keys(query)
        return absences.filter((absence) => {
            return filterKeys.every((keyFilter) => {
                if (filterDate.hasOwnProperty(keyFilter))
                    return filterDate[keyFilter](query[keyFilter], absence[keyFilter])
                else
                    return absence[keyFilter] === Number(query[keyFilter])
            })
        })
    } else {
        throw 'absences error'
    }
}

module.exports = {
    filterAbsence, getAbsenceEmployees, createFilterDate
}