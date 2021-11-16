import Signin from "../auth/signin"
import React, { useState } from "react";
import Signup from "../auth/signup";
import Home from "../home/home";
import { Routes, Route} from 'react-router-dom';

function App(): JSX.Element{
   return(
      <Routes>
         <Route path="/" element={<Signup/>}/>
         <Route path="/SignIn" element={<Signin/>}/>
         <Route path="/Home" element={<Home/>}/>
      </Routes>
   );
}

export default App;