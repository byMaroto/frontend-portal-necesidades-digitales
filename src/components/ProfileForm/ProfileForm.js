import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { profileEndpoint } from "../../api";
import { useUserTokenContext } from "../../contexts/UserTokenContext";

const ProfileForm = ({ user, setUser }) => {
  const { token } = useUserTokenContext();
  console.log(user);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("*******");
  const [newBio, setNewBio] = useState(user.bio);
  const filesRef = useRef();

  const updateProfile = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      const profPicture = filesRef.current.files[0];

      if (newName !== user.name) {
        user.name = newName;
        formData.append("name", newName);
      }
      if (newEmail !== user.email) {
        user.email = newEmail;
        formData.append("email", newEmail);
      }
      if (newPassword !== "*******") {
        user.password = "*******";
        formData.append("password", newPassword);
      }
      if (newBio !== user.bio) {
        user.bio = newBio;
        formData.append("bio", newBio);
      }
      if (profPicture) {
        formData.append("picture", profPicture);
      }

      const res = await fetch(profileEndpoint(), {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const body = await res.json();
      console.log(body.data);
      if (!res.ok) {
        throw new Error(body.message);
      }
      setUser(body.data);
      toast.success(body.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form className="profile_form" onSubmit={updateProfile}>
      <label htmlFor="name">Current name: </label>
      <input
        id="name"
        type="text"
        value={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />

      <label htmlFor="email">email: </label>
      <input
        id="email"
        type="email"
        value={newEmail}
        onChange={(e) => {
          setNewEmail(e.target.value);
        }}
      />

      <label htmlFor="password">Password: </label>
      <input
        id="password"
        type="password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />

      <label htmlFor="bio">Bio: </label>
      <textarea
        className="textarea"
        rows="20"
        cols="10"
        id="bio"
        type="textarea"
        value={newBio}
        onChange={(e) => {
          setNewBio(e.target.value);
        }}
      />

      <label htmlFor="picture">Update your picture:</label>
      <input id="picture" type="file" ref={filesRef} />

      <button type="submit">Update</button>
    </form>
  );
};

export default ProfileForm;
