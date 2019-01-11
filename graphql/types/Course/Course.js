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
`

module.exports = CourseQuery