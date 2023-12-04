import { FaBlog, FaChevronLeft, FaHandHoldingHeart, FaHeart, FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../pages/providers/AuthProvider';
import RecentDonationRequests from '../pages/Dahsboard/RecentDonationRequests/RecenDonationrequests';
import UseAdmin from '../pages/hooks/UseAdmin/UseAdmin';
import UseVolunteer from '../pages/hooks/UseVolunteer/UseVolunteer';


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin] = UseAdmin();
  const [isVolunteer] = UseVolunteer();
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
          {
            isAdmin ? <>
              <li>
                <Link to="/dashboard">
                  <FaHome></FaHome>DashBoard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/adminHome">
                  <FaHome></FaHome>Admin Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile">
                  <FaUser></FaUser>My Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/allUsers">
                  <FaUsers></FaUsers>All Users
                </Link>
              </li>
              <li>
                <Link to="/dashboard/all-blood-donation-request">
                  <FaHeart></FaHeart> All Blood Donations
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
              <li>
                <Link to="/dashboard/content-management">
                  <FaBlog></FaBlog> Content Management
                </Link>

              </li>
              
            </>
              : isVolunteer ? (
                <>
                  {/* Volunteer routes */}
                  <li>
                    <Link to="/dashboard">
                      <FaHome></FaHome>Volunteer Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/adminHome">
                      <FaHome></FaHome>Volunteer DashBoard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile">
                      <FaUser></FaUser>My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/all-blood-donation-request">
                      <FaHeart></FaHeart> All Blood Donations
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
                  <li>
                    <Link to="/dashboard/content-management">
                      <FaBlog></FaBlog> Content Management
                    </Link>

                  </li>
                  
                </>
              ) :
                <>
                  <li>
                    <Link to="/dashboard">
                      <FaHome></FaHome>Donor Home
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
                  <li>
                    <Link to="/dashboard/content-management">
                      <FaBlog></FaBlog> Content Management
                    </Link>

                  </li>
                  
                </>
          }

        </ul>
      </div>

      <div className="flex-1 p-4">
        <h2 className="text-3xl mt-5 text-center font-semibold mb-4">
          Welcome, {user.displayName}!
        </h2>
        {isHomePage && (
          <p className="text-center text-lg mb-4">
            Thank you for being part of our community. Your contributions make a difference!
          </p>
        )}
        {isHomePage && <RecentDonationRequests />}
        <Outlet />
      </div>

    </div>
  );
};

export default Dashboard;
