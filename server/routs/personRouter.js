const express = require("express")

const router = express.Router()

const personController=require("../controllers/personController")


router.get('/',personController.getAllPersons)
router.put('/',personController.updatePerson)
router.post('/',personController.createPerson)
router.delete('/:id',personController.deletePerson)


module.exports = router
