import Signin from "../auth/signin"
import React, { useState } from "react";
import Signup from "../auth/signup";

function App(): JSX.Element{
   const [component, setComponent] = useState(1);
   switch(component){
      case 1: 
         return(
            <div>
               <Signin setComponent={() => setComponent(2)}/>
            </div>
         )
      
      case 2:
         return(
            <div>
               <Signup setComponent={() => setComponent(1)}/>
            </div>
         )

      default:
         return(
            <div>
               
            </div>
         )
   }
}

export default App;