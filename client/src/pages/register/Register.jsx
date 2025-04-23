import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Register.scss"
import axios from "axios"

const Register = () => {
    const [inputs, setInputs] = useState({
        username : "",
        email : "",
        password : "",
        name : "",
    });

    const [err, setErr] = useState(null);
    const navigate = useNavigate(); 

const handleChange = (e) => {
    setInputs((prev) => {
        const updated = {...prev, [e.target.name]: e.target.value};
        console.log("Updated Inputs:", updated);
        return updated;
    });
}


const handleClick = async (e) => {
    e.preventDefault();
    try {
        console.log("Registering with:", inputs);
       await axios.post("/api/auth/register", inputs);
       console.log("Registration successful!");
       setTimeout(() => {
        navigate("/");
      }, 1000); 
    } catch (err) {
        const errorMsg = err.response?.data || "Registration failed";
        console.error("Registration error:", errorMsg);
        setErr(errorMsg);
    }
};


  return (
    <>
        <div className="register">
            <div className="card">

                <div className="left">
                    <h1>Social Media.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quae.</p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>


                <div className="right">
                    <h1>Register</h1>
                    <form action="">
                        <input type="text" placeholder='Username' name='username' onChange={handleChange} />
                        <input type="email" placeholder='Email' name='email' onChange={handleChange} />
                        <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                        <input type="text" placeholder='Name' name='name' onChange={handleChange} />


                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}

export default Register;