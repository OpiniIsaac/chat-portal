import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './sidebarchat.css'
import { useDispatch } from 'react-redux';
import { groupActions } from '../context/actionslice';


function SideBarChat({addNewChat,name,id}) {
  const [seed, setSeed] = useState('');
  const dispatch = useDispatch()
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // do some clever database stuff
    }
  };
  const handleClick =()=>{
dispatch(groupActions.clicked(id))
console.log('clicked')
  }
    
  return !addNewChat ?(
    <div className='SidebarChat' onClick={handleClick}>
      <Avatar src = { `https://api.dicebear.com/5.x/avataaars/svg?seed=${seed}`} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        
      </div>
    </div>
  ): (
    <div onClick= {createChat} className='SidebarChat'>
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SideBarChat