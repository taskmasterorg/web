import React,{useState} from "react";
import "../../style/home.css";

function NavBar(): JSX.Element{
   return(
      <div className="home_navbar">
         <button className="home_navItems">notifs</button>
         <button className="home_navItems">user</button>
      </div>
   );
}

export default NavBar;