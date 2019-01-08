
const UserType = `

    type User {
        id : String!
        name : String
        email : String!
        age : String
        password : String!
        courses : [Course]!
    }

    type Query {
        user(userId : String!) : User
    }

    type Mutation {
        createUser(email : String!, password : String!) : User
        createProfile(name : String!, age : String!) : User
    }

`

module.exports = UserType