import { useLocation, useParams } from "react-router-dom";
import { RoutePaths } from "../../../common/interfaces/commonInterfaces";
import { useBoundStore } from "../../../store/store";
import CoursesTitle from "./CoursesTitle";

interface HeaderTitleProps {
  inputWidth?: string;
}

const HeaderTitle = ({ inputWidth }: HeaderTitleProps) => {
  const path = useLocation().pathname;
  const { id } = useParams();
  const currUser = useBoundStore((state) => state.currUser);

  const HeaderTitleRender = ({ title }): JSX.Element => {
    return (
      <div className="px-4 md:px-8">
        <div className="mb-4 mt-8">
          <div className="font-medium text-3xl">{title}</div>
        </div>
      </div>
    );
  };

  const HeaderRender: React.ComponentType = () => {
    switch (path) {
      case RoutePaths.dashboard:
        return (
          <div className="px-4 md:px-8 mb-4 mt-8">
            <div className="font-medium text-3xl">
              Hi, {currUser.name ? currUser.name : "Guest"}
            </div>
            <span className="text-neutral-darkGrey text-lg">
              Let’s learn something new today!
            </span>
          </div>
        );
      case `${RoutePaths.courses}`:
        return <CoursesTitle />;
      case `/course/${id}`: {
        return <HeaderTitleRender title="Explore Courses" />;
      }
      case `${RoutePaths.profile}`: {
        return <HeaderTitleRender title="Account" />;
      }
      default:
        return <span></span>;
    }
  };

  return (
    <>
      <HeaderRender />
    </>
  );
};

export default HeaderTitle;
