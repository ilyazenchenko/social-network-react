import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null); // Сброс состояния пользователя, возвращаемся на страницу входа
  };

  return (
    <div>
      {!user ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <UserProfile user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;