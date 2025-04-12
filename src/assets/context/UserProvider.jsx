import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

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
    setShowLogoutModal(false);
    setIsUserSidebarOpen(false);
  };
// Dentro de UserProvider

const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    });

    const { user, token } = response.data;

    // Guardar token y datos del usuario
    localStorage.setItem("token", token);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userRole", user.role);

    setUserName(user.name);
    setUserRole(user.role);

    return { success: true };
  } catch (error) {
    if (error.response && error.response.data?.error) {
      return { success: false, error: error.response.data.error };
    } else {
      console.error("Error al iniciar sesión:", error);
      return { success: false, error: "Error al conectar con el servidor" };
    }
  }
};

  return (
    <UserContext.Provider value={{ 
      userName, 
      userRole, 
      isLoggedIn, 
      handleLoginSuccess, 
      handleLogout,
      showLogoutModal,
      setShowLogoutModal,
      isUserSidebarOpen, 
      setIsUserSidebarOpen,
      login, // Añade la función login aquí
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;