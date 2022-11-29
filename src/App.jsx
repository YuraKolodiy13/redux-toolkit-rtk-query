import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Users from "./pages/Users/Users";
import User from "./pages/User/User";
import Faq from "./pages/Faq/Faq";
import Posts from "./pages/Posts/Posts";
import Post from "./pages/Post/Post";
import './App.scss';
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {/*<Route path='/' element={<Navigate replace to="/posts"/>}/>*/}
            <Route path='/' element={<Homepage/>}/>
            <Route path='/posts' element={<Posts/>}/>
            <Route path='/posts/:id' element={<Post/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/users/:id' element={<User/>}/>
            <Route path='/faq' element={<Faq/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
};

export default App;
