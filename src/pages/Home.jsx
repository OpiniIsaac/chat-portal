import React from 'react'
import SideBar from '../components/SideBar'
import './Home.css'
import Chat from '../components/Chat'
export default function Home() {
  return (
    <>
          
      <div className = "app_body">
        <SideBar />
        <Chat />
      </div>      
     
    </>
  )
}
