// components/userProfile/Subscribers.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/styles.css';

const Subscribers = ({ subscribers, subscribedTo }) => {
  const navigate = useNavigate();

  return (
    <div className='subs-general-container'>
      <div className='subs-list-container'>
        <h2>Подписчики</h2>
        {subscribers.map(sub => (
          <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} className='name-hyperlink'>
            {sub.name} {sub.surname}
          </p>
        ))}
      </div>
      <div>
        <h2>Подписан на</h2>
        {subscribedTo.map(sub => (
          <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} className='name-hyperlink'>
            {sub.name} {sub.surname}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Subscribers;
