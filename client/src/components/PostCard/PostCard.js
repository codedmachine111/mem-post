import "./PostCard.scss";
import { Button } from "../Button/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {WhatsappIcon, WhatsappShareButton, TwitterShareButton, TwitterIcon} from "react-share";

export const PostCard = ({ post }) => {
  const { title, postText, username, createdAt, id } = post;
  const date = createdAt ? new Date(createdAt).toDateString() : null;
  const {authUser} = useContext(UserContext);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:3001/posts/image/${id}`,{responseType: 'blob'}).then((res)=>{
      setImage(res.data);
    })
  },[id])

  const onDeleteHandler =()=>{
    axios.delete(`http://localhost:3001/posts/${id}`, {
      headers :{
        accessToken: localStorage.getItem("token")
      }
    }).then((res)=>{
      if(res.data.message==="Post deleted!"){
        alert(res.data.message);
        navigate("/posts");
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
        <div className="post-card-image">
          <img src={image ? URL.createObjectURL(image) : null} alt="post" id="post-card-image-img" />
        </div>
        <div className="post-card-body">
          <p>{postText}</p>
        </div>
        <div className="post-card-footer">
          <p className="post-card-author">{username}-({date})</p>
        </div>
        <div className='post-share-buttons'>
                    <WhatsappShareButton url={`https://localhost:3000/post/${id}`} title={`Hey there! Check out my post on Stories. A web-app where you share a picture with a memory.`} id="share-btn">
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                    <TwitterShareButton url={`https://localhost:3000/post/${id}`} title={`Hey there! Check out my post on Stories. A web-app where you share a picture with a memory.`}>
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                </div>
        {authUser.username === username ? (
          <Button title="delete" id="delete-post" onClick={()=>onDeleteHandler()}/>
        ):(<></>)}
      </div>
    </>
  );
};
