import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/admin')  // Подставьте ваш настоящий URL
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        navigate('/');
      });
  }, []);

  return (
    <div>
      <h1>Admin Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default AdminPage;
