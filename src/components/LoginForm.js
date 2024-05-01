// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthUserId } from '../AuthUserIdContext'; // Импортируем useAuthUserId

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthUserId } = useAuthUserId(); // Получаем setAuthUserId из контекста

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/process_login', { login: username, password: password });
      console.log("login user", response.data);
      onLoginSuccess(response.data);
      setAuthUserId(response.data.id); // Устанавливаем authUserId в контексте
      navigate(`/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/register')}>Register</button>
      </form>
    </div>
  );
}

export default LoginForm;
