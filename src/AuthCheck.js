import { AuthContext } from "./Context/firebaseContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


export default function AuthCheck({children}){
      const {user} = useContext(AuthContext)
    //   console.log("authcheck",user);
    //   const navigate = useNavigate()
    return user? children :<Navigate to='/login' />
      
}