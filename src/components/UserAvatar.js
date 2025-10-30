import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserAvatar = () => {
  const { currentUser } = useAuth();

  // Function to get initials from full name
  const getInitials = (name) => {
    if (!name) return 'U';
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  // Function to get avatar color based on user type or name
  const getAvatarColor = (user) => {
    if (!user) return 'bg-gray-500';
    if (user.userType === 'admin') return 'bg-blue-600 hover:bg-blue-700';
    if (user.userType === 'user') return 'bg-green-600 hover:bg-green-700';
    // Default color based on first letter of name
    const colors = [
      'bg-red-600 hover:bg-red-700',
      'bg-purple-600 hover:bg-purple-700',
      'bg-pink-600 hover:bg-pink-700',
      'bg-indigo-600 hover:bg-indigo-700',
      'bg-orange-600 hover:bg-orange-700',
    ];
    const index = user.fullName ? user.fullName.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const initials = currentUser ? getInitials(currentUser.fullName) : 'KS';
  const avatarColor = getAvatarColor(currentUser);
  const linkTo = currentUser 
    ? (currentUser.userType === 'admin' ? '/admin-dashboard' : '/user-dashboard')
    : '/login';

  return (
    <Link 
      to={linkTo} 
      className={`flex items-center justify-center w-10 h-10 rounded-full ${avatarColor} text-white font-bold text-sm transition-all transform hover:scale-105 shadow-md`}
      title={currentUser ? currentUser.fullName : 'Sign In'}
    >
      {initials}
    </Link>
  );
};

export default UserAvatar;
