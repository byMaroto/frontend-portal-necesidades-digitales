import "./style.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { loginEndpoint } from "../../api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useUserTokenContext();
  const navigate = useNavigate();

  //cuando se entrega el formulario loguea al usuario
  const loginUser = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(loginEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message);
      }

      setToken(body.data.token);

      setError("");
      setEmail("");
      setPassword("");
      toast.success(body.message);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button>Login</button>
      </form>

      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default LoginForm;
