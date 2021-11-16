import React,{useState} from "react";
import Navbar from "./navBar";

function Home(): JSX.Element{
   fetch('/api/v1/auth/verifyJWT', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
      },
   })
   .then(res => res.json())
   .then(data => {
            console.log(data);
         }
   )      
   return(
      <div>
         <Navbar/>
      </div>
   )
}

export default Home;