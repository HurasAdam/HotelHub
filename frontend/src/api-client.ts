import { RegisterFormData } from "./pages/Register";
import clientApi from "./features/axios/axios";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../../backend/src/shared/types"
import { BookingFormData } from "./forms/BookingForm/BookingForm";


export const fetchCurrentUser= async():Promise<UserType>=>{
  const {data} = await clientApi.get("/users/me",{
    withCredentials:true
  })
  return data;
}

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

export type ISearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;

}

export const searchHotels = async (searchParams: ISearchParams): Promise<HotelSearchResponse> => {

  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");


  searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));


  const response = await clientApi.get(`/hotels/search?${queryParams}`);
  return response.data;

}

export const fetchHotels=async():Promise<HotelType[]>=>{
  const {data}= await clientApi.get("/hotels");
  return data;
} 


export const fetchHotelById= async(hotelId:string):Promise<HotelType>=>{

const {data}= await clientApi.get(`/hotels/${hotelId}`)
return data;

}

export const createPaymentIntent = async(hotelId:string,numberOfNights:string):Promise<PaymentIntentResponse>=>{
const {data}=await clientApi.post(`/hotels/${hotelId}/bookings/payment-intent`,{
  numberOfNights
});
return data;
}

export const createBooking=async(formData:BookingFormData)=>{

console.log(formData)

const {data}=await clientApi.post(`/hotels/${formData.hotelId}/bookings`,formData
)
return data;
}

export const fetchMyBookings= async():Promise<HotelType[]>=>{
  const {data}= await clientApi.get("/my-bookings");
  return data;
}

