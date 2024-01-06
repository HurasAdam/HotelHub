import { useMutation } from "react-query";
import ManageHotelForm, {
  HotelFormData,
} from "../forms/ManageHotelForm/ManageHotelForm";
import * as clientApi from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import axios, { AxiosError } from "axios";
const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(clientApi.addHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel has been added", type: "SUCCESS" });
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        showToast({ message: "Error saving hotel ", type: "ERROR" });
      } else {
        showToast({ message: error.message, type: "ERROR" });
      }
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
