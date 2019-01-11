

//return type User when user has signup
//return type Login for every endponit after login
//return type Other when view profile without login
const UserType = `

    type User {
        message : String!
        userId : String!
        name : String
        email : String!
        age : String
    }
    
    type Login {
        message : String!
        userId : String!
        name : String
        email : String!
        age : String
        token : String!
    }

    type UserCourse {
        message : String!
        userId : String!
        name : String
        courses : [Course]!
    }

    type Other {
        message : String!
        name : String
        email : String!
        age : String
    }

    type Query {
        viewProfile(userId : String!) : Other
        loginUser(email : String!) : Login
    }

    type Mutation {
        signUpUser(email : String) : User
        createProfile(userId : String!) : User
        subscribeCourse(userId : String!, courseId : String!) : UserCourse
        viewCourse(userId : String!) : UserCourse
    }

`

module.exports = UserType