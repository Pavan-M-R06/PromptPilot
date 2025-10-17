// src/pages/HomePage.tsx
import { Title, Text, Button, Stack, Container, Box, Grid, Card } from '@mantine/core';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, #1a1b3a 0%, #2d1b69 25%, #3d2d7c 50%, #4a357c 75%, #5d4e75 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Hero Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%'
        }}
      >
        <Container size="lg" style={{ textAlign: 'center', maxWidth: '100%', width: '100%' }}>
          <Stack gap="xl" align="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Title 
              order={1} 
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'white',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
            >
              Unlock Your{' '}
              <Text
                span
                style={{
                  background: 'linear-gradient(135deg, #4a9eff 0%, #1e6fff 50%, #0052ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(74, 158, 255, 0.3)',
                  filter: 'brightness(1.2)'
                }}
              >
                AI's
              </Text>
              <br />
              <Text
                span
                style={{
                  background: 'linear-gradient(135deg, #4a9eff 0%, #1e6fff 50%, #0052ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(74, 158, 255, 0.3)',
                  filter: 'brightness(1.2)'
                }}
              >
                True
              </Text>
              {' '}Potential
            </Title>
            
            <Text 
              size="xl" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '700px',
                lineHeight: 1.6,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                textAlign: 'center',
                margin: '0 auto 3rem auto'
              }}
            >
              Transform simple ideas into masterfully engineered prompts with our AI-powered platform. Your intelligent co-founder for AI-driven tasks.
            </Text>
            
            <Box style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
              <Box style={{ position: 'relative' }}>
                {/* Star border container */}
                <Box
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '-4px',
                    right: '-4px',
                    bottom: '-4px',
                    borderRadius: '54px',
                    background: 'linear-gradient(45deg, #ffd700, #ffed4e, #ffd700, #ffed4e)',
                    backgroundSize: '400% 400%',
                    animation: 'starBorder 3s ease-in-out infinite',
                    zIndex: 0,
                    opacity: 0.8
                  }}
                />
                <Button 
                  size="xl" 
                  component={Link} 
                  to="/login" 
                  style={{
                    background: 'linear-gradient(135deg, #4a9eff 0%, #1e6fff 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '16px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(74, 158, 255, 0.4)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 1,
                    minWidth: '180px',
                    height: '56px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(74, 158, 255, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(74, 158, 255, 0.4)';
                  }}
                >
                  ✨ Start Creating
                </Button>
              </Box>
              
              <Button 
                size="xl" 
                variant="outline"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  borderRadius: '50px',
                  padding: '16px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  minWidth: '180px',
                  height: '56px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                ⬇ Get Extension
              </Button>
            </Box>
          </Stack>
        </Container>
        
        {/* Scroll indicator */}
        <Box
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '1.5rem',
            animation: 'bounce 2s infinite',
          }}
        >
          ⌄
        </Box>
      </Box>

      {/* Advanced AI Algorithms Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 0'
        }}
      >
        <Container size="lg">
          <Box style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Box
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(74, 158, 255, 0.1)',
                border: '1px solid rgba(74, 158, 255, 0.3)',
                borderRadius: '25px',
                padding: '8px 16px',
                marginBottom: '2rem'
              }}
            >
              <Text
                size="sm"
                style={{
                  color: '#4a9eff',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                ✨ Advanced AI Algorithms
              </Text>
            </Box>
            
            <Title
              order={1}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '1.5rem',
                lineHeight: 1.1
              }}
            >
              Powered by Cutting-Edge Technology
            </Title>
            
            <Text
              size="xl"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6
              }}
            >
              Our proprietary algorithms will be revealed soon. Stay tuned for revolutionary prompt optimization technology.
            </Text>
          </Box>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%'
                }}
              >
                <Box
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(74, 158, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <Text size="xl">🎯</Text>
                </Box>
                
                <Title order={3} style={{ color: 'white', marginBottom: '1rem' }}>
                  Sniper Mode
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  Precision-focused prompts that hit the target with surgical accuracy. Perfect for specific, detailed outputs.
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%'
                }}
              >
                <Box
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 212, 59, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <Text size="xl">⚡</Text>
                </Box>
                
                <Title order={3} style={{ color: 'white', marginBottom: '1rem' }}>
                  Titan Mode
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  Powerful, comprehensive prompts that deliver robust results across complex scenarios and requirements.
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%'
                }}
              >
                <Box
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(81, 207, 102, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <Text size="xl">📋</Text>
                </Box>
                
                <Title order={3} style={{ color: 'white', marginBottom: '1rem' }}>
                  JSON Mode
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  Structured data output optimization for APIs, databases, and systematic information processing.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Chrome Extension Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 0'
        }}
      >
        <Container size="lg">
          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '1.5rem',
                  lineHeight: 1.1
                }}
              >
                Chrome Extension for Seamless Access
              </Title>
              
              <Text
                size="lg"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '2rem',
                  lineHeight: 1.6
                }}
              >
                Transform any text input on the web into professional prompts. Works with ChatGPT, Claude, Gemini, and any AI platform.
              </Text>

              <Stack gap="md" style={{ marginBottom: '2rem' }}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Text size="lg">✨</Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Works with all AI tools</Text>
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Text size="lg">🔒</Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>100% Privacy Protected</Text>
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Text size="lg">⚡</Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>One-click enhancement</Text>
                </Box>
              </Stack>

              <Button
                size="lg"
                style={{
                  background: 'linear-gradient(135deg, #b794f6 0%, #9f7aea 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '12px 24px',
                  fontWeight: 600
                }}
              >
                Add to Chrome - Free
              </Button>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card
                shadow="xl"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '1.1rem',
                    textAlign: 'center'
                  }}
                >
                  [Extension Preview Mockup]
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose PromptPilot Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 0'
        }}
      >
        <Container size="lg">
          <Box style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Title
              order={1}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '1.5rem',
                lineHeight: 1.1
              }}
            >
              Why Choose PromptPilot?
            </Title>
            
            <Text
              size="xl"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6
              }}
            >
              Professional-grade prompt engineering made simple and accessible
            </Text>
          </Box>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Box
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(74, 158, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                  }}
                >
                  <Text size="xl">💡</Text>
                </Box>
                
                <Title order={3} style={{ color: 'white', marginBottom: '1rem' }}>
                  Smart Role Detection
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  Automatically identifies your role and context to create persona-aware prompts with high accuracy
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Box
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(155, 116, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                  }}
                >
                  <Text size="xl">✨</Text>
                </Box>
                
                <Title order={3} style={{ color: 'white', marginBottom: '1rem' }}>
                  Offline Algorithm
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  Advanced offline engine that works without API dependencies, ensuring privacy and reliability
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Box
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(100, 184, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                  }}
                >
                  <Text size="xl">✅</Text>
                </Box>
                
                <Title order={3} style={{ color: 'white', marginBottom: '1rem' }}>
                  Master Prompts
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  Generates comprehensive, structured prompts optimized for maximum LLM performance
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Box
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(81, 207, 102, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                  }}
                >
                  <Text size="xl">📚</Text>
                </Box>
                
                <Title order={3} style={{ color: 'white', marginBottom: '1rem' }}>
                  History & Export
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  Save, organize, and export your prompts in multiple formats for easy sharing and reuse
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Transform Ideas Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 0'
        }}
      >
        <Container size="lg">
          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: '2rem'
                }}
              >
                <Text
                  span
                  style={{
                    color: 'white'
                  }}
                >
                  Transform Ideas into 
                </Text>
                <Text
                  span
                  style={{
                    background: 'linear-gradient(135deg, #b794f6 0%, #9f7aea 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 'bold'
                  }}
                >
                  Powerful Prompts
                </Text>
                <br />
                <Text
                  span
                  style={{
                    color: 'white'
                  }}
                >
                  Instantly
                </Text>
              </Title>
              
              <Text
                size="lg"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '2rem',
                  lineHeight: 1.6
                }}
              >
                PromptPilot uses advanced AI algorithms to convert your rough ideas into structured, professional prompts that deliver exceptional results across all AI platforms. Stop struggling with prompt engineering.
              </Text>

              <Stack gap="md" style={{ marginBottom: '2rem' }}>
                <Box style={{ display: 'flex', gap: '1rem' }}>
                  <Button
                    size="lg"
                    style={{
                      background: 'linear-gradient(135deg, #b794f6 0%, #9f7aea 100%)',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 24px',
                      fontWeight: 600,
                      flex: 1
                    }}
                  >
                    Start Creating Prompts →
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      borderRadius: '25px',
                      padding: '12px 24px',
                      fontWeight: 600,
                      backgroundColor: 'transparent',
                      flex: 1
                    }}
                  >
                    Get Chrome Extension
                  </Button>
                </Box>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <Box
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  <Text size="lg" style={{ color: '#4a9eff', marginBottom: '1rem' }}>💡</Text>
                  <Title order={4} style={{ color: 'white', marginBottom: '0.5rem' }}>
                    Smart AI Algorithm
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Advanced algorithms analyze your input and automatically structure it into effective prompts that get better AI responses.
                  </Text>
                </Box>

                <Box
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  <Text size="lg" style={{ color: '#9f7aea', marginBottom: '1rem' }}>👤</Text>
                  <Title order={4} style={{ color: 'white', marginBottom: '0.5rem' }}>
                    Context-Aware Processing
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Automatically detects the context and purpose of your request to create role-specific prompts tailored to your needs.
                  </Text>
                </Box>

                <Box
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  <Text size="lg" style={{ color: '#51cf66', marginBottom: '1rem' }}>🌐</Text>
                  <Title order={4} style={{ color: 'white', marginBottom: '0.5rem' }}>
                    Universal Compatibility
                  </Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Works seamlessly with all major AI platforms and integrates directly into your browser for instant access.
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* AI Platform Compatibility Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 0'
        }}
      >
        <Container size="lg" style={{ textAlign: 'center' }}>
          <Box
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(155, 116, 246, 0.1)',
              border: '1px solid rgba(155, 116, 246, 0.3)',
              borderRadius: '25px',
              padding: '8px 16px',
              marginBottom: '2rem'
            }}
          >
            <Text
              size="sm"
              style={{
                color: '#b794f6',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              ✨ Universal AI Compatibility
            </Text>
          </Box>
          
          <Title
            order={1}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}
          >
            Works with all major AI platforms<br />and web browsers
          </Title>
          
          <Text
            size="xl"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '700px',
              margin: '0 auto 4rem auto',
              lineHeight: 1.6
            }}
          >
            PromptPilot seamlessly integrates with your favorite AI tools and works across all modern browsers
          </Text>

          {/* AI Platforms */}
          <Box style={{ marginBottom: '4rem' }}>
            <Stack gap="xl">
              <Box style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                {/* ChatGPT */}
                <Box style={{ textAlign: 'center' }}>
                  <Box
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#10a37f',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    C
                  </Box>
                  <Text style={{ color: 'white', fontWeight: 600 }}>ChatGPT</Text>
                </Box>

                {/* Claude */}
                <Box style={{ textAlign: 'center' }}>
                  <Box
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#ff6b35',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Cl
                  </Box>
                  <Text style={{ color: 'white', fontWeight: 600 }}>Claude</Text>
                </Box>

                {/* Gemini */}
                <Box style={{ textAlign: 'center' }}>
                  <Box
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#4285f4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    G
                  </Box>
                  <Text style={{ color: 'white', fontWeight: 600 }}>Gemini</Text>
                </Box>

                {/* Mistral */}
                <Box style={{ textAlign: 'center' }}>
                  <Box
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#ff6b6b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    M
                  </Box>
                  <Text style={{ color: 'white', fontWeight: 600 }}>Mistral</Text>
                </Box>

                {/* DeepSeek */}
                <Box style={{ textAlign: 'center' }}>
                  <Box
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#6366f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    D
                  </Box>
                  <Text style={{ color: 'white', fontWeight: 600 }}>DeepSeek</Text>
                </Box>

                {/* More */}
                <Box style={{ textAlign: 'center' }}>
                  <Box
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '2px dashed rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      color: 'white',
                      fontSize: '2rem'
                    }}
                  >
                    +
                  </Box>
                  <Text style={{ color: 'white', fontWeight: 600 }}>& More</Text>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.1rem'
            }}
          >
            Compatible with Chrome, Firefox, Safari, Edge and all modern browsers
          </Text>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 0'
        }}
      >
        <Container size="lg" style={{ textAlign: 'center' }}>
          <Title
            order={1}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '1rem',
              lineHeight: 1.1
            }}
          >
            Simple, Transparent Pricing
          </Title>
          
          <Text
            size="xl"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto 4rem auto',
              lineHeight: 1.6
            }}
          >
            Choose the plan that works best for you
          </Text>

          <Grid gutter="xl" justify="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Free Plan */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Title order={2} style={{ color: '#b794f6', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                  Free Plan
                </Title>
                
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
                  Perfect for getting started
                </Text>
                
                <Box style={{ marginBottom: '1.5rem' }}>
                  <Text
                    style={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: 'white',
                      lineHeight: 1
                    }}
                  >
                    $0
                  </Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Forever free
                  </Text>
                </Box>
                
                <Button
                  component={Link}
                  to="/signup"
                  size="lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontWeight: 600,
                    width: '100%',
                    marginBottom: '1rem'
                  }}
                >
                  Get Started Free
                </Button>
                
                <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  No credit card required
                </Text>
              </Card>
            </Grid.Col>

            {/* Pro Plan */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box style={{ position: 'relative' }}>
                {/* Most Popular Badge */}
                <Box
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#b794f6',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    zIndex: 1
                  }}
                >
                  Most Popular
                </Box>
                
                <Card
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid #b794f6',
                    height: '100%',
                    textAlign: 'center'
                  }}
                >
                  <Title order={2} style={{ color: '#b794f6', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                    Pro Plan
                  </Title>
                  
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
                    For power users and professionals
                  </Text>
                  
                  <Box style={{ marginBottom: '1.5rem' }}>
                    <Text
                      style={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: 'white',
                        lineHeight: 1
                      }}
                    >
                      Coming Soon
                    </Text>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Pricing will be announced soon
                    </Text>
                  </Box>
                  
                  <Button
                    size="lg"
                    style={{
                      background: 'linear-gradient(135deg, #b794f6 0%, #9f7aea 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontWeight: 600,
                      width: '100%',
                      marginBottom: '1rem'
                    }}
                  >
                    Join Waitlist
                  </Button>
                  
                  <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Be the first to know when Pro launches
                  </Text>
                </Card>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        style={{
          padding: '5rem 2rem',
          margin: '2rem',
          marginBottom: '5rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #b794f6 0%, #9f7aea 100%)',
          textAlign: 'center'
        }}
      >
        <Container size="md">
          <Title
            order={1}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#1a1b3a',
              marginBottom: '1rem',
              lineHeight: 1.1
            }}
          >
            Ready to Transform Your Prompts?
          </Title>
          
          <Text
            size="lg"
            style={{
              color: 'rgba(26, 27, 58, 0.8)',
              marginBottom: '2rem',
              lineHeight: 1.6
            }}
          >
            Join thousands of professionals who trust PromptPilot for their AI interactions
          </Text>
          
          <Box style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/signup"
              size="lg"
              style={{
                backgroundColor: '#1a1b3a',
                color: 'white',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: 600,
                border: 'none',
                minWidth: '160px'
              }}
            >
              Start Free Today
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              style={{
                borderColor: 'rgba(26, 27, 58, 0.3)',
                color: '#1a1b3a',
                backgroundColor: 'transparent',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: 600,
                minWidth: '160px'
              }}
            >
              Download Extension
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '3rem 0 2rem 0'
        }}
      >
        <Container size="lg">
          <Grid gutter="xl">
            {/* Brand Section */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box style={{ marginBottom: '1.5rem' }}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Box
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #b794f6 0%, #9f7aea 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    ✨
                  </Box>
                  <Text
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'white'
                    }}
                  >
                    PromptPilot
                  </Text>
                </Box>
                
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}
                >
                  Transform vague ideas into professional prompts with advanced AI algorithms.
                </Text>
                
                {/* Social Links */}
                <Box style={{ display: 'flex', gap: '1rem' }}>
                  <Box
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <Text style={{ color: 'white' }}>𝕏</Text>
                  </Box>
                  <Box
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <Text style={{ color: 'white' }}>in</Text>
                  </Box>
                  <Box
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <Text style={{ color: 'white' }}>📌</Text>
                  </Box>
                </Box>
              </Box>
            </Grid.Col>
            
            {/* Product Links */}
            <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              >
                Product
              </Text>
              <Stack gap="sm">
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Prompt Generator
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Chrome Extension
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  API Access
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Prompt Templates
                </Text>
              </Stack>
            </Grid.Col>
            
            {/* Company Links */}
            <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              >
                Company
              </Text>
              <Stack gap="sm">
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  About Us
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Blog
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Careers
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Contact
                </Text>
              </Stack>
            </Grid.Col>
            
            {/* Support Links */}
            <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              >
                Support
              </Text>
              <Stack gap="sm">
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Help Center
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Documentation
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Privacy Policy
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                  Terms of Service
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
          
          {/* Bottom Footer */}
          <Box
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '3rem',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              © 2025 PromptPilot. All rights reserved.
            </Text>
            
            <Box style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                Privacy
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                Terms
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                Cookies
              </Text>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Add bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        @keyframes starBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Box>
  );
}
