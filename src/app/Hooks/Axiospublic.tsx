import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://e-medicine-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;