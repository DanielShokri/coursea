import CoursesFilters from "./CoursesFilters";

export default function CoursesTitle() {
  return (
    <div className="flex-col w-full ">
      <div className="px-4 md:px-8">
        <div className="mb-4 mt-8">
          <div className="font-medium text-3xl">Explore Courses</div>
        </div>
      </div>
      {/* This is filter menu */}
      <CoursesFilters />
    </div>
  );
}
