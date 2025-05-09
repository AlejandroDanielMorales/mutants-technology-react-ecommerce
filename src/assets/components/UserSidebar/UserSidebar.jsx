
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserProvider";
import LogoutModal from "../../components/Modals/LogoutModal/LogoutModal"; // Asegúrate de poner la ruta correcta
import './UserSidebar.css';
const API_URL = import.meta.env.VITE_API_URL;

export default function UserSidebar({ onClose }) {
  const { userName, isLoggedIn, handleLogout ,showLogoutModal, setShowLogoutModal,isUserSidebarOpen,userProfilePicture} = useUser();
  

  return (
    <>
      {isUserSidebarOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <div className={`user-sidebar ${isUserSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
            
          {isLoggedIn ? (<>
            <img className="profile-pic"
        src={`${API_URL}/uploads/users/${userProfilePicture}`}
        alt="Foto de perfil"
        onError={(e) => {
          e.target.onerror = null; // para evitar loops infinitos
          e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; // ruta de la imagen por defecto
        }}
      />
            <div className="user-greeting">Hola, {userName}</div>
            </>
          ) : (
            <div className="user-greeting">Bienvenido</div>
          )}
        </div>
        
        <ul className="sidebar-menu">
          {isLoggedIn ? (
            <>
              <li className="sidebar-item">
                <NavLink 
                  to="/profile" 
                  className="sidebar-link" 
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                  Mi perfil
                </NavLink>
              </li>
              <li className="sidebar-item">
                <button 
                  className="sidebar-link logout-btn" 
                  onClick={() => setShowLogoutModal(true)}
                >
                  <FontAwesomeIcon icon={faSignOut} className="sidebar-icon" />
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li className="sidebar-item">
              <NavLink 
                to="/login" 
                className="sidebar-link" 
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="sidebar-icon" />
                Iniciar sesión
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {showLogoutModal && (
        <LogoutModal 
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}