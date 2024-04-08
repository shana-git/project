const express=require("express")
const router = express()

const eventController=require("../controllers/eventController")

router.get('/',eventController.getAllEvents)
router.get('/byDate/:date',eventController.getEventByDate)
router.get('/byWeek',eventController.getWeekEvent)
router.put('/',eventController.updateEvent)
router.delete('/:id',eventController.deleteEvent)
router.post('/',eventController.createEvent)



module.exports=router
