import "./style.css";
const CommentInfo = ({ comment }) => {
  return (
    <section className="comment_info">
      {comment.comment && <p>{comment.comment}</p>}
      {comment.solved_file && (
        <a
          href={`${process.env.REACT_APP_API_URL}/solvedServices/${comment.solved_file}`}
          download
        >
          Have a look at this file
        </a>
      )}
      {comment.author ? <p> by {comment.author}</p> : <p>by anonymous</p>}
    </section>
  );
};

export default CommentInfo;
