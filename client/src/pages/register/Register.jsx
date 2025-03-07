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
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
}


const handleClick = async (e) => {
    e.preventDefault();
    try {
       await axios.post("/api/auth/register", inputs);
       navigate("/");
    } catch (err) {
        setErr(err.response.data);
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