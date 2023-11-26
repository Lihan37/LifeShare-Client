
import { Link } from 'react-router-dom';
import banner from '../../../assets/banner.jpg';
import '../Banner/banner.css'

const Banner = () => {
    return (
        <div className="relative text-center">
            <figure className='relative'>
                <img src={banner} alt="" className="w-full h-[600px]" style={{ filter: 'brightness(50%)' }} />
            </figure>

            <div className='mx-auto lg:w-3/4 absolute inset-0 flex flex-col items-center justify-center text-center text-gray-100'>
                <h2 className='font-bold lg:mb-5 text-xl lg:text-4xl'>LifeShare: Connecting Hearts Through Blood Donation</h2>
                <div className='flex gap-7'>
                    <Link to="/registration"><button className='btn bg-yellow-300 text-gray-700 border-0'>Join as a Donor</button></Link>
                    <Link to='/searchDonors'><button className='btn bg-orange-600 text-white border-0'>Search Donors</button></Link>
                </div>
                <p className='font-semibold text-sm lg:text-xl parallax'>
                    Welcome to LifeShare, where every drop counts towards saving a life. Join us in our mission to bridge the gap between donors and those in need. Experience the joy of giving and be a part of a community that shares the gift of life. Together, we make a difference. Your contribution matters, and at LifeShare, we believe in the power of humanity coming together for a noble cause.
                </p>
            </div>
        </div>
    );
};

export default Banner;
