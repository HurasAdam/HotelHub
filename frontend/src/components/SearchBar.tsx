import React, { FormEvent, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
const navigate = useNavigate();
const search = useSearchContext();

const [destination,setDestination]=useState<string>(search.destination);
const [checkIn,setCheckIn]=useState<Date>(search.checkIn);
const [checkOut,setCheckOut]=useState<Date>(search.checkOut);
const [adultsCount,setAdultsCount]=useState<number>(search.adultCount);
const [childCount,setChildCount]=useState<number>(search.childCount);

const handleSubmit= (event:FormEvent) =>{
event.preventDefault();
search.saveSearchValues(destination,checkIn,checkOut,adultsCount,childCount);
navigate("/search");
}


const minDate= new Date();
const maxDate= new Date();
maxDate.setFullYear(maxDate.getFullYear()+1)



  return (
<form onSubmit={handleSubmit} 
 className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 items-center gap-4">

<div className="flex flex-row items-center flex-1 bg-white p-2">
<MdTravelExplore size={25} className='mr-2'/>
<input 
 type="text"
 placeholder='Where are you going?' 
 className='text-md w-full focus:outline-none' 
 value={destination}
 onChange={(event)=>setDestination(event.target.value)}
 />
</div>

<div className='flex bg-white px-2 py-1 gap-2'>
    <label className='flex items-center '>
        Adults:
        <input 
        type="number" 
        className='w-full p-1 focus:outline-none font-bold' 
        min={1} 
        max={20}
        value={adultsCount}
        onChange={(event)=>setAdultsCount(parseInt(event.target.value))}
        />
    </label>

        <label className='flex items-center'>
        Children:
        <input 
        type="number" 
        className='w-full p-1 focus:outline-none font-bold' 
        min={0} 
        max={20}
        value={childCount}
        onChange={(event)=>setChildCount(parseInt(event.target.value))}
        />
    </label>
</div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className='flex gap-1 '>
<button
className='w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500'
>
    Search

</button>

<button
className='w-1/3 bg-rose-700 text-white h-full p-2 font-bold text-xl hover:bg-rose-600'
>
    Clear

</button>

      </div>

</form>
  
  )
}

export default SearchBar