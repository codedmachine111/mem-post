import "./CreatePostForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../Button/Button";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreatePostForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    postText: Yup.string().required("Required"),
  });
  const resetFormFields = () => {
    document.getElementsByClassName("create-post-form")[0].reset();
  };
  
  const onSubmitHandler = (values) =>{
    axios
      .post(
        "http://localhost:3001/posts",
        {
            title: values.title,
            postText: values.postText,
        },
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if(response.data.message === "Post created!"){
            alert("Post created!");
            resetFormFields();
            navigate("/");
        }else{
            alert("Something went wrong!");
        }
     });
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        <Form className="create-post-form">
          <Field id="input-create-post" name="title" placeholder="Post Title" />
          <ErrorMessage name="title" component="span" className="error" />
          <Field
            id="input-create-post"
            name="postText"
            placeholder="What's happening?"
            type="textarea"
          />
          <ErrorMessage name="title" component="span" className="error" />

          <Button type="submit" title="Post" onSubmit={onSubmitHandler} />
        </Form>
      </Formik>
    </>
  );
};
