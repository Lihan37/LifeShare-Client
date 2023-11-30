
import UseAxiosSecure from '../../hooks/useAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';


const AllUsers = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('users');
            return res.data;
        }
    });

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
                        console.error("Error deleting donation request:", error);
                    });
            }
        });
    }
    return (
        <div>
            <h2>All Users: {users.length}</h2>
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
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
                                    {
                                        user.role === 'admin' ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn bg-orange-600 text-white"
                                        >
                                            <FaUsers ></FaUsers>
                                        </button>
                                    }
                                </td>
                                <td><button
                                    onClick={() => handleDeleteUser(user)}
                                    className="btn bg-red-600 text-white"
                                >
                                    <FaTrash ></FaTrash>
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
