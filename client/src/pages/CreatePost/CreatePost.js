import "./CreatePost.scss";
import { CreatePostForm } from "../../components/CreatePostForm/CreatePostForm";

export const CreatePost = () => {
  return (
    <div className="create-post-container">
      <div className="create-post-title">
        <h1>Create Post</h1>
      </div>
      <div className="create-post-form-container">
        <CreatePostForm />
      </div>
    </div>
  );
};
