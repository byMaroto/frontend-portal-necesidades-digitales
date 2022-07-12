import "./style.css";
import CommentsList from "../CommentsList";

const ServiceWithComments = ({ serviceComments }) => {
  const [service, comments] = serviceComments;
  console.log(serviceComments);
  console.log(service);
  console.log(comments);
  return (
    <article>
      <section>
        {service.serviceAuthor ? (
          <h2>
            {service.title} ({service.serviceAuthor})
          </h2>
        ) : (
          <h2> {service.title} (Anonymous author)</h2>
        )}

        <p>{service.description}</p>
        <a
          href={`${process.env.REACT_APP_API_URL}/requiredServices/${service.service_file}`}
          download
        >
          Original file
        </a>
        {service.status === 1 && (
          <p className="resolved_notification">
            This service has been resolved!
          </p>
        )}
      </section>
      {comments.length > 0 && (
        <section className="comments">
          <CommentsList comments={comments} />
        </section>
      )}
    </article>
  );
};

export default ServiceWithComments;
