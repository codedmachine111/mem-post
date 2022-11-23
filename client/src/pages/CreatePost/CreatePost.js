import "./CreatePost.scss";
import { CreatePostForm } from "../../components/CreatePostForm/CreatePostForm";

export const CreatePost = () => {
  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      <div className="create-post-form-container">
        <CreatePostForm />
      </div>
    </div>
  );
};
