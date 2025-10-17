// src/components/MetallicLogo.tsx
import { Box, Text } from '@mantine/core';

export function MetallicLogo() {
  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Box
        style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #4a9eff, #1e6fff, #0052ff)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(74, 158, 255, 0.3)',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 100%)',
            borderRadius: '8px',
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
          }}
        >
          ✓
        </Text>
      </Box>
      <Text
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #c0c0c0, #e8e8e8, #f5f5f5, #d3d3d3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          textShadow: '0 1px 2px rgba(255,255,255,0.3)',
        }}
      >
        PromptPilot
      </Text>
    </Box>
  );
}