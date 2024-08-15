import { useQuery } from "@tanstack/react-query";
import useaxiosSequre from "./AxiosSequre";
import useAuth from "./useAuth";

type CartItem = {
  // Define the structure of your cart items here based on the data you receive
  id: string;
  name: string;
  price: number;
  quantity: number;
  // Add other properties as needed
};

const useCart = (): [CartItem[], () => void] => {
  const axiosSecure = useaxiosSequre();
  const { user } = useAuth();

  const { refetch, data: cart = [] } = useQuery<CartItem[]>({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, 
  });

  return [cart, refetch];
};

export default useCart;
