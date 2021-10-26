import React from "react";
import { useForm } from "react-hook-form";
import "../../style/auth.css";


interface Props {
   setComponent: () => void
}


function Signin(props: Props): JSX.Element{
   const {register, handleSubmit} = useForm();
   
   

   function onSubmit(data: any){
      console.log(data);
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
   return(
      <div className = "oneAboveAll">
         <button onClick = {()=>props.setComponent()}>Sign Up</button>
         <button style={signInButton}>Sign In</button>
         <form className = "form" onSubmit = {handleSubmit(onSubmit)}>
            <br/><br/>
            <input className = "input" {...register("Email", {required: true})} name="Email"  placeholder="Email"/>
            <br/>
            <input className = "input" {...register("Password", {required: true})} name="Password" placeholder="Password"/>
            <br/>
            <button style={submitButton} type="submit">Submit</button> 
         </form>
      </div>
   );
}

export default Signin;