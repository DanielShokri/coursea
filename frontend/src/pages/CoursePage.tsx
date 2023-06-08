import { useMutation, useQuery } from "@apollo/client";
import { NavLink, useParams } from "react-router-dom";
import { GET_COURSE } from "../Queries/queries";
import {
  AcademicCapIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import LevelTag from "../common/Cards/LevelTag";
import { RoutePaths } from "../common/interfaces/commonInterfaces";
import CommonButton from "../common/Button/Button";
import LoadingState from "../common/LoadingState/LoadingState";
import { COURSE_ENROLLMENT } from "../Queries/mutations";
import { displayToast } from "../common/Notfications/Notfications";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Avatar,
  Rating,
} from "@material-tailwind/react";
import Reviews from "../components/Reviews/Reviews";
import { useState } from "react";

export default function CoursePage() {
  const [tabValue, setTabValue] = useState("description");
  console.log(
    "🚀 ~ file: CoursePage.tsx:31 ~ CoursePage ~ tabValue:",
    tabValue
  );
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

  const TabsRenderer = ({ data }: { data: any[] }) => {
    return (
      <Tabs value={tabValue}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-primary shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              onClick={() => setTabValue(value)}
              className="w-28"
              key={value}
              value={value}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, data }) => (
            <TabPanel key={value} value={value}>
              {value === "reviews" ? (
                <Reviews reviews={data} />
              ) : (
                <p className="text-neutral-darkGrey">{data}</p>
              )}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  };

  const data = [
    {
      label: "Description",
      value: "description",
      data: course.description,
    },
    {
      label: "Tools",
      value: "tools",
      data: course?.tools,
    },
    {
      label: "Reviews",
      value: "reviews",
      data: course?.reviews,
    },
  ];

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
                <span className="flex align-baseline  items-center gap-1">
                  <Avatar
                    size="sm"
                    className="cursor-pointer"
                    src="https://api.dicebear.com/6.x/adventurer/svg"
                    alt="avatar"
                  />
                  <span>{course?.instructor?.name}</span>|
                  <span className="text-neutral-darkGrey ml-2">
                    Web development, backend
                  </span>
                  <span className="text-neutral-darkGrey ml-auto flex gap-1">
                    <StarIcon
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    4.5 ({course?.reviews.length})
                  </span>
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
                  <div className="ml-auto">
                    <LevelTag level={course?.level} customClass="px-0" />
                  </div>
                </div>
              </section>
              <section className="more-info mt-9">
                <TabsRenderer data={data} />
              </section>
            </div>
          </div>
        </div>
        <div className="curriculum-infos sm:w-auto w-full p-8 sm:p-0">
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
          <CommonButton
            onClick={() => courseEnrollmentHandler(course.id)}
            title="Enroll course"
            twClassName="bg-primary hover:bg-primaryHover text-lg mt-6"
          />
        </div>
      </div>
    </>
  );
}
