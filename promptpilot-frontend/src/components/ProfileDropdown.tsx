// src/components/ProfileDropdown.tsx
import { Menu, Button, Avatar, Text, Group, Divider } from '@mantine/core';
import { IconUser, IconLogout, IconCoins } from '@tabler/icons-react';

interface ProfileDropdownProps {
  userProfile: {
    email: string;
    credits_remaining: number;
  } | null;
  onLogout: () => void;
}

export function ProfileDropdown({ userProfile, onLogout }: ProfileDropdownProps) {
  if (!userProfile) return null;

  return (
    <Menu shadow="md" width={220} position="bottom-end">
      <Menu.Target>
        <Button 
          variant="subtle" 
          style={{ 
            padding: '6px 12px',
            borderRadius: '50px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6'
          }}
        >
          <Group gap={8}>
            <Avatar size={28} style={{ backgroundColor: '#4a9eff' }}>
              <IconUser size={16} />
            </Avatar>
            <Text size="sm" style={{ color: '#495057', fontWeight: 500 }}>
              Profile
            </Text>
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown style={{
        backgroundColor: '#fff',
        border: '1px solid #dee2e6',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Menu.Label style={{ color: '#6c757d' }}>
          Account
        </Menu.Label>
        
        <Menu.Item
          leftSection={<IconUser size={16} />}
          style={{ color: '#495057' }}
        >
          <div>
            <Text size="sm" style={{ color: '#495057' }}>{userProfile.email}</Text>
            <Text size="xs" style={{ color: '#6c757d' }}>
              Account Email
            </Text>
          </div>
        </Menu.Item>

        <Divider style={{ borderColor: '#dee2e6' }} />

        <Menu.Item
          leftSection={<IconCoins size={16} />}
          style={{ color: '#4a9eff' }}
        >
          <div>
            <Text size="sm" style={{ color: '#4a9eff', fontWeight: 600 }}>
              {userProfile.credits_remaining} Credits
            </Text>
            <Text size="xs" style={{ color: '#6c757d' }}>
              Remaining Balance
            </Text>
          </div>
        </Menu.Item>

        <Divider style={{ borderColor: '#dee2e6' }} />

        <Menu.Item
          leftSection={<IconLogout size={16} />}
          onClick={onLogout}
          style={{ color: '#dc3545' }}
        >
          <Text size="sm" style={{ color: '#dc3545' }}>
            Logout
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}