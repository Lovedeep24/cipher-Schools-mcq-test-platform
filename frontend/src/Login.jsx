import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles/Login.module.css";
import axios from "axios";
import backgroundimage from "./assets/loginImage.jpg";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    // Function to handle successful login
    const handleLoginSuccess = (token) => {
        if (token) {
            localStorage.setItem('token', token);  // Store the token
            console.log("Token stored successfully");
            navigate('/permissions');  // Redirect to Permissions page
        } else {
            console.error("Failed to store token");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:9000/login", {
                email,
                password
            });
    
            console.log("Full Response:", response); // Log the full response to verify
    
            if (response.status === 200) {
                const token = response.data.accessToken;  // Extract the token
                if (token) {
                    alert("Login Successful");
                    handleLoginSuccess(token); // Store the token and navigate
                } else {
                    console.error("Token not found in response");
                }
            }
        } catch (error) {
            console.log("Error status:", error.response.status);
            if (error.response.status === 404) {
                alert("User not found");
            } else if (error.response.status === 400) {
                alert("Invalid password");
            } else {
                alert("Something went wrong");
            }
        }
    };
    
    

    return (
        <div className={styles.main}>
            <div className={styles.login}>
                <form className={styles.abc} onSubmit={handleSubmit}>
                    <p className={styles.slogan}>Exam Management App</p>
                    <p className={styles.message}>Please fill in your details to access your account</p>
                    <p className={styles.emailtag}>Email</p>
                    <input className={styles.email} type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                    <br />
                    <p className={styles.passwordtag}>Password</p>
                    <input className={styles.password} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    <br />
                    <button type='submit' className={styles.loginButton}>Login</button>
                </form>
            </div>
            <div className={styles.sideImage}>
                <img src={backgroundimage} alt="Login Background" />
            </div>
        </div>
    )
}
