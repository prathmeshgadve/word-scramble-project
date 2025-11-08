import React from 'react';
import useAuth from '../auth/useAuth';
import History from './History';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <hr />
      <History />
    </div>
  );
};

export default Profile;