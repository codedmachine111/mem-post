import "./LoginForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../components/Button/Button";

export const LoginForm = () => {
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
      console.log(res.data);
      if (res.data.message === "Login Successful") {
        resetFormFields();
        sessionStorage.setItem("token", res.data.accessToken);
      }
    });
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onLoginSubmitHandler}>
        <Form className="login-form">
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
            type="text"
            placeholder="password"
          />
          <ErrorMessage name="password" />

          <Button type="submit" title="LOGIN" onSubmit={onLoginSubmitHandler} />
        </Form>
      </Formik>
    </>
  );
};
