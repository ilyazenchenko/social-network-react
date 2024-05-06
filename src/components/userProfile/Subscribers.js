// components/userProfile/Subscribers.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/styles.css';

const Subscribers = ({ subscribers, subscribedTo }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Подписчики</h2>
      {subscribers.map(sub => (
        <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} className='name-hyperlink'>
          {sub.name} {sub.surname}
        </p>
      ))}
      <h2>Подписан на</h2>
      {subscribedTo.map(sub => (
        <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} className='name-hyperlink'>
          {sub.name} {sub.surname}
        </p>
      ))}
    </div>
  );
};

export default Subscribers;
