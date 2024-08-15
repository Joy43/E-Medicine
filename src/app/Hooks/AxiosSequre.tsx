import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const router = useRouter();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = localStorage.getItem("access-token");

      if (config.headers) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        config.headers = { authorization: `Bearer ${token}` };
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        await logOut();
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
