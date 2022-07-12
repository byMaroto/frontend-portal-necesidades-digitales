import { useState, useRef } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";
import { registerNewServiceEndpoint } from "../../api";

const RegisterNewServiceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const filesRef = useRef();
  const { token } = useUserTokenContext();
  const navigate = useNavigate();

  const registerNewService = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      const image = filesRef.current.files[0];

      formData.append("file", image);

      formData.append("title", title);
      formData.append("description", description);

      const res = await fetch(registerNewServiceEndpoint(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message);
      }

      const {
        data: { id },
      } = body;

      toast.success(body.message);
      navigate(`/service/${id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <form onSubmit={registerNewService}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label htmlFor="file"> Images</label>
        <input type="file" id="file" ref={filesRef} />

        <Button className="red_button"> Send service </Button>
      </form>

      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default RegisterNewServiceForm;
