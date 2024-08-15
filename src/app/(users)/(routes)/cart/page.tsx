"use client";

import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import useCart from "@/app/Hooks/usecart";
import useAxiosSecure from "@/app/Hooks/AxiosSequre";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type CartItem = {
  _id: string;
  image: string;
  name: string;
  price: number;
};

const Cart: React.FC = () => {
  const [cart, refetch] = useCart();
  const [loading, setLoading] = useState(false);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6b6b",
      cancelButtonColor: "#343a40",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Item deleted successfully!");
          } else {
            toast.error("Failed to delete item.");
          }
        }).catch(() => {
          toast.error("An error occurred while deleting the item.");
        }).finally(() => setLoading(false));
      }
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8">
        <h2 className="text-2xl md:text-4xl text-white font-bold mb-4 md:mb-0">Products: {cart.length}</h2>
        <motion.h2 
          className="text-2xl md:text-4xl text-green-400 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Total: ${totalPrice.toFixed(2)}
        </motion.h2>
        {cart.length ? (
          <motion.div 
            className="relative mt-4 md:mt-0"
            animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } }}
          >
            <Link href="/payment" passHref>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg transform transition hover:scale-105"
              >
                Pay Now
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <button disabled className="px-4 py-2 md:px-6 md:py-3 bg-gray-500 text-gray-300 rounded-lg shadow-lg">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table-auto w-full bg-gray-800 text-white rounded-lg">
          <thead className="bg-gradient-to-r from-gray-700 to-gray-900">
            <tr className="text-sm md:text-lg">
              <th className="p-2 md:p-4">#</th>
              <th className="p-2 md:p-4">Image</th>
              <th className="p-2 md:p-4">Name</th>
              <th className="p-2 md:p-4">Price</th>
              <th className="p-2 md:p-4">Delete</th>
            </tr>
          </thead>
          <AnimatePresence>
            <motion.tbody 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } }
              }}
            >
              {cart.map((item, index) => (
                <motion.tr 
                  key={item._id} 
                  className="bg-gray-700 hover:bg-gray-600 transition"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="p-2 md:p-4">{index + 1}</td>
                  <td className="p-2 md:p-4">
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 mask mask-squircle hover:scale-110 transition-transform">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 md:p-4">{item.name}</td>
                  <td className="p-2 md:p-4">${item.price.toFixed(2)}</td>
                  <td className="p-2 md:p-4">
                    <motion.button
                      onClick={() => handleDelete(item._id)}
                      whileTap={{ rotate: -10 }}
                      className={`text-red-500 hover:text-red-700 transition ${loading ? "animate-pulse" : ""}`}
                    >
                      <FaTrashAlt />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
};

export default Cart;
