const jsonwebtoken = require('jsonwebtoken')
const Session = require('../graphql/models/Session')

const auth = {

    //session creation at login
    createSession : function(){

    },

    //session checking for auth urls
    checkToken : function(request, response, next){
        const URLS = require('./configUrl')

        if(URLS.authUrls.indexOf(request.url) > -1){
            const tokenHeader = request.header('authorization')
            if(tokenHeader !== undefined){
                var tokenArray = tokenHeader.split(' ')
                var token = tokenArray[1]
                // Session.findOne({token : token},(error, session)=>{

                // })
            }else{
                console.log('token not found')
                response.json({success : false, message : 'Token not found. Please Login'})
            }
        }else if(URLS.simpleUrls.indexOf(request.url) > -1){
            next()
        }else{
            console.log('unknown url')
            response.json({message : 'unknown url', success : false})
        }
    },

    //session deletion at logout
    destroySession : function(){

    }
}

module.exports = auth