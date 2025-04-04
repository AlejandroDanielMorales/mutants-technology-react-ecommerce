
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserProvider";
import LogoutModal from "../../components/Modals/LogoutModal/LogoutModal"; // Asegúrate de poner la ruta correcta
import './UserSidebar.css';

export default function UserSidebar({ onClose }) {
  const { userName, isLoggedIn, handleLogout ,showLogoutModal, setShowLogoutModal,isUserSidebarOpen} = useUser();
  

  return (
    <>
      {/* Overlay que se activa cuando el sidebar está abierto */}
      {isUserSidebarOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <div className={`user-sidebar ${isUserSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {isLoggedIn ? (
            <div className="user-greeting">Hola, {userName}</div>
          ) : (
            <div className="user-greeting">Bienvenido</div>
          )}
        </div>
        
        <ul className="sidebar-menu">
          {isLoggedIn ? (
            <>
              <li className="sidebar-item">
                <NavLink 
                  to="/user/profile" 
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