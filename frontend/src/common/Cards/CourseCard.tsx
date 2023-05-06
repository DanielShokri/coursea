import { AcademicCapIcon, ClockIcon, UserIcon } from "@heroicons/react/outline";
import { StarIcon, CurrencyDollarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import LevelTag from "./LevelTag";

interface CourseCardProps {
  courseInfo: {
    id: string;
    title: string;
    description: string;
    instructor: {
      name: string;
    };
    price: number;
    imageUrl: string;
    courseEnrollments: [];
    level: string;
  };
}

export default function CourseCard({ courseInfo }: CourseCardProps) {
  const {
    id,
    title,
    description,
    instructor,
    price,
    imageUrl,
    courseEnrollments,
    level,
  } = courseInfo;

  return (
    <Link to={`/courses/${id}`}>
      <div
        className="flex rounded-2xl flex-col bg-white max-w-sm px-5 py-5 shadow-md 
        hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out
        cursor-pointer
    "
      >
        {/* <!-- Card Image--> */}
        <div className="relative">
          <img
            className="rounded-2xl h-[150px] w-full"
            src="https://picsum.photos/300/200"
          />
          {/* level tag */}
          <LevelTag level={level} isCardTag />
          <span className="flex gap-1 absolute right-3 bottom-3 bg-white px-3 py-1 rounded-lg">
            <CurrencyDollarIcon className="h-6 w-6" />
            {price}$
          </span>
        </div>
        {/*   <!-- Card Body--> */}
        <div className="">
          {/* <!--Card Heading --> */}
          <div>
            <h3 className="text-xl text-gray-800 font-bold mt-5 mb-3">
              {title}
            </h3>
          </div>
          {/* <!--Post Excerpt--> */}
          <div className="flex justify-between my-2 w-full">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-darkGrey">
                  {instructor.name}
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <span>4.5</span>

              <StarIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <span className="flex gap-1">
              <UserIcon className="h-6 w-6" />
              {courseEnrollments?.length} Students
            </span>
            <span className="flex gap-1">
              <AcademicCapIcon className="h-6 w-6" /> 5 Moulds
            </span>
            <span className="flex gap-1">
              <ClockIcon className="h-6 w-6" /> 1h 30m
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
