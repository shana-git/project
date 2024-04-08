const Person= require("../moduls/Person")

const createPerson = async (req, res) => {
    const { personname, email, phone, personType } = req.body
    if (!personname || !phone)
        return res.status(400).send("missing  required fields")
    const tmp = await Person.find({ personname: personname })
    if (tmp.length != 0)
        return res.status(400).send("duplicate person")

    await Person.create({ personname, email, phone, personType })
    res.send(`person ${personname} was created`)
}

const getAllPersons = async (req, res) => {
    const persons = await Person.find().lean()
    if (!persons[0])
        return res.status(400).send('there are no persons:(')
    res.json(persons)
}


const updatePerson = async (req, res) => {
    const { _id,personname, email, phone, personType } = req.body
    if (!_id  || !personname)
        return res.status(400).send('fields are required')

    const person = await Person.findById(_id).exec()
    if (!person)
        return res.status(400).send(`there is no person with id ${id}`)
    if (personname != person.personname) {
        const tmp = await Person.find({ personname: personname }).lean()
        if (tmp.length != 0)
            return res.status(400).send(`${personname} is exist`)
    }
    person.personname = personname
    person.email = email
    person.phone = phone
    person.personType = personType
    const a=await person.save()
    res.send(`person ${person.personname} updated`)
}

const deletePerson = async (req, res) => {
    const { id } = req.params
    const person = await Person.findById(id).exec()
    if (!person)
        return res.status(400).send(`there is no person with id ${id}`)
    await Person.deleteOne()
    res.send(`person ${person.personname} deleted`)
}

module.exports = { createPerson,deletePerson, updatePerson,  getAllPersons }


