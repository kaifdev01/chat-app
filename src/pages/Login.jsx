import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        // const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login Succesfull', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/")
        } catch (err) {
            setErr(true);
            toast.error('Wrong Credentials', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Login</span>
                {/* <span className="title">Login</span> */}
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input type="email" name="text" className="input" placeholder="Email" />
                        <div className="highlight"></div>
                    </div>
                    <div className="input-container" style={{ marginTop: "10px" }}>
                        <input type="password" name="text" className="input" placeholder="Password" />
                        <div className="highlight"></div>
                    </div>
                    {/* <input type="email" placeholder="Email" /> */}
                    {/* <input type="password" placeholder="Password" /> */}
                    {/* {err && <span>Credentails not match</span>} */}
                    <button>Sign in</button>
                    <ToastContainer />
                </form>
                <p>Don't have an account?<Link to='/register' style={{ textDecoration: "none" }}> Register</Link> </p>
            </div>
        </div>
    )
}

export default Login
