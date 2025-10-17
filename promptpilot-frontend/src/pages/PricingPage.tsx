// src/pages/PricingPage.tsx
import { Container, Title, Text, Box } from '@mantine/core';

export function PricingPage() {
  return (
    <Box
      style={{
        minHeight: 'calc(100vh - 60px)',
        background: 'linear-gradient(135deg, #1a1b3a 0%, #2d1b69 25%, #3d2d7c 50%, #4a357c 75%, #5d4e75 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container size="md" style={{ textAlign: 'center' }}>
        <Title order={1} style={{ color: 'white', marginBottom: '2rem' }}>
          Pricing
        </Title>
        <Text size="xl" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Pricing page coming soon...
        </Text>
      </Container>
    </Box>
  );
}