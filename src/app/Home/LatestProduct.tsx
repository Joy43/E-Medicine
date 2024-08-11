'use client'
import { Button } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import micoimg from '../assets/Microscope-Care-.jpg'

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Vaccine',
    price: '$340',
    imageUrl: 'https://i.postimg.cc/fR4gJhjy/pexels-n-voitkevich-586340.jpg',
  },
  {
    id: 2,
    name: 'M90 mask',
    price: '$340',
    imageUrl: 'https://i.postimg.cc/k45TkM91/pexels-charlotte-may-596583.jpg',
  },
  {
    id: 3,
    name: 'Rosova tablet',
    price: '$340',
    imageUrl: 'https://i.postimg.cc/7LwsnMRy/pexels-karolina-grabowska-404700.jpg',
  },
  {
    id: 4,
    name: 'Daynograph ',
    price: '$340',
    imageUrl: 'https://i.postimg.cc/LXn8hf2z/pexels-karolina-grabowska-4386467.jpg',
  },
  {
    id: 5,
    name: 'Gym Shoes',
    price: '$340',
    imageUrl: 'https://i.postimg.cc/fR4gJhjy/pexels-n-voitkevich-586340.jpg',
  },
  {
    id: 6,
    name: 'hand wash',
    price: '$340',
    imageUrl: 'https://i.postimg.cc/y6jrd03J/images.jpg',
  },
];


function LatestProduct() {
  const [hover, setHover] = useState(false);

  return (
    <div className='bg-[#002540] text-white p-6 rounded-lg mx-auto'>
      <h1 className='font-serif text-2xl text-[#0370F7] mb-4 text-center sm:text-left'>Our Latest Products</h1>
      <hr className='bg-[#0370F7] m-3 w-56 mx-auto sm:mx-0' />
      
      <div className="bg-[#000000] shadow-lg rounded-lg transition-all duration-500 hover:shadow-2xl p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* ----------popular card--------- */}
        <div className="flex w-96 flex-col items-center shadow-2xl shadow-sky-200 p-4 bg-[#002540]">
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: '#0370F7',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              fontSize: '17px',
              textTransform: 'none',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#F60301',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            100% PureHand
          </Button>

          <h1 className="mt-4 text-lg font-bold text-[#fff]">Amandean Wild Caught</h1>

          <div className="mt-4 flex flex-col items-center">
            <div className='relative flex items-center justify-center'>
              <div className='bg-[#0370F7] rounded-full w-40 h-40 animate-pulse'></div>
              <div className='absolute'>
                <p className="text-lg text-white">Discount</p>
                <h1 className="text-4xl font-bold text-[#faf9f9]">50%</h1>
              </div>
            </div>

            <div
              className={`relative mt-4 w-72 h-72 rounded-lg overflow-hidden transition-all duration-500 ${
                hover ? 'bg-[#F60301]' : 'bg-[#0370F7]'
              }`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={micoimg}
                alt="microscope"
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-500 hover:opacity-90"
              />
            </div>
          </div>
        </div>

        {/* -----------Product Cards--------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex justify-center">
              <div className="relative max-w-sm w-full h-fit bg-white shadow-md rounded-3xl p-4">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    className="rounded-2xl w-full object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                    width={340}
                    height={160}
                  />
                  <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 group-hover:opacity-50 opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{product.name}</p>
                    <p className="text-md text-gray-800">{product.price}</p>
                  </div>
                  <div className="group cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 group-hover:opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="gray"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestProduct;
