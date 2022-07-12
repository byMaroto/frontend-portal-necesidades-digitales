import { useParams, Navigate } from "react-router-dom";
import { getServiceInfoEndpoint } from "../../api";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import ErrorMessage from "../../components/ErrorMessage";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Spinner";
import ServiceWithComments from "../../components/ServiceComments/Index";
import SubmitCommentForm from "../../components/SubmitCommentForm";

const ServicePage = () => {
  const { token } = useUserTokenContext();

  const { serviceId } = useParams();

  const serviceCommentsEndpoint = getServiceInfoEndpoint(serviceId);

  const {
    data: serviceComments,
    setData: setServiceComments,
    loading,
    error,
  } = useFetch(serviceCommentsEndpoint);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {" "}
      <section>
        <ServiceWithComments serviceComments={serviceComments} />
      </section>
      <SubmitCommentForm
        serviceId={serviceId}
        serviceComments={serviceComments}
        setServiceComments={setServiceComments}
      />
    </>
  );
};

export default ServicePage;
