import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../hooks/useAxiosPublic/UseAxioxPublic';
import axios from 'axios';
import Swal from 'sweetalert2';





const SearchPage = () => {
    const axiosPublic = UseAxiosPublic();
    const { register, handleSubmit } = useForm();
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const districtsResponse = await fetch("/src/districts.json");
                const districtsData = await districtsResponse.json();
                setDistricts(districtsData);

                const upazillasResponse = await fetch("/src/upazilla.json");
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

    const onSubmit = async (data) => {
        try {
            // Check if blood group is provided
            if (!data.bloodGroup) {
                // Show an alert to inform the user
                alert("You must provide Blood Group for searching.");
                return;
            }
    
            
            const response = await axiosPublic.get('/users');
            const allUsers = response.data;
    
            
            const filteredUsers = allUsers.filter(user => user.bloodGroup === data.bloodGroup);
    
            setSearchedUsers(filteredUsers);
    
            if (filteredUsers.length === 0) {
                Swal.fire({
                    title: 'No Matching Users',
                    text: 'No users found with the provided blood group.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error searching for users:', error);
        }
    };
    
    

    return (
        <div>
            <h2 className='text-4xl my-10 text-center'>Donor Search</h2>
            <h2 className='text-xl my-5 text-center'>*You can only search by blood group if you want*</h2>

            <div className='flex justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="card p-5 text-center shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <div className="form-control">
                        <label className="label">Blood Group:</label>
                        <select {...register('bloodGroup')} className="select select-bordered">
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">District:</label>
                        <select
                            {...register('district')}
                            className="select select-bordered"
                            onChange={handleDistrictChange}
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">Upazila:</label>
                        <select
                            {...register('upazila')}
                            className="select select-bordered"
                        >
                            <option value="">Select Upazila</option>
                            {filteredUpazillas.map((upazilla) => (
                                <option key={upazilla.id} value={upazilla.id}>
                                    {upazilla.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">Email:</label>
                        <input type="text" {...register('email')} className="input input-bordered" />
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <div className="table  w-full">
                <table className="table-auto text-4xl">
                    <thead>
                        <tr className='text-4xl'>
                            <th>Name</th>
                            <th>Email</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>

                    <tbody>
                        {searchedUsers.map((user) => (
                            <tr key={user._id}>
                                <td className='text-2xl'> {user.name}</td>
                                <td className='text-2xl'>{user.email}</td>
                                {/* Add more columns as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchPage;

