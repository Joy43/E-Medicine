import { useContext } from "react";
import { AuthContext } from "../Authentication/Proividers/AuthProviders";


const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;
