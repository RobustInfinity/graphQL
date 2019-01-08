const {mergeResolvers} = require('merge-graphql-schemas')
const userResolver = require('./User/User')
const courseResolver = require('./Course/Course')

const resolvers =[userResolver, courseResolver]


module.exports = mergeResolvers(resolvers)