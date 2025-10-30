import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);

    // Ensure there's exactly one admin account for the app.
    // If no admin exists in localStorage users, seed a default admin.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const hasAdmin = users.some(u => u.userType === 'admin');
    if (!hasAdmin) {
      const seededAdmin = {
        id: Date.now(),
        fullName: 'Hari',
        email: 'hari@gmail.com',
        // NOTE: this password is for development/demo only. Change it in production.
        password: 'Hari@123',
        userType: 'admin',
        createdAt: new Date().toISOString()
      };
      users.push(seededAdmin);
      localStorage.setItem('users', JSON.stringify(users));
      // Do not automatically log in the seeded admin; leave currentUser as-is.
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Register new users as plain 'user' role only. Admins are created only by the seeded admin
  // or by manual changes to localStorage. This prevents creating multiple admins via the UI.
  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
      ...userData,
      userType: 'user',
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    login(newUser);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};