import React, { useState, useEffect } from 'react';
import axios from '../Axios.js';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';

function AdminPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://213.139.210.103:8082/admin')  // Подставьте ваш настоящий URL
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        navigate('/');
      });
  }, [navigate]);

  return (
    <div>
      <h1>Admin Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default AdminPage;
