const {mergeTypes} = require('merge-graphql-schemas')

//importing queries
const User = require('./User/User')
const Course = require('./Course/Course')

const typeDefs = [User, Course]

module.exports = mergeTypes(typeDefs,{all : true})