// src/components/Navbar.tsx
import { Group, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { MetallicLogo } from './MetallicLogo';

export function Navbar() {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <Group justify="space-between" h="100%" px="lg">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <MetallicLogo />
      </Link>
      
      <Group gap="lg">
        <Button variant="subtle" component={Link} to="/" style={{ color: 'white', fontWeight: 500 }}>
          Home
        </Button>
        <Button variant="subtle" onClick={handleGenerateClick} style={{ color: 'white', fontWeight: 500 }}>
          Generate
        </Button>
        <Button variant="subtle" component={Link} to="/pricing" style={{ color: 'white', fontWeight: 500 }}>
          Pricing
        </Button>
      </Group>

      <Button 
        variant="outline" 
        style={{ 
          borderColor: '#4a9eff',
          color: '#4a9eff',
          fontWeight: 500
        }}
        component={Link}
        to="/login"
      >
        Get Started
      </Button>
    </Group>
  );
}
