// components/userProfile/Subscribers.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Subscribers = ({ subscribers, subscribedTo }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Subscribers</h2>
      {subscribers.map(sub => (
        <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} style={{cursor: 'pointer'}}>
          {sub.name} {sub.surname}
        </p>
      ))}
      <h2>Subscribed To</h2>
      {subscribedTo.map(sub => (
        <p key={sub.id} onClick={() => navigate(`/${sub.id}`)} style={{cursor: 'pointer'}}>
          {sub.name} {sub.surname}
        </p>
      ))}
    </div>
  );
};

export default Subscribers;
