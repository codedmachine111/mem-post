import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { CreatePost } from './pages/CreatePost/CreatePost';
import { PostPage } from './pages/PostPage/PostPage';
import {Auth} from './pages/Auth/Auth';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
