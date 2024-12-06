import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          setUserInfo(null);
        } else {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
