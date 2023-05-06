import { SearchIcon } from "@heroicons/react/outline";
import BtnMenu from "../../../common/BtnMenu/BtnMenu";
import Button from "../../../common/Button/Button";
import { levels, sortBy } from "../../../common/constants/constants";
import { InputNames } from "../../../common/interfaces/commonInterfaces";
import Input from "../../../common/Input/Input";
import useForm from "../../../common/hooks/useForm";
import { CourseSearch } from "../../../common/validators/validator";
import { useLazyQuery } from "@apollo/client/react";
import { GET_SEARCHED_COURSES } from "../../../Queries/queries";
import { useBoundStore } from "../../../store/store";
import { displayToast } from "../../../common/Notfications/Notfications";
import { hasValues } from "../../../common/constants/utils";

const searchQuery = {
  text: "",
  filter: {
    level: "",
    category: "",
    price: "",
    sortBy: "",
  },
};

export default function CoursesTitle() {
  const setCourses = useBoundStore((state) => state.setCourses);
  const { values, errors, handleChange, handleSubmit, setValue, resetForm } =
    useForm({
      initialValues: searchQuery,
      schema: CourseSearch,
      onSubmit: submitHandler,
    });

  const handleFilterChange = (e: any) => {
    const levelFilter = levels.some((level) => level.name === e.target.name);
    const sortByFilter = sortBy.some((sort) => sort.name === e.target.name);

    const updatedFilter = {
      ...values.filter,
      level: "",
      sortBy: "",
    };

    if (levelFilter) {
      updatedFilter.level = e.target.name;
      updatedFilter.sortBy = values.filter.sortBy;
    } else if (sortByFilter) {
      updatedFilter.sortBy = e.target.name;
      updatedFilter.level = values.filter.level;
    }
    setValue("filter", updatedFilter);
    submitHandler({ ...values, filter: updatedFilter });
  };

  function submitHandler(values?: any) {
    search({
      variables: {
        query: {
          ...values,
        },
      },
    });
  }

  const [search] = useLazyQuery(GET_SEARCHED_COURSES, {
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      setCourses(data.searchCourses);
    },
    onError: ({ graphQLErrors }) => {
      displayToast({ type: "error", message: graphQLErrors[0].message });
    },
  });

  return (
    <div className="flex-col w-full ">
      <div className="px-4 md:px-8">
        <div className="mb-4 mt-8">
          <div className="font-medium text-3xl">Explore Courses</div>
        </div>
      </div>
      {/* This is filter menu */}
      <div className="flex justify-between px-4 md:px-8 flex-col sm:flex-row">
        <div className="w-full mb-4 sm:mb-0 sm:w-96">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name={InputNames.text}
              // @ts-ignore
              errors={errors[InputNames.text]}
              onChange={handleChange}
              value={values.text}
              placeholder="Search course by name, desc or instructor"
              icon={
                // @ts-ignore
                <span onClick={handleSubmit}>
                  <SearchIcon
                    className="h-5 w-5 cursor-pointer"
                    aria-hidden="true"
                  />
                </span>
              }
            />
          </form>
        </div>
        <div className="flex gap-4 self-center">
          <BtnMenu
            menuHandler={handleFilterChange}
            menu={levels}
            customOuterClass="-left-10"
          >
            <Button
              title={`Level : ${values.filter.level}`}
              twClassName="border-neutral-grey border"
              icon={<img src="/icons/range.svg" alt="range" className="mr-2" />}
            />
          </BtnMenu>
          <Button title="Category" twClassName="border-neutral-grey border" />
          <BtnMenu
            menuHandler={handleFilterChange}
            menu={sortBy}
            customOuterClass="-left-10"
          >
            <Button
              icon={<img src="/icons/sort.svg" alt="sort" className="mr-2" />}
              title={`Sort By : ${values.filter.sortBy}`}
              twClassName="border-neutral-grey border"
            />
          </BtnMenu>
          {hasValues(values) && (
            <Button
              title="Clear Filters"
              twClassName="border-neutral-grey border hidden sm:block"
              onClick={() => {
                resetForm();
                submitHandler(searchQuery);
              }}
            />
          )}
        </div>
        {hasValues(values) && (
          <Button
            title="Clear Filters"
            onClick={() => {
              resetForm();
              submitHandler(searchQuery);
            }}
            outerTwClassnames="sm:hidden"
            twClassName="border-neutral-grey border mt-3"
          />
        )}
      </div>
    </div>
  );
}
