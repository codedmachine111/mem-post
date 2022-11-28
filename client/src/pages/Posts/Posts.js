import "./Posts.scss";
import axios from "axios";
import { useContext, useEffect } from "react";
import { PostCardPreview } from "../../components/PostCardPreview/PostCardPreview";
import { PostContext, LikedContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

export const getRandomColor = () => {
  const colors = [
    "#FFCC80",
    "#FEAB91",
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

export const Posts = () => {
  const { listOfPosts, setListOfPosts } = useContext(PostContext);
  const { likedPosts, setLikedPosts } = useContext(LikedContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("token") },
      })
      .then((response) => {
        if (!localStorage.getItem("token")) {
          navigate("/");
        } else {
          setListOfPosts(response.data.listOfPosts.reverse());
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("token") },
      })
      .then((response) => {
        if (!localStorage.getItem("token")) {
          navigate("/");
        } else {
          setLikedPosts(
            response.data.likedPosts.map((likedPost) => {
              return likedPost.PostId;
            })
          );
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="posts-section">
          <h2 className="posts-section-title">New stories</h2>
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
                  like={true}
                  className={
                    likedPosts.includes(post.id) ? "unlikeBtn" : "likeBtn"
                  }
                  color={getRandomColor()}
                />
              );
            })}
          </div>
        </div>

        <div className="side-article"></div>
      </div>
    </>
  );
};
