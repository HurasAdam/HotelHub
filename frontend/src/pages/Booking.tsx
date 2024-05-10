import React, { useEffect, useState } from 'react'
import * as apiClient from "../api-client";
import { useQuery } from 'react-query';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import BookingDetailSummary from '../components/BookingDetailSummary';

const Booking:React.FC = () => {

    const search=useSearchContext();
const {hotelId}=useParams();
    

const {data:currentUser}=useQuery({
    queryFn:()=>{
        return apiClient.fetchCurrentUser()
    },
    queryKey:["currentUser"]
})

const [numberOfNights,setNumberOfNights]=useState<number>(0);

useEffect(()=>{
if(search.checkIn && search.checkOut){
    const nights = Math.abs(search.checkOut.getTime()- search.checkIn.getTime())/(1000*60*60*24);
    setNumberOfNights(Math.ceil(nights));
}
},[search.checkIn,search.checkOut]);

const {data:hotel}=useQuery({
    queryFn:()=>{
        return apiClient.fetchHotelById(hotelId as string);
    },
    enabled:!!hotelId,
    queryKey:["hotel",hotelId]
})

console.log("hotel")
console.log(hotel)
  return (
    <div className='grid md:grid-cols-[1fr_2fr]'>

{hotel&&
<BookingDetailSummary 
numberOfNights={numberOfNights} 
checkIn={search.checkIn} 
checkOut={search.checkOut}
adultCount={search.adultCount}
childCount={search.childCount}
hotel={hotel}
/>}
{currentUser && <BookingForm currentUser={currentUser}/>}
</div>
  )
}

export default Booking