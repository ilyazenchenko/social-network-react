// RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/styles.css'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://social-security:8080/auth/register', {
        username,
        password,
        name,
        surname,
        birthDate,
        city
      });
      navigate('/login');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка при регистрации!');
    }
  };

  return (
    <div class="auth-div-container">
      <div class="auth-div">
        <h1 className='auth-header'>Регистрация</h1>
        <form class="auth-form" onSubmit={handleRegister}>
          <div class="form-group">
            <label>Логин:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div class="form-group">
            <label>Пароль:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div class="form-group">
            <label>Имя:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div class="form-group">
            <label>Фамилия:</label>
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div class="form-group">
            <label>Дата рождения:</label>
            <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div class="form-group">
            <label>Город:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn">Зарегистрироваться</button>
            <button type="button" class="btn" onClick={() => navigate('/login')}>Назад</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default RegisterForm;
