import React, { useState } from 'react'
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const history = useHistory();

    async function SignUp() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                history.push('/SignIn')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <div className='authentication'>
            <div className='background-aut'></div>
            <div className='container-sign'>
                <h2>Sign-Up</h2>
                <div className='sign-inputs'>
                    <div><input type="text" placeholder='Email' onChange={(val) => setEmail(val.target.value)} /></div>
                    <div><input type="password" placeholder='Password' onChange={(val) => setPassword(val.target.value)} /></div>
                    <div><button onClick={SignUp}>Sign Up</button></div>
                </div>
                <div className=' d-flex justify-content-center'>
                    <div>Already have an account</div>
                    <div className='sign-link'>? <Link to="/SignIn">Sign-In</Link></div>
                </div>
            </div>
        </div>

    )
}