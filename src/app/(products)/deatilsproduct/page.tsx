import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:5000/carts/${id}`);
          const data: Product = await res.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Manufactured Date: {new Date(product.manufacturedDate).toLocaleDateString()}</p>
      <p>Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}</p>
      <p>Manufacturer: {product.manufacturer.name} ({product.manufacturer.email})</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default ProductDetails;
