import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate desde react-router-dom


const API_URL = import.meta.env.VITE_API_URL; // Asegúrate de que esta variable esté definida en tu archivo .env

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [userName, setUserName] = useState("");

  const [user,setUser] = useState({});

  const [userRole, setUserRole] = useState("");

  const [userProfilePicture, setUserProfilePicture] = useState("");

  const [token, setToken] = useState("");



  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  const navigate = useNavigate(); // Asegúrate de importar useNavigate desde react-router-dom

  useEffect(() => {
    fechCurrentUser();
    console.log(userName)
    console.log(userRole)
  }, []);
  
  const fechCurrentUser = async () => {

    const storedToken = localStorage.getItem("token");
  
    if (storedToken) {
      axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      .then(response => {
        const user = response.data;
        setUser(user);
        console.log(user)
        setUserName(user.name);
        setUserRole(user.rol);
        setUserProfilePicture(user.profilePicture);
        setToken(storedToken);
      })
      .catch(error => {
        console.error("Error al recuperar datos del usuario:", error);
        handleLogout(); // Si hay error, cerrar sesión
      });
    }


  }
  // Añade esta línea para determinar si el usuario está logueado
  const isLoggedIn = !!userName;


  const handleLogout = () => {
    setUserName("");
    setUserRole("");
    setUserProfilePicture("");
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    setIsUserSidebarOpen(false);
    navigate("/"); // Redirigir a la página de inicio o a donde desees
    
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
    setUserRole(user.rol);
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
      handleLogout,
      showLogoutModal,
      setShowLogoutModal,
      isUserSidebarOpen, 
      setIsUserSidebarOpen,
      login,
      userProfilePicture,
      fechCurrentUser,
      user
    }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;