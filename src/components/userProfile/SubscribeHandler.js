// components/userProfile/SubscribeHandler.js
import React from 'react';
import axios from '../../Axios.js';
import '../../css/styles.css';

const SubscribeHandler = ({ authUserId, userId, isSubscribed, setSubscribedIds }) => {
  const handleSubscribe = async () => {
    try {
      await axios.post(`http://213.139.210.103:8082/${authUserId}/subs/${userId}`);
      setSubscribedIds(prev => [...prev, parseInt(userId)]);
    } catch (error) {
      console.error('Ошибка при подписке:', error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.delete(`http://213.139.210.103:8082/${authUserId}/subs/${userId}`);
      setSubscribedIds(prev => prev.filter(subId => subId !== parseInt(userId)));
    } catch (error) {
      console.error('Ошибка при отписке:', error);
    }
  };

  return (
    <div>
      {isSubscribed ? (
        <button className='sub-bt-general unsub-button' onClick={handleUnsubscribe}>Отписаться</button>
      ) : (
        <button className='sub-bt-general sub-to-button' onClick={handleSubscribe}>Подписаться</button>
      )}
    </div>
  );
};

export default SubscribeHandler;
