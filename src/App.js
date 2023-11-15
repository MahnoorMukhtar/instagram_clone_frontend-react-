import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Welcome from './components/pages/Welcome';
import './App.css';
import NewPost from './components/pages/Post/NewPost';
import ViewPostDetails from "./components/pages/Post/ViewPostDetails";
import Signup from "./components/auth/Signup"
import Profile from "./components/pages/Profile/Profile";

const App=()=>{
  
  return (
      <Router>
        <div className='App' style={{maxWidth: "100%", overflow: "hidden"}}>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login />}/>
            <Route path='/post/new' element={<NewPost/>}/>
            <Route path='/post/:id' element={<ViewPostDetails/>}/>
            <Route path='/profile/:user_name' element={<Profile/>}/>
          </Routes>
        </div>
      </Router>
  );
}
export default App