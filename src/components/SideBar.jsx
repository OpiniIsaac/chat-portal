import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import { Chat, DonutLarge, SearchOutlined } from '@mui/icons-material';
import LongMenu from './LongMenu';
import SideBarChat from './SideBarChat';


function SideBar() {
  const [groups, setGroups] = useState([]);
 

  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    console.log(storedUser.user._id)
    if (storedUser) {
      const userId = storedUser.user._id;
      console.log(userId)

      const fetchGroups = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/v1/chat/groups/${userId}`);
          console.log(response.data.data);
          setGroups(response.data.data);
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      };

      fetchGroups();
    }
  }, []);

  return (
    <div className='sidebar'>
      <div className="sidebar_header">
        <Avatar>Op</Avatar>
        <div className="sidebar_headerRight">
          <IconButton> <DonutLarge/> </IconButton>
          <IconButton> <Chat/> </IconButton>
          <LongMenu/>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SideBarChat addNewChat />
        {groups.map((group) => (
          <SideBarChat key={group._id} name={group.name} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
