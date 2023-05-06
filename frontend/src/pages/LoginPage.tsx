import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER, USER_LOGIN } from "../Queries/mutations";
import { UserLogin, UserRegister } from "../common/validators/validator";
import { InputNames, RoutePaths } from "../common/interfaces/commonInterfaces";
import { Link } from "react-router-dom";
import Button from "../common/Button/Button";
import useForm from "../common/hooks/useForm";
import Input from "../common/Input/Input";
import LoginFooter from "../components/LoginFooter";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { displayToast } from "../common/Notfications/Notfications";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../store/store";

const registerInitialValues = {
  name: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const [isSignUpPage, setIsSignUpPage] = useState(false);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError({ graphQLErrors }) {
      displayToast({ type: "error", message: graphQLErrors[0].message });
    },
    onCompleted({ registerUser }) {
      localStorage.setItem("token", registerUser);
      navigate(RoutePaths.dashboard);
    },
  });
  const [userLogin, { data: loginData, loading: loginLoading }] = useMutation(
    USER_LOGIN,
    {
      onCompleted({ loginUser }) {
        localStorage.setItem("token", loginUser);
        navigate(RoutePaths.dashboard);
      },
      onError({ graphQLErrors, networkError }) {
        displayToast({ type: "error", message: graphQLErrors?.[0]?.message });
        if (networkError) {
          localStorage.removeItem("token");
        }
      },
    }
  );

  const submitHandler = (values: any) => {
    localStorage.removeItem("token");
    // make API call with the submitted values

    isSignUpPage
      ? registerUser({
          variables: {
            name: values.name,
            email: values.email,
            password: values.password,
            role: "STUDENT",
          },
        })
      : userLogin({
          variables: {
            email: values.email,
            password: values.password,
          },
        });
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm({
    initialValues: isSignUpPage ? registerInitialValues : loginInitialValues,
    schema: isSignUpPage ? UserRegister : UserLogin,
    onSubmit: submitHandler,
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RoutePaths.dashboard);
    }
  }, [isLoggedIn]);

  return (
    <>
      <header
        className="bg-top-0 bg-left-0 
        bg-cover md:h-[calc(100vh-350px)]
        sm:bg-hero-pattern relative"
      >
        <img
          src="/logo.svg"
          alt="Coursea"
          className="absolute-center top-14 min-w-[13%]
          sm:top-26 hidden sm:block"
        />
      </header>
      <div
        className="min-h-full flex flex-col justify-center pb-12 sm:px-6 lg:px-8
        md:absolute inset-0 
      "
      >
        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 sm:px-10 rounded-xl sm:shadow-2xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white">
              <img
                className="mx-auto h-12 w-auto md:hidden mb-10"
                src="/logo-black.svg"
                alt="Coursea"
              />
              <h2 className="text-center mb-6 text-3xl font-extrabold text-gray-900">
                {isSignUpPage
                  ? "Create new account"
                  : "Sign in to your account"}
              </h2>
              <p className="mt-2 text-center mb-6 text-sm text-gray-600">
                Or{" "}
                <span
                  onClick={() => setIsSignUpPage(!isSignUpPage)}
                  className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
                >
                  {isSignUpPage ? "Sign in to your account" : "Create new one"}
                </span>
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {isSignUpPage && (
                <Input
                  type="text"
                  name={InputNames.name}
                  label="Full Name"
                  // @ts-ignore
                  errors={errors[InputNames.name]}
                  onChange={handleChange}
                  // @ts-ignore
                  value={values.name}
                />
              )}
              <Input
                // type="email"
                name={InputNames.email}
                label="Email"
                // @ts-ignore
                errors={errors[InputNames.email]}
                onChange={handleChange}
                value={values.email}
              />

              <Input
                type="password"
                name={InputNames.password}
                label="Password"
                // @ts-ignore
                errors={errors[InputNames.password]}
                onChange={handleChange}
                value={values.password}
              />

              {isSignUpPage && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                </>
              )}
              <div>
                <Button
                  title={isSignUpPage ? "Sign up" : "Sign in"}
                  loading={isSignUpPage ? loading : loginLoading}
                  twClassName="bg-primary hover:bg-primaryHover"
                />
              </div>
            </form>
            <LoginFooter />
          </div>
          <Link to={RoutePaths.dashboard}>
            <div className="flex mt-5 items-center">
              <ArrowNarrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
