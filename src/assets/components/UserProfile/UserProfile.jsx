import { useUser } from "../../context/UserProvider";
import "./UserProfile.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserProfile() {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return (
      <div className="user-profile-container">
        <p>Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="user-card">
        <img
          src={`${API_URL}/uploads/users/${user.profilePicture}`}
          alt="Foto de perfil"
          className="user-profile-pic"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
          }}
        />
        <div className="user-info">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
        </div>
      </div>
    </div>
  );
}
