'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { FaTag, FaCalendarDay, FaCalendarAlt } from 'react-icons/fa'; // Importing icons
import Buttons from '../../Component/Button/Buttons';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // For animations
import useProduct from '@/app/Hooks/useProduct';

interface Product {
  _id: string;
  name: string;
  location: string;
  manufacturedDate: string;
  expiryDate: string;
  price: number;
  quantity: string;
  dosage: string;
  image: string;
  manufacturer: {
    name: string;
    email: string;
  };
  category: string;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const res = await fetch('http://localhost:5000/carts');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchMedicineData();
  }, []);

  const categories = Array.from(new Set(products.map(product => product.category)));
  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

  return (
    <div style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '20px', margin: '10px', borderRadius: '10px' }}>
      {/*-------------- Category Filter -----------------------------*/}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            style={{
              backgroundColor: selectedCategory === category ? '#0066cc' : '#ffffff',
              color: selectedCategory === category ? '#ffffff' : '#0066cc',
              borderColor: '#0066cc',
              padding: '10px 15px',
              borderRadius: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            startIcon={<CategoryIcon />}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            {category}
          </Button>
        ))}
        <Button
          onClick={() => setSelectedCategory(null)}
          variant={!selectedCategory ? 'contained' : 'outlined'}
          style={{
            backgroundColor: !selectedCategory ? '#0066cc' : '#ffffff',
            color: !selectedCategory ? '#ffffff' : '#0066cc',
            borderColor: '#0066cc',
            padding: '10px 15px',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          startIcon={<CategoryIcon />}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          All
        </Button>
      </div>

      {/*------------- Product Cards ---------------*/}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {filteredProducts.map(product => (
          <motion.div
            key={product._id}
            style={{
              border: '2px solid #0066cc',
              padding: '20px',
              borderRadius: '15px',
              backgroundColor: '#ffffff',
              color: '#333',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{
              width: '100%',
              height: '200px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '10px',
              marginBottom: '15px'
            }}>
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: '10px' }}
              />
            </div>
            <h3 style={{ color: '#0066cc', margin: '15px 0', fontSize: '1.25rem' }}>{product.name}</h3>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
              <FaTag style={{ marginRight: '8px', fontSize: '1.25rem' }} />
              <strong>Price:</strong> ${product.price}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
              <FaCalendarDay style={{ marginRight: '8px', fontSize: '1.25rem' }} />
              <strong>Manufactured:</strong> {new Date(product.manufacturedDate).toLocaleDateString()}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
              <FaCalendarAlt style={{ marginRight: '8px', fontSize: '1.25rem' }} />
              <strong>Expiry:</strong> {new Date(product.expiryDate).toLocaleDateString()}
            </p>
            {/* --------------buy buttons------ */}
            <div style={{ marginTop: '20px' }}>
            
              <Buttons label={'Buy now'} onClick={() => router.push('/')} style={{ padding: '10px 20px', backgroundColor: '#0066cc', color: '#ffffff' }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Product;
