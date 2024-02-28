
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as apiClient from "../api-client"
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { useAppContext } from '../contexts/AppContext'

const EditHotel:React.FC = () => {
    const {hotelId}=useParams()
    const {showToast} = useAppContext()

    const {data:hotel}=useQuery("fetchMyHotelById",()=>apiClient.getMyHotelById(hotelId || ''),
    {
        enabled:!!hotelId,
    })

const {mutate, isLoading}=useMutation(apiClient.updateMyHotelById,{
  onSuccess:()=>{
    showToast({message:"Hotel has been saved!",type:"SUCCESS"})
  },
onError:()=>{
  showToast({message:"Error Saving Hotel ",type:"ERROR"})
}
})

const handleSave= (hotelFormData:FormData)=>{
mutate(hotelFormData)
}
  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel