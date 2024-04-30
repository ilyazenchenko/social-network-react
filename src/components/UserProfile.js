import React from 'react';
import axios from 'axios';

function UserProfile({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout');
      onLogout(); // Вызов функции, изменяющей состояние для возврата на страницу входа
    } catch (error) {
      console.error('Ошибка при выходе из системы', error);
      alert('Ошибка при попытке выхода из системы!');
    }
  };

  return (
    <div>
      <h1>{user.name} {user.surname}</h1>
      <h2>Posts</h2>
      {user.posts.map(post => (
        <div key={post.id}>
          <p>{post.text} - {post.formattedDate}</p>
        </div>
      ))}
      <h2>Subscribed To</h2>
      {user.subscribedTo.map(sub => (
        <p key={sub.id}>{sub.name} {sub.surname}</p>
      ))}
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default UserProfile;
