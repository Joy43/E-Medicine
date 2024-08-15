import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./AxiosSequre";


interface UseAdminReturn {
  isAdmin: boolean | undefined;
  isAdminLoading: boolean;
}

const useAdmin = (): UseAdminReturn => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user && !loading, 
    queryFn: async () => {
      if (user?.email) {
        console.log("asking or checking is admin", user);
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.admin;
      }
      return undefined;
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useAdmin;
