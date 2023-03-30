import React from 'react'
import ChatUser from './sidebar/Chat-user'
import Navbar from './sidebar/Navbar'
import Search from './sidebar/Search'

function Sidebar() {
  return (
    <>
        <div className="sidebar">
            <div className="sidebar_wrap">
                <Navbar />
                <Search />
                <ChatUser />
            </div>
        </div>
    </>
  )
}

export default Sidebar