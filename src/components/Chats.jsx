import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import Chat from './Chat';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);
    // console.log(Object.entries(chats))

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
        // setSelectedUser(u);
    };
    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>
                            {chat[1].lastMessage?.text.slice(0, 20)}
                            {chat[1].lastMessage?.text.length > 20 ? " ..." : ""}
                        </p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Chats