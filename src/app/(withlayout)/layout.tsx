import React, { ReactNode } from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'

interface LayoutProps{
    children:ReactNode;
}
export default function layout({children}:LayoutProps) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  )
}
