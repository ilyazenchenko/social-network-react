// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm.js';
import RegisterForm from './components/auth/RegisterForm.js';
import UserProfile from './components/UserProfile.js';
import NewsPage from './components/NewsPage.js'; // Импортируйте NewsPage
import axios from 'axios';
import { AuthUserIdProvider } from './AuthUserIdContext';
import SearchPage from './components/SearchPage.js';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/user', { withCredentials: true });
        setUser(response.data);
        console.log("auth user", response.data)
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthUserIdProvider>
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <LoginForm onLoginSuccess={setUser} /> : <Navigate replace to="/" />} />
          <Route path="/register" element={!user ? <RegisterForm onRegisterSuccess={setUser} /> : <Navigate replace to="/" />} />
          <Route path="/:id" element={<UserProfile onLogout={() => setUser(null)} />} />
          <Route path="/news" element={!user ? <Navigate replace to="/" /> : <NewsPage />} />
          <Route path="/search" element={!user ? <Navigate replace to="/" /> : <SearchPage />} />
          <Route path="/" element={user ? <Navigate replace to={`/${user.id}`} /> : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </AuthUserIdProvider>
  );
}

export default App;
