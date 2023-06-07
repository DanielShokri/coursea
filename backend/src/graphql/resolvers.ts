import { prisma } from '../modules/db';
import { GraphQLError } from 'graphql';
import { userResolvers } from './mutation/user';
import { courseResolvers } from './mutation/course';
import { getUserFromToken } from '../Utils/getUserFromToken';

const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    },
    verifyUser: async (_: any, { token }: any) => {
      const userInfo = await getUserFromToken(token);
      if (!userInfo)
        throw new GraphQLError('invalid token!', {
          extensions: { code: 'invalid_token' },
        });
      const { id } = userInfo as any;
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          coursesEnrolled: {
            include: { course: true },
          },
        },
      });
      if (!user)
        throw new GraphQLError("User doesn't exists", {
          extensions: { code: 'USER_NOT_EXISTS' },
        });
      return user;
    },
    // return user by id
    user: async (_: any, __: any, { id }: any) => {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          coursesEnrolled: {
            include: { course: true },
          },
        },
      });
      if (!user)
        throw new GraphQLError("User doesn't exists", {
          extensions: { code: 'USER_NOT_EXISTS' },
        });
      return user;
    },
    // return course by id
    course: async (_: any, { id }: any) => {
      const course = await prisma.course.findUnique({
        where: { id },
        include: {
          instructor: true,
          courseEnrollments: {
            include: {
              user: true,
            },
          },
          reviews: {
            include: {
              reviewer: true,
            },
          },
        },
      });
      if (!course)
        throw new GraphQLError("Course doesn't exists", {
          extensions: { code: 'COURSE_NOT_EXISTS' },
        });
      return course;
    },
    // return all courses
    courses: async () => {
      const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          instructor: true,
          courseEnrollments: {
            include: {
              user: true,
            },
          },
        },
      });
      return courses;
    },
    searchCourses: async (_: any, { query }: any) => {
      const { text, filter } = query;

      type CourseOrderByInput = {
        title?: any;
        courseEnrollments?: {
          _count?: any;
        };
      };

      const coursesSortBy = (sortBy: string): CourseOrderByInput => {
        switch (sortBy) {
          case 'A-Z':
            return { title: 'asc' };
          case 'Z-A':
            return { title: 'desc' };
          case 'Popular':
            return { courseEnrollments: { _count: 'desc' } };
          default:
            return { title: 'asc' };
        }
      };

      const courses = await prisma.course.findMany({
        where: {
          OR: [
            { title: { contains: text, mode: 'insensitive' } },
            { description: { contains: text, mode: 'insensitive' } },
            { instructor: { name: { contains: text, mode: 'insensitive' } } },
          ],
          AND: [{ level: { contains: filter.level, mode: 'insensitive' } }],
        },
        orderBy: coursesSortBy(filter.sortBy),
        include: {
          instructor: true,
          courseEnrollments: {
            include: {
              user: true,
            },
          },
        },
      });
      if (!courses.length) {
        throw new GraphQLError("Didn't find any courses!", {
          extensions: { code: 'COURSE_NOT_EXISTS' },
        });
      }

      return courses;
    },
  },
  Mutation: {
    ...userResolvers,
    ...courseResolvers,
  },
};

export default resolvers;
