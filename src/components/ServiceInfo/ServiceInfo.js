import "./style.css";
import { Link } from "react-router-dom";
import { useUserTokenContext } from "../../contexts/UserTokenContext";

const ServiceInfo = ({ service }) => {
  const { token } = useUserTokenContext();
  return (
    <article className="service_info">
      <h3>
        <Link to={"/service/" + service.id}>
          {service.title} ({service.serviceAuthor})
        </Link>
      </h3>
      <p>{service.description}</p>
      {!token &&
        (service.status === 0 ? (
          <>
            <p>{service.serviceAuthor} hasn't found a solution yet,</p>
            <Link to="/users"> Help {service.serviceAuthor}!</Link>
          </>
        ) : (
          <p>This service has been succesfully resolved ✍️</p>
        ))}
    </article>
  );
};

export default ServiceInfo;
