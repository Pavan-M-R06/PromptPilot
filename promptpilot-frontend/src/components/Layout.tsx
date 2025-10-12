// src/components/Layout.tsx
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet /> {/* This is where our pages will be rendered */}
      </AppShell.Main>
    </AppShell>
  );
}