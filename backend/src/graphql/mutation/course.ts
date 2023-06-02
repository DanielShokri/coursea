import { GraphQLError } from 'graphql/error/GraphQLError';
import { genId, prisma } from '../../modules/db';

export const courseResolvers = {
  createCourse: async (
    _: any,
    { data }: any,
    { userInfo: currentUser }: any
  ) => {
    const { title, description, imageUrl, price, slug } = data;
    const id = genId();

    //  check if user is logged in and is an instructor
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') {
      throw new GraphQLError(
        'You must be logged in / be an instructor to create a course',
        {
          extensions: { code: 'USER_NOT_INSTRUCTOR' },
        }
      );
    }

    // create course in db
    const course = await prisma.course.create({
      data: {
        id,
        title,
        description,
        instructorId: currentUser.id,
        imageUrl:
          imageUrl ??
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        price,
        slug,
      },
    });

    return course;
  },
  updateCourse: async (
    _: any,
    { id, data }: any,
    { userInfo: currentUser }: any
  ) => {
    // Finding the instructorId of the course
    const findInstructorId = await prisma.course.findUnique({
      where: { id },
      select: { instructorId: true },
    });
    const instructorId = findInstructorId?.instructorId;
    // Checking if the course exists
    if (!instructorId) {
      throw new GraphQLError("Couldn't find this course", {
        extensions: { code: 'COURSE_NOT_FOUND' },
      });
    }

    // Checking if the user is logged in and is an instructor
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') {
      throw new GraphQLError(
        'You must be logged in / be an instructor to update a course',
        {
          extensions: { code: 'USER_NOT_INSTRUCTOR' },
        }
      );
    }
    // Checking if the user is the instructor of the course
    if (currentUser.id !== instructorId) {
      throw new GraphQLError(
        'You must be the instructor of this course to update it',
        {
          extensions: { code: 'USER_NOT_INSTRUCTOR' },
        }
      );
    }

    // Updating the course in the db
    const course = await prisma.course.update({
      where: { id },
      data,
    });

    return course;
  },
  deleteCourse: async (_: any, { id }: any, { userInfo: currentUser }: any) => {
    // Finding the instructorId of the course
    const findInstructorId = await prisma.course.findUnique({
      where: { id },
      select: { instructorId: true },
    });
    const instructorId = findInstructorId?.instructorId;
    // Checking if the course exists
    if (!instructorId) {
      throw new GraphQLError("Couldn't find this course", {
        extensions: { code: 'COURSE_NOT_FOUND' },
      });
    }

    // Checking if the user is logged in and is an instructor
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') {
      throw new GraphQLError(
        'You must be logged in / be an instructor to delete a course',
        {
          extensions: { code: 'USER_NOT_INSTRUCTOR' },
        }
      );
    }
    // Checking if the user is the instructor of the course
    if (currentUser.id !== instructorId) {
      throw new GraphQLError(
        'You must be the instructor of this course to delete it',
        {
          extensions: { code: 'USER_NOT_INSTRUCTOR' },
        }
      );
    }

    // Deleting the course in the db
    const course = await prisma.course.delete({
      where: { id },
    });

    return course;
  },
  createCourseEnrollment: async (
    _: any,
    { id: courseId }: any,
    { userInfo: currentUser }: any
  ) => {
    console.log('🚀 ~ file: course.ts:130 ~ currentUser:', currentUser);
    const enrollId = genId();
    // Checking if the user is logged in
    if (!currentUser) {
      throw new GraphQLError('You must be logged in to enroll a course', {
        extensions: { code: 'USER_NOT_LOGGED_IN' },
      });
    }

    // Checking if the course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) {
      throw new GraphQLError("Couldn't find this course", {
        extensions: { code: 'COURSE_NOT_FOUND' },
      });
    }

    // Checking if the user is already enrolled to the course
    const enrollment = await prisma.courseEnrollment.findFirst({
      where: { userId: currentUser.id, courseId },
    });
    if (enrollment) {
      throw new GraphQLError('You are already enrolled to this course', {
        extensions: { code: 'USER_ALREADY_ENROLLED' },
      });
    }

    // Creating the enrollment in the db
    const courseEnrollment = await prisma.courseEnrollment.create({
      data: {
        id: enrollId,
        courseId,
        userId: currentUser.id,
      },
    });

    return courseEnrollment;
  },
};
