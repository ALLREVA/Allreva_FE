import EditProfileForm from './components/EditProfileForm';

import { useGetUserInfo } from 'queries/user/useGetUserInfo';

const EditProfile = () => {
  const { data: userProfile } = useGetUserInfo();

  return <EditProfileForm userProfile={userProfile} />;
};

export default EditProfile;
