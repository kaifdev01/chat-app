import React, { useContext } from 'react'
import cam from "../img/cam.png"
import Add from "../img/add.png"
import more from "../img/more.png"
import Messages from './Messages'
import InputMessage from './InputMessage'
import { ChatContext } from '../context/ChatContext'
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import robot from "../img/robot.gif"






const Chat = () => {

    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    // console.log(currentUser)
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(" ")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()
    // console.log(value)
    const handleClick = () => {

        handleClose(true)
        navigate(`/room/${value}`)
      
    }


    return (
        <>
            <div className='chat'>
                <div className="chatInfo">

                    <div className='name'>
                        <img className="userimg " style={{ display: data.user.photoURL ? 'block' : 'none' }} src={data.user.photoURL} alt="" />
                        <span>{data.user?.displayName}</span>
                    </div>

                    <div className="chatIcons" style={{ display: data.user.photoURL ? 'flex' : 'none' }}>
                        <img src={cam} alt="" onClick={handleShow} />
                        <img src={Add} alt="" />
                        <img src={more} alt="" />

                    </div>
                </div>
                {
                    data.user.displayName ?

                        <Messages />

                        :
                        <>
                            <div className='messages' style={{ textAlign: "center" }}>
                                <div style={{ marginTop: "-10px" }} className='mx-auto'>
                                    <img src={robot} width={250} height={250} className="robot " alt="hello" />
                                    <div className="textwel">
                                        <h3>Welcome, <sapn style={{ color: "#5d5b8d" }}>{currentUser.displayName} !</sapn></h3>
                                        <p><i> Please Select a Chat to start messaging.</i></p>
                                    </div>
                                </div>
                            </div>
                        </>
                }

                <InputMessage />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body closeButton style={{ textAlign: "center" }}>
                        <Modal.Title>Enter Call Code</Modal.Title>
                    </Modal.Body>
                    <Modal.Body style={{ textAlign: "center", marginLeft: "15px", }}>
                        <Space direction="vertical" size="middle">
                            <Space.Compact style={{ width: '100%' }}>
                                <Input
                                    placeholder='Enter code'
                                    type="text"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                 <Button style={{ backgroundColor: "#5d5b8d", color: "white" }} onClick={handleClick} >Join</Button>
                            </Space.Compact>
                        </Space>
                    </Modal.Body>

                </Modal>
            </div>

        </>
    )
}

export default Chat
