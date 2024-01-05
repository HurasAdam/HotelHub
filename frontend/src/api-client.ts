import { RegisterFormData } from "./pages/Register";
import clientApi from "./features/axios/axios";
import { SignInFormData } from "./pages/SignIn";

export const register = async (formData: RegisterFormData) => {
  const response = await clientApi.post("users/register", formData);

  return response.data;
};

export const signIn = async (formData: SignInFormData) => {
  const response = await clientApi.post("auth/login", formData);
  return response.data;
};

export const validateToken = async () => {
  const response = await clientApi.get("auth/validate-token", {});

  return response.data;
};


export const signOut = async () => {
  const response = await clientApi.post("/auth/logout");
console.log("URRRRA")
  return response.data;
};
