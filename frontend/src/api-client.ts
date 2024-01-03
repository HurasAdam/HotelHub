import { RegisterFormData } from "./pages/Register";
import clientApi from "./features/axios/axios";



export const register = (async(formData:RegisterFormData)=>{
const response = await clientApi.post("users/register",formData)

return response.data
})