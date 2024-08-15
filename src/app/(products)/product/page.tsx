'use client';
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { FaTag, FaCalendarDay, FaCalendarAlt } from 'react-icons/fa';
import Buttons from '../../Component/Button/Buttons';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import useProduct from '@/app/Hooks/useProduct';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '@/app/Authentication/Proividers/AuthProviders';


import useAxiosSecure from '@/app/Hooks/AxiosSequre';


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
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [product] = useProduct(search);
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

// -------------add to cart-------------
const handleAddToCart = async (product: Product) => {
  if (user?.email) {
    const cartItem = {
      productId: product._id,
      email: user.email,
      name: product.name,
      image: product.image,
      price: product.price,
    };

    try {
      const res = await axiosSecure.post('/carts', cartItem);
      if (res.data.insertedId) {
        toast.success(`${product.name} added to your cart`, {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Optionally refetch the cart to update the cart item count
        //  refetch();
      }
    } catch (error) {
      toast.error('Error adding to cart', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } else {
    toast.warn('Please log in to add items to your cart.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push('/login');
  }
};

// --------------search-----------
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchText = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
    setSearch(searchText);
  };

  const categories = Array.from(new Set(products.map((product) => product.category)));
  const filteredProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products;

  return (
    <div style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '20px', margin: '10px', borderRadius: '10px' }}>
      {/* ----------Category Filter------------------ */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {categories.map((category) => (
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

      {/* Search Bar */}
      <div className="mt-6 mb-7">
        <div
          className="w-full flex flex-row flex-wrap bg-gray-600 p-10 py-20 justify-center"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
            backgroundPosition: 'center center',
            backgroundImage:
              "url('https://i.postimg.cc/8PHzzPRp/Moderna-s-Vaccine.png')",
          }}
        >
          <div className="w-full text-center">
            <div className="text-3xl text-center text-white antialiased">Get Medicine Name</div>
            <div className="text-xl text-center text-white antialiased">Find out the Medicine product around world</div>
          </div>
          <form onSubmit={handleSearch} className="mt-3 flex flex-row flex-wrap">
            <div className="text-white w-2/3">
              <input type="text" name="search" className="w-full p-2 rounded-l-lg text-black" placeholder="Name, Title.." />
            </div>
            <div className="w-1/3">
              <button
                className="w-full text-white p-2 bg-indigo-400 rounded-r-lg text-center hover:bg-indigo-300"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Product Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {product.map((product) => (
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
            <div
              style={{
                width: '100%',
                height: '200px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '10px',
                marginBottom: '15px',
              }}
            >
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
            {/* Buy Button */}
            <div style={{ marginTop: '20px' }}>
            <Button
                onClick={() => handleAddToCart(product)}
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: '#0370F7',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#F60301',
                  },
                }}
              >
                Add to cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Product;
