import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

function Message({message}) {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const ref= useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])
    return (
    <>
        
                <div ref={ref}
                className={`user_chat ${message.senderId === currentUser.uid && "owner"}` }>
                    <div className="message_info">
                        <img src= { 
                            message.senderId === currentUser.uid 
                                ? currentUser.photoURL
                                : data.user.photoURL     
                    }
                         alt="" />
                        <span>Только что</span>
                    </div>
                    <div className="message_content">
                        <p>{message.text}</p>
                        {/* { message.img &&  */}
                            <img src={message.img} />
                    </div>
                </div>
    </>
  )
}

export default Message