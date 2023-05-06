import { useWindowSize } from "./hooks/useWindowSize";

const CurrentScreenSize: React.FC = () => {
  const { width } = useWindowSize();

  let text: string;
  if (width < 640) {
    text = "SM";
  } else if (width >= 640 && width < 768) {
    text = "MD";
  } else {
    text = "LG";
  }

  return (
    <div
      className="fixed bottom-0 right-0 flex items-center 
    justify-center w-10 h-10 bg-primary font-bold text-xl"
    >
      {text}
    </div>
  );
};

export default CurrentScreenSize;
