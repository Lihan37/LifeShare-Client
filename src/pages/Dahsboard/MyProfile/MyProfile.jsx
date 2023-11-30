import { useEffect, useState } from 'react';
import UseAxiosPublic from '../../hooks/useAxiosPublic/UseAxioxPublic';

const MyProfile = () => {
  const axiosPublic = UseAxiosPublic();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const response = await axiosPublic.get('/users'); 
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [axiosPublic]);

  
  
  
  const user = userData[0];

  return (
    <div>
      <h2 className='text-center mt-10 text-4xl'>My Profile</h2>
      {user && (
        <div className="card text-2xl border-2 p-4 shadow-slate-900 m-4">
          <p>
            <strong >Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Avatar:</strong> <img src={user.avatar} alt="Avatar" />
          </p>
          <p>
            <strong>Blood Group:</strong> {user.bloodGroup}
          </p>
          <p>
            <strong>District:</strong> {user.district}
          </p>
          <p>
            <strong>Upazila:</strong> {user.upazila}
          </p>
        </div>
        
      )}
      

    </div>
  );
};

export default MyProfile;
