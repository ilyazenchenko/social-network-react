import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm.js';
import RegisterForm from './components/auth/RegisterForm.js';
import UserProfile from './components/UserProfile.js';
import NewsPage from './components/NewsPage.js';
import SearchPage from './components/SearchPage.js';
import axios from './Axios.js';
import { AuthUserIdProvider } from './AuthUserIdContext';
import AdminPage from './components/AdminPage.js';

axios.defaults.withCredentials = true;


function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Состояние загрузки для проверки аутентификации

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://213.139.210.103:8082/auth/user', { withCredentials: true });
        setUser(response.data);
        console.log(response.data)
      } catch {
        setUser(null);
      } finally {
        setIsAuthenticating(false); // Устанавливаем, что аутентификация завершена
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticating) {
    return <div>Loading...</div>; // Или другой индикатор загрузки
  }

  return (
    <AuthUserIdProvider>
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <LoginForm onLoginSuccess={setUser} /> : <Navigate replace to={`/${user?.id}`} />} />
          <Route path="/register" element={!user ? <RegisterForm /> : <Navigate replace to={`/${user?.id}`} />} />
          <Route path="/:id" element={user ? <UserProfile onLogout={() => setUser(null)} /> : <Navigate replace to="/login" />} />
          <Route path="/news" element={user ? <NewsPage /> : <Navigate replace to="/login" />} />
          <Route path="/search" element={user ? <SearchPage /> : <Navigate replace to="/login" />} />
          <Route path="/" element={!user ? <Navigate replace to="/login" /> : <Navigate replace to={`/${user?.id}`} />} />
          <Route path='/admin' element={user ? <AdminPage /> : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </AuthUserIdProvider>
  );
}

export default App;
