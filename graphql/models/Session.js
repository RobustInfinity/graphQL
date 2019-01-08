const mongoose = require('mongoose')
const {Schema} = mongoose

var SessionSchema = new Schema({
    sessionId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    token : {
        required :true,
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Session = mongoose.model('Session', SessionSchema)

module.exports = Session