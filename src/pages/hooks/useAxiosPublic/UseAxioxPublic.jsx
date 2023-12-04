import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://b8a12-server-side-lihan37.vercel.app', 
    withCredentials: true
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;