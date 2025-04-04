import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut, faCartShopping, faBars} from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserProvider";
import UserSidebar from "../UserSidebar/UserSidebar";

export default function Header() {
  const { userName, userRole,isUserSidebarOpen, setIsUserSidebarOpen } = useUser();
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
        {userName && <span className="user-name">{userName}</span>}

        <div className="cart-container" onClick={toggleCart}>
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>

        <div className="user-icon" onClick={toggleUserSidebar}>
          <FontAwesomeIcon icon={faUserAstronaut} size="2x" />
        </div>

        <UserSidebar 
          onClose={closeUserSidebar}
        />
      </div>
    </header>
  );
}