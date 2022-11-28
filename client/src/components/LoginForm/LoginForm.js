import "./LoginForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../components/Button/Button";
import { UserContext } from "../../App";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";

export const LoginForm = () => {

  const { setAuthUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetFormFields = () => {
    document.getElementsByClassName("login-form")[0].reset();
  };

  const initialValues = {
    username: "",
    password: "",
  };
  const onLoginSubmitHandler = async (values) => {
    const userObject = {
      username: values.username,
      password: values.password,
    };

    axios.post(`http://localhost:3001/auth/login`, userObject).then((res) => {
      alert(res.data.message);
      if (res.data.message === "Login Successful") {
        resetFormFields();
        setAuthUser({
          status: true,
          username: res.data.username,
          userId : res.data.userId
        });
        localStorage.setItem("token", res.data.accessToken);
        navigate("/posts");
      }
    });
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onLoginSubmitHandler}>
        <Form className="login-form">
          <h2>Stories</h2>
          <p>Login to enter the application and share your stories</p>
          <Field
            id="login-input"
            name="username"
            type="text"
            placeholder="username"
          />
          <ErrorMessage name="username" />
          <Field
            id="login-input"
            name="password"
            type="password"
            placeholder="password"
          />
          <ErrorMessage name="password" />

          <Button type="submit" title="LOGIN" onSubmit={onLoginSubmitHandler} />
        </Form>
      </Formik>
    </>
  );
};
