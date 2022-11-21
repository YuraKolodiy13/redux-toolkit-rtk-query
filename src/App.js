import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Users from "./pages/Users";
import User from "./pages/User";
import Faq from "./pages/Faq/Faq";
import Posts from "./pages/Posts/Posts";
import SinglePost from "./pages/SinglePost";
import './App.scss';
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<Navigate replace to="/posts" />} />
            <Route path='/posts' element={<Posts/>} />
            <Route path='/posts/:id' element={<SinglePost/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='/users/:id' element={<User/>} />
            <Route path='/faq' element={<Faq/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
