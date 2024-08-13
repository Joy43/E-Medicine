import React, { ReactNode } from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
interface LayoutProps{
children:ReactNode
}
export default function productslayout({children}:LayoutProps) {
  return (
    <>
     <Navbar/> 
     {children}
     <Footer/>
    </>
  )
}
