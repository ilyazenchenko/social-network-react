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
    const [postText, setPostText] = useState(''); // Состояние для хранения текста нового поста

    useEffect(() => {
      fetchUserProfile(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/${id}/posts`, { text: postText });
      setCurrentUser(prev => ({
        ...prev,
        posts: [response.data, ...prev.posts]
      })); // Добавляем новый пост в состояние без перезагрузки страницы
      setPostText(''); // Очистка поля ввода после отправки
    } catch (error) {
      console.error('Ошибка при добавлении поста:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/${id}/posts/${postId}`);
      setCurrentUser(prev => ({
        ...prev,
        posts: prev.posts.filter(post => post.id !== postId)
      })); // Обновляем состояние, удаляя пост без перезагрузки страницы
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
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
      <form onSubmit={handlePostSubmit}>
        <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Напишите что-нибудь..."
        />
        <button type="submit">Опубликовать</button>
        </form>
      {currentUser?.posts?.map(post => (
        <div key={post.id}>
          <p>{post.text} - {post.formattedDate}</p>
          <button onClick={() => handleDeletePost(post.id)}>Удалить</button>
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
