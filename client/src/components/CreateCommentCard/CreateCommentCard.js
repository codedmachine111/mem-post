import "./CreateCommentCard.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../components/Button/Button";
export const CreateCommentCard = (props) => {
  const resetFormFields = () => {
    document.getElementsByClassName("create-comment-form")[0].reset();
  };

  const initialValues = {
    commentText: "",
  };
  const onCommentSubmitHandler = async (values) => {
    const commentObject = {
      commentText: values.commentText,
      postId: props.postId,
    };
    
    axios.post(`http://localhost:3001/comments`, commentObject, {headers :{
        accessToken: localStorage.getItem("token")
    }}).then((res) => {
        if(res.data.message === "User not Logged in"){
            alert("User not logged in");
        }
        resetFormFields();
    });
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onCommentSubmitHandler}>
        <Form className="create-comment-form">
          <Field
            id="comment-text-input"
            name="commentText"
            type="textarea"
            placeholder="Add a comment"
          />
          <ErrorMessage name="commentText" />

          <Button type="submit" title="Add" onSubmit={onCommentSubmitHandler} />
        </Form>
      </Formik>
    </>
  );
};
