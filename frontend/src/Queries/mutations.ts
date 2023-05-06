import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $role: Role!
  ) {
    registerUser(name: $name, email: $email, password: $password, role: $role)
  }
`;

export const USER_LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export const COURSE_ENROLLMENT = gql`
  mutation CreateCourseEnrollment($createCourseEnrollmentId: String!) {
    createCourseEnrollment(id: $createCourseEnrollmentId) {
      userId
      dateEnrolled
    }
  }
`;
