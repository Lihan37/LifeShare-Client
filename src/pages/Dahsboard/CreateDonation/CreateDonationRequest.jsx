import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../hooks/useAxiosPublic/UseAxioxPublic";
import { useEffect, useState } from "react";

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const axiosPublic = UseAxiosPublic();

    const onSubmit = async (data) => {
        try {
            // Add additional fields as needed
            const requestData = {
                ...data,
                requesterName: user.name,
                requesterEmail: user.email,
                donationStatus: "pending", 
            };

            
            const response = await axiosPublic.post('/donationRequests', requestData);

            if (response.data.success) {
                
                console.log("Donation request created successfully");
                reset(); 
                navigate('/dashboard');
            } else {
                
                console.error("Failed to create donation request");
            }
        } catch (error) {
            console.error("Error submitting donation request:", error);
        }
    };

    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const districtsResponse = await fetch("../../../../public/districts.json");
                const districtsData = await districtsResponse.json();
                setDistricts(districtsData);

                const upazillasResponse = await fetch("../../../../public/upazilla.json");
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

    const filteredUpazillas = upazillas.filter(
        (upazilla) => upazilla.district_id === selectedDistrict
    );

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                        <h1 className="text-center font-semibold pt-5 text-3xl">Create Donation Request</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-2">
                            {/* Existing fields */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Requester Name</span>
                                </label>
                                <input type="text" defaultValue={user.name} readOnly className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Requester Email</span>
                                </label>
                                <input type="email" value={user.email} readOnly className="input input-bordered" />
                            </div>
                            {/* New fields */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("recipientName", { required: true })}
                                    placeholder="Recipient Name"
                                    className="input input-bordered"
                                    required
                                />
                                {errors.recipientName && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient District</span>
                                </label>
                                <select
                                    {...register("recipientDistrict", { required: true })}
                                    className="select select-bordered"
                                    onChange={handleDistrictChange}
                                    required
                                >
                                    <option value="" disabled>Select District</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.recipientDistrict && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient Upazila</span>
                                </label>
                                <select
                                    {...register("recipientUpazila", { required: true })}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="" disabled>Select Upazila</option>
                                    {filteredUpazillas.map((upazilla) => (
                                        <option key={upazilla.id} value={upazilla.id}>
                                            {upazilla.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.recipientUpazila && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Hospital Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("hospitalName", { required: true })}
                                    placeholder="Hospital Name"
                                    className="input input-bordered"
                                    required
                                />
                                {errors.hospitalName && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Address</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("fullAddress", { required: true })}
                                    placeholder="Full Address"
                                    className="input input-bordered"
                                    required
                                />
                                {errors.fullAddress && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Date</span>
                                </label>
                                <input
                                    type="date"
                                    {...register("donationDate", { required: true })}
                                    className="input input-bordered"
                                    required
                                />
                                {errors.donationDate && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Time</span>
                                </label>
                                <input
                                    type="time"
                                    {...register("donationTime", { required: true })}
                                    className="input input-bordered"
                                    required
                                />
                                {errors.donationTime && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Request Message</span>
                                </label>
                                <textarea
                                    {...register("requestMessage", { required: true })}
                                    placeholder="Write your request message here"
                                    className="textarea textarea-bordered"
                                    required
                                />
                                {errors.requestMessage && <span>This field is required</span>}
                            </div>
                            <div className="form-control col-span-2">
                                <button type="submit" className="btn w-full btn-primary">Request Donation</button>
                            </div>
                        </form>
                        <p className="px-4 pb-2"><small>Already have an account? <Link className="text-blue-600 font-semibold" to='/login'>Login here</Link></small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDonationRequest;
