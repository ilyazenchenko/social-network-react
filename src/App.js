import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setInitialUser(userData); // Сохранение изначальных данных пользователя
  };

  const handleLogout = () => {
    setUser(null);
    setInitialUser(null); // Очистка изначальных данных при выходе
  };

  return (
    <div>
      {!user ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <UserProfile user={user} initialUser={initialUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
