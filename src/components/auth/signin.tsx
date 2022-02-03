import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "../../style/auth.css";
import {Link, useNavigate} from "react-router-dom";


function Signin(): JSX.Element{
   const {register, handleSubmit} = useForm();
   const [failed, setFailed] = useState("");
   const navigate = useNavigate();
   

   function onSubmit(data: any){
      fetch('/api/v1/auth/login', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
         console.log(data);
         if(data.jwt){
            console.log("successful");
            navigate(`/Home`);
         }
         else{
            setFailed(() => data.detail);
         }
      })
   }
   const signInButton = {
      color: "white",
      backgroundColor: "black",
   }
   const submitButton = {      
      margin: "auto",
      marginTop: 30,
      display: "block"
   }
   const fail = {
      color: "red"
   }
   return(
      <div className = "auth_oneAboveAll">
         <p style={fail} className = "auth_p">{failed}</p><br/>
         <Link className="auth_link" to="/">Sign Up</Link>
         <button className = "auth_button" style={signInButton}>Sign In</button>
         <form className = "auth_form" onSubmit = {handleSubmit(onSubmit)}>
            <br/><br/>
            <input className = "auth_input" {...register("email", {required: true})} name="email"  placeholder="Email"/>
            <br/>
            <input className = "auth_input" {...register("password", {required: true})} name="password" placeholder="Password"/>
            <br/>
            <button className = "auth_button" style={submitButton} type="submit">Submit</button> 
         </form>
      </div>
   );
}

export default Signin;