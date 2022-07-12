import "./style.css";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Navigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import DeleteButton from "../../components/Deletebutton";

const ProfilePage = ({ user, setUser }) => {
  const { token } = useUserTokenContext();

  console.log(user);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="user">
      <h2>User profile</h2>

      {user && (
        <>
          <section className="user_info">
            <h2>My info</h2>
            <Avatar avatar={user.picture} username={user.name} />
            <ProfileForm user={user} setUser={setUser} />
          </section>

          <section className="delete_user">
            <h2>Delete Your Account</h2>
            <DeleteButton />
          </section>
        </>
      )}
    </section>
  );
};

export default ProfilePage;
