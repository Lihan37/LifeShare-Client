import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import districtsData from '../../../districts.json';
import upazilasData from '../../../upazilla.json';
import { AuthContext } from '../../providers/AuthProvider';
import UseAxiosPublic from '../../hooks/useAxiosPublic/UseAxioxPublic';

const EditDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const { id } = useParams(); // Use the id from useParams
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch districts and upazilas data
                setDistricts(districtsData);
                setUpazilas(upazilasData);

                // Fetch the donation request details by ID for editing
                const response = await axiosPublic.get(`/donationRequests/${id}`); // Use id from useParams
                const donationRequestData = response.data; // Correct variable name
                // Populate the form fields with the fetched data
                reset({
                    requesterName: user.name,
                    requesterEmail: user.email,
                    recipientName: donationRequestData.recipientName,
                    recipientDistrict: donationRequestData.recipientDistrict,
                    recipientUpazila: donationRequestData.recipientUpazila,
                    hospitalName: donationRequestData.hospitalName,
                    fullAddress: donationRequestData.fullAddress,
                    donationDate: donationRequestData.donationDate,
                    donationTime: donationRequestData.donationTime,
                    requestMessage: donationRequestData.requestMessage,
                    // Add other fields here...
                });

                setSelectedDistrict(donationRequestData.recipientDistrict);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [axiosPublic, id, reset, user.email, user.name]);

    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value;
        setSelectedDistrict(selectedDistrictId);
    };

    const filteredUpazilas = upazilas.filter((upazila) => upazila.district_id === selectedDistrict);

    const onSubmit = async (data) => {
        try {
            // Prepare the updated donation request data
            const updatedData = {
                ...data,
                requesterName: user.name,
                requesterEmail: user.email,
                donationStatus: 'pending',
            };

            // Send a PATCH request to update the donation request
            const response = await axiosPublic.patch(`/donationRequests/${id}`, updatedData);

            if (response.data.updatedCount > 0) {
                console.log('Donation request updated successfully');
                reset(); // Reset the form
                navigate('/dashboard');
            } else {
                console.error('Failed to update donation request');
            }
        } catch (error) {
            console.error('Error submitting donation request:', error);
        }
    };

    
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <h1 className="text-center font-semibold pt-5 text-3xl">Edit Donation Request</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-2">
                            {/* Existing fields */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Requester Name</span>
                                </label>
                                <input type="text" defaultValue={user.name} className="input input-bordered" disabled />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Requester Email</span>
                                </label>
                                <input type="text" defaultValue={user.email} className="input input-bordered" disabled />
                            </div>
                            {/* District dropdown */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient District</span>
                                </label>
                                <select
                                    {...register('recipientDistrict', { required: true })}
                                    onChange={handleDistrictChange}
                                    value={selectedDistrict}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="" disabled>
                                        Select District
                                    </option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.recipientDistrict && <span>This field is required</span>}
                            </div>
                            {/* Upazila dropdown */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient Upazila</span>
                                </label>
                                <select
                                    {...register('recipientUpazila', { required: true })}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Upazila
                                    </option>
                                    {filteredUpazilas.map((upazila) => (
                                        <option key={upazila.id} value={upazila.id}>
                                            {upazila.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.recipientUpazila && <span>This field is required</span>}
                            </div>
                            {/* Donation Date field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Date</span>
                                </label>
                                <input
                                    type="date"
                                    {...register('donationDate', { required: true })}
                                    className="input input-bordered"
                                    required
                                />
                                {errors.donationDate && <span>This field is required</span>}
                            </div>
                            {/* Donation Time field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Time</span>
                                </label>
                                <input
                                    type="time"
                                    {...register('donationTime', { required: true })}
                                    className="input input-bordered"
                                    required
                                />
                                {errors.donationTime && <span>This field is required</span>}
                            </div>
                            {/* Recipient Name field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('recipientName', { required: true })}
                                    placeholder="Recipient Name"
                                    className="input input-bordered"
                                    required
                                />
                                {errors.recipientName && <span>This field is required</span>}
                            </div>
                            {/* ... (other new fields) */}
                            <div className="form-control col-span-2">
                                <button type="submit" className="btn w-full btn-primary">
                                    Update Donation Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDonationRequest;


