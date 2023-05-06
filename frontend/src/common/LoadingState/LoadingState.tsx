import { Bars } from "react-loader-spinner";

export default function LoadingState() {
  return (
    <Bars
      height="80"
      width="80"
      color="#FFBB54"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      visible={true}
    />
  );
}
