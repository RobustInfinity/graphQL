
const User = require('../../models/User')
const randomString = require('randomstring')
const userResolver = {
    Query : {
        user :(root, args)=>{
            return new Promise((resolve, reject)=>{
                User.findOne({userId : args.userId}).exec((err, res)=>{
                    err ? reject(err) : resolve(res)
                })
            })
        }
    },
    Mutation : {
        createUser : (root, args)=>{
            return new Promise((resolve, reject)=>{
                var data = {}
                data['userId'] = randomString.generate(5)
                data['email'] = args.email
                data['password'] = args.password
                const newUser = new User(data)
                newUser.save((err, res)=>{
                    err ? reject(err) : resolve(res) 
                })
            })
            
        },
        createProfile : (root, args)=>{
            return new Promise((resolve, reject)=>{
                User.findOneAndUpdate({
                    id : args.id
                },{
                    $set : {
                        name : args.name,
                        age : args.age
                    }
                }).exec(
                    (err, res)=>{
                        err ? reject(err) : resolve(res)
                    }
                )
            })
        }
    }
}

module.exports = userResolver