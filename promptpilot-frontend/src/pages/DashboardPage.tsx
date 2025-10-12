// src/pages/DashboardPage.tsx
import { useState, useEffect } from 'react';
import { Title, Text, Button, Textarea, Select, Code, Paper, Loader, Group, Badge } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UserProfile {
  id: string;
  email: string;
  credits_remaining: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('sniper');
  const [masterPrompt, setMasterPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile(response.data);
    } catch (error) {
      handleLogout(); // If we can't get the profile, the token is likely invalid/expired
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile(token);
    }
  }, [navigate]);

  const handleGenerate = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication error. Please log in again.');
      return;
    }

    setIsLoading(true);
    setMasterPrompt('');

    // --- ADD THIS LINE FOR DEBUGGING ---
    console.log("Data being sent to backend:", { user_prompt: prompt, mode: mode });
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/generate',
        { user_prompt: prompt, mode: mode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMasterPrompt(response.data.master_prompt);
      if (userProfile) { // Optimistically update credits on the frontend
        setUserProfile({ ...userProfile, credits_remaining: userProfile.credits_remaining - 1 });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 402) {
        alert('You have no credits remaining.');
      } else {
        alert('An error occurred while generating the prompt.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Paper p="xl" withBorder maw={800} mx="auto" mt="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>PromptPilot Dashboard</Title>
        <Group>
            {userProfile && <Badge size="lg" variant="light">Credits: {userProfile.credits_remaining}</Badge>}
            <Button onClick={handleLogout} variant="outline">Logout</Button>
        </Group>
      </Group>

      <Textarea
        label="Your Simple Prompt"
        placeholder="e.g., Write a python script to scrape a website"
        autosize
        minRows={3}
        value={prompt}
        onChange={(event) => setPrompt(event.currentTarget.value)}
      />

      <Select
        label="Select a Mode"
        value={mode}
        onChange={(value) => setMode(value || 'sniper')}
        data={[
          { label: 'Sniper Mode', value: 'sniper' },
          { label: 'Titan Mode', value: 'titan' },
          { label: 'JSON Mode', value: 'json' },
        ]}
        mt="md"
      />

      <Button fullWidth onClick={handleGenerate} mt="xl" size="lg" loading={isLoading}>
        Generate Master Prompt
      </Button>

      {isLoading && <Loader mt="xl" mx="auto" display="block" />}

      {masterPrompt && (
        <Paper withBorder p="md" mt="xl" shadow="xs">
            <Text fw={700} mb="xs">Generated Master Prompt:</Text>
            <Code block style={{ whiteSpace: 'pre-wrap' }}>{masterPrompt}</Code>
        </Paper>
      )}
    </Paper>
  );
}