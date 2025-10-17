// src/pages/SignupPage.tsx
import axios from 'axios';
import { AuthForm } from '../components/AuthForm';
import { Title, Paper, Text } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/signup', {
        email: values.email,
        password: values.password,
        username: values.username, // Included username in the signup request
      });
      console.log('Signup successful:', response.data);
      alert('Signup successful! Please check your email to confirm your account.');
    } catch (error) {
      alert('Signup failed. The email might already be in use.');
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
          Create Your Account
        </Title>
        <Text ta="center" c="dimmed" mb="xl" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Already have an account? <Link to="/login" style={{ color: '#4a9eff' }}>Log in</Link>
        </Text>
        <AuthForm onSubmit={handleSignup} submitText="Sign Up" isLoading={isLoading} />
      </Paper>
    </div>
  );
}