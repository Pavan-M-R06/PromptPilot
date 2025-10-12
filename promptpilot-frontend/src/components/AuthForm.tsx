// src/components/AuthForm.tsx
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Box, Group } from '@mantine/core';

interface AuthFormProps {
  onSubmit: (values: any) => void;
  submitText: string;
  isLoading: boolean;
}

export function AuthForm({ onSubmit, submitText, isLoading }: AuthFormProps) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    validate: {
      // --- THIS IS THE UPDATED VALIDATION LOGIC ---
      email: (value) => {
        if (submitText === 'Login') {
          // For login, allow either an email or a username (min 3 chars)
          if (value.length < 3) return 'Email or username must be at least 3 characters';
          return null;
        }
        // For signup, strictly validate as an email
        return /^\S+@\S+$/.test(value) ? null : 'Invalid email';
      },
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      username: (value) => (submitText === 'Sign Up' && value.trim().length < 3 ? 'Username must be at least 3 characters' : null),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        {submitText === 'Sign Up' && (
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Your username"
            mb="md"
            {...form.getInputProps('username')}
          />
        )}
        <TextInput
          withAsterisk
          // --- UPDATED LABEL ---
          label={submitText === 'Login' ? 'Email or Username' : 'Email'}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          mt="md"
          {...form.getInputProps('password')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isLoading}>{submitText}</Button>
        </Group>
      </form>
    </Box>
  );
}