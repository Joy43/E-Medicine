
import React, { ReactNode } from 'react'
import SideBarNav from './_components/SideBarNav'
import Searchbar from './_components/Searchbar'


interface HomeLayoutProps {
  children: ReactNode;
}

export default function homelayout({children}:HomeLayoutProps) {
  return (

    <div className='bg-black'>
       
        <div className='h-full w-64 flex flex-col fixed inset-y-0 z-50  bg-[#0C1E2F] shadow-lg'>
   <SideBarNav></SideBarNav>
    </div>
 
   
<div className='ml-64  p-2'>


{children}

</div>

    </div>


  )
}
