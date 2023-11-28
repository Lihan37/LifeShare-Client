import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../../hooks/useAxiosPublic/UseAxioxPublic';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [upazillaOptions, setUpazillaOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const districtsResponse = await fetch("districts.json");
                const districtsData = await districtsResponse.json();
                setDistricts(districtsData);

                const upazillasResponse = await fetch("upazilla.json");
                const upazillasData = await upazillasResponse.json();
                setUpazillas(upazillasData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value;
        setSelectedDistrict(selectedDistrictId);
    };

    useEffect(() => {
        if (selectedDistrict) {
            const filteredUpazillas = upazillas.filter(upazilla => upazilla.district_id === selectedDistrict);
            setUpazillaOptions(filteredUpazillas);
        } else {
            setUpazillaOptions(upazillas);
        }
    }, [selectedDistrict, upazillas]);


    const onSubmit = async (data) => {
        try {
            // Your form submission logic here
            const response = await axiosPublic.post('/donationRequests', data);

            if (response.data.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Donation request created successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Clear the form after successful submission
                setValue('recipientName', '');
                setValue('recipientDistrict', '');
                setValue('recipientUpazila', '');
                setValue('hospitalName', '');
                setValue('fullAddress', '');
                setValue('donationDate', '');
                setValue('donationTime', '');
                setValue('requestMessage', '');

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error('Error submitting donation request:', error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Create Donation Request</title>
            </Helmet>
            <h2 className="text-3xl font-bold mt-10 text-center">Create Your Blood Donation</h2>
            <div className="hero-content mt-10 flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Requester Name:</span>
                            </label>
                            <input type="text" value={user.name} readOnly className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Requester Email:</span>
                            </label>
                            <input type="email" value={user.email} readOnly className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipient Name:</span>
                            </label>
                            <input
                                type="text"
                                {...register('recipientName', { required: 'Recipient name is required' })}
                                placeholder="Enter recipient name"
                                className="input input-bordered"
                            />
                            {errors.recipientName && <div className="text-red-500">{errors.recipientName.message}</div>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipient District:</span>
                            </label>
                            <select
                                {...register('recipientDistrict', { required: 'Recipient district is required' })}
                                className="select select-bordered"
                                onChange={handleDistrictChange}
                            >
                                <option value="" disabled>Select District</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {errors.recipientDistrict && <div className="text-red-500">{errors.recipientDistrict.message}</div>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipient Upazila:</span>
                            </label>
                            <select
                                {...register('recipientUpazila', { required: 'Recipient upazila is required' })}
                                className="select select-bordered"
                            >
                                <option value="" disabled>Select Upazila</option>
                                {upazillaOptions.map((upazilla) => (
                                    <option key={upazilla.id} value={upazilla.id}>
                                        {upazilla.name}
                                    </option>
                                ))}
                            </select>
                            {errors.recipientUpazila && <div className="text-red-500">{errors.recipientUpazila.message}</div>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Hospital Name:</span>
                            </label>
                            <input
                                type="text"
                                {...register('hospitalName', { required: 'Hospital name is required' })}
                                placeholder="Enter hospital name"
                                className="input input-bordered"
                            />
                            {errors.hospitalName && <div className="text-red-500">{errors.hospitalName.message}</div>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Address:</span>
                            </label>
                            <input
                                type="text"
                                {...register('fullAddress', { required: 'Full address is required' })}
                                placeholder="Enter full address"
                                className="input input-bordered"
                            />
                            {errors.fullAddress && <div className="text-red-500">{errors.fullAddress.message}</div>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Donation Date:</span>
                            </label>
                            <input
                                type="date"
                                {...register('donationDate', { required: 'Donation date is required' })}
                                className="input input-bordered"
                            />
                            {errors.donationDate && <div className="text-red-500">{errors.donationDate.message}</div>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Donation Time:</span>
                            </label>
                            <input
                                type="time"
                                {...register('donationTime', { required: 'Donation time is required' })}
                                className="input input-bordered"
                            />
                            {errors.donationTime && <div className="text-red-500">{errors.donationTime.message}</div>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Request Message:</span>
                            </label>
                            <textarea
                                {...register('requestMessage', { required: 'Request message is required' })}
                                placeholder="Write your request message here"
                                className="textarea textarea-bordered"
                            />
                            {errors.requestMessage && <div className="text-red-500">{errors.requestMessage.message}</div>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Request Donation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default CreateDonationRequest;
