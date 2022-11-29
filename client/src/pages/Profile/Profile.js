import { Link, useParams } from "react-router-dom";
import { UserCard } from "../../components/UserCard/UserCard";
import "./Profile.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostCardPreview } from "../../components/PostCardPreview/PostCardPreview";
import { getRandomColor } from "../Posts/Posts";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  let { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    createdAt: "",
  });
  const [userPosts, setUserPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }
  })

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/info/${id}`).then((response) => {
      setUser(response.data.user);
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((res) => {
      setUserPosts(res.data.listOfPosts);
    });
  }, []);

  return (
    <>
    <Navbar />
      <div className="profile-page-container">
        <div className="profile-user-info-section">
          <UserCard username={user.username} createdAt={user.createdAt} userId={id}/>
        </div>
        <div className="profile-user-posts-section">
          <h2>
            <span id="diff">{user.username}</span>'s Posts
          </h2>
          <div className="profile-user-posts-container">
            {userPosts.length > 0 ? (
              userPosts.map((post) => {
                return (
                  <PostCardPreview
                  postNum={userPosts.indexOf(post) + 1}
                  title={post.title.length > 15 ? post.title.slice(0, 15) + "..." : post.title}
                  desc={post.postText.slice(0, 60) + "..."}
                  username={post.username}
                  id={post.id}
                  key={post.id}
                  like={false}
                  color={getRandomColor()}
                  />
                );
              })
            ):(
              <div className="no-posts">
                <h2>No posts yet</h2>
                <Link to="/create">Create one!</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
