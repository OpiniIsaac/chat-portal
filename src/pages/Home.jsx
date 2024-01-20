import React from 'react'
import SideBar from '../components/SideBar'
import './Home.css'
export default function Home() {
  return (
    <>
    <div className="app">      
      <div className = "app_body">
        <SideBar />
        {/* <Chat /> */}
      </div>      
    </div>  
    </>
  )
}
