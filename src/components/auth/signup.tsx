import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "../../style/auth.css";


interface Props {
   setComponent: () => void
}


function Signup(props: Props): JSX.Element{
   const {register, handleSubmit} = useForm();
   const [successful, setSuccessful] = useState("");
   const [failed, setFailed] = useState("");

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
               setTimeout(()=>props.setComponent(), 5000);
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
      <div className = "oneAboveAll">
         <p style={success} className = "p">{successful}</p><br/>
         <p style={fail} className = "p">{failed}</p><br/>
         <button style={signUpButton}>Sign Up</button>
         <button onClick = {()=>props.setComponent()}>Sign In</button>
         <form className = "form" onSubmit = {handleSubmit(onSubmit)}>
            <input style={inputField} className = "input" {...register("firstName", {required: true})} name="firstName"  placeholder="First Name"/>
            <input style={inputField} className = "input" {...register("lastName", {required: true})} name="lastName"  placeholder="Last Name"/>
            <input style={inputField} className = "input" {...register("email", {required: true})} name="email"  placeholder="Email"/>
            <input style={inputField} className = "input" {...register("password", {required: true})} name="password" placeholder="Password"/>
            <br/>
            <button style={submitButton} type="submit">Submit</button> 
         </form>
      </div>
   );
}

export default Signup;