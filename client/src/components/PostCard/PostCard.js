import "./PostCard.scss";
import { Button } from "../Button/Button";
import { useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export const PostCard = ({ post }) => {
  const { title, postText, username, createdAt, id } = post;
  const date = createdAt ? new Date(createdAt).toDateString() : null;
  const {authUser} = useContext(UserContext);

  const navigate = useNavigate();

  const onDeleteHandler =()=>{
    axios.delete(`http://localhost:3001/posts/${id}`, {
      headers :{
        accessToken: localStorage.getItem("token")
      }
    }).then((res)=>{
      if(res.data.message==="Post deleted!"){
        alert(res.data.message);
        navigate("/");
      }else{
        alert(res.data.message);
      }
    })
  }
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
        {authUser.username === username ? (
          <Button title="delete" id="delete-post" onClick={()=>onDeleteHandler()}/>
        ):(<></>)}
      </div>
    </>
  );
};
