
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as apiClient from "../api-client"
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'

const EditHotel:React.FC = () => {
    const {hotelId}=useParams()

    const {data:hotel}=useQuery("fetchMyHotelById",()=>apiClient.getMyHotelById(hotelId || ''),
    {
        enabled:!!hotelId,
    })


  return (
    <ManageHotelForm hotel={hotel}/>
  )
}

export default EditHotel