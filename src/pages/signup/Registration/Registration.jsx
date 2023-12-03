import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import UseAxiosPublic from "../../hooks/useAxiosPublic/UseAxioxPublic";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=600d5036af985fdac53804b2e2c7d4fb`;

const Registration = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const axiosPublic = UseAxiosPublic();
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
        console.log(data);

        const imageFile = { image: data.avatar[0] };
        // const res = await axiosPublic.post(image_hosting_api, imageFile, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // });
        const formData = new FormData();
        formData.append('image', data.avatar[0])

        fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json()).then((res) => {
                console.log(res);
                createUser(data.email, data.password)
                .then(result => {
                    const loggedUser = result.user;
                    console.log(loggedUser);
                    updateUserProfile(data.name, data.photoURL)
                        .then(() => {
                            console.log('user profile info updated');

                            const selectedDistrictObject = districts.find((district) => district.id === selectedDistrict);
                            const selectedUpazilaObject = upazillas.find((upazila) => upazila.id === data.upazila);

                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                avatar:  res.data.url_viewer,
                                bloodGroup: data.bloodGroup,
                                district: selectedDistrictObject ? selectedDistrictObject.name : '',
                                upazila: selectedUpazilaObject ? selectedUpazilaObject.name : '',
                            };

                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        console.log('userAdded db', userInfo.data);
                                        reset();
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "User Created Successfully",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate('/');
                                    }
                                })

                        })
                        .catch(error => console.log(error))
                });

                if (password !== confirmPassword) {
                    toast.error('Passwords do not match');
                    return;
                }

                if (password.length < 6) {
                    setRegisterError('Password should be at least 6 characters long');
                    toast.error('Password should be at least 6 characters long');
                    return;
                } else if (!/[A-Z]/.test(password)) {
                    setRegisterError('Password should contain at least one capital letter');
                    toast.error('Password should contain at least one capital letter');
                    return;
                } else if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(password)) {
                    setRegisterError('Password should contain at least one special character');
                    toast.error('Password should contain at least one special character');
                    return;
                }

                setRegisterError('');
                setSuccess('User created successfully')
            })

        // console.log(res.data);

        const { password, confirmPassword } = data;


    };

    return (
        <div>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                        <h1 className="text-center font-semibold pt-5 text-3xl">Register here!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name"
                                    {...register("name", { required: true })}
                                    name="name"
                                    className="input input-bordered" required />
                                {errors.nameRequired && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email"
                                    {...register("email")}
                                    name="email"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Avatar</span>
                                </label>
                                <input
                                    type="file"
                                    placeholder="avatar"
                                    {...register("avatar")}
                                    name="avatar"
                                    className="input file-input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select
                                    {...register("bloodGroup")}
                                    name="bloodGroup"
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="" disabled>Select Blood Group</option>
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
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select
                                    {...register("district")}
                                    name="district"
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
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upazilla</span>
                                </label>
                                <select
                                    {...register("upazila")}
                                    name="upazila"
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
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"
                                    name="password"
                                    {...register("password")}
                                    className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="confirm password"
                                    name="confirmPassword"
                                    {...register('confirmPassword', { required: true })}
                                    className="input input-bordered"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors.confirmPassword && <span>This field is required</span>}
                            </div>
                            <div className="form-control col-span-2">
                                <button className="btn w-full btn-primary">Register</button>
                            </div>
                        </form>
                        <div className="divider"></div>
                        <SocialLogin></SocialLogin>
                        <p className="px-4 text-xl pb-2"><small>Already have an account? <Link className="text-blue-600 font-semibold" to='/login'>Login here</Link></small></p>
                    </div>

                </div>
            </div>

            <div>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            </div>
            {success && (
                <div className="alert alert-success mt-4">
                    {success}
                </div>
            )}
        </div>
    );
};

export default Registration;
