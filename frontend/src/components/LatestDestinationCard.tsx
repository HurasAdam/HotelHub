import React from 'react'
import { HotelType } from '../../../backend/src/shared/types'
import { Link } from 'react-router-dom'


type Props ={
    hotel:HotelType
}

const LatestDestinationCard:React.FC<Props> = ({hotel}) => {
  return (
  <Link to={`/details/${hotel._id}`} className='relative cursor-pointer overflow-hidden rounded-md'>
  <div className='h-[300px]'>
<img src={hotel.imageUrls[0]} className='w-full h-full object-cover object-center' alt="" />
  </div>
<div className='absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md'>
<span className='font-bold text-white tracking-tight text-3xl'>{hotel.name}</span>
</div>
  </Link>
  )
}

export default LatestDestinationCard