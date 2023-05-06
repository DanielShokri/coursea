import { useQuery } from "@apollo/client";
import CourseCard from "../common/Cards/CourseCard";
import { GET_COURSES_LIST } from "../Queries/queries";
import { useBoundStore } from "../store/store";
import LoadingState from "../common/LoadingState/LoadingState";

const CoursesPage = () => {
  const setCourses = useBoundStore((state) => state.setCourses);
  const courses = useBoundStore((state) => state.courses);

  const { data, error, loading } = useQuery(GET_COURSES_LIST, {
    onCompleted(data) {
      setCourses(data.courses);
    },
  });

  if (loading) {
    return <LoadingState />;
  }
  return (
    <div className="max-h-screen flex flex-wrap gap-4 justify-around">
      {courses?.map((course) => (
        <div key={course.id}>
          <CourseCard courseInfo={course} />
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;
