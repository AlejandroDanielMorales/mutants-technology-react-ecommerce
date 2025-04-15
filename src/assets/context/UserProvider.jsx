import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
<<<<<<< Updated upstream
  const [userProfilePicture, setUserProfilePicture] = useState("");
=======
  const [token, setToken] = useState("");
>>>>>>> Stashed changes
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserProfilePicture = localStorage.getItem("userProfilePicture");
    if (storedUserName && storedUserRole) {
      setUserName(storedUserName);
      setUserRole(storedUserRole);
      setUserProfilePicture(storedUserProfilePicture);
    }
  }, []);

  // Añade esta línea para determinar si el usuario está logueado
  const isLoggedIn = !!userName;

  const handleLoginSuccess = (name, role) => {
    setUserName(name);
    setUserRole(role);
    setUserProfilePicture(localStorage.getItem("userProfilePicture"));
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setUserName("");
    setUserRole("");
    setUserProfilePicture("");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfilePicture");
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
<<<<<<< Updated upstream
    localStorage.setItem("userProfilePicture", user.profilePicture);


=======
    setToken(token);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      userProfilePicture,
=======
>>>>>>> Stashed changes
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;