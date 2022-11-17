import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostCardPreview } from "../../components/PostCardPreview/PostCardPreview";

export const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="home-container">
      <div className="posts-container">
      {listOfPosts.map((post) => {
        return (
          <PostCardPreview
            title={post.title}
            desc={post.postText}
            username={post.username}
            id={post.id}
          />
        );
      })}
      </div>
    </div>
  );
};
