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

  const getRandomColor = () => {
    const colors = [
      "#FFCC80",
      "#FEAB91",
      "#E8ED9B",
      "#D094DA",
      "#82DEEB",
      "#F48EB1",
      "#19CB8F",
      "#B423D5",
      "#925C42",
      "#876F6A",
      "#AA595D",
      "#3F2549",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  return (
    <div className="home-container">
      <div className="posts-section">
        <h2 className="posts-section-title">Posts</h2>
        <div className="posts-container">
          {listOfPosts.map((post) => {
            return (
              <PostCardPreview
                title={post.title}
                desc={post.postText.slice(0, 60) + "..."}
                username={post.username}
                id={post.id}
                key={post.id}
                color={getRandomColor()}
              />
            );
          })}
        </div>
      </div>

      <div className="side-article"></div>
    </div>
  );
};
