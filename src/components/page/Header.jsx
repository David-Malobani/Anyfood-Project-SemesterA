import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logout from '../authentication/Logout';
import { auth } from '../../../firebase';
import Image from '../../assets/img/food.png';
import Nav from './Nav';
export default function Header() {

    let [user, setUser] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email;
                const username = email.split('@')[0];
                setUser(username);
            } else {
                setUser("");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
       
            
            <div className='header'>
                <div className='bdika1'>
                    <Nav/>
                </div>
                <div className='bdika2'>
                    <h1>AnyFood</h1>
                </div>
                
                <div className='bdika3 user-logout d-box'>
                    <p>Welcome {user}!</p>
                    <div className='log-out'><Logout /></div>
                </div>
            </div>
      
    )
}