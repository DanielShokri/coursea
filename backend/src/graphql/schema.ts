import gql from 'graphql-tag';

const schema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
    createdAt: DateTime!
    role: Role!
    coursesEnrolled: [CourseEnrollment!]!
    reviews: [Review!]!
    taughtCourses: [Course!]!
  }

  type Course {
    id: ID!
    slug: String!
    title: String!
    description: String!
    instructor: User!
    instructorId: String!
    imageUrl: String
    courseEnrollments: [CourseEnrollment!]!
    price: Float!
    rating: Float
    numRatings: Int
    level: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    reviews: [Review!]!
  }

  type CourseEnrollment {
    id: String!
    user: User!
    userId: String!
    course: Course!
    courseId: String!
    dateEnrolled: DateTime!
  }

  type Review {
    id: ID!
    reviewer: User!
    course: Course!
    rating: Float!
    comment: String!
    createdAt: String!
  }

  input CreateCourseInput {
    slug: String!
    title: String!
    description: String!
    imageUrl: String
    price: Float!
  }

  input UpdateCourseInput {
    slug: String
    title: String
    description: String
    imageUrl: String
    price: Float
  }

  input SearchCoursesQuery {
    text: String
    filter: SearchFilterParam
  }

  input SearchFilterParam {
    level: String
    category: String
    price: String
    sortBy: String
  }

  type Query {
    users: [User]!
    user: User
    course(id: String!): Course
    courses: [Course!]!
    courseEnrollments: [CourseEnrollment!]
    courseEnrollment(id: ID!): CourseEnrollment
    reviews: [Review!]!
    review(id: ID!): Review
    verifyUser(token: String!): User
    searchCourses(query: SearchCoursesQuery): [Course!]!
  }

  type Mutation {
    registerUser(
      name: String!
      email: String!
      password: String!
      role: Role!
    ): String!
    loginUser(email: String!, password: String!): String!

    createCourse(data: CreateCourseInput!): Course
    updateCourse(id: String!, data: UpdateCourseInput!): Course
    deleteCourse(id: String!): Course

    createCourseEnrollment(id: String!): CourseEnrollment
    deleteCourseEnrollment(id: String!): CourseEnrollment

    createReview(
      reviewerId: ID!
      courseId: ID!
      rating: Float!
      comment: String!
    ): Review!
    updateReview(id: ID!, rating: Float, comment: String): Review
    deleteReview(id: ID!): Review
  }

  enum Role {
    STUDENT
    INSTRUCTOR
  }

  scalar DateTime
`;

export default schema;
