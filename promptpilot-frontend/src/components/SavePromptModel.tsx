// src/components/SavePromptModal.tsx
import { useState } from 'react';
import { Modal, TextInput, Select, Button, Group, Stack } from '@mantine/core';
import axios from 'axios';
import { savePromptToLibrary, getCategories } from '../utils/PromptLibrary';

interface SavePromptModalProps {
  opened: boolean;
  onClose: () => void;
  originalPrompt: string;
  generatedPrompt: string;
  mode: string;
  onSave: () => void;
}

export function SavePromptModal({
  opened,
  onClose,
  originalPrompt,
  generatedPrompt,
  mode,
  onSave
}: SavePromptModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const categories = getCategories();
  // categoryOptions intentionally unused - kept for future extension

  // Add default categories if none exist
  const defaultCategories = ['General', 'Marketing', 'Writing', 'Coding', 'Analysis'];
  const allCategories = [...new Set([...categories, ...defaultCategories])];
  const finalOptions = [...allCategories.map(cat => ({ label: cat, value: cat })), { label: 'Create New Category', value: '__custom__' }];

  const handleSave = () => {
    if (!name.trim()) return;

    const finalCategory = isCustomCategory ? customCategory.trim() : category;
    if (!finalCategory) return;

    savePromptToLibrary(name.trim(), originalPrompt, generatedPrompt, mode, finalCategory);
    
    // Try to persist to server (best-effort). If it fails, ignore for now.
    (async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        await axios.post('http://127.0.0.1:8000/api/v1/library', {
          name: name.trim(),
          original_prompt: originalPrompt,
          generated_prompt: generatedPrompt,
          mode,
          category: finalCategory
        }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (e) {
        // TODO: queue for retry later
        console.warn('Failed to save prompt to server:', e);
      }
    })();

    // Trigger refresh event for sidebar
    window.dispatchEvent(new Event('promptSaved'));
    
    onSave();
    onClose();
    
    // Reset form
    setName('');
    setCategory('General');
    setIsCustomCategory(false);
    setCustomCategory('');
  };

  const handleCategoryChange = (value: string | null) => {
    if (value === '__custom__') {
      setIsCustomCategory(true);
      setCategory('');
    } else {
      setIsCustomCategory(false);
      setCategory(value || 'General');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Save Prompt to Library"
      centered
      // Mantine styles typing can be strict; cast to any to avoid type issues
      styles={( { } as any)}
    >
      <Stack gap="md">
        <TextInput
          label="Prompt Name"
          placeholder="e.g., Marketing Email Template"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          required
          styles={{
            label: { color: 'rgba(255, 255, 255, 0.9)' },
            input: {
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.6)'
              }
            }
          }}
        />

        {isCustomCategory ? (
          <TextInput
            label="Category Name"
            placeholder="Enter new category name"
            value={customCategory}
            onChange={(event) => setCustomCategory(event.currentTarget.value)}
            required
            styles={{
              label: { color: 'rgba(255, 255, 255, 0.9)' },
              input: {
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.6)'
                }
              }
            }}
          />
        ) : (
          <Select
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            data={finalOptions}
            styles={{
              label: { color: 'rgba(255, 255, 255, 0.9)' },
              input: {
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }
            }}
          />
        )}

        <Group justify="flex-end" mt="md">
          <Button
            variant="subtle"
            onClick={onClose}
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || (isCustomCategory && !customCategory.trim()) || !generatedPrompt}
            style={{
              backgroundColor: '#4a9eff',
              borderRadius: '8px'
            }}
          >
            Save Prompt
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}