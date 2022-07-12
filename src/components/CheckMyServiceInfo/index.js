import { Link } from "react-router-dom";
import { setStatusEndpoint } from "../../api";
import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import ErrorMessage from "../ErrorMessage";
import { toast } from "react-toastify";

const CheckMyServiceInfo = ({ service }) => {
  const [status, setStatus] = useState(service.status);
  const statusEndpoint = setStatusEndpoint(service.id);
  const { token } = useUserTokenContext();
  const [error, setError] = useState("");
  const setStatusResolved = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(statusEndpoint, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message);
      }
      setStatus(1);
      toast.success(body.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="service_info">
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <Link to={"/service/" + service.id}>
        Click here to see all the comments and solved files
      </Link>

      {status === 0 ? (
        <>
          <p>Mark this service as resolved?</p>
          <button onClick={setStatusResolved} type="check-box">
            YES
          </button>
        </>
      ) : (
        <p>This service has been succesfully resolved ✍️</p>
      )}
      {error && <ErrorMessage error={error} />}
    </article>
  );
};

export default CheckMyServiceInfo;
