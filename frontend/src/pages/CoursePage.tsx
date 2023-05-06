import { useMutation, useQuery } from "@apollo/client";
import { NavLink, useParams } from "react-router-dom";
import { GET_COURSE } from "../Queries/queries";
import {
  AcademicCapIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline";
import LevelTag from "../common/Cards/LevelTag";
import { RoutePaths } from "../common/interfaces/commonInterfaces";
import Button from "../common/Button/Button";
import LoadingState from "../common/LoadingState/LoadingState";
import { COURSE_ENROLLMENT } from "../Queries/mutations";
import { displayToast } from "../common/Notfications/Notfications";

export default function CoursePage() {
  const { id } = useParams();
  const {
    data: { course } = {},
    error,
    loading,
  } = useQuery(GET_COURSE, {
    variables: { courseId: id },
  });

  const [courseEnrollment] = useMutation(COURSE_ENROLLMENT, {
    onError({ graphQLErrors }) {
      displayToast({ type: "error", message: graphQLErrors[0].message });
    },
    onCompleted({ registerUser }) {
      console.log("registerUser", registerUser);

      displayToast({
        type: "success",
        message: "Successfully enrolled the course",
      });
    },
  });

  if (loading) return <LoadingState />;

  const courseEnrollmentHandler = (courseId: string) => {
    courseEnrollment({ variables: { createCourseEnrollmentId: courseId } });
  };
  console.log("data", course);

  return (
    <>
      <NavLink to={RoutePaths.courses} className="cursor-pointer">
        <ArrowLeftIcon className="h-6 w-6" />
      </NavLink>
      <div className="container flex mt-7 sm:justify-around flex-wrap">
        <div className="video-info">
          <div className="video">
            <img src="/icons/video.png" alt="course" />
          </div>
          <div className="description">
            <div className="general-info p-8">
              <span className="font-urban-bold text-4xl">{course?.title}</span>
              <section className="course-details mt-5">
                <span>{course?.instructor?.name}</span>
                <span className="text-neutral-darkGrey ml-2">
                  | Web development, backend
                </span>
                <span className="text-neutral-darkGrey ml-2">
                  | Rating 4.5/5.0
                </span>
                <div className="flex mt-4 gap-2 flex-wrap">
                  <span className="flex gap-1">
                    <UserIcon className="h-6 w-6" />
                    {course?.courseEnrollments?.length} Students
                  </span>
                  <span className="flex gap-1">
                    <AcademicCapIcon className="h-6 w-6" /> 5 Moulds
                  </span>
                  <span className="flex gap-1">
                    <ClockIcon className="h-6 w-6" /> 1h 30m
                  </span>
                  <LevelTag level={course?.level} />
                </div>
              </section>
              <section className="more-info mt-9">
                <span className="font-urban-bold text-2xl">Description</span>
                <div>{course?.description}</div>
              </section>
            </div>
          </div>
        </div>
        <div className="curriculum-info p-8 sm:p-0">
          <span className="font-urban-bold text-2xl">{course?.title}</span>
          <div className="flex mt-4 gap-2 justify-between">
            <span className="flex gap-1">
              <UserIcon className="h-6 w-6" />
              {course?.courseEnrollments?.length} Students
            </span>
            <span className="flex gap-1">
              <AcademicCapIcon className="h-6 w-6" /> 5 Moulds
            </span>
            <span className="flex gap-1">
              <ClockIcon className="h-6 w-6" /> 1h 30m
            </span>
          </div>
          <div className="flex justify-between mt-5">
            <span className="font-urban-semibold">5 Modules</span>
            <span>0/5</span>
          </div>
          <div></div>
          <Button
            onClick={() => courseEnrollmentHandler(course.id)}
            title="Enroll course"
            twClassName="bg-primary hover:bg-primaryHover text-lg mt-6"
          />
        </div>
      </div>
    </>
  );
}
