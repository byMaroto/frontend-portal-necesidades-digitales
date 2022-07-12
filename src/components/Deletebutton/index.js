import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { profileEndpoint } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteButton = () => {
  const { token, setToken } = useUserTokenContext();
  const navigate = useNavigate();
  const deleteUser = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(profileEndpoint(), {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message);
      }
      toast.success(body.message);
      setToken("");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button className="delete_button" onClick={deleteUser}>
        Delete my account
      </button>
    </>
  );
};

export default DeleteButton;
