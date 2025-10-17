// src/pages/DashboardPage.tsx
import { useState, useEffect } from 'react';
import { Title, Text, Button, Textarea, Select, Loader, Group, Box, Card, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProfileDropdown } from '../components/ProfileDropdown';
//import { DashboardSidebar } from '../components/DashboardSidebar';
import { setPromptLibrary, getAllPrompts } from '../utils/PromptLibrary';
import { SavePromptModal } from '../components/SavePromptModel';
//import { SavedPrompt } from '../utils/PromptLibrary';

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
  const [saveModalOpened, setSaveModalOpened] = useState(false);
  // no local API key input here — removed per user request

  // Add event listener for clearing prompt
  useEffect(() => {
    const handleClearPrompt = () => {
      setPrompt('');
      setMasterPrompt('');
    };
    
    window.addEventListener('clearPrompt', handleClearPrompt);
    return () => {
      window.removeEventListener('clearPrompt', handleClearPrompt);
    };
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile(response.data);
      // Persist a lightweight user identifier for local prompt storage
      try {
        localStorage.setItem('promptpilot_user_email', response.data.email);
      } catch (e) {
        // ignore localStorage errors
      }
      // After fetching profile, attempt to sync library
      try {
        const libResp = await axios.get('http://127.0.0.1:8000/api/v1/library', { headers: { Authorization: `Bearer ${token}` } });
        const serverPrompts = libResp.data?.prompts || [];
        const localPrompts = getAllPrompts();
        if (!serverPrompts || serverPrompts.length === 0) {
          // Bulk upload local prompts to server
          if (localPrompts.length > 0) {
            await axios.post('http://127.0.0.1:8000/api/v1/library/bulk', localPrompts.map((p: any) => ({
              name: p.name,
              original_prompt: p.originalPrompt,
              generated_prompt: p.generatedPrompt,
              mode: p.mode,
              category: p.category
            })), { headers: { Authorization: `Bearer ${token}` } });
          }
        } else {
          // Replace local library with server canonical list
          // Convert server rows to local shape grouped by category
          const grouped: any = {};
          serverPrompts.forEach((s: any) => {
            const cat = s.category || 'General';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({
              id: s.id,
              name: s.name,
              originalPrompt: s.original_prompt,
              generatedPrompt: s.generated_prompt,
              mode: s.mode,
              category: cat,
              createdAt: s.created_at ? new Date(s.created_at) : new Date()
            });
          });
          setPromptLibrary(grouped);
          // notify sidebar to reload
          window.dispatchEvent(new Event('promptSaved'));
        }
      } catch (e) {
        console.warn('Library sync failed:', e);
      }
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
      const body: any = { user_prompt: prompt, mode: mode };
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/generate',
        body,
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

  const handlePromptSelect = (savedPrompt: any) => {
    setPrompt(savedPrompt.originalPrompt);
    setMode(savedPrompt.mode);
    // Populate the generated master prompt so user can view/copy it
    setMasterPrompt(savedPrompt.generatedPrompt || '');
  };

  return (
    <Box style={{ 
      display: 'flex', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #1a1b3a 0%, #2d1b69 25%, #3d2d7c 50%, #4a357c 75%, #5d4e75 100%)' 
    }}>
  {/* Sidebar */}
  <DashboardSidebar onPromptSelect={handlePromptSelect} userEmail={userProfile?.email} />
      
      {/* Main Content */}
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <Box
          style={{
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <ProfileDropdown userProfile={userProfile} onLogout={handleLogout} />
        </Box>

        {/* Main Dashboard Area */}
        <Box
          style={{
            flex: 1,
            padding: '3rem 2rem',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: masterPrompt ? 'flex-start' : 'center',
            overflowY: 'auto'
          }}
        >
          {!masterPrompt ? (
            // Welcome State
            <>
              <Box style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Avatar
                  size={100}
                  style={{
                    backgroundColor: '#4a9eff',
                    margin: '0 auto 2rem auto',
                    fontSize: '2.5rem'
                  }}
                >
                  ✨
                </Avatar>
                <Title
                  order={2}
                  style={{
                    color: '#4a9eff',
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}
                >
                  Welcome to PromptPilot!
                </Title>
                <Text
                  size="xl"
                  style={{
                    color: '#4a9eff',
                    fontSize: '1.3rem',
                    fontWeight: 500
                  }}
                >
                  Let's perfect your prompt craft!
                </Text>
              </Box>

              {/* Main Input Area */}
              <Box style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem' }}>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  Transform your prompts...
                </Text>
                
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    marginBottom: '1rem'
                  }}
                >
                  {/* API key input removed — users will manage API keys separately */}
                  <Textarea
                    placeholder="Type your prompt here..."
                    value={prompt}
                    onChange={(event) => setPrompt(event.currentTarget.value)}
                    minRows={3}
                    autosize
                      styles={{
                        input: {
                          border: 'none',
                          fontSize: '16px',
                          backgroundColor: 'transparent',
                          color: 'white',
                          '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.6)'
                          },
                          '&:focus': {
                            outline: 'none'
                          }
                        }
                      }}
                  />
                  
                  <Group justify="space-between" mt="md" align="center">
                    <Select
                      value={mode}
                      onChange={(value) => setMode(value || 'sniper')}
                      data={[
                        { label: '🎯 Sniper', value: 'sniper' },
                        { label: '⚡ Titan', value: 'titan' },
                        { label: '📋 JSON Mode', value: 'json' }
                      ]}
                      styles={{
                        input: {
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }
                      }}
                    />
                    
                    <Button
                      onClick={handleGenerate}
                      loading={isLoading}
                      style={{
                        backgroundColor: '#4a9eff',
                        borderRadius: '25px',
                        padding: '10px 30px',
                        fontWeight: 600
                      }}
                    >
                      Generate Prompt
                    </Button>
                  </Group>
                </Card>
              </Box>

            </>
          ) : (
            // Generated Prompt State
            <Box style={{ width: '100%', maxWidth: '1000px' }}>
                <Card
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    minHeight: '400px'
                  }}
              >
                <Box
                  style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '20px',
                    minHeight: '300px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    fontFamily: 'ui-monospace, SFMono-Regular, Monaco, Consolas, monospace',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: 'rgba(255, 255, 255, 0.9)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
                  }}
                >
                  {masterPrompt}
                </Box>
                
                <Group justify="space-between" mt="md">
                  <Button
                    variant="subtle"
                    onClick={() => setMasterPrompt('')}
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    ← Back to Generate
                  </Button>
                  <Group gap="sm">
                    <Button
                      onClick={() => setSaveModalOpened(true)}
                      variant="outline"
                      style={{
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px'
                      }}
                    >
                      💾 Save
                    </Button>
                    <Button
                      onClick={() => navigator.clipboard.writeText(masterPrompt)}
                      style={{
                        backgroundColor: '#4a9eff',
                        borderRadius: '8px'
                      }}
                    >
                      📋 Copy
                    </Button>
                  </Group>
                </Group>
              </Card>
            </Box>
          )}
          
          {isLoading && (
            <Group justify="center" mt="xl">
              <Loader color="#4a9eff" />
              <Text style={{ color: 'rgba(255, 255, 255, 0.8)', marginLeft: '12px' }}>
                Generating your masterprompt.....
              </Text>
            </Group>
          )}
        </Box>
      </Box>
      
      {/* Save Prompt Modal */}
      <SavePromptModal
        opened={saveModalOpened}
        onClose={() => setSaveModalOpened(false)}
        originalPrompt={prompt}
        generatedPrompt={masterPrompt}
        mode={mode}
        onSave={() => {
          // Optional: You could show a success notification here
          console.log('Prompt saved successfully!');
        }}
      />
    </Box>
  );
}