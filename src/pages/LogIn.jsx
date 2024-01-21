import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authActions } from '../context/authSlice';
import axios from 'axios';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
     event.preventDefault();
 
     try {
       const response = await axios.post('http://localhost:4000/api/v1/auth/login', { 
        email, password });
 
       dispatch(authActions.loginUser(response.data)); 
       console.log(response.data)
       navigate('/'); // Redirect to home page
     } catch (error) {
       console.error('Login error:', error);
       // Handle login errors appropriately (e.g., display error messages)
     }
   };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ mt: 8, p: 2 }}>
        <CardContent>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
        
            >
              Sign In
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don;t have an account? <Link to="/register">Sign Up</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginForm;
