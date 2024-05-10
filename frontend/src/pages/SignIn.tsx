import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";


export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {register,formState: { errors },handleSubmit,} = useForm<SignInFormData>();
const { showToast } = useAppContext();
const location = useLocation();

const queryClient = useQueryClient()
const navigate= useNavigate()

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in sucessful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname||"/")
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        showToast({ message: error?.response?.data.message, type: "ERROR" });
      } else {
        showToast({ message: error.message, type: "ERROR" });
      }

      console.log(error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text 3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1 ">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "this field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 ">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 6,
              message: "Password must contain at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items center justify-between">
        <span className="text-sm">
          Not Registered? <Link className="hover:text-blue-700 underline  " to="/register">Create an account here</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white mx-4 p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
