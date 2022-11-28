import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Posts } from "./pages/Posts/Posts";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { PostPage } from "./pages/PostPage/PostPage";
import { Auth } from "./pages/Auth/Auth";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { Error } from "./pages/Error/Error";
import { Profile } from "./pages/Profile/Profile";
import { HomePage } from "./pages/HomePage/HomePage";

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
          <LikedContext.Provider value={{ likedPosts, setLikedPosts }}>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/profile/:id" element={<Profile />} />
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
