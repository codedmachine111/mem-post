import { Button } from "../Button/Button";
import "./CommentCard.scss";
import { UserContext } from "../../App";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CommentCard = (props) => {
  const { authUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onDeleteHandler = ()=>{
    axios.delete(`http://localhost:3001/comments/${props.id}`,{
        headers:{
            accessToken: localStorage.getItem("token")
        }
    }).then((res)=>{
      alert(res.data.message);
      navigate("/posts");
    });
  }

  const date = new Date(props.createdAt).toDateString();
  return (
    <>
      <div className="comment-container">
        <div className="comment-content">
          <div className="comment-user-info">
            <h2 id="comment-user-name">{props.username}</h2>
          </div>
          <div className="comment-content">{props.commentText}</div>
          <div className="comment-date">{date}</div>
        </div>
        {authUser.username === props.username ? (
          <div className="comment-delete-btn">
            <Button title="X" id="comment-delete-btn" onClick={onDeleteHandler}/>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
