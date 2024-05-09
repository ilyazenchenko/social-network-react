// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthUserId } from '../../AuthUserIdContext'; // Импортируем useAuthUserId
import '../../css/styles.css'

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthUserId } = useAuthUserId(); // Получаем setAuthUserId из контекста
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/process_login', { login: username, password: password });
      console.log("login user", response.data);
      onLoginSuccess(response.data);
      setAuthUserId(response.data.id); // Устанавливаем authUserId в контексте
      navigate(`/news`);
    } catch (error) {
      console.error(error);
      setError('Неправильные имя пользователя или пароль.'); // Установите ваше сообщение об ошибке
    }
    
  };

  return (
    <div class="auth-div-container">
      <div class="auth-div">
        <h1 className='auth-header'>Вход</h1>
        <form class="auth-form" onSubmit={handleLogin}>
          <div class="form-group">
            <label>Логин:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div class="form-group">
            <label>Пароль:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div class="error">{error}</div>}
          <div class="form-actions">
            <button type="submit" class="btn">Войти</button>
            <button type="button" class="btn" onClick={() => navigate('/register')}>Регистрация</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
