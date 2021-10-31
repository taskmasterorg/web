import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "../../style/auth.css";


interface Props {
   setComponent: () => void
}


function Signin(props: Props): JSX.Element{
   const {register, handleSubmit} = useForm();
   const [failed, setFailed] = useState("");
   

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
         if(data.message == "Okay"){
            console.log("successful");
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
      <div className = "oneAboveAll">
         <p style={fail} className = "p">{failed}</p><br/>
         <button onClick = {()=>props.setComponent()}>Sign Up</button>
         <button style={signInButton}>Sign In</button>
         <form className = "form" onSubmit = {handleSubmit(onSubmit)}>
            <br/><br/>
            <input className = "input" {...register("email", {required: true})} name="email"  placeholder="Email"/>
            <br/>
            <input className = "input" {...register("password", {required: true})} name="password" placeholder="Password"/>
            <br/>
            <button style={submitButton} type="submit">Submit</button> 
         </form>
      </div>
   );
}

export default Signin;