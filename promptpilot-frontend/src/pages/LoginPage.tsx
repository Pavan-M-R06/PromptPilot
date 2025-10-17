// src/pages/LoginPage.tsx
import axios from 'axios';
import { AuthForm } from '../components/AuthForm';
import { Title, Paper, Text } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', {
        email: values.email,
        password: values.password,
      });
      
      const { access_token } = response.data;
      console.log('Login successful. Token:', access_token);
      
      // We will store the token and redirect the user
      localStorage.setItem('authToken', access_token);

       // Redirect to the dashboard on successful login
      navigate('/dashboard'); 
      // In the future, we will redirect to the main app dashboard:
      // window.location.href = '/app'; 

    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      background: 'linear-gradient(135deg, #1a1b3a 0%, #2d1b69 25%, #3d2d7c 50%, #4a357c 75%, #5d4e75 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <Paper withBorder shadow="xl" p={40} radius="lg" maw={450} mx="auto" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Title ta="center" order={2} mb="xs" style={{ color: 'white' }}>
          Welcome Back
        </Title>
        <Text ta="center" c="dimmed" mb="xl" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#4a9eff' }}>Sign up</Link>
        </Text>
        <AuthForm onSubmit={handleLogin} submitText="Login" isLoading={isLoading} />
      </Paper>
    </div>
  );
}