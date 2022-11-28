import "./PostPage.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostCard } from "../../components/PostCard/PostCard";
import { CommentCard } from "../../components/CommentCard/CommentCard";
import { CreateCommentCard } from "../../components/CreateCommentCard/CreateCommentCard";
import { Navbar } from "../../components/Navbar/Navbar";

export const PostPage = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((res) => {
      setPostObject(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
      setComments(res.data.reverse());
    });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="post-page-container">
        <div className="post-display-container">
          <PostCard post={postObject} key={postObject.id} />
        </div>
        <div className="post-comments-section">
          <h2>Add a comment</h2>

          <div className="post-create-comment-section">
            <CreateCommentCard postId={id} key={postObject.id} />
          </div>
          <div className="post-comments-container">
            <h2>Comments ({comments.length})</h2>
            <div className="post-comments-holder">
              {comments.length === 0 ? (
                <p id="no-comments">No comments yet</p>
              ) : (
                comments.map((comment) => {
                  return (
                    <CommentCard
                      commentText={comment.commentText}
                      createdAt={comment.createdAt}
                      username={comment.username}
                      id={comment.id}
                      key={comment.id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
