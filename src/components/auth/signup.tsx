import React from "react";
import { useForm } from "react-hook-form";
import "../../style/auth.css";


interface Props {
   setComponent: () => void
}


function Signup(props: Props): JSX.Element{

   const {register, handleSubmit} = useForm();
   const API_ENDPOINT = '/api/v1/auth/signup';
   
   async function signup(data: any) {

      try {
         let response: any = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });

         response = response.json();
         
         if (response.message && response.detail) {
            throw new Error(response.detail);
         }

      } catch (err) {
         
         console.log(err);
         if (err instanceof Error) {
               throw err;
         }
         if (typeof err === 'string') {
               throw new Error(err);
         }
         throw new Error('Sign up error!');
      }
   }

   function onSubmit(data: any){
      console.log(data);
      signup(data)
      .then(() => console.log('cool'))
      .catch((err) => console.log(err));
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
   return(
      <div className = "oneAboveAll">
         <p></p>
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