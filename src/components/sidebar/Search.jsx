import React, { useState } from 'react'
import { db } from '../../server/firebase';
import { collection, query, where, getDocs, serverTimestamp, getDoc, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { doc, setDoc } from "firebase/firestore"; 


const  Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"),
      where("displayName", "==", userName)
    );
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          setUser(doc.data());
      });
    }catch(err){
      setErr(true)
    }
  } 
  
  const handleKey = (e) => {
    e.code == "Enter" && handleSearch()    
  }
   
  
  const handleSelect = async () => {
    // console.log('555')       
    const combinedId = 
            currentUser.uid > user.uid 
            ? 
            currentUser.uid + user.uid
             : 
            user.uid + currentUser.uid
            
    try{
      const res = await getDoc(doc(db, 'chats', combinedId))
      
      if(!res.exists()){
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {messages: []}) 

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });
      }      
    }catch(err){
      setErr(true)
    }
    setUser(null);
    setUserName("")
  }


  return (
    <>
      <div className="search">
          <div className="search_user">
            <input 
                type="text" 
                onKeyDown={handleKey} 
                onChange={(e) => setUserName(e.target.value)} 
                value={userName}
                placeholder='Поис...' />
          </div>
          
          {/* {err && <span>Пользователь не найден!!</span>} */}
          { user && 
                  (<div className="user_chat" onClick={handleSelect}>
                    <img src={user.photoURL} />
                    <div className="user_info">
                      <span>{user.displayName}</span>
                    </div>
                  </  div>)}
      </div>
    </>
  )
}

export default Search