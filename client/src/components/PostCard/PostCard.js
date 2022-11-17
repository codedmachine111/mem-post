import "./PostCard.scss";

export const PostCard = ({ post }) => {
  const { title, postText, username, createdAt } = post;
  const date = createdAt ? new Date(createdAt).toDateString() : null;

  return (
    <>
      <div className="post-card-container">
        <div className="post-card-title">
          <h1>{title}</h1>
        </div>
        <div className="post-card-body">
          <p>{postText}</p>
        </div>
        <div className="post-card-footer">
          <p className="post-card-author">{username}-({date})</p>
        </div>
      </div>
    </>
  );
};
