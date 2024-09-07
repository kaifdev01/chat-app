import file from "../img/attach.png"
import Img from "../img/img.png"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import React, { useContext, useState } from "react";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AiOutlineSend } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';


const InputMessage = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const validate = () => {

    }

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleKeyPress = (e) => {
        // If the Enter key is pressed and the Shift key is not held down, prevent the default form submission
        if (e.key === "Enter" && !e.shiftKey) {
            setText(" ")
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = async () => {
        setText("");
        setImg(null);
        if (text.trim() === "") {
            toast.error('Please enter a message', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            return;
        }

        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chating", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Date.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chating", data.chatId), {

                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Date.now(),
                }),
            })
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: Date.now(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: Date.now(),
        });
        setText("");
        setImg(null);
    }
    return (
        <div className='input'>
            <ToastContainer />

            <input
                type="text"
                placeholder='Type Something...'
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyPress={handleKeyPress}
            />
            <div className="send">
                <img src={file} alt="" />
                <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button
                    style={{ backgroundColor: text.trim() === "" ? "#7b96ec" : "" }}
                    // disabled={text.trim() === ""}
                    className=""
                    onClick={handleSend}><AiOutlineSend /></button>
            </div>

        </div>
    )
}

export default InputMessage