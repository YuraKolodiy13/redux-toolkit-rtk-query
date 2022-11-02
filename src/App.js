import React, {useState} from "react";
import {useLazySearchZipQuery} from "./store/emapdata/emapdata.api";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Users from "./pages/Users";
import User from "./pages/User";
import Faq from "./pages/Faq";

function App() {

  const [zip, setZip] = useState('');

  const [searchZip] = useLazySearchZipQuery()

  console.log(searchZip, 'searchZip')

  return (
    <div className="App">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquid delectus error est incidunt nam obcaecati odit porro quae, qui quia quidem quod recusandae rem repellat saepe sequi sint.
      <input value={zip} type="text" onChange={e => setZip(e.target.value)}/>
      <button onClick={() => searchZip(zip)}>search</button>


      <BrowserRouter>
        <Routes>
          <Route path='/users' element={<Users/>} />
          <Route path='/users/:id' element={<User/>} />
          <Route path='/faq' element={<Faq/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
