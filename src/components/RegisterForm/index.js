import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { profileEndpoint } from "../../api";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const filesRef = useRef();
  const navigate = useNavigate();

  const registerUser = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      const image = filesRef.current.files[0];

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (bio) formData.append("bio", bio);
      if (image) {
        formData.append("picture", image);
      }
      console.log(formData);
      console.log(formData.name);
      const res = await fetch(profileEndpoint(), {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message);
      }
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setBio("");
      toast.success(body.message);
      navigate("/checkEmail");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={registerUser}>
        <label htmlFor="name">Name*:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="email">Email*:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password*:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          rows="5"
          cols="60"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        >
          Enter your bio...
        </textarea>
        &nbsp;
        <label htmlFor="picture">Picture:</label>
        <input id="picture" type="file" ref={filesRef} />
        <Button className="red_button">Register</Button>
      </form>

      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default RegisterForm;
