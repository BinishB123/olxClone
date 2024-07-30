import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/firebaseContext";
import { getAuth, signOut } from "firebase/auth";
function Header() {
  const navigate = useNavigate();
  const { user, userState } = useContext(AuthContext);
  const handLogout = (e) => {
    e.preventDefault(); 
  
    const auth = getAuth(); 
  
    signOut(auth) 
      .then(() => {
        console.log("Logout success");
        userState(null); 
        navigate("/", { replace: true }); 
      })
      .catch((err) => {
        console.log(err.message); 
      });
  };
  const handleSell = (e)=>{
    e.preventDefault()
    navigate('create')
  }

 
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span
            onClick={() => {
              if (!user) {
                navigate("login");
              }
            }}
          >
            {user ? "hii " + user.displayName : "Login"}
          </span>
          <hr />
          <span onClick={handLogout}>{user?"logout":""}</span>
        </div>

        <div className="sellMenu" onClick={handleSell}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
