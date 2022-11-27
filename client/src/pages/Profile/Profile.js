import { useParams } from "react-router-dom";
import { UserCard } from "../../components/UserCard/UserCard";
import "./Profile.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostCardPreview } from "../../components/PostCardPreview/PostCardPreview";
import { getRandomColor } from "../Home/Home";

export const Profile = () => {
  let { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    createdAt: "",
  });
  const [userPosts, setUserPosts] = useState([]);

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
      <div className="profile-page-container">
        <div className="profile-user-info-section">
          <UserCard username={user.username} createdAt={user.createdAt} />
        </div>
        <div className="profile-user-posts-section">
          <h2>
            <span id="diff">{user.username}</span>'s Posts
          </h2>
          <div className="profile-user-posts-container">
            {userPosts.map((post) => {
              return (
                <PostCardPreview
                postNum={userPosts.indexOf(post) + 1}
                title={post.title}
                desc={post.postText.slice(0, 60) + "..."}
                username={post.username}
                id={post.id}
                key={post.id}
                like={false}
                color={getRandomColor()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
