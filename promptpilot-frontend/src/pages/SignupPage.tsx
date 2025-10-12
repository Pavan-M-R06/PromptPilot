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
    <Paper withBorder shadow="md" p={30} radius="md" maw={400} mx="auto">
      <Title ta="center" order={2} mb="xs">
        Create Your Account
      </Title>
      <Text ta="center" c="dimmed" mb="xl">
        Already have an account? <Link to="/login">Log in</Link>
      </Text>
      <AuthForm onSubmit={handleSignup} submitText="Sign Up" isLoading={isLoading} />
    </Paper>
  );
}