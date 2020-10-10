const objectProductId = (absenceId) => {
    return `${absenceId}`
}

const objectUId = (absenceId, userId) => {
    return `${absenceId}${userId}`
}

const objectEndDate = (endDate) => {
    const formattedDate = new Date(endDate)
    return [formattedDate.getFullYear(), formattedDate.getMonth() + 1,
    formattedDate.getDate(), 23, 59]
}

const objectStartDate = (startDate) => {
    const formattedDate = new Date(startDate)
    return [formattedDate.getFullYear(), formattedDate.getMonth() + 1,
    formattedDate.getDate(), 8, 10]
}

const objectDescription = (name, type) => {
    return `${name} is ${type === 'sickness' ? 'sick' : 'on vacation'}`
}

const objectTitle = (name) => {
    return `${name}'s Absence`
}

const calendarObjects = (absence) => ({
    title: objectTitle(absence.name),
    description: objectDescription(absence.name, absence.type),
    start: objectStartDate(absence.startDate),
    end: objectEndDate(absence.endDate),
    uid: objectUId(absence.id, absence.userId),
    productId: objectProductId(absence.id),
})

module.exports = {
    calendarObjects
}