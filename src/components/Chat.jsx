import React, { useEffect, useState, useRef } from 'react';
import './chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticonOutlined';
import MicButton from '@mui/icons-material/MicOutlined';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Chat() {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groups, setGroups] = useState([]);
  const groupId = useSelector(state => state.group.group);
  const chatBodyRef = useRef(null); // Create a ref for the chat body

  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/chat/test/group/${groupId}`);
        console.log(response.data.data);
        setGroups(response.data.data);
        console.log(groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
    fetchChatMessages();
  }, [groupId]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      if (!groupId) {
        return null;
      }
      const response = await axios.get(`http://localhost:4000/api/v1/chat/messages/${groupId}`);
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    try {
      e.preventDefault();
      // Assuming you have a function to get the current user ID
      const currentUserID = getCurrentUserID();

      // Sending a new message
      await axios.post('http://localhost:4000/api/v1/chat/', {
        sender_id: currentUserID,
        group_id: groupId, // Replace with the actual group ID
        content: newMessage,
      });

      // After sending, fetch updated messages
      fetchChatMessages();
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getCurrentUserID = () => {
    const storedUser = getUserFromLocalStorage();
    return storedUser.user._id;
  };

  const scrollToBottom = () => {
    // Scroll to the bottom of the chat body
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  return (
    <div className='Chat'>
      <div className="chat_header">
        <Avatar src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${seed}`} />

        <div className="chat_headerInfo">
          <h3>{groups.name}</h3>
         
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body" ref={chatBodyRef}>
        {messages.map((message) => (
          <p key={message._id} className={`chat_message ${message.sender_id._id === getCurrentUserID() ? 'chat_receiver' : ''}`}>
            <span className='chat_name'>{message.sender_id.name}</span>
            {message.content}
            <span className='chat_timestamp'>{new Date(message.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form onSubmit={handleSendMessage}>
          <input type="text" placeholder='Type a message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <IconButton type="submit" id="Send">
            <SendIcon />
          </IconButton>
        </form>

        <IconButton>
          <AttachFileOutlinedIcon />
        </IconButton>
        <IconButton>
          <MicButton />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
