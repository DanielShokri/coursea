import { gql } from "@apollo/client";

export const GET_COURSES_LIST = gql`
  query Courses {
    courses {
      price
      id
      title
      description
      imageUrl
      level
      slug
      rating
      numRatings
      instructor {
        name
      }
      courseEnrollments {
        userId
      }
    }
  }
`;

export const GET_COURSE = gql`
  query Course($courseId: String!) {
    course(id: $courseId) {
      price
      id
      title
      description
      imageUrl
      slug
      rating
      numRatings
      level
      instructor {
        name
      }
      courseEnrollments {
        userId
      }
    }
  }
`;

export const VERIFY_USER = gql`
  query VerifyUser($token: String!) {
    verifyUser(token: $token) {
      name
      role
      createdAt
      coursesEnrolled {
        dateEnrolled
        courseId
        course {
          slug
          title
        }
      }
      email
      id
    }
  }
`;

export const GET_SEARCHED_COURSES = gql`
  query SearchCourses($query: SearchCoursesQuery) {
    searchCourses(query: $query) {
      title
      id
      createdAt
      description
      price
      level
      courseEnrollments {
        userId
      }
      instructor {
        name
        email
      }
    }
  }
`;
