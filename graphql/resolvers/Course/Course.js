const Course = require('../../models/Course')
const randomString = require('randomstring')

const courseResolver = {
    Query : {
        // course : (root, args)=>{
        //     return new Promise((resolve, reject)=>{
        //         Course.findOne({courseId : args.courseId})
        //         .exec((err, res)=>{
        //             err ? reject(err) : resolve(res)
        //         })
        //     })
        // }
    },

    Mutation :{
        // createCourse : (root, args)=>{
        //     return new Promise((resolve, reject)=>{
        //         var data = {}
        //         data['courseId'] = randomString.generate(4)
        //         data['name'] = args.name
        //         data['description'] = args.description
        //         data['videoCount'] = args.videoCount
        //         const newCourse = new Course(data)
        //         newCourse.save((err,res)=>{
        //             err ? reject(err) : resolve(res)
        //         })
        //     })
        // }
    }
}

module.exports = courseResolver