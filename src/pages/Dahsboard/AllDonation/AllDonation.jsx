import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/useAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';

const AllDonation = () => {
    const axiosSecure = UseAxiosSecure();
  
    
    const [donationRequests, setDonationRequests] = useState([]);
  
    const { data: donationRequestsData = [], refetch } = useQuery({
      queryKey: ['donationRequests'],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get('/donationRequests');
          return res.data;
        } catch (error) {
          console.error('Error fetching donation requests:', error);
          throw error;
        }
      },
    });
  
    
    useEffect(() => {
      setDonationRequests(donationRequestsData);
    }, [donationRequestsData]);

    const handleDeleteDonationRequest = async (id) => {
        try {
            
            const response = await axiosSecure.delete(`/donationRequests/${id}`);

            if (response.data.deletedCount > 0) {
                refetch();
                setDonationRequests((prevRequests) =>
                    prevRequests.filter((request) => request._id !== id)
                );

                
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                });
            } else {
                
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to delete donation request.',
                    icon: 'error',
                });
            }
        } catch (error) {
            
            console.error('Error deleting donation request:', error);

            
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete donation request. Please try again.',
                icon: 'error',
            });
        }
    };

    return (
        <div>
            <h2 className='text-4xl text-center font-bold my-5'>
                All Donation Requests: {donationRequests.length}
            </h2>
            <div className='divider'></div>
            <div className='overflow-x-auto'>
                <table className='table table-zebra'>
                    {/* Table header */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Requester Name</th>
                            <th>Recipient Name</th>
                            <th>Recipient Location</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Donation Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {donationRequests.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.requesterName}</td>
                                <td>{request.recipientName}</td>
                                <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                                <td>{request.donationDate}</td>
                                <td>{request.donationTime}</td>
                                <td>{request.donationStatus}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteDonationRequest(request._id)}
                                        className='btn bg-red-600 text-white'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDonation;
