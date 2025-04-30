import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut, faCartShopping, faBars} from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserProvider";
import UserSidebar from "../UserSidebar/UserSidebar";
const API_URL = import.meta.env.VITE_API_URL; 

export default function Header() {
  const { userName, userRole,isUserSidebarOpen, setIsUserSidebarOpen,userProfilePicture } = useUser();
  const { toggleCart, cartItems } = useOrder();
  

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen);
  };

  const closeUserSidebar = () => {
    setIsUserSidebarOpen(false);
  };

  return (
    <header className="main-header">
      <input className="chkburger" type="checkbox" id="burger-menu" />
      <label className="nav-button" htmlFor="burger-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      
      <Navbar userRole={userRole} />

      <div className="user-info">


        <div className="cart-container" onClick={toggleCart}>
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>

        <div className="user-icon" onClick={toggleUserSidebar}>
        {userName ? (
        <img className="profile-pic"
        src={`${API_URL}/uploads/users/${userProfilePicture}`}
        alt="Foto de perfil"
        onError={(e) => {
          e.target.onerror = null; // para evitar loops infinitos
          e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; // ruta de la imagen por defecto
        }}
      />
      
      ) : (
        <FontAwesomeIcon icon={faUserAstronaut} size="2x" />
      )}

        </div>


        <UserSidebar 
          onClose={closeUserSidebar}
        />
      </div>
    </header>
  );
}