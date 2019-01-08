
const Course = require('../graphql/models/Course')
const randomString = require('randomstring')

const init = {
    createCourse : function(){
        console.log('Dummy Courses Created')

        const courses = [
            {
                courseId : randomString.generate(4),
                name : 'English',
                description : 'A useful course for begineers',
                videoCount : '19'
            },
            {
                courseId : randomString.generate(4),
                name : 'Hindi',
                description : 'Complete knowledge for begineers',
                videoCount : '24'
            },
            {
                courseId : randomString.generate(4),
                name : 'Maths',
                description  :'Kickstart for a pro-level skills',
                videoCount : '23'
            }
        ]

        courses.forEach((course)=>{
            // console.log(course)
            var doc = new Course({...course})
            Course.findOne({
                name :  course.name
            },(error, result)=>{
                if(error){
                    console.log(error)
                }else{
                    if(result){

                        
                    }else{
                        doc.save()
                        .then((res)=>{
                            // console.log(res)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    }
                }
            })
        })
    }
}

module.exports = init