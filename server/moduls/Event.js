const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        enum: ["ערב", "בוקר", "שבת", "קידוש", "יום שלם"]
    },
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Person'
    },
    price: {
        type: Number,
        required: true
    },
    speakers:{
       type:Boolean,
       default:false
    },

    coments: {
        type: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)