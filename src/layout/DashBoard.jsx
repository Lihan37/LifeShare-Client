
import { FaDonate, FaHandHoldingHeart, FaHeart, FaHome, FaUser } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div className='flex '>
            <div className='w-64 min-h-screen bg-yellow-300'>
                <ul className='menu p-4'>
                    <li >

                        <Link to='/dashboard'><FaHome></FaHome>Home</Link>
                    </li>
                    <li >

                        <Link to='/dashboard/profile'><FaUser></FaUser>My Profile</Link>
                    </li>
                    <li >

                        <Link to='/dashboard/my-donation-requests'><FaHeart></FaHeart> My Donation requests</Link>
                    </li>
                    <li >

                        <Link to='/dashboard/create-donation-request'><FaHandHoldingHeart></FaHandHoldingHeart> Create Donation</Link>
                    </li>

                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;