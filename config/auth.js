const jsonwebtoken = require('jsonwebtoken')
const randomString = require('randomstring')
const Session = require('../graphql/models/Session')
const Url  =require('url')
const config = require('../config')

const auth = {

    //session creation at login
    createSession : function(user, callback){
        Session.findOne({email : user.email},(err, result)=>{
            if(err){
                callback(err, null)
            }else{
                if(!result){
                    jsonwebtoken.sign({ userId : user.userId ,email : user.email}, config.SECRET,{
                        expiresIn : 3600},                      //!hr expiry
                        (err, token) =>{
                        var session = {}
                        session['sessionId'] = randomString.generate(8)
                        session['userId'] = user.userId
                        session['email'] = user.email
                        session['token'] = token
                        session['createdAt'] = Date.now()
                        var newSession = new Session(session)
                        newSession.save(function(err, res){
                            if(err){
                                callback(err, null)
                            }
                            if(res){
                                callback(null,token)
                            }
                        })
                    })
                }else{
                    if(result){
                        callback(null, null)
                    }
                }
            }
        })
    },

    //session checking for auth urls
    checkToken : function(request, callback){
       
            const tokenHeader = request.header('authorization')
            if(tokenHeader !== undefined){
                var tokenArray = tokenHeader.split(' ')
                var token = tokenArray[1]
                Session.findOne({token : token},(error, session)=>{
                    if(session){
                        callback({success : true})
                    }else{
                        callback({success : false})
                    }
                })
            }else{
                console.log('token not found')
                callback({success : false})
            }
    },

    //session deletion at logout
    destroySession : function(){

    }
}

module.exports = auth