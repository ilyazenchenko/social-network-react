// components/userProfile/Posts.js
import React, { useState } from 'react';
import axios from 'axios';

const Posts = ({ userId, posts, setPosts, authUserId }) => {
  const [postText, setPostText] = useState('');

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/${userId}/posts`, { text: postText });
      setPosts([response.data, ...posts]);
      setPostText('');
    } catch (error) {
      console.error('Ошибка при добавлении поста:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/${userId}/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {authUserId.toString() === userId && (
        <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Напишите что-нибудь..."
        />
        <button type="submit">Опубликовать</button>
      </form>
      )}
        {posts.map(post => (
            <div key={post.id}>
                <p>{post.text} - {post.formattedDate}</p>
                {authUserId.toString() === userId && (
                    <button onClick={() => handleDeletePost(post.id)}>Удалить</button>
                )}
            </div>
        ))}

    </div>
  );
};

export default Posts;
