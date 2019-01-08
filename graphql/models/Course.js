
const mongoose = require('mongoose')
const {Schema} = mongoose

var CourseSchema = new Schema({
    courseId : {
        type : String,
        required  :true
    },
    name : {
        type :String,
        required :true
    },
    description : {
        type : String,
        required :true
    },
    videoCount : {
        type : String,
        required : true
    }
})

const Course = mongoose.model('Course',CourseSchema)

module.exports = Course