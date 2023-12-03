import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/useAxiosSecure/UseAxiosSecure";
import districtsData from "../../../districts.json";
import upazilasData from "../../../upazilla.json";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const RecentDonationRequests = () => {
  const axiosSecure = UseAxiosSecure();
  const [donationRequests, setDonationRequests] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        const response = await axiosSecure.get('/donationRequests', {
          params: {
            userEmail: user.email,
          },
        });
        console.log('Fetched Donation Requests:', response.data);
        setDonationRequests(response.data);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    fetchDonationRequests();
  }, [axiosSecure, user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donationRequests/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setDonationRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== id)
              );

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting donation request:", error);
          });
      }
    });
  };

  const handleEdit = (id) => {
    
    navigate(`/dashboard/edit/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axiosSecure.put(`/donationRequests/${id}/status`, {
        newStatus: newStatus,
      });

      if (response.data.updatedCount > 0) {
        setDonationRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id
              ? { ...request, donationStatus: newStatus }
              : request
          )
        );

        Swal.fire({
          title: "Success!",
          text: "Donation status updated.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error changing donation status:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Recent Donation Requests</h2>
      {donationRequests.length > 0 ? (
        <div className="space-y-4">
          {donationRequests.slice(0, 3).map((request) => (
            <div key={request._id} className="border p-4 rounded-md">
              <p>
                <strong>Recipient Name:</strong> {request.recipientName}
              </p>
              <p>
                <strong>Recipient Location:</strong>{" "}
                {`${request.recipientDistrict}, ${request.recipientUpazila}`}
              </p>
              <p>
                <strong>Donation Date:</strong> {request.donationDate}
              </p>
              <p>
                <strong>Donation Time:</strong> {request.donationTime}
              </p>
              <p>
                <strong>Donation Status:</strong> {request.donationStatus}
              </p>
              {request.donationStatus === "pending" && (
                <div className="flex mt-4 space-x-2">
                  <button
                    onClick={() => handleStatusChange(request._id, 'inprogress')}
                    className="btn bg-blue-600 text-white"
                  >
                    Start Donation
                  </button>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn bg-red-600 text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(request._id)}
                    className="btn bg-yellow-600 text-white"
                  >
                    Edit
                  </button>
                </div>
              )}
              {request.donationStatus === "inprogress" && (
                <div className="flex mt-4 space-x-2">
                  <button
                    onClick={() => handleStatusChange(request._id, 'done')}
                    className="btn bg-green-600 text-white"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleStatusChange(request._id, 'canceled')}
                    className="btn bg-yellow-600 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEdit(request._id)}
                    className="btn bg-yellow-600 text-white"
                  >
                    Edit
                  </button>
                </div>
              )}
              {request.donationStatus === "canceled" && (
                <div className="flex mt-4 space-x-2">
                  <button
                    onClick={() => handleStatusChange(request._id, 'inprogress')}
                    className="btn bg-blue-600 text-white"
                  >
                    Start Donation
                  </button>
                  <button
                    onClick={() => handleEdit(request._id)}
                    className="btn bg-yellow-600 text-white"
                  >
                    Edit
                  </button>
                </div>
              )}
              <button className="btn mt-4 btn-secondary">View Details</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No recent donation requests.</p>
      )}
    </div>
  );
};

export default RecentDonationRequests;
