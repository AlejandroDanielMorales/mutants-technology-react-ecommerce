import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserName && storedUserRole) {
      setUserName(storedUserName);
      setUserRole(storedUserRole);
    }
  }, []);

  // Añade esta línea para determinar si el usuario está logueado
  const isLoggedIn = !!userName;

  const handleLoginSuccess = (name, role) => {
    setUserName(name);
    setUserRole(role);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setUserName("");
    setUserRole("");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
  };

  return (
    <UserContext.Provider value={{ 
      userName, 
      userRole, 
      isLoggedIn, // Añade esta propiedad
      handleLoginSuccess, 
      handleLogout 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;