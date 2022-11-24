import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { PostPage } from "./pages/PostPage/PostPage";
import { Auth } from "./pages/Auth/Auth";
import { createContext } from "react";
import { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";

export const UserContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState({
    status : false,
    username : "",
    userId : 0,
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ authUser, setAuthUser }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
