interface ButtonProps {
  type?: "button" | "submit" | "reset";
  twClassName?: string;
  onClick?: () => void;
  title: string;
  loading?: boolean;
  icon?: React.ReactNode;
  outerTwClassnames?: string;
}

function CommonButton(props: ButtonProps) {
  const {
    title,
    type,
    twClassName,
    onClick,
    loading,
    icon,
    outerTwClassnames,
  } = props;
  return (
    <div className={outerTwClassnames}>
      {loading ? (
        <div>
          <div className="flex items-center justify-center">
            <span className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium bg-primary hover:bg-primaryHover">
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <button
          type="submit"
          onClick={onClick}
          className={`w-full flex relative items-center justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium ${twClassName} `}
        >
          {icon && icon}
          {title}
        </button>
      )}
    </div>
  );
}

export default CommonButton;
