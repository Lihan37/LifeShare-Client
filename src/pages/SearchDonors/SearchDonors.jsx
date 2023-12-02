import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../hooks/useAxiosPublic/UseAxioxPublic';
import axios from 'axios';

const SearchPage = () => {
    const axiosPublic = UseAxiosPublic();
    const { register, handleSubmit } = useForm();
    const [searchedUsers, setSearchedUsers] = useState([]);
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const onSubmit = async (data) => {
        try {
            const response = await axiosPublic.get('/users', { params: data });
            setSearchedUsers(response.data);
        } catch (error) {
            console.error('Error searching for users:', error);
        }
    };

    return (
        <div>
            <h2 className='text-4xl my-10 text-center'>Donor Search</h2>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="card p-5 text-center shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    
                    <div className="form-control">
                        <label className="label">Blood Group:</label>
                        <select {...register('bloodGroup')} className="select select-bordered">
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    
                    <div className="form-control">
                        <label className="label">District:</label>
                        
                    </div>

                    
                    <div className="form-control">
                        <label className="label">Upazila:</label>
                        
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
                            
                        </tr>
                    </thead>
                    
                    <tbody >
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
