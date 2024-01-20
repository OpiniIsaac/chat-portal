import React, { useState } from 'react';
import './sidebar.css';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import LongMenu from './LongMenu';

function SideBar() {
  


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
        {/* <SidebarChat addNewChat/> */}
        {/* <SidebarChat />
        <SidebarChat />
        <SidebarChat /> */}
      </div>
    </div>
  );
}

export default SideBar;
