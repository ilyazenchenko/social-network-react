// UserProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthUserId } from '../AuthUserIdContext.js';

function UserProfile({ onLogout }) {
    const { authUserId } = useAuthUserId(); // Получаем authUserId из контекста
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      fetchUserProfile(id);
    }, [id]);
  
    const fetchUserProfile = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8080/${userId}`);
        setCurrentUser(response.data.user);
        console.log("current user id", response.data.user.id);
        console.log("auth user id", authUserId);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        navigate('/login')
      }
    };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout');
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе из системы', error);
    }
  };

  return (
    <div>
      {authUserId && authUserId.toString() !== id && ( // Показывать кнопку "Домой" только если это не страница текущего пользователя
        <button onClick={() => navigate(`/${authUserId}`)}>Домой</button>
      )}
      <button onClick={() => navigate('/news')}>Новости</button> {/* Кнопка для перехода на страницу новостей */}
      <h1>{currentUser?.name} {currentUser?.surname}</h1>
      <h2>Posts</h2>
      {currentUser?.posts?.map(post => (
        <div key={post.id}>
          <p>{post.text} - {post.formattedDate}</p>
        </div>
      ))}
      <h2>Subscribers</h2>
      {currentUser?.subscribers?.map(sub => (
        <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} style={{cursor: 'pointer'}}>
          {sub.name} {sub.surname}
        </p>
      ))}
      <h2>Subscribed To</h2>
      {currentUser?.subscribedTo?.map(sub => (
        <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} style={{cursor: 'pointer'}}>
          {sub.name} {sub.surname}
        </p>
      ))}
      <button onClick={() => navigate('/search')}>Поиск</button> {/* Кнопка для перехода на страницу поиска */}
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default UserProfile;
