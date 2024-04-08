const mongoose = require("mongoose")

const personSchema = mongoose.Schema({
    personname: {
        type: String,
        required: true,
        unique: true
    },
    // name: {
    //     type: String
    // },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    personType:{
        type:String,
        default: "אורח",
        enum:["אורח","שותף","חבר"]  
    }


}, {
    timestamps: true
})


module.exports = mongoose.model('Person', personSchema)