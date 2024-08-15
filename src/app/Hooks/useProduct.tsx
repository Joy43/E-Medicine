'use client'

import { useState, useEffect } from "react";

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

const useProduct = (search: string): [Product[], boolean] => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://e-medicine-server.vercel.app/product?search=${search}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [search]);

  return [products, loading];
};

export default useProduct;
