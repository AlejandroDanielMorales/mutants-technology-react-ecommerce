import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; // Asegúrate de que esta variable esté definida en tu archivo .env

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const [userProfilePicture, setUserProfilePicture] = useState("");

  const [token, setToken] = useState("");



  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    if (storedToken) {
      axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      .then(response => {
        const user = response.data;
        setUserName(user.name);
        setUserRole(user.role);
        setUserProfilePicture(user.profilePicture);
        setToken(storedToken);
      })
      .catch(error => {
        console.error("Error al recuperar datos del usuario:", error);
        handleLogout(); // Si hay error, cerrar sesión
      });
    }
  }, []);
  

  // Añade esta línea para determinar si el usuario está logueado
  const isLoggedIn = !!userName;

  const handleLoginSuccess = (name, role) => {
    setUserName(name);
    setUserRole(role);
    setUserProfilePicture(localStorage.getItem("userProfilePicture"));
    setToken(localStorage.getItem("token"));
  };

  const handleLogout = () => {
    setUserName("");
    setUserRole("");
    setUserProfilePicture("");
    setToken("");
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    setIsUserSidebarOpen(false);
  };
// Dentro de UserProvider

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    const { user, token } = response.data;

    // Guardar token y datos del usuario
    localStorage.setItem("token", token);
    

    setToken(token);

    setToken(token);

    setUserName(user.name);
    setUserRole(user.role);
    setUserProfilePicture(user.profilePicture);

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
      token, 
      isLoggedIn, 
      handleLoginSuccess, 
      handleLogout,
      showLogoutModal,
      setShowLogoutModal,
      isUserSidebarOpen, 
      setIsUserSidebarOpen,
      login,
      userProfilePicture,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;