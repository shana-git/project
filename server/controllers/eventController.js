const Event = require("../moduls/Event")
const https = require("https")

const createEvent = async (req, res) => {
    const { date, eventType, personId, price, speakers, coments } = req.body
    if (!date || !eventType || !personId || !price)
        return res.status(400).send("missing  required fields")
    await Event.create({ date, eventType, personId, price, speakers, coments })
    res.send(`new event was created at ${date}`)
}

const getAllEvents = async (req, res) => {
    const events = await Event.find().lean()
    if (!events[0])
        return res.status(400).send('there are no events:(')
    res.json(events)
}

const updateEvent = async (req, res) => {
    const { _id, date, eventType, price, speakers, coments } = req.body
    if (!_id || !date || !eventType || !price)
        return res.status(400).send('fields are required')

    const event = await Event.findById(_id).exec()
    if (!event)
        return res.status(400).send(`there is no event with id ${_id}`)

    event.date = date
    event.eventType = eventType
    event.price = price
    event.coments = coments
    event.speakers = speakers

    await event.save()
    res.send(`event ${event.personId} updated`)
}

const deleteEvent = async (req, res) => {
    const { id } = req.params
    const event = await Event.findById(id).exec()
    if (!event)
        return res.status(400).send(`there is no event with id ${id}`)
    await event.deleteOne()
    res.send(`event ${event.personId} deleted`)
}

const getEventByDate = async (req, res) => {
    const { date } = req.params
    const events = await Event.find({ date: date }).lean().populate("personId", { personname: 1, personType: 1 })

    if (!events[0])
        return res.json([])
    res.json(events)
}

const getWeekEvent = async (req, res) => {
    const curr = new Date
    const first = curr.getDate() - curr.getDay()
    const last = first + 6
    const firstDay = new Date(curr.setDate(first-1))
    const lastDay = new Date(curr.setDate(last))
    const events = await Event.find({ date: { $gte: firstDay, $lte: lastDay } }).lean().populate("personId", { personname: 1, personType: 1 })

    if (!events[0]) {
        return res.json("there is no events")
    }

    res.json(events)

}

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent, getEventByDate, getWeekEvent }
