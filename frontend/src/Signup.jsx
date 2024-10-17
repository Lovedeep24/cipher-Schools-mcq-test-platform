import React, { useState } from 'react'
import styles from "./Styles/Signup.module.css";
import backgroundimage from "./assets/loginImage.jpg";
import { Link } from 'react-router-dom';
import axios from "axios";
export default function Signup() {
    const [email,setEmail]=useState(``);
    const [password,setPassword]=useState(``);
    const [name,setName]=useState(``);
    // const [role,setRole]=useState(``);
      
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post("http://localhost:9000/signup", {
              name,
              email,
              password,
              // role // Uncomment if using roles
          });
  
          console.log(response.status);
          if (response.status === 200) {
              alert("Signup successful!");
          }
      } catch (error) {
          console.error("Error during signup:", error); // Log the entire error object
  
          if (error.response) {
              // Server responded with a status code other than 2xx
              console.log("Response status:", error.response.status);
              if (error.response.status === 400) {
                  alert("User already exists");
              } else if (error.response.status === 404) {
                  alert("All fields mandatory");
              } else {
                  alert("An error occurred");
              }
          } else if (error.request) {
              // Request was made but no response was received
              alert("No response received from the server. Please check your network connection.");
          } else {
              // Something happened in setting up the request
              alert("Error creating request: " + error.message);
          }
      }
  };
  
  return (
    <div>
  <div className={styles.main}>
  <div className={styles.left}>
        <div className={styles.image}>
          <img src={backgroundimage} alt="profile" />
        </div>
      </div>
      <div className={styles.right}>
        <h2>Sign up</h2>
        <p>
          Already have an account? <span><Link to="/login">Log in</Link></span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        
          <div className={styles.terms}>
            <input
              type="checkbox"
              id="terms" />
            <label htmlFor="terms">I agree to the <span>terms</span> and <span>conditions</span></label>
          </div>

          <button type="submit" onClick={handleSubmit}>Sign up</button>
        </form>
      </div>

    </div>
  
    </div>
  );
}
