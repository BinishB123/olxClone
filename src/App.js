import React ,{useEffect,useContext} from 'react';
import './App.css';
import { Route, BrowserRouter , Routes } from 'react-router-dom';
import Signup from '../src/Components/Signup/Signup'
import Login from '../src/Components/Login/Login'
import { onAuthStateChanged ,getAuth} from 'firebase/auth';

import AuthCheck from './AuthCheck';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext ,FirebaseContext} from './Context/firebaseContext';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';
import PostContextDetail from './Context/PostDetails';

function App() {
  const { firebaseapp, db } = useContext(FirebaseContext);
   const {user,userState} = useContext(AuthContext)

   useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
      if(user){
          console.log(user);
          userState(user)
      }else{
          console.log("Not logged");
      }
  })
})
  return (
    <div>
      <PostContextDetail>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>} />
        <Route path='view' element={<ViewPost/>}/>
        <Route path='create' element={<AuthCheck><Create/></AuthCheck>}/>
        </Routes>
      </BrowserRouter>
      </PostContextDetail>
      
    </div>
  );
}

export default App;
