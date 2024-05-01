// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthUserId } from '../AuthUserIdContext.js';
import SubscribeHandler from './userProfile/SubscribeHandler';
import Posts from './userProfile/Posts';
import Subscribers from './userProfile/Subscribers';

function UserProfile({ onLogout }) {
  const { authUserId } = useAuthUserId();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [subscribedIds, setSubscribedIds] = useState([]);

  useEffect(() => {
    const fetchUserProfileAndSubscriptions = async () => {
      try {
        const userProfileResponse = await axios.get(`http://localhost:8080/${id}`);
        setCurrentUser(userProfileResponse.data.user);
        const subscriptionsResponse = await axios.get(`http://localhost:8080/sub_to_ids`);
        setSubscribedIds(subscriptionsResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        navigate('/login');
      }
    };

    fetchUserProfileAndSubscriptions();
  }, [id, navigate]);

  const isSubscribed = subscribedIds.includes(parseInt(id));

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
      {authUserId && authUserId.toString() !== id && (
        <button onClick={() => navigate(`/${authUserId}`)}>Домой</button>
      )}
      <button onClick={() => navigate('/news')}>Новости</button>
      <button onClick={() => navigate('/search')}>Поиск</button>
      <h1>{currentUser?.name} {currentUser?.surname}</h1>
      {authUserId && authUserId.toString() !== id && (
        <SubscribeHandler
          authUserId={authUserId}
          userId={id}
          isSubscribed={isSubscribed}
          setSubscribedIds={setSubscribedIds}
        />
      )}
      <Posts userId={id} authUserId={authUserId} posts={currentUser?.posts || []} setPosts={posts => setCurrentUser({...currentUser, posts})} />
      <Subscribers subscribers={currentUser?.subscribers || []} subscribedTo={currentUser?.subscribedTo || []} />
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default UserProfile;