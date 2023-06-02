import Input from "../../../common/Input/Input";
import { SearchIcon } from "@heroicons/react/outline";
import CommonPopover from "../../../common/BtnMenu/CommonPopover";
import { InputNames } from "../../../common/interfaces/commonInterfaces";
import { hasValues } from "../../../common/constants/utils";
import { Button } from "@material-tailwind/react";
import { useBoundStore } from "../../../store/store";
import { levels, sortBy } from "../../../common/constants/constants";
import useForm from "../../../common/hooks/useForm";
import { CourseSearch } from "../../../common/validators/validator";
import { useLazyQuery } from "@apollo/client/react";
import { GET_SEARCHED_COURSES } from "../../../Queries/queries";
import { displayToast } from "../../../common/Notfications/Notfications";
import CommonButton from "../../../common/Button/Button";

const searchQuery = {
  text: "",
  filter: {
    level: "",
    category: "",
    price: "",
    sortBy: "",
  },
};

export default function CoursesFilters({}) {
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
        <div>
          <CommonPopover
            menuHandler={handleFilterChange}
            menu={levels}
            name="level"
          >
            <Button
              variant="outlined"
              size="md"
              className="border-neutral-grey text-neutral-black normal-case text-sm font-medium font-urban-regular"
            >
              <div className="flex align-center">
                <img src="/icons/range.svg" alt="range" className="mr-2" />
                {`Level : ${values.filter.level}`}
              </div>
            </Button>
          </CommonPopover>
        </div>

        <CommonPopover
          menuHandler={handleFilterChange}
          menu={sortBy}
          name="sortBy"
        >
          <Button
            variant="outlined"
            size="sm"
            className="border-neutral-grey focus:outline-none text-neutral-black normal-case font-urban-regular text-sm font-medium"
          >
            <div className="flex align-center">
              <img src="/icons/sort.svg" alt="sort" className="mr-2" />
              {`Sort By : ${values.filter.sortBy}`}
            </div>
          </Button>
        </CommonPopover>

        {hasValues(values) && (
          <CommonButton
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
        <CommonButton
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
  );
}
