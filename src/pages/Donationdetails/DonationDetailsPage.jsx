import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DonationDetailsPage = () => {
    const { id } = useParams();
    const [donationDetails, setDonationDetails] = useState(null);

    useEffect(() => {
        const fetchDonationDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/donationRequests/${id}`);
                const data = await response.json();
                setDonationDetails(data);
            } catch (error) {
                console.error('Error fetching donation details:', error);
            }
        };

        fetchDonationDetails();
    }, [id]);

    const handleStatusChange = async () => {
        try {
            // Assuming you have an API endpoint to update the status
            const response = await fetch(`http://localhost:5000/donationRequests/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newStatus: 'inprogress' }),
            });

            const data = await response.json();

            if (data.updatedCount === 1) {
                // Update local state or perform additional actions
                setDonationDetails(prevDetails => ({
                    ...prevDetails,
                    donationStatus: 'inprogress',
                }));
            } else {
                console.error('Failed to update donation status');
            }
        } catch (error) {
            console.error('Error updating donation status:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md p-8 border rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Donation Details</h2>
                {donationDetails ? (
                    <div>
                        <div className="mb-4">
                            <p><strong>Recipient Name:</strong> {donationDetails.recipientName}</p>
                            <p><strong>Email:</strong> {donationDetails.requesterEmail}</p>
                            <p><strong>Recipient District:</strong> {donationDetails.recipientDistrict}</p>
                            {/* Include other details as needed */}
                            <p><strong>Status:</strong> {donationDetails.donationStatus}</p>
                        </div>
                        {donationDetails.donationStatus === 'pending' && (
                            <button className="btn" onClick={handleStatusChange}>
                                Confirm Donation
                            </button>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default DonationDetailsPage;
