import React, { useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { useQuery } from 'react-query';
import * as apiClient from "../api-client"

const Search:React.FC = () => {
const search= useSearchContext();
const [page,setPage]=useState<number>(1);

const searchParams = {
  destination:search.destination,
  checkIn:search.checkIn.toISOString(),
  checkOut:search.checkOut.toISOString(),
  adultCount:search.adultCount.toString(),
  childCount:search.childCount.toString(),
  page:page.toString()
}

const {data:hotelData}=useQuery(
  ["searchHotels",searchParams], 
  ()=> apiClient.searchHotels(searchParams))

  return (
    <div>Search Page</div>
  )
}

export default Search