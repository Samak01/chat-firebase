import { signOut } from 'firebase/auth'
import React, {  useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { auth } from '../../server/firebase'

function Navbar() {

  const {currentUser} = useContext(AuthContext)

  return (
    <>
        <div className="navbar">
            <div className="navbar_container">
                <span className='logo'>React Chat</span>
                <div className="user">
                    <img src={currentUser.photoURL}/>
                    <span>{currentUser.displayName}</span>
                    <button onClick={()=> signOut(auth)}>Выйти</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar