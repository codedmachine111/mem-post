import "./CreatePost.scss";
import { CreatePostForm } from "../../components/CreatePostForm/CreatePostForm";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const CreatePost = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }
  })

  return (
    <>
      <Navbar />
      <div className="create-post-container">
        <h2>Create a new post</h2>
        <div className="create-post-form-container">
          <CreatePostForm />
        </div>
      </div>
    </>
  );
};
