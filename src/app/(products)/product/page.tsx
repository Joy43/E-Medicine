'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconButton, Button } from '@mui/material'; // Using Material UI for buttons
import CategoryIcon from '@mui/icons-material/Category'; // Example icon for categories
import Buttons from '../../Component/Button/Buttons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  location: string;
  manufacturedDate: string;
  expiryDate: string;
  price: number;
  quantity: string;
  description: string;
  image: string;
  manufacturer: {
    name: string;
    image: string;
    email: string;
  };
  category: string;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const MedicineData = async () => {
      const res = await fetch('/medicine.json');
      const data: Product[] = await res.json();
      setProducts(data);
    };
    MedicineData();
  }, [products]);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) 
    : products;

  return (
    <div style={{ backgroundColor: '#002540', color: '#FFFFFF', padding: '20px',margin:'10' }}> {/* Dark Navy background with white text */}
  

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(category => (
          <Button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            style={{ 
              backgroundColor: selectedCategory === category ? '#0370F7' : '#000000',
              color: '#FFFFFF',
              borderColor: '#F60301', // Red border for unselected
              padding: '10px 20px', 
              borderRadius: '20px' 
            }}
            startIcon={<CategoryIcon />}
          >
            {category}
          </Button>
        ))}
        <Button 
          onClick={() => setSelectedCategory(null)}
          variant={!selectedCategory ? 'contained' : 'outlined'}
          style={{ 
            backgroundColor: !selectedCategory ? '#0370F7' : '#000000', // Blue for 'All' selected, Black for unselected
            color: '#FFFFFF',
            borderColor: '#F60301', 
            padding: '10px 20px', 
            borderRadius: '20px' 
          }}
          startIcon={<CategoryIcon />}
        >
          All
        </Button>
      </div>
      
      {/* ----------------------Product Cards -------------------------------*/}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div 
            key={product._id} 
            style={{ 
              border: '2px solid #0370F7', // Blue border
              padding: '20px', 
              width: '300px', 
              borderRadius: '8px',
              backgroundColor: '#000000', // Black background
              color: '#FFFFFF' // White text
            }}
          >
            <Image 
              src={product.image} 
              alt={product.name} 
              width={300} 
              height={200} 
              style={{ objectFit: 'cover', borderRadius: '8px' }} 
            />
            <h3 style={{ color: '#0370F7' }}>{product.name}</h3> 
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <div className='mt-2'>
              <Buttons label={'Buy now'} onClick={() => router.push('/')}></Buttons>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
