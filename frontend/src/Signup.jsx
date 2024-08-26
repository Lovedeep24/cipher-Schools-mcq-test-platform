import React, { useState } from 'react'
import styles from "./Styles/Signup.module.css";
import backgroundimage from "./assets/loginImage.jpg";
import axios from "axios";
export default function Signup() {
    const [email,setEmail]=useState(``);
    const [password,setPassword]=useState(``);
    const [name,setName]=useState(``);
    const [role,setRole]=useState(``);
  
    const handleSubmit=async(e)=>{
      e.preventDefault();
      
      try 
      {
        const response=await axios.post("http://localhost:9000/signup",{
          name,email,password,role
        })
        console.log(response.status);
        // console.log(`requested data : {${email},${password},${name}}`);
        if(response.status === 200)
          {
            alert("signup succesfull");
          } 
      } 
      catch (error)
      {
        console.log(error.response.status);
        if(error.response.status === 400)
        {
          alert("User already Exist");
        }
        else if(error.response.status === 404)
        {
          alert("No user Found");
        }
        else{
          alert("An error occured");
        }
      }
    }
  return (
  <>
  <div className={styles.main}>
    <div className={styles.signup}>
        
        <form  className={styles.abc} onSubmit={handleSubmit}>
                <p className={styles.slogan}>Sign Up</p>
                <p className={styles.message}>Please Fill details to Create your account</p>
                <p className={styles.nametag}>Name</p>
                <input className={styles.name} type='text' onChange={(e)=>{setName(e.target.value)}} placeholder='Name' required /> 
                <br></br>
                <p className={styles.emailtag}>Email</p>
                <input className={styles.email} type='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' required />   
                <br></br>
                <p className={styles.passwordtag}>Password</p>
                <input className={styles.password} type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' required />    
                <br></br>
                <button type='submit' className={styles.signupButton}>Signup</button>
        </form>

      </div>
        <div className={styles.sideImage}>
            <img src={backgroundimage}></img>
        </div>
    </div>
    </>
  )
}
