import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "../../style/auth.css";
import {Link, useNavigate} from "react-router-dom"

function Signup(): JSX.Element{
   const {register, handleSubmit} = useForm();
   const [successful, setSuccessful] = useState("");
   const [failed, setFailed] = useState("");
   const navigate = useNavigate();

   

   function onSubmit(data: any){
      fetch('/api/v1/auth/signup', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      })
         .then(res => res.json())
         .then(data => {
            if(data.message == "Created!"){
               setFailed(() => "");
               setSuccessful("Sign Up Successful!");
               setTimeout(() => navigate(`/SignIn`), 2000);
            }
            else{
               setFailed(() => data.detail);
            }
         })
   }
   const signUpButton = {
      color: "white",
      backgroundColor: "black",
   }
   const submitButton = {      
      margin: "auto",
      marginTop: 10,
      display: "block"
   }
   const inputField = {
      marginTop: 20
   }
   const success = {
      color: "green"
   }
   const fail = {
      color: "red"
   }

   return(
      <div className = "auth_oneAboveAll">
         <p style={success} className = "auth_p">{successful}</p><br/>
         <p style={fail} className = "auth_p">{failed}</p><br/>
         <button className = "auth_button" style={signUpButton}>Sign Up</button>
         <Link className="auth_link" to="/SignIn">Sign In</Link>
         <form className = "auth_form" onSubmit = {handleSubmit(onSubmit)}>
            <input style={inputField} className = "auth_input" {...register("firstName", {required: true})} name="firstName"  placeholder="First Name"/>
            <input style={inputField} className = "auth_input" {...register("lastName", {required: true})} name="lastName"  placeholder="Last Name"/>
            <input style={inputField} className = "auth_input" {...register("email", {required: true})} name="email"  placeholder="Email"/>
            <input style={inputField} className = "auth_input" {...register("password", {required: true})} name="password" placeholder="Password"/>
            <br/>
            <button className = "auth_button" style={submitButton} type="submit">Submit</button> 
         </form>
      </div>
   );
}

export default Signup;