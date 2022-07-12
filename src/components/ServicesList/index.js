import "./styles.css";
import List from "../List/List";
import ServiceInfo from "../ServiceInfo/ServiceInfo";

const ServicesList = ({ services }) => {
  return (
    <List
      className="services_list"
      data={services}
      render={(service) => {
        return (
          <li key={service.id}>
            <ServiceInfo service={service} />
          </li>
        );
      }}
    />
  );
};

export default ServicesList;
