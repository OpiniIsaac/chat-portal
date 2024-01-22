import React, { useEffect, useState } from 'react';
import './chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticonOutlined';
import MicButton from '@mui/icons-material/MicOutlined';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function Chat() {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');



  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    // Fetch chat messages when the component mounts
    fetchChatMessages();
  }, []);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/chat/messages/65ad19be14364b1bd9246ae4');
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      // Assuming you have a function to get the current user ID
      const currentUserID = "65ad1aae14364b1bd9246aea";

      // Sending a new message
      await axios.post('http://localhost:4000/api/v1/chat/', {
        sender_id: currentUserID,
        group_id: '65ad19be14364b1bd9246ae4', // Replace with the actual group ID
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
    // Replace this with the logic to get the current user ID
    // For example, you might have user authentication implemented
    return '65ad1aae14364b1bd9246aea';
  };

  return (
    <div className='Chat'>
      <div className="chat_header">
        <Avatar src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${seed}`} />

        <div className="chat_headerInfo">
          <h3>Ronaldo</h3>
          <p>Last seen in Saudi League</p>
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
      <div className="chat_body">
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
        <form>
        <input type="text" placeholder='Type a message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <IconButton onClick={handleSendMessage} id="Send">
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
