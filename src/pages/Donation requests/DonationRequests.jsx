import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DonationRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const response = await fetch('http://localhost:5000/donationRequests');
                const data = await response.json();

                console.log('Donation Requests data:', data);

                const pendingRequests = data.filter(request => request.donationStatus === 'pending');
                setPendingRequests(pendingRequests);
            } catch (error) {
                console.error('Error fetching donation requests:', error);
            }
        };

        fetchDonationRequests();
    }, []);


    const handleViewDetails = (id) => {
        console.log('Clicked on View button with id:', id);

        navigate(`/donationDetails/${id}`);
    };




    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Pending Donation Requests</h2>
            {pendingRequests.length === 0 ? (
                <p>No pending donation requests.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Requester Name</th>
                            <th className="border p-2">Location</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Time</th>
                            <th className="border p-2">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.map(request => (
                            <tr key={request._id}>
                                <td className="border p-2">{request.recipientName}</td>
                                <td className="border p-2">{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                                <td className="border p-2">{request.donationDate}</td>
                                <td className="border p-2">{request.donationTime}</td>
                                <td className="border text-center p-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        onClick={() => handleViewDetails(request._id)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DonationRequests;
