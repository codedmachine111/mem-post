import "./Auth.scss";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

export const Auth = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-page-content">
        <div className="auth-login-section">
          <h2>Have an account?</h2>
          <p>Login with username and password</p>
          <LoginForm />
        </div>
        <div className="auth-signup-section">
          <h2>Don't have an account?</h2>
          <p>Signup with username and password</p>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
