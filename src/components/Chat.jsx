import React, { useContext, useState } from 'react'
import { FaVideo } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';
import Messages from './chat/Messages';
import SendMessage from './chat/SendMessage';


const Chat = () => {

    const { data } = useContext(ChatContext)
    
  return (
    <>
        <div className="chat">
            <div className="chat_wrapp">
                <div className="chat_header">
                    <span className='name_user'>{data.user?.displayName}</span>
                    <div className="icons">
                        <span><FaVideo /></span>
                        <span><HiUserAdd /></span>
                        <span><FiMoreHorizontal /></span>
                    </div>
                </div>

        <div className="messages">
            <div className="messages_wrap">
                <Messages />
                <SendMessage /> 
            </div>
        </div>
      </div>
        </div>
    </>
  )
}

export default Chat