import { useEffect, useState } from 'react';
import UseAxiosSecure from '../../hooks/useAxiosSecure/UseAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const MyProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users/${user.email}`);
        console.log('User Data from Server:', response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [axiosSecure, user.email]);

  return (
    <div>
      <h2 className='text-center mt-10 text-4xl'>My Profile</h2>
      {userData && (
        <div className="card text-2xl border-2 p-4 shadow-slate-900 m-4">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Avatar:</strong> <img src={userData.avatar} alt="Avatar" />
          </p>
          <p>
            <strong>Blood Group:</strong> {userData.bloodGroup}
          </p>
          <p>
            <strong>District:</strong> {userData.district}
          </p>
          <p>
            <strong>Upazila:</strong> {userData.upazila}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
