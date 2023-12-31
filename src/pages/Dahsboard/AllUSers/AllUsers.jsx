

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/useAxiosSecure/UseAxiosSecure";
import ReactPaginate from 'react-js-pagination';
import CustomPagination from './CustomPagination';



const AllUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const itemsPerPage = 5;
    const totalItems = 50;

    const [currentPage, setCurrentPage] = useState(1);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const buttonClass = 'btn bg-custom-bg-color text-black';


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedUsers = users.slice(startIndex, endIndex);

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleBlockUser = user => {
        const endpoint = user.status === 'active'
            ? `/users/admin/block/${user._id}`
            : `/users/admin/unblock/${user._id}`;

        axiosSecure.patch(endpoint)
            .then(res => {
                console.log('Response from server:', res.data);
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is ${user.status === 'active' ? 'blocked' : 'unblocked'}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error blocking/unblocking user:', error);
            });
    };

    const handleMakeVolunteer = user => {
        axiosSecure.patch(`/users/volunteer/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.role === 'volunteer') {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a Volunteer`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error('Error making user a volunteer:', error);
            });
    };







    const handleDeleteUser = user => {
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
                    .delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                    });
            }
        });
    }

    return (
        <div>
            <h2 className='text-4xl text-center font-bold my-5'>All Users: {users.length}</h2>
            <div className='divider'></div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Roles</th>
                            <th>Status</th> {/* Add this line for the new column */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img
                                        src={user.avatar}
                                        alt={`Avatar of ${user.name}`}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                </td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : (
                                        <>
                                            {user.role === 'volunteer' ? 'Volunteer' : (
                                                <>
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn bg-orange-600 text-white"
                                                    >
                                                        <FaUsers></FaUsers>
                                                    </button>
                                                    <button
                                                        onClick={() => handleMakeVolunteer(user)}
                                                        className="btn bg-green-600 text-white ml-2"
                                                    >
                                                        Make Volunteer
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </td>
                                <td>{user.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleBlockUser(user)}
                                        className={`btn bg-${user.status === 'active' ? 'red' : 'blue'}-600 text-white`}
                                    >
                                        {user.status === 'active' ? 'Block' : 'Unblock'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn bg-red-600 text-white ml-2"
                                    >
                                        <FaTrash></FaTrash>
                                    </button>
                                </td>
                            </tr>
                        ))}




                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center flex-row ">
                <CustomPagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllUsers;
