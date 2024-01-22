// UsersPage.js

import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UsersPage() {
  const [users, setUsers] = useState();
  const groupId = useSelector(state => state.group.group);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddMember = async (userId) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/groups/${groupId}/members`, { userId });
      // You can also update the local state to reflect the change if needed
      console.log('User added to group successfully');
    } catch (error) {
      console.error('Error adding user to group:', error.message);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      <List>
        {users?.map((user) => (
          <ListItem key={user._id}>
            <ListItemAvatar>
              <Avatar src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${user._id}`} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            <Button onClick={() => handleAddMember(user._id)} variant="outlined" color="primary">
              Add
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default UsersPage;
