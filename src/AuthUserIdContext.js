import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthUserIdContext = createContext();

export const useAuthUserId = () => useContext(AuthUserIdContext);

export const AuthUserIdProvider = ({ children }) => {
  const [authUserId, setAuthUserId] = useState(() => {
    const storedId = localStorage.getItem('authUserId');
    return storedId ? JSON.parse(storedId) : null;
  });

  useEffect(() => {
    localStorage.setItem('authUserId', JSON.stringify(authUserId));
  }, [authUserId]);

  return (
    <AuthUserIdContext.Provider value={{ authUserId, setAuthUserId }}>
      {children}
    </AuthUserIdContext.Provider>
  );
};
