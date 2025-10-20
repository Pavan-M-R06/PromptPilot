// src/components/DashboardSidebar.tsx
import { useState, useEffect } from 'react';
import { Box, Text, TextInput, Stack, Group, UnstyledButton, ActionIcon, Menu, rem, Button } from '@mantine/core';
import { IconSearch, IconPlus, IconFolder, IconChevronDown, IconChevronRight, IconTrash, IconDots } from '@tabler/icons-react';
import { MetallicLogo } from './MetallicLogo';
import { getPromptLibrary, deletePrompt, searchPrompts } from '../utils/PromptLibrary';
import type { SavedPrompt, PromptLibrary } from '../utils/PromptLibrary';

interface DashboardSidebarProps {
  onPromptSelect?: (prompt: SavedPrompt) => void;
  userEmail?: string | undefined;
}

export function DashboardSidebar({ onPromptSelect, userEmail }: DashboardSidebarProps) {
  const [library, setLibrary] = useState<PromptLibrary>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [searchResults, setSearchResults] = useState<SavedPrompt[]>([]);

  const loadLibrary = () => {
    try {
      const currentLibrary = getPromptLibrary();
      setLibrary(currentLibrary);
      const expanded: { [key: string]: boolean } = {};
      Object.keys(currentLibrary).forEach(category => {
        if (currentLibrary[category].length > 0) expanded[category] = true;
      });
      setExpandedCategories(expanded);
    } catch (error) {
      console.error('Error loading library:', error);
      setLibrary({});
    }
  };

  useEffect(() => {
    loadLibrary();

    const handlePromptSaved = () => loadLibrary();
    window.addEventListener('promptSaved', handlePromptSaved as EventListener);
    return () => window.removeEventListener('promptSaved', handlePromptSaved as EventListener);
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    try { localStorage.setItem('promptpilot_user_email', userEmail); } catch (e) {}
    loadLibrary();
  }, [userEmail]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchPrompts(searchQuery.trim());
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <Box style={{ width: '250px', height: '100vh', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderRight: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem 0', display: 'flex', flexDirection: 'column' }}>
      <Box px="lg" mb="lg">
        <MetallicLogo />
      </Box>

      <Stack gap="xs" px="sm" mb="xl">
        <UnstyledButton
          style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(74, 158, 255, 0.1)', border: '1px solid rgba(74, 158, 255, 0.2)', width: '100%', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => window.dispatchEvent(new CustomEvent('clearPrompt'))}
        >
          <IconPlus size={20} style={{ color: '#4a9eff' }} />
          <Text style={{ color: '#4a9eff', fontWeight: 600 }}>New Prompt</Text>
        </UnstyledButton>
      </Stack>

      <Box px="sm" mb="lg">
        <TextInput placeholder="Search prompts..." value={searchQuery} onChange={(event) => setSearchQuery(event.currentTarget.value)} leftSection={<IconSearch size={16} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />} styles={{ input: { background: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '8px', fontSize: '14px', color: 'white' } }} />
      </Box>

      <Box px="sm" flex={1} style={{ overflowY: 'auto' }}>
        <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '11px' }}>
          My Prompt Libraries
        </Text>

        {searchQuery && (
          <Box mb="md">
            <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>Search Results ({searchResults.length})</Text>
            {searchResults.length === 0 ? (
              <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}>No prompts found</Text>
            ) : (
              <Stack gap="xs">
                {searchResults.map(prompt => (
                  <PromptItem key={prompt.id} prompt={prompt} onSelect={onPromptSelect} onDelete={() => { if (prompt.category) { deletePrompt(prompt.id, prompt.category); loadLibrary(); } }} />
                ))}
              </Stack>
            )}
          </Box>
        )}

        {!searchQuery && (
          <>
            {Object.keys(library).length === 0 ? (
              <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>No saved prompts yet. Generate and save your first prompt!</Text>
            ) : (
              <Stack gap="xs">
                {Object.entries(library).map(([category, prompts]) => (
                  <CategorySection
                    key={category}
                    category={category}
                    prompts={prompts}
                    expanded={expandedCategories[category] || false}
                    onToggleExpanded={() => setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }))}
                    onPromptSelect={onPromptSelect}
                    onPromptDelete={(promptId) => { deletePrompt(promptId, category); loadLibrary(); }}
                  />
                ))}
              </Stack>
            )}
          </>
        )}
      </Box>

      <Box px="sm" mb="lg">
        <Group style={{ justifyContent: 'center' }}>
          <Button variant="light" onClick={() => {
            try {
              const data = getPromptLibrary();
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'promptpilot_prompts.json';
              a.click();
              URL.revokeObjectURL(url);
            } catch (e) {
              console.warn('Export failed', e);
            }
          }}>
            Export Library
          </Button>
        </Group>
      </Box>
    </Box>
  );
}

/* Helper and subcomponents */

function CategorySection({ category, prompts, expanded, onToggleExpanded, onPromptSelect, onPromptDelete }: {
  category: string;
  prompts: SavedPrompt[];
  expanded: boolean;
  onToggleExpanded: () => void;
  onPromptSelect?: (p: SavedPrompt) => void;
  onPromptDelete: (id: string) => void;
}) {
  return (
    <Box>
      <UnstyledButton onClick={onToggleExpanded} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px', borderRadius: '6px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: 500, transition: 'background-color 0.2s ease' }}>
        {expanded ? <IconChevronDown size={16} style={{ color: 'rgba(255,255,255,0.6)' }} /> : <IconChevronRight size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />}
        <IconFolder size={16} style={{ color: '#4a9eff' }} />
        <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{category} ({prompts.length})</Text>
      </UnstyledButton>
      {expanded && (
        <Stack gap="xs" style={{ padding: '8px' }}>
          {prompts.map(p => (
            <PromptItem key={p.id} prompt={p} onSelect={onPromptSelect} onDelete={() => onPromptDelete(p.id)} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

function PromptItem({ prompt, onSelect, onDelete }: { prompt: SavedPrompt; onSelect?: (p: SavedPrompt) => void; onDelete: () => void }) {
  return (
    <Group justify="space-between" style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseOver={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74, 158, 255, 0.3)'; }} onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}>
      <Box style={{ flex: 1 }} onClick={() => onSelect && onSelect(prompt)}>
        <Group gap="xs" align="flex-start">
          <Text size="xs" style={{ color: getModeColor(prompt.mode), fontSize: '12px' }}>{getModeIcon(prompt.mode)}</Text>
          <Box style={{ flex: 1 }}>
            <Text size="sm" fw={500} style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', lineHeight: 1.3, marginBottom: '2px' }} lineClamp={2}>{prompt.name}</Text>
            <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px', lineHeight: 1.2 }} lineClamp={1}>{prompt.generatedPrompt || prompt.originalPrompt}</Text>
          </Box>
        </Group>
      </Box>

      <Menu position="bottom-end" shadow="md">
        <Menu.Target>
          <ActionIcon variant="subtle" size="sm" onClick={(e) => e.stopPropagation()} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            <IconDots size={14} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown style={{ backgroundColor: 'rgba(30, 30, 45, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} onClick={(e) => { e.stopPropagation(); if (confirm('Are you sure you want to delete this prompt?')) onDelete(); }}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

function getModeColor(mode?: string) {
  switch (mode) {
    case 'sniper': return '#ff6b6b';
    case 'titan': return '#ffd43b';
    case 'json': return '#51cf66';
    default: return '#4a9eff';
  }
}

function getModeIcon(mode?: string) {
  switch (mode) {
    case 'sniper': return '🎯';
    case 'titan': return '💪';
    case 'json': return '{ }';
    default: return '✳️';
  }
}
