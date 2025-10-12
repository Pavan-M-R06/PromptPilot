// src/components/Navbar.tsx
import { Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <Group justify="space-between" h="100%">
      <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
        PromptPilot
      </Link>
      <Group>
        <Button variant="default" component={Link} to="/history">History</Button>
        <Button variant="default" component={Link} to="/get-extension">Get Extension</Button>
        <Button component={Link} to="/login">Get Started</Button>
      </Group>
    </Group>
  );
}