import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { GoSignOut } from "react-icons/go";
import logo from "../img/chat.png"
const Navbar = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            signOut(auth)
            // logout(); // Call your logout function
        }
        // if (logout) {
        //     navigate("/login")
        // }
    }
    // const name = currentUser.displayName.split(" ");
    // const fname = name[0]
    // console.log(fname)
    return (
        <div className='navbar'>
            <span className="logo">
                <img src={logo} width={30} alt="" srcset="" />
            </span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser?.displayName}</span>
                <button className='logout' onClick={handleLogout}><GoSignOut /></button>
            </div>
        </div>
    )
}

export default Navbar