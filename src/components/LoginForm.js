import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/process_login', {
        login: username,
        password: password
      });
      onLoginSuccess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  if (showRegister) {
    return <RegisterForm onRegisterSuccess={() => setShowRegister(false)} onSwitchToLogin={() => setShowRegister(false)} />;
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required={true} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={true}/>
        </label>
        <br />
        <button type="submit">Login</button>
        <button type="button" onClick={switchToRegister}>Register</button>
      </form>
    </div>
  );
}

export default LoginForm;
