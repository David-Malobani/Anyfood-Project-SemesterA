import React from 'react'
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase';
export default function Logout() {
   const history = useHistory();
  async function logOutUser() {
    signOut(auth).then(() => {
  
      history.push('/SignIn')
      alert("If you want to continue, please login again");

    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    
    });
  }

  return (
    <div>
         <div className="logout">
         <button className="fa-solid" onClick={logOutUser}>LogOut <i class="fa-solid fa-door-open" ></i></button>
         </div>
    </div>
  )
}
