import "./CreatePostForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../Button/Button";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreatePostForm = () => {
  const navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);

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

  const onSubmitHandler = (values) => {
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
        if (response.data.message === "Post created!") {
          alert("Post created!");
          resetFormFields();
          navigate("/posts");
        } else {
          alert("Something went wrong!");
        }
      });
  };

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
            id="input-create-post-text"
            name="postText"
            placeholder="What's the story?"
            as="textarea"
            onKeyUp={(e) => setCharCount(e.target.value.length)}
            maxLength="250"
          />
          <div className="char-count">
            <span id={charCount===250 ? "char-count-max" : "char-count"}>{charCount}/250</span>
          </div>
          <ErrorMessage name="title" component="span" className="error" />
          <Button type="submit" title="Post" onSubmit={onSubmitHandler} />
        </Form>
      </Formik>
    </>
  );
};
