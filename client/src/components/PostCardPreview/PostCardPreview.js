import "./PostCardPreview.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { PostContext, LikedContext } from "../../App";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';

export const PostCardPreview = (props) => {
  const navigate = useNavigate();
  const { listOfPosts, setListOfPosts } = useContext(PostContext);
  const { likedPosts, setLikedPosts } = useContext(LikedContext);

  const onLikeHandler = () => {
    axios
      .post(
        "http://localhost:3001/likes",
        {
          postId: props.id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === props.id) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if(likedPosts.includes(props.id)){
            setLikedPosts(likedPosts.filter((id) => {
                return id !== props.id;
            }));
        } else{
            setLikedPosts([...likedPosts, props.id]);
        }
      });
  };

  return (
    <div
      className="post-card-preview-container"
      style={{ background: props.color }}
    >
      <h2
        className="post-card-preview-title"
        onClick={() => navigate(`/post/${props.id}`)}
      >
        {props.postNum}. {props.title}
      </h2>
      <p className="post-card-preview-desc">{props.desc}</p>
      <div className="post-card-preview-footer">
        <p>{props.username}</p>
        {props.className === "likeBtn" ? (
          <FavoriteBorderIcon onClick={onLikeHandler} id="heart-icon"/>
        ):(
          <FavoriteIcon onClick={onLikeHandler} id="heart-icon-red"/>
        )}
        <p>{props.likes}</p>
      </div>
    </div>
  );
};
