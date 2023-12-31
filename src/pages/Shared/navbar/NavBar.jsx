
import '../navbar/navbar.css'
import logo from '../../../assets/logo.png'
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const NavBar = () => {

    const location = useLocation();

    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }
    const navItems = (
        <>
            <li>
                <Link
                    to='/'
                    className={`text-gray-950 hover:text-white ${location.pathname === '/' ? 'bg-active' : ''}`}
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    to='/dashboard'
                    className={`text-gray-950 hover:text-white ${location.pathname === '/dashboard' ? 'bg-active' : ''}`}
                >
                    Dashboard
                </Link>
            </li>

            <li>
                <Link
                    to='/registration'
                    className={`text-gray-950 hover:text-white ${location.pathname === '/registration' ? 'bg-active' : ''}`}
                >
                    Registration
                </Link>
            </li>
            <li>
                <Link
                    to='/blog'
                    className={`text-gray-950 hover:text-white ${location.pathname === '/aboutUs' ? 'bg-active' : ''}`}
                >
                    Blog
                </Link>
            </li>
            <li>
                <Link
                    to='/searchDonors'
                    className={`text-gray-950 hover:text-white ${location.pathname === '/searchDonors' ? 'bg-active' : ''}`}
                >
                    <FaSearch></FaSearch>
                </Link>
            </li>
            <li>
                <Link
                    to='/donationRequests'
                    className={`text-gray-950 hover:text-white ${location.pathname === '/donationRequests' ? 'bg-active' : ''}`}
                >
                    Donation Requests
                </Link>
            </li>
        </>
    );


    return (
        <div className="navbar fixed max-w-screen-xl mx-auto z-10 text-white bg-gradient-to-r from-yellow-300 to-orange-600 p-10 ">
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Your website description" />
                <meta name="keywords" content="your, keywords, here" />

            </Helmet>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost text-gray-950 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 lg:text-gray-950 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">
                    <div className='flex flex-col lg:flex-row text-center items-center' >
                        <img className='w-[50px] h-[50px]' src={logo} alt="" />
                        <span className="ml-2 text-purple-900">Life<span className="text-blue-900">Share</span></span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center  hidden lg:flex">
                <ul className="gap-10 items-center text-center lg:text-gray-300  menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center">
                        {/* <img src={user.photoURL} alt="User Photo" className="w-8 h-8 rounded-full mr-2" /> */}
                        <span className="text-yellow-200 mr-2 hidden md:inline lg:inline">{user.email}</span>

                        <button onClick={handleSignOut} className='btn'>Sign Out</button>
                    </div>
                ) : (
                    <Link to='/login'>
                        <button className='btn'>Login</button>
                    </Link>
                )}
            </div>

        </div>
    );
};

export default NavBar;