import React, { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from "../../Context/firebaseContext";
import { useNavigate } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [email, emailState] = useState("");
  const [password, passwordState] = useState("");
  const [error,setError] = useState('')
  const { firebaseapp, db } = useContext(FirebaseContext);
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/', { replace: true });
      })
      .catch((error) => {
        if(error.code === 'auth/invalid-credential'){
          setError('Invalid Credentials.')
      }
      });
};

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              emailState(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => passwordState(e.target.value)}
          />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>} 
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
          navigate('/signup',{replace:true})
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
