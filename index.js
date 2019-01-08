
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
const graphql =  require('graphql')
const app = express();

//env variables
const config = require('./config/index')

//auth token checking 
const auth = require('./config/auth')
// app.use


app.use(bodyParser.json());

const schema = require('./graphql/')

app.use('/api',graphqlHttp({
    
    schema,
    graphiql : true

}))




mongoose.connect(config.DB_URL,{ useNewUrlParser: true })
    .then(()=>{
        console.log('Successfully Connected to DB')
    })
    .catch((err)=>{
        console.log(err)
    })
app.listen(3000,()=>{
    console.log('Server started at port 3000')
})


//courses created whenever server starts
const init = require('./config/init')
init.createCourse();

module.exports = app