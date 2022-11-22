import "./SignUpForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../components/Button/Button";

export const SignUpForm = () => {
  const resetFormFields = () => {
    document.getElementsByClassName("signup-form")[0].reset();
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

    axios.post(`http://localhost:3001/auth/`, userObject).then((res) => {
      alert(res.data.message);
      if (res.data.message === "User Created!") {
        resetFormFields();
        sessionStorage.setItem("token", res.data.accessToken);
      }
    });
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onLoginSubmitHandler}>
        <Form className="signup-form">
          <Field
            id="signup-input"
            name="username"
            type="text"
            placeholder="username"
          />
          <ErrorMessage name="username" />
          <Field
            id="signup-input"
            name="password"
            type="text"
            placeholder="password"
          />
          <ErrorMessage name="password" />

          <Button
            type="submit"
            title="SIGNUP"
            onSubmit={onLoginSubmitHandler}
          />
        </Form>
      </Formik>
    </>
  );
};
