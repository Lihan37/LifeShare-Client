import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: 'https://b8a12-server-side-lihan37.vercel.app',
  withCredentials: true
});

const UseAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Setup interceptors
    const interceptorsRequest = axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('access-token');
        console.log('req stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const interceptorsResponse = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error.response.status;
        console.log('error', status);
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Clear interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(interceptorsRequest);
      axiosSecure.interceptors.response.eject(interceptorsResponse);
    };

  }, [logOut, navigate]);

  return axiosSecure;
};

export default UseAxiosSecure;
