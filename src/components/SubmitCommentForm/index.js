import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { submitCommentsEndpoint } from "../../api";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

const SubmitCommentForm = ({
  serviceId,
  serviceComments,
  setServiceComments,
}) => {
  const { token } = useUserTokenContext();
  // const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const filesRef = useRef();
  const serviceToComId = serviceId;
  const [service, comments] = serviceComments;
  console.log(serviceComments);

  const submitComment = async (e) => {
    try {
      e.preventDefault();
      const toCommentEndpoint = submitCommentsEndpoint(serviceToComId);

      const solvedFile = filesRef.current.files[0];
      const formData = new FormData();

      if (comment) {
        formData.append("comment", comment);
      }
      formData.append("solvedFile", solvedFile);

      const commentRes = await fetch(toCommentEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const commentResBody = await commentRes.json();

      if (!commentRes.ok) {
        throw new Error(commentResBody.message);
      }
      setComment("");
      toast.success(commentResBody.message);
      console.log(commentResBody.data);
      setServiceComments([{ ...service }, [...comments, commentResBody.data]]);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <form onSubmit={submitComment}>
        <label htmlFor="comment">Introduce your comment here: </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <label htmlFor="file">Upload your file here: </label>
        <input id="file" type="file" ref={filesRef}></input>

        <Button className="red_button">Submit</Button>
      </form>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default SubmitCommentForm;
