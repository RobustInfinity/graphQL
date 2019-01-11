
const User = require('../../models/User')
const Course = require('../../models/Course')
const randomString = require('randomstring')
const auth = require('../../../config/auth')
const userResolver = {
    Query : {
        viewProfile :(root, args, request)=>{
            console.log(request.body)
            var body = request.request.body
            return new Promise((resolve, reject)=>{
                User.findOne({userId : body.userId || args.userId}).exec((err, res)=>{
                    if(err){
                        reject('Some error occured')
                    }else{
                        if(!res){
                            reject('User Not Found')
                        }else{
                            res['message'] = 'User found successfully'
                            resolve(res)
                        }
                    }
                })
            })
        },
        loginUser : (root, args, request)=>{
            var body = request.request.body
            return new Promise((resolve, reject)=>{
                User.findOne({email : body ? body.email : args.email, password : body.password})
                .exec((err, res)=>{                
                    if(err){
                        resolve('Some error occured')
                    }else{ 
                        if(!res){
                            resolve('User not found')
                        }else{
                            
                            auth.createSession(res, function(error, token){
                                if(error){
                                    reject('Some error uccured')  
                                }else{
                                    if(!token){
                                        reject('Alredy Logged In')
                                    }else{
                                        res['token'] = token
                                        res['message'] = 'Logged In Successfully'
                                        resolve(res)
                                    }
                                }
                            })
                        }
                    }
                })
            })
        }
    },
    Mutation : {
        signUpUser : (root, args, request)=>{
        
            var body = request.request.body
            return new Promise((resolve, reject)=>{
           
                var data = {}
                data['userId'] = randomString.generate(5)
                data['email'] = args ?  args.email : body.email
                data['password'] = body.password
                const newUser = new User(data)
                newUser.save((err, res)=>{
                    if(err){
                        reject('Some error occured')
                    }else{
                        if(!res){
                            reject('Unable to save user')
                        }else{
                            res['message'] = "User saved successfully"
                            resolve(res)
                        }
                    } 
                })
            })
        },

        //auth endpoint
        createProfile : (root, args, request)=>{
            var body = request.request.body 
            return new Promise((resolve, reject)=>{
            auth.checkToken(request.request, function(obj){
                if(!obj.success){
                    reject('Please Login! Token not found')
                }else{
                        User.findOneAndUpdate({
                            userId : body.userId
                        },{
                            $set : {
                                name : body.name,
                                age : body.age
                            }
                        },{new : true})
                        .exec((err, doc)=>{
                            if(err){
                                reject('Updation failed')
                            }else{
                                if(doc){
                                    doc['message'] = 'Updation Succesful'
                                    console.log(doc)
                                    resolve(doc)
                                }
                            }
                        })
                }
            })
        })
        },

        //auth endpoint
        subscribeCourse: (root, args, request)=>{
            var body = request.body
            var data = {}
            if(body){
                data['userId'] = body.userId
                data['courseId'] = body.courseId
            }
            if(args){
                data['userId'] = args.userId
                data['courseId'] = args.courseId
            }
            return new Promise((resolve, reject)=>{
            auth.checkToken(request.request, function(obj){
                if(!obj.success){
                    reject('Please Login! Token not found')
                }else{
                        Course.findOne({courseId : data.courseId},(err, course)=>{
                            if(err){
                                reject('Some error occured')
                            }else{
                                if(!course){
                                    reject('Course not found')
                                }else{
                                    User.updateOne({userId : data.userId},
                                        {
                                            $push : {
                                                courses : course._id
                                            }
                                        },{new : true},(err, result)=>{
                                            if(err){
                                                reject('Some error occured')
                                            }else{
                                                if(!result){
                                                    resolve('Unable to subscribe course')
                                                }else{
                                                    User.findOne({userId : data.userId})
                                                    .populate({
                                                        path : 'courses',
                                                        select : {
                                                            courseId : 1,
                                                            name: 1,
                                                            description : 1,
                                                            videoCount : 1
                                                        }
                                                    }).exec((err, res)=>{
                                                        if(res){
                                                        res['message'] = 'Subscribed to course successuly'
                                                        resolve(res)
                                                        }
                                                    })
                                                    
                                                }
                                            }
                                        })
                                }
                            }
                        })
                }
            })
        })
        },

        //auth endponit
        viewCourse :(root, args, request)=>{
            var body = request.request.body
            console.log(body)
            var data = {}
            if(args){
                data['userId'] = args.userId
            }
            if(body){
                data['userId'] = body.userId
            }
            return new Promise((resolve, reject)=>{
            auth.checkToken(request.request, function(obj){
                if(!obj.success){
                    reject('Please Login! Token not found')
                }else{
                        User.findOne({userId : data.userId})
                        .populate({
                            path : 'courses',
                            select : {
                                courseId : 1,
                                name: 1,
                                description : 1,
                                videoCount : 1
                            }
                        }).exec((err, res)=>{
                            if(err){
                                reject('Some error occured')
                            }else{
                                if(!res){
                                    reject('User not found')
                                }else{
                                    res['message'] = 'Courses found'
                                    resolve(res)
                                }
                            }
                        })
                    }    
                })
            })
        }
    }
}

module.exports = userResolver