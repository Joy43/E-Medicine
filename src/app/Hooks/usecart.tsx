
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useaxiosSequre from "./AxiosSequre";
import useAuth from "./useAuth";

interface CartItem {
  // Define the shape of the cart item based on your data structure
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const useCart = (): [CartItem[], () => void] => {
  const axiosSecure = useaxiosSequre();
  const { user } = useAuth();

  const { refetch, data = [] } = useQuery<CartItem[]>({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  return [data, refetch];
};

export default useCart;
