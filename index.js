
const express = require('express')

const bodyParser = require('body-parser')

const graphQLHTTP = require('express-graphql')

const graphql =  require('graphql')

const app = express();

app.use(bodyParser.json());




app.listen(3000,()=>{
    console.log('Server started at port 3000')
})