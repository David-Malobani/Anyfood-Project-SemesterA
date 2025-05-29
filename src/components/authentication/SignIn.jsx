import { React } from 'react'
import { useState } from "react";
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';



export default function SignIn() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('')
    const history = useHistory();


    async function SignIn() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                history.push('/ApiRecipes');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(error.message);
            });
    }
    return (
        <div className='authentication'>
            <div className='background-aut'></div>
            <div className='container-sign'>
                <h2>Sign-In</h2>
                <div className='sign-inputs'>
                    <div><input type="text" placeholder='Email' onChange={(val) => setEmail(val.target.value)} /></div>
                    <div><input type="password" placeholder='Password' onChange={(val) => setPassword(val.target.value)} /></div>
                    <div><button onClick={SignIn}>Login</button></div>
                </div>
                
                <div className=' d-flex justify-content-center'>
                    <div>Dont have an account</div>
                    <div className='sign-link'>? <Link to="/Signup">Sign-Up</Link></div>
                </div>
                
            </div>
        </div>
    )
}
