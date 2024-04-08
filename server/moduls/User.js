const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
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
    password: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    // role: {
    //     type: String,
    //     required: true,
    //     default: "user",
    //     enum: ["user", "admin"]
    // },


}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)