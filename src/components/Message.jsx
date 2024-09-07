import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    // console.log(data)
    const ref = useRef()
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    }, [message]);

    function timeAgo(previousDate) {
        const currentTime = Date.now();
        const timeDifferenceInSeconds = Math.floor((currentTime - new Date(previousDate).getTime()) / 1000);

        if (timeDifferenceInSeconds < 60) {
            return 'Just now';
        } else if (timeDifferenceInSeconds < 120) {
            return '1m ago';
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return minutes + 'm ago';
        } else if (timeDifferenceInSeconds < 7200) {
            return '1h ago';
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return hours + 'h ago';
        } else if (timeDifferenceInSeconds < 172800) {
            return '1d ago';
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return days + 'd ago';
        }
    }


    const messageDate = message.date;
    const call = timeAgo(messageDate)


    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span>{call}</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />} </div>
        </div>
    )
}

export default Message