import React, { useContext, useState } from 'react'
import { MdOutlineAttachFile } from 'react-icons/md';
import { TfiGallery } from 'react-icons/tfi';
import { BiSend } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../server/firebase';
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


function SendMessage() {
  
    const [ text, setText ] = useState("")
    const [ img, setImg ] = useState(null)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

  const handleSend = async () => {
    if(img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(  
          (error) => {
              // setErr(true)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
        });
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    
    setImg(null)
    setText('')
  };

  return (
    <>
        <div className="send_message">
            <div className="input">
                <input type="text" 
                placeholder='Сообщение...'
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <div className="send_icon">
                    <span className='send_files'><MdOutlineAttachFile /></span>
                    <input type="file"
                    style={{display: 'none'}} 
                    id='file'
                    onChange={(e) => setImg(e.target.files[0])}
                    />
                    <label htmlFor="file"><span><TfiGallery /></span></label>
                    <span onClick={handleSend}><BiSend /></span>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default SendMessage