import React,{useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import Navbar from "./navBar";
import Org from "./org";
import "../../style/auth.css";
import "../../style/home.css";

interface orgType{
   orgId: string;
   orgName: string;
}

function Home(): JSX.Element{

   //let UserId: string = "Ronak";
   const initialOrg = [{
      orgId: "123",
      orgName: "ronak"
   },
   {
      orgId: "234",
      orgName: "vivek"
   }]
   const [UserId, setUserId] = useState<string>("userId");
   const [createOrgForm, setForm] = useState(<div></div>);
   const [allOrg, setAllOrg] = useState<orgType[]>(initialOrg);
   const [orgAdded, changeState] = useState(true);
   const {register, handleSubmit} = useForm();

   const submitButton = {      
      margin: "auto",
      marginTop: 30,
      display: "block"
   }

   useEffect(() => {
      console.log("Hakai");
      console.log(allOrg);
      fetch('/api/v1/auth/verifyJWT', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
      })
      .then(res => res.json())
      .then(data => {
               console.log(data.serviceResponse.userId);
               setUserId(data.serviceResponse.userId);
               console.log(UserId);
            }
      )
   }, [] )

   useEffect( () => {
      console.log(UserId);
      fetch('/api/v1/org/all/' + UserId)
      .then(res => res.json())
      .then(data => {
            setAllOrg(data);
            console.log("Hi");
            console.log(data);
            console.log(allOrg);
            console.log("bye");
         }
      )}, [UserId]);
   
   function onSubmit(data: any){
      fetch('/api/v1/org/create', {
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
         if(data.message == "Created!"){
            console.log("successful");
            setForm(()=><div></div>);
            changeState(!orgAdded);
         }
         else{
            console.log("failed");
         }
      })
   }

   function createOrg(){
      console.log(UserId);
      setForm(()=>
         <form className = "auth_form" onSubmit = {handleSubmit(onSubmit)}>
            <br/><br/>
            <input className = "auth_input" {...register("userId", {required: true})} name="userId"  value={UserId}/>
            <br/>
            <input className = "auth_input" {...register("orgName", {required: true})} name="orgName" placeholder="Organization Name"/>
            <br/>
            <button className = "auth_button" style={submitButton} type="submit">Create</button> 
         </form>
      )
   }
   
   return(
      <div>
         <Navbar/><br/>
         {
            console.log("abc")
         }
         {
            console.log(allOrg)
         }
         {
            Array.isArray(allOrg) && allOrg.map((data: orgType, index: number) => {
               return <Org key={index} userId = {UserId} orgName = {data.orgName} />
            })
         }
         {
            console.log("def")
         }
         <div className = "OrgRow">
            <button className = "OrgTeams" onClick={createOrg}>Add Org</button>
            {createOrgForm}
         </div>
      </div>
   )
}

export default Home;