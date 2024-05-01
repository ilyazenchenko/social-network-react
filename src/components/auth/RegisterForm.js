// RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm({ onRegisterSuccess }) {
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
      const response = await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
        name,
        surname,
        birthDate,
        city
      });
      onRegisterSuccess(response.data);
      navigate(`/${response.data.id}`);  // Navigate to the new user's profile page
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка при регистрации!');
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Surname:
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>
      <br />
      <label>
        Birth Date:
        <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      </label>
      <br />
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <br />
      <button type="submit">Register</button>
      <button type="button" onClick={() => navigate('/login')}>Back to Login</button>
    </form>
  );
}

export default RegisterForm;
