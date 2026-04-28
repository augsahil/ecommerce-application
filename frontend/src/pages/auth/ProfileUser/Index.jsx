import React from 'react';
import AvatarComponent from './components/AvatarComponent';
import BasicDetails from './components/BasicDetails';
import AccountType from './components/AccountType';
import UserAddress from './components/UserAddress';

const ProfileUser = () => {
  return (
    <>
      <AvatarComponent />
      <div className="lg:w-1/2 mx-auto">
        <BasicDetails />
        <AccountType />
        <UserAddress />
      </div>
    </>
  );
};

export default ProfileUser;
