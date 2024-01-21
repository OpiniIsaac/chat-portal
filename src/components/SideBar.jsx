import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import LongMenu from './LongMenu';
import SideBarChat from './SideBarChat';

function SideBar() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userId = '65acbe29025c59e9415b7e12'
        const response = await axios.get(`http://localhost:4000/api/v1/chat/groups/65aa1a4bb8aa74d02f4cb807`);
        setGroups(response.data.data);
      } catch (error) {
        // Handle error (display an error message, log the error, etc.)
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
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
          <input type="text" placeholder="Search or start new chat" />
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
