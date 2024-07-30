import React, { useReducer, useState, useContext } from "react";

import Logo from "../../olx-logo.png";
import SignupReducer from "./SignupReducer";
import "./Signup.css";
import { FirebaseContext } from "../../Context/firebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  //  const [name,setName] = useState('')
  //  const [email ,setEmail] = useState('')
  //  const [phone,setPhone] = useState('')
  //  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(SignupReducer, {
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  // console.log(state.name,state.password,state.phone,state.email)
  const { firebaseapp, db } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: state.name,
        });
         console.log(user);
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          name: state.name,
          mobile: state.phone,  
        });
  
        navigate('/login', { replace: true }); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
      });
  };
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={state.name}
            onChange={(e) => dispatch({ type: "name", value: e.target.value })}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={state.email}
            onChange={(e) => dispatch({ type: "email", value: e.target.value })}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={state.phone}
            onChange={(e) => dispatch({ type: "phone", value: e.target.value })}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "password", value: e.target.value })
            }
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
