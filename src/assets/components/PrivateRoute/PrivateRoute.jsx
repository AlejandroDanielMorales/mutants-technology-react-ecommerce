
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";

const PrivateRoute = ({ children}) => {
  const { userRole } = useUser();

  if (!userRole) return <div>Cargando...</div>; // O un spinner
  if (userRole !== "admin") return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
