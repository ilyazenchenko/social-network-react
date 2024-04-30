import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ user, onLogout, initialUser }) {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/${userId}`);
      console.log(response.data.user)
      setCurrentUser(response.data.user);
      console.log("current user:", Object.entries(currentUser));
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      alert('Не удалось загрузить профиль пользователя!');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout');
      onLogout();
    } catch (error) {
      console.error('Ошибка при выходе из системы', error);
      alert('Ошибка при попытке выхода из системы!');
    }
  };

  const isInitialUser = currentUser?.id === initialUser?.id;

  return (
    <div>
      {!isInitialUser && (
        <button onClick={() => setCurrentUser(initialUser)}>Домой</button>
      )}
      <h1>{currentUser?.name} {currentUser?.surname}</h1>
      <h2>Posts</h2>
      {currentUser?.posts?.map(post => (
        <div key={post.id}>
          <p>{post.text} - {post.formattedDate}</p>
        </div>
      ))}
      <h2>Subscribers</h2>
      {currentUser?.subscribers?.map(sub => (
        <p key={sub.id} onClick={() => fetchUserProfile(sub.id)} style={{cursor: 'pointer'}}>
          {sub.name} {sub.surname}
        </p>
      ))}
      <h2>Subscribed To</h2>
      {currentUser?.subscribedTo?.map(sub => (
        <p key={sub.id} onClick={() => fetchUserProfile(sub.id)} style={{cursor: 'pointer'}}>
          {sub.name} {sub.surname}
        </p>
      ))}
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default UserProfile;
