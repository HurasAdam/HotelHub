import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls:string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?:HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;

};

const ManageHotelForm = ({ onSave, isLoading,hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();

  const { handleSubmit,reset } = formMethods;

  useEffect(()=>{
reset(hotel)
  },[hotel,reset])

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const {
      name,
      city,
      country,
      description,
      type,
      pricePerNight,
      starRating,
      adultCount,
      childCount,
      facilities,
      imageFiles,
    } = formDataJson;

    console.log(facilities)
    const formData = new FormData();
if(hotel){
  formData.append("hotelId",hotel._id)
}

    formData.append("name", name);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("pricePerNight", pricePerNight.toString());
    formData.append("starRating", starRating.toString());
    formData.append("adultCount", adultCount.toString());
    formData.append("childCount", childCount.toString());

    facilities.forEach((facility,index) => {
      formData.append(`facilities[${index}]`, facility);
    });

if(formDataJson.imageUrls){
  formDataJson.imageUrls.forEach((url,index)=>{
formData.append(`imageUrls[${index}]`,url)
  })
}


    Array.from(imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            type="submit"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
