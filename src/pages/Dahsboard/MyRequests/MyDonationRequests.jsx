import React, { useState, useEffect, useContext } from 'react';
import UseAxiosPublic from '../../hooks/useAxiosPublic/UseAxioxPublic';
import { AuthContext } from '../../providers/AuthProvider';

const MyDonationRequests = () => {
  const axiosPublic = UseAxiosPublic();
  const [donationRequests, setDonationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); // Adjust the number of requests per page
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        if (user && user.email) {
          // Fetch all donation requests initially
          const allDonationRequests = await axiosPublic.get(`/donationRequests`);

          // Filter donation requests based on the logged-in user's email
          const userDonationRequests = allDonationRequests.data.filter(
            (request) => request.requesterEmail === user.email
          );

          setDonationRequests(userDonationRequests);
          setFilteredRequests(userDonationRequests);
        }
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    fetchDonationRequests();
  }, [axiosPublic, user]);

  useEffect(() => {
    // Update filteredRequests when donationRequests changes
    setFilteredRequests(donationRequests);
  }, [donationRequests]);
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (status) => {
    if (status === 'all') {
      setFilteredRequests(donationRequests);
    } else {
      const filtered = donationRequests.filter((request) => request.donationStatus === status);
      setFilteredRequests(filtered);
    }

    setCurrentPage(1); // Reset to the first page after filtering
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* Table header */}
        <thead>
          <tr>
            <th>#</th>
            <th>Recipient Name</th>
            <th>Recipient Location</th>
            <th>Donation Date</th>
            <th>Donation Time</th>
            <th>Donation Status</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentRequests.map((request, index) => (
            <tr key={request._id}>
              <td>{index + 1}</td>
              <td>{request.recipientName}</td>
              <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
              <td>{request.donationDate}</td>
              <td>{request.donationTime}</td>
              <td>{request.donationStatus}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      {/* <div className='mt-10 text-center'>
        {Array.from({ length: Math.ceil(filteredRequests.length / requestsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default MyDonationRequests;