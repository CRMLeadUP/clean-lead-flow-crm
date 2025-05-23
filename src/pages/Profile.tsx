
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import UserProfile from '@/components/Profile/UserProfile';

const Profile = () => {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Configurações do Perfil</h1>
        <UserProfile />
      </div>
    </MainLayout>
  );
};

export default Profile;
