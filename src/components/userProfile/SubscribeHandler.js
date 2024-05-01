// components/userProfile/SubscribeHandler.js
import React from 'react';
import axios from 'axios';

const SubscribeHandler = ({ authUserId, userId, isSubscribed, setSubscribedIds }) => {
  const handleSubscribe = async () => {
    try {
      await axios.post(`http://localhost:8080/${authUserId}/subs/${userId}`);
      setSubscribedIds(prev => [...prev, parseInt(userId)]);
    } catch (error) {
      console.error('Ошибка при подписке:', error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.delete(`http://localhost:8080/${authUserId}/subs/${userId}`);
      setSubscribedIds(prev => prev.filter(subId => subId !== parseInt(userId)));
    } catch (error) {
      console.error('Ошибка при отписке:', error);
    }
  };

  return (
    <div>
      {isSubscribed ? (
        <button onClick={handleUnsubscribe}>Отписаться</button>
      ) : (
        <button onClick={handleSubscribe}>Подписаться</button>
      )}
    </div>
  );
};

export default SubscribeHandler;
