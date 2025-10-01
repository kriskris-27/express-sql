import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
    children: React.ReactNode;
}

const Protectedroute = ({children}:Props) => {
    const {isAuthenticated} = useAuth()
    return isAuthenticated ? children :<Navigate to="/welcome" replace/>;      
}

export default Protectedroute
