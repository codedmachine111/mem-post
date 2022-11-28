import "./HomePage.scss";
import { Button } from "../../components/Button/Button";
import {LoginForm} from "../../components/LoginForm/LoginForm";
import mobileImage from "../../assets/mobile.png";

export const HomePage = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-content">
          
          <img src={mobileImage} alt={""} id="mobile-app"/>
        </div>
        <div className="home-timer-container">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
