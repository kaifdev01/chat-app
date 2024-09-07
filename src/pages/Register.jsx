 import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react';
import fileimg from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3]?.files[0];

        if (!displayName || !email || !password) {
            // setErr(true);
            toast.error('All fields are required', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log('All fields are required');
            return;
        }

        if (displayName.length < 4) {
            toast.error('Username cannot be less than 4 characters', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log('Display name must be at least 4 characters long');
            return;
        }

        if (password.length < 8) {
            toast.error('Password should be 8 characters', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // setErr(true);
            console.log('Password must be at least 8 characters long');
            return;
        }

        if (!file) {
            toast.error('Profile Image Required', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }



        // const auth = getAuth();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true)
                    console.log(error)
                },
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {
                        })
                        toast.success('User registered successfully', {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        navigate("/")
                    });
                }
            );


        } catch (error) {
            console.log(error)
        }

    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <ToastContainer />

                <span className="logo">Register</span>

{/*                 <span className="title">Register</span> */}
                {/* <span className="title">Register</span>  */}

                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input type="text" name="text" className="input" placeholder="Display Name" />
                        <div className="highlight"></div>
                    </div>
                    <div className="input-container" style={{ marginTop: "10px" }}>
                        <input type="email" name="text" className="input" placeholder="Email" />
                        <div className="highlight"></div>
                    </div>
                    <div className="input-container" style={{ marginTop: "10px" }}>
                        <input type="password" name="text" className="input" placeholder="Password" />
                        <div className="highlight"></div>
                    </div>

                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={fileimg} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    {loading && "Uploading and compressing the image please wait..."}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Don't have an account?<Link to="/login" style={{ textDecoration: "none" }}><span> Login</span></Link></p>
            </div>
        </div>
    )
}

export default Register
