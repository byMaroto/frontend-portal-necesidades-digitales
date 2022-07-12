import { useUserTokenContext } from "../../contexts/UserTokenContext";
import CheckMyServicesList from "../../components/CheckMyServicesList";
import useFetch from "../../hooks/useFetch";
import { getMyServicesEndpoint } from "../../api";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

const MyServicesPage = () => {
  const navigate = useNavigate();
  const { token } = useUserTokenContext();

  const {
    data: myServices,
    loading,
    error,
  } = useFetch(getMyServicesEndpoint());

  if (!token) {
    navigate("/login");
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <CheckMyServicesList services={myServices} />;
};

export default MyServicesPage;
