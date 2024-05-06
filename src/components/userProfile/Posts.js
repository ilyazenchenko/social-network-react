// components/userProfile/Posts.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../css/styles.css';

const Posts = ({ userId, posts, setPosts, authUserId }) => {
  const [postText, setPostText] = useState('');

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://social-security:8080/${userId}/posts`, { text: postText });
      setPosts([response.data, ...posts]);
      setPostText('');
    } catch (error) {
      console.error('Ошибка при добавлении поста:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://social-security:8080/${userId}/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  return (
<div>
  <h2>Записи</h2>
  {authUserId.toString() === userId && (
    <form onSubmit={handlePostSubmit} className='posts-form'>
      <input
        type="text"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Напишите что-нибудь..."
        className='posts-input'
      />
      <button type="submit" className='posts-publish-button'>Опубликовать</button>
    </form>
  )}
  {posts.map(post => (
    <div key={post.id} className='post-item'>
      <div className="post-content">
        <div className='post-time'>{post.formattedDate}</div>
        <p>{post.text}</p>
      </div>
      {authUserId.toString() === userId && (
        <button onClick={() => handleDeletePost(post.id)} className="delete-post">Удалить</button>
      )}
    </div>
  ))}
</div>

  );
};

export default Posts;
