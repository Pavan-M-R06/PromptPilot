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
    <Paper withBorder shadow="md" p={30} radius="md" maw={400} mx="auto">
      <Title ta="center" order={2} mb="xs">
        Welcome Back
      </Title>
      <Text ta="center" c="dimmed" mb="xl">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Text>
      <AuthForm onSubmit={handleLogin} submitText="Login" isLoading={isLoading} />
    </Paper>
  );
}