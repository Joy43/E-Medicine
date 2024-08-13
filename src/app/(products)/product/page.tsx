'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/medicine.json');
      const data: Product[] = await res.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) 
    : products;

  return (
    <div>
      <h1>All Products</h1>
      
      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{ padding: '10px', cursor: 'pointer' }}
          >
            {category}
          </button>
        ))}
        <button 
          onClick={() => setSelectedCategory(null)}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          All
        </button>
      </div>
      
      {/* Product Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '20px', width: '300px', borderRadius: '8px' }}>
            <Image 
              src={product.image} 
              alt={product.name} 
              width={300} 
              height={200} 
              style={{ objectFit: 'cover', borderRadius: '8px' }} 
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
