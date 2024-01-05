import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import axios, { AxiosError } from "axios";


const SignOutButton = () => {
  const { showToast } = useAppContext();
const queryClient = useQueryClient()


  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async() => {
 
        await queryClient.invalidateQueries("validateToken")

      showToast({ message: "Sign out sucessful", type: "SUCCESS" });


    },
    onError: (error: AxiosError | Error) => {


      if (axios.isAxiosError(error)) {
        showToast({ message: error?.response?.data.message, type: "ERROR" });
      } else {
        showToast({ message: error.message, type: "ERROR" });
      }
    },
  });

  const handleClick = () => {
    mutation.mutate();

  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      Sign out
    </button>
  );
};
export default SignOutButton;
