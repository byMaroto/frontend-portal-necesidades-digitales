import { getAllServicesEndpoint } from "../../api";
import ServicesList from "../../components/ServicesList";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";

const ServicesPage = () => {
  const allServicesEndpoint = getAllServicesEndpoint();

  const { data: services, loading, error } = useFetch(allServicesEndpoint);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <section className="services">
      <h2>Services</h2>

      {services && <ServicesList services={services} />}
    </section>
  );
};

export default ServicesPage;
