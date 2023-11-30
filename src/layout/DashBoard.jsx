import { FaChevronLeft, FaHandHoldingHeart, FaHeart, FaHome, FaUser } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../pages/providers/AuthProvider';
import RecentDonationRequests from '../pages/Dahsboard/RecentDonationRequests/RecenDonationrequests';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isHomePage = location.pathname === '/dashboard';

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-64 min-h-screen bg-yellow-300">
        <ul className="menu p-4">
          <li>
            <Link to="/">
              <FaChevronLeft></FaChevronLeft>Go back
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FaHome></FaHome>Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile">
              <FaUser></FaUser>My Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-donation-requests">
              <FaHeart></FaHeart> My Donation requests
            </Link>
          </li>
          <li>
            <Link to="/dashboard/create-donation-request">
              <FaHandHoldingHeart></FaHandHoldingHeart> Create Donation
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-4">
        <h2 className="text-3xl mt-5 text-center font-semibold mb-4">Welcome, {user.displayName}!</h2>
        {isHomePage && <RecentDonationRequests />}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
