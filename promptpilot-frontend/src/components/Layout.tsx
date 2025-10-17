// src/components/Layout.tsx
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header 
        style={{
          background: 'linear-gradient(135deg, #1a1b3a 0%, #2d1b69 100%)',
          borderBottom: 'none'
        }}
      >
        <Navbar />
      </AppShell.Header>
      <AppShell.Main style={{ padding: 0, width: '100vw', overflow: 'hidden' }}>
        <Outlet /> {/* This is where our pages will be rendered */}
      </AppShell.Main>
    </AppShell>
  );
}
