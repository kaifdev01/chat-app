import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AuthContext } from '../context/AuthContext';

const VideoCall = () => {
    const { currentUser } = useContext(AuthContext)
    // console.log(currentUser)
    const { roomId } = useParams();
    // console.log(roomId)
    const myMeeting = async (element) => {
         const appID = 1758168088;
        const serverSecret = "81d009409a525e235e67643b035e97ac";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), currentUser.displayName)
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname
                    // roomId,
                },
            ],
            onUserAvatarSetter: currentUser.photoURL,
        })
    }
    return (
        <div>
            <div ref={myMeeting}
                style={{ width: '100vw', height: '100vh' }}
            />
        </div>
    )
}

export default VideoCall
