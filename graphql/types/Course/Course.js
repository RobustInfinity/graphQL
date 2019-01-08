const CourseQuery = `

    type Course {
        courseId : String!
        name : String!
        description : String!
        videoCount : String!
    }

    input CourseInput {
        courseId : String!
        name : String!
        description : String!
        videoCount : String!
    }
    type Query {
        course(courseId : String!) : Course
    }

    type Mutation {
        createCourse(courseInput : CourseInput) : Course!
    }
`

module.exports = CourseQuery