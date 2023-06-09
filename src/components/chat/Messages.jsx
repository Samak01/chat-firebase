import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../server/firebase';
import Message from './Message'

function Messages() {
  const [messages, setMessages] = useState([''])
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unSub()
    } 
  }, [data.chatId])

  console.log(messages)

  return (
    <div>
      <div className="message">
            <div className="message_container">
              { messages.map(message => 
                <Message message={message} key={message.id} />      
          
                )}

            </div>

      </div>
    </div>
  )
}

export default Messages