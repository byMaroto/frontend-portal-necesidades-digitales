import List from "../List/List";
import CommentInfo from "../CommentInfo";

const CommentsList = ({ comments }) => {
  return (
    <>
      <h3>Comments and solutions: </h3>
      <List
        className="comments_list"
        data={comments}
        render={(comment, index) => {
          return (
            <li key={index}>
              <CommentInfo comment={comment} />
            </li>
          );
        }}
      />
    </>
  );
};

export default CommentsList;
