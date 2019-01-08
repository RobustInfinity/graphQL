
const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        default : 'Complete Profile'
    },
    email : {
        type : String,
        required : String,
        unique : true
    },
    password : {
        type : String,
        required :true
    },
    age : {
        type : String,
        default : 'Complete Profile'
    },
    courses : [{
        type : Schema.Types.ObjectId,
        ref : 'Course'
    }]
})

const User = mongoose.model('User',UserSchema)

module.exports = User