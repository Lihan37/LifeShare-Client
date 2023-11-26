import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);

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

    const handleRegister = event => {
        event.preventDefault();
    }

    return (
        <div>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-center font-semibold pt-5 text-3xl">Register here!</h1>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email"
                                    name="email"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"
                                    name="password"
                                    className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <p className="px-4 pb-2"><small>Already have an account? <Link className="text-blue-600 font-semibold" to='/registration'>Login here</Link></small></p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Registration;
