import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import DefaultLayout from "../../layouts/defaultLayout";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import ErrorComponent from "../../components/global/error";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/authentication";
import toast from "react-hot-toast";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "../../redux/features/user-slice";
import { AxiosError, AxiosResponse } from "axios";

type FormValues = {
  email: string,
  password: string
}

const schema = z.object({
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long.")
    .max(32, "Password must be less than 32 characters long.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number.")
    .regex(/^[a-zA-Z\d@?!$^&*]+$/, "Password can only contain Latin letters in any case (a-Z), numbers, and the symbols @?!$^&*.")
});

const LoginPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form data: ", data);

    mutate({
      userEmail: data.email,
      userPassword: data.password
    });
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    mutationKey: "loginUser",
    onSuccess: (data: AxiosResponse) => {
      const userObject: { data: { user: UserDataType, token: TokenDataType }, message: string } = data.data;
      console.log("Success: ", data);
      toast.success("Successfully logged in!");

      dispatch(setUser(userObject.data.user));
      dispatch(setTokens(userObject.data.token));

      localStorage.setItem("user", JSON.stringify(userObject.data.user));
      localStorage.setItem("accessToken", userObject.data.token.accessToken);
      localStorage.setItem("refreshToken", userObject.data.token.refreshToken);
    },
    onError: (error: AxiosError) => {
      console.log("Error: ", error);
      toast.error("Failed to log in!");
    }
  });


  return (
    <DefaultLayout className="px-[4%]">
      <div className="flex flex-col bg-[#ffffff] min-w-fit w-[90vw] md:w-[32rem] max-h-fit rounded-xl shadow-2xl space-y-3 p-8 py-12">
        <div className="">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-gray-500 text-sm pt-2">Sign in to your account</p>
          <hr className="h-0 my-2 -mx-8 border border-solid border-t-0 border-gray-600 opacity-10" />
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorComponent errors={Object.values(errors).filter(Boolean) as FieldError[]} />

          <div className="mb-6 pt-6 rounded bg-gray-200">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">
              Email Address
              <a className="text-red-700 font-medium">*</a>
            </label>

            <input
              type="email"
              id="email"
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3`}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
            />
          </div>
          <div className="mb-6 pt-6 rounded bg-gray-200">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">
              Password
              <a className="text-red-700 font-medium">*</a>
            </label>

            <input
              type="password"
              id="password"
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 ${errors.password ? "border-red-500" : ""}`}
              {...register("password")}
            />
          </div>

          <div className="flex justify-end"><p className="text-sm text-gray-700 hover:text-gray-900 hover:underline mb-6"><Link to={"/forgot"} className="cursor-pointer">Forgot password?</Link></p></div>

          <div className="flex justify-end">
            <button
              className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-200"
              value="Login"
            >
              {
                isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  <p>Login</p>
                )
              }
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center mt-6">
          <p className="text-gray-700 text-sm">Don&apos;t have an account? <Link to={"/register"} className="transition duration-500 font-bold hover:underline hover:text-gray-800 cursor-pointer">Sign up.</Link></p>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default LoginPage;
