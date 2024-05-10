import React from 'react'
import { UserType } from '../../../../backend/src/shared/types'
import { useForm } from 'react-hook-form'

type Props={
    currentUser:UserType
}

type BookingFormData={
    firstName:string;
    lastName:string;
    email:string;
}

const BookingForm:React.FC<Props> = ({currentUser}) => {

const {handleSubmit,register}=useForm<BookingFormData>({
    defaultValues:{
        firstName:currentUser.firstName,
        lastName:currentUser.lastName,
        email:currentUser.email
    }
})

  return (
    
    <form className='grid grid-cols-1 gap-5 rounded-lg border-slate-300 p-5'>
<span className='text-3xl font-bold'>Confirm Your Details</span>
<div className='grid grid-cols-2 gap-6'>

<label htmlFor="" className='text-gray-700 text-sm font-bold flex-1'>First Name

<input 
type="text" 
className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
readOnly
disabled
{...register("firstName")}
/>
</label>


<label htmlFor="" className='text-gray-700 text-sm font-bold flex-1'>Last Name

<input 
type="text" 
className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
readOnly
disabled
{...register("lastName")}
/>
</label>


<label htmlFor="" className='text-gray-700 text-sm font-bold flex-1'>Email

<input 
type="email" 
className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
readOnly
disabled
{...register("email")}
/>
</label>
</div>
    </form>
  )
}

export default BookingForm