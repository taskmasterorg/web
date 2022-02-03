import React,{useState} from "react";
import "../../style/home.css";

interface Props{
   userId: string;
   orgName: string;
}

function Org(props: Props): JSX.Element{
   return(
      <div>
         <h3>{props.orgName}</h3>
         <div className = "OrgRow">
            <button className = "OrgTeams">Teams</button>
         </div>
      </div>
   )
}

export default Org;