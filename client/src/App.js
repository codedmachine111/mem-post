import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { PostPage } from "./pages/PostPage/PostPage";
import { Auth } from "./pages/Auth/Auth";
import { createContext } from "react";
import { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Error } from "./pages/Error/Error";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
export const PostContext = createContext();
export const LikedContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState({
    status: false,
    username: "",
    userId: 0,
  });

  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{ authUser, setAuthUser }}>
        <PostContext.Provider value={{ listOfPosts, setListOfPosts }}>
          <LikedContext.Provider
            value={{ likedPosts, setLikedPosts }}
          >
            <Router>
              <Navbar />
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Error />} />
              </Routes>
            </Router>
          </LikedContext.Provider>
        </PostContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
