
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import Spinner from "../../components/Spinner/Spinner"

const PrivateRoute = ({ children}) => {
  const { userRole } = useUser();

  if (!userRole) return <Spinner/> 
  if (userRole !== "admin") return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
