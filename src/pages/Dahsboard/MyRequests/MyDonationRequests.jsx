import React, { useState, useEffect, useContext } from 'react';
import UseAxiosPublic from '../../hooks/useAxiosPublic/UseAxioxPublic';
import { AuthContext } from '../../providers/AuthProvider';
import ReactPaginate from 'react-paginate';

const MyDonationRequests = () => {
  const axiosPublic = UseAxiosPublic();
  const [donationRequests, setDonationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [requestsPerPage] = useState(3); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        if (user && user.email) {
          const allDonationRequests = await axiosPublic.get(`/donationRequests`);
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

  const totalPageCount = Math.ceil(filteredRequests.length / requestsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderRequestsForPage = () => {
    const startIdx = currentPage * requestsPerPage;
    const endIdx = startIdx + requestsPerPage;
    const pageRequests = filteredRequests.slice(startIdx, endIdx);

    return (
      <tbody>
        {pageRequests.map((request, index) => (
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
    );
  };

  return (
    <div className="overflow-x-auto">
      {filteredRequests.length > 0 ? (
        <>
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
            {renderRequestsForPage()}
          </table>
          {/* Pagination */}
          {totalPageCount > 1 && (
            <ReactPaginate
              pageCount={totalPageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          )}
        </>
      ) : (
        <p>No donation requests</p>
      )}
    </div>
  );
};

export default MyDonationRequests;
