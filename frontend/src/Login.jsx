import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./Styles/Login.module.css";
import axios from "axios";
import backgroundimage from "./assets/loginImage.jpg";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[role,setRole]=useState('');
    const navigate = useNavigate();  // Hook for navigation

    // Function to handle successful login
    const handleLoginSuccess = (accessToken) => {
        if (accessToken) {
            localStorage.setItem('token', accessToken);  // Store the token
            console.log("Token stored successfully");
            const decodedToken = jwtDecode(accessToken);
            console.log("Decoded token:", decodedToken);

            const userRole = decodedToken.user.role; // Extract role from the token
            console.log("User role:", userRole);
            if (userRole === 'Admin') {
                navigate('/admin'); // Redirect to Admin Dashboard
            } else if (userRole === 'User') {
                navigate('/permissions'); // Redirect to User Dashboard
            }
            // Redirect to Permissions page
        } else {
            console.error("Failed to store token");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:9000/login", {
                email,
                password,
                role
            });
    
          
    
            if (response.status === 200) {
                const {accessToken} = response.data;  // Extract the token
                if (accessToken) {
                    alert("Login Successful");
                    handleLoginSuccess(accessToken); // Store the token and navigate
                } else {
                    console.error("Token not found in response");
                }
            }
        } catch (error) {

            console.log("Error:", error);
            if(error.response)
            {
                // console.log("Error status:", error.response);
                if (error.response.status === 404) {
                    alert("User not found");
                } else if (error.response.status === 400) {
                    alert("Invalid password");}
                    else if (error.response.status === 401) {
                        alert("Not Authorized");
                } else {
                    alert("All Fields are required");
                }
            }
            
        }
    };
    

    return (
        <div className={styles.main}>
               <div className={styles.left}>
                
                    {/* <h1>3legant</h1> */}
                    <div className={styles.image}>
                        <img src={backgroundimage} alt="profile" />
                    </div>
                </div>
            <div className={styles.right}>
            <h2>Log in</h2>
                    <p>
                        Don't have an account? <span><Link to="/signup">Sign up</Link></span>
                    </p>
            <form onSubmit={handleSubmit}>
                        <div className={styles.inputs}>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className={styles.roleBox}>
                            <label>
                                <input type="radio"value="Admin"checked={role === 'Admin'} onChange={(e) => setRole(e.target.value)}disabled={false} />Admin
                            </label>
                            
                            <label>
                                <input  type="radio"  value="User"  checked={role === 'User'} onChange={(e) => setRole(e.target.value)}disabled={false}/>User
                            </label>
                        </div>
                
                        
                        <div className={styles.terms}>
                            <input 
                                type="checkbox" 
                                id="terms" 
                                // checked={termsAccepted} 
                                // onChange={() => setTermsAccepted(!termsAccepted)} 
                            />

                            <label htmlFor="terms">Remember <span>me</span></label>
                            <div className={styles.forgotPassword}>
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
        <button type="submit">Log in</button>
                    </form>
            </div>
           
        </div>
    )
}
