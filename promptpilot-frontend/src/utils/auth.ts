export function isAuthenticated() {
  try {
    const token = localStorage.getItem('authToken');
    return !!token;
  } catch (e) {
    return false;
  }
}

export function requireAuthRedirect(): string {
  return isAuthenticated() ? '/dashboard' : '/login';
}
