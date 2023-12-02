import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/useAxiosSecure/UseAxiosSecure';
import { FaUser, FaMoneyBillAlt, FaTint } from 'react-icons/fa'; // Import relevant icons
import Swal from 'sweetalert2';

const AdminHome = () => {
  const axiosSecure = UseAxiosSecure();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [totalBloodRequests, setTotalBloodRequests] = useState(0);

  const { data: usersData } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data.length; // Assuming you get an array of users
    }
  });

  const { data: fundingData } = useQuery({
    queryKey: ['totalFunding'],
    queryFn: async () => {
      const res = await axiosSecure.get('/funding');
      return res.data.length; // Assuming you get an array of funding records
    }
  });

  const { data: bloodRequestsData } = useQuery({
    queryKey: ['totalBloodRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationRequests');
      return res.data.length; // Assuming you get an array of blood donation requests
    }
  });

  useEffect(() => {
    setTotalUsers(usersData);
    setTotalFunding(fundingData);
    setTotalBloodRequests(bloodRequestsData);
  }, [usersData, fundingData, bloodRequestsData]);

  return (
    <div>
      
      <div className="text-center my-5">
        <h2 className="text-4xl font-bold">Welcome to Admin Dashboard</h2>
        
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="bg-blue-500 p-4 text-white rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <FaUser size={30} />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalUsers}</p>
              <p>Total Users</p>
            </div>
          </div>
        </div>

        
        <div className="bg-green-500 p-4 text-white rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <FaMoneyBillAlt size={30} />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalFunding}</p>
              <p>Total Funding</p>
            </div>
          </div>
        </div>

        
        <div className="bg-red-500 p-4 text-white rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <FaTint size={30} />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalBloodRequests}</p>
              <p>Total Blood Donation Requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
