import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Users from "./pages/Users";
import User from "./pages/User";
import Faq from "./pages/Faq";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to="/users" />} />
          <Route path='/users' element={<Users/>} />
          <Route path='/users/:id' element={<User/>} />
          <Route path='/faq' element={<Faq/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
