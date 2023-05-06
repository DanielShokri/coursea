import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { InputProps } from "../interfaces/commonInterfaces";

const Input = (props: InputProps) => {
  const { label, placeholder, type, errors, name, onChange, value, icon } =
    props;
  const errorsClass = errors
    ? "block w-full rounded-md px-3 py-2 border border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
    : "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className={errorsClass}
          aria-invalid="true"
          aria-describedby="email-error"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {errors && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
      </div>
      {errors && (
        <p className=" absolute text-sm text-red-600" id="email-error">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default Input;
