import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/useAxiosSecure/UseAxiosSecure";
import districtsData from "../../../../public/districts.json";
import upazilasData from "../../../../public/upazilla.json";

const RecentDonationRequests = ({ user }) => {
  const axiosSecure = UseAxiosSecure();
  const [donationRequests, setDonationRequests] = useState([]);

  // Replace these with your fake JSON data
  const districts = districtsData;
  const upazilas = upazilasData;

  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        const response = await axiosSecure.get('/donationRequests');
        setDonationRequests(response.data);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    fetchDonationRequests();
  }, [axiosSecure]);

  // Helper function to get the district name by ID
  const getDistrictNameById = (districtId) => {
    const district = districts.find((d) => d.id === districtId);
    return district ? district.name : '';
  };

  // Helper function to get the upazila name by ID
  const getUpazilaNameById = (upazilaId) => {
    const upazila = upazilas.find((u) => u.id === upazilaId);
    return upazila ? upazila.name : '';
  };

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
                {`${getDistrictNameById(request.recipientDistrict)}, ${getUpazilaNameById(request.recipientUpazila)}`}
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
                  <button className="btn bg-blue-700 text-white">Edit</button>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn bg-red-600 text-white"
                  >
                    Delete
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
