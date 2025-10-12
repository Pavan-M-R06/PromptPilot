// src/App.tsx
import { MantineProvider, createTheme } from '@mantine/core'; // Import createTheme
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage'; 
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Create a custom theme to add our colors
const theme = createTheme({
  colors: {
    silver: ['#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#868E96', '#495057', '#343A40', '#212529', '#1A1B1E', '#141517'],
  },
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;