import "./Home.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PostCardPreview } from "../../components/PostCardPreview/PostCardPreview";
import { PostContext, LikedContext } from "../../App";

export const Home = () => {
  const {listOfPosts, setListOfPosts} = useContext(PostContext);
  const {likedPosts, setLikedPosts} = useContext(LikedContext);

  useEffect(() => {
    axios.get("http://localhost:3001/posts", {headers: {accessToken: localStorage.getItem("token")}}).then((response) => {
      setListOfPosts(response.data.listOfPosts);
    });
  }, []);

  useEffect(()=>{
    axios.get("http://localhost:3001/posts", {headers: {accessToken: localStorage.getItem("token")}}).then((response) => {
      setLikedPosts(response.data.likedPosts.map((likedPost) => {
        return likedPost.PostId;
      }));
    });
  },[]);

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
      "#3F2549 ",
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
                postNum={listOfPosts.indexOf(post) + 1}
                title={post.title}
                desc={post.postText.slice(0, 60) + "..."}
                username={post.username}
                id={post.id}
                likes={post.Likes.length}
                key={post.id}
                className={likedPosts.includes(post.id) ? "unlikeBtn" : "likeBtn"}
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
