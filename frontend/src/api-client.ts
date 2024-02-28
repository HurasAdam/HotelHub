import { RegisterFormData } from "./pages/Register";
import clientApi from "./features/axios/axios";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types"

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
  return response.data;
};

export const addHotel = async (formData: FormData) => {
  const response = await clientApi.post("/my-hotels", formData);
  return response.data
};


export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await clientApi.get("/my-hotels")
  return response.data
}

export const getMyHotelById = async (hotelId: string): Promise<HotelType> => {

  const response = await clientApi.get(`/my-hotels/${hotelId}`)
  return response.data
}

export const updateMyHotelById = async (hotelFormData: FormData) => {

  const response = await clientApi.put(`/my-hotels/${hotelFormData.get('hotelId')}`, hotelFormData)
  return response.data
}