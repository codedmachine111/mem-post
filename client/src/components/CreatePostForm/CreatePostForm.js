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
  const [fileObject, setFileObject] = useState(null);

  const initialValues = {
    title: "",
    postText: "",
    file: null,
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    postText: Yup.string().required("Required"),
  });
  const resetFormFields = () => {
    document.getElementsByClassName("create-post-form")[0].reset();
  };

  const onSubmitHandler = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("postText", values.postText);
    formData.append("file", fileObject);    

    axios
  .post(
    "http://localhost:3001/posts",
    formData,
    {
      headers: {
        accessToken: localStorage.getItem("token"),
      },
    }
  )
  .then((response) => {
    console.log(response.data);
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
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        encType="multipart/form-data"
      >
        <Form className="create-post-form" encType="multipart/form-data">
          <input
            type="file"
            name="file"
            id="input-create-post"
            accept="image/*"
            onChange={(e) => {
              setFileObject(e.target.files[0]);
            }}
          />
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
            <span id={charCount === 250 ? "char-count-max" : "char-count"}>
              {charCount}/250
            </span>
          </div>
          <ErrorMessage name="title" component="span" className="error" />
          <Button type="submit" title="Post" onSubmit={onSubmitHandler} />
        </Form>
      </Formik>
    </>
  );
};


