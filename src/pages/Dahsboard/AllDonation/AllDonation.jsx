import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/useAxiosSecure/UseAxiosSecure';
import RecentDonationRequests from '../RecentDonationRequests/RecenDonationrequests';
import Swal from 'sweetalert2';

const AllDonation = () => {
    const axiosSecure = UseAxiosSecure();
    
    // Define the state for donation requests and its updater function
    const [donationRequests, setDonationRequests] = useState([]);

    const { data: donationRequestsData = [], refetch } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donationRequests');
            return res.data;
        }
    });

    // Update the state when data is fetched
    React.useEffect(() => {
        setDonationRequests(donationRequestsData);
    }, [donationRequestsData]);

    const handleDeleteDonationRequest = async (id) => {
        try {
            // Send a DELETE request to your backend endpoint
            const response = await axiosSecure.delete(`/donationRequests/${id}`);
        
            // Check if the deletion was successful
            if (response.data.deletedCount > 0) {
                // If successful, update the state to remove the deleted donation request
                setDonationRequests((prevRequests) =>
                    prevRequests.filter((request) => request._id !== id)
                );
            
                // Show a success message to the user
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                });
            } else {
                // If deletion was not successful, show an error message
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to delete donation request.',
                    icon: 'error',
                });
            }
        } catch (error) {
            // Handle any errors that occurred during the DELETE request
            console.error('Error deleting donation request:', error);
        
            // Show an error message to the user
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete donation request. Please try again.',
                icon: 'error',
            });
        }
    };

    return (
        <div>
            <h2 className='text-4xl text-center font-bold my-5'>All Donation Requests: {donationRequests.length}</h2>
            <div className='divider'></div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
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
                                    <button onClick={() => handleDeleteDonationRequest(request._id)} className="btn bg-red-600 text-white">
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
