import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Registration from "../pages/signup/Registration/Registration";
import SearchDonors from "../pages/SearchDonors/SearchDonors";
import Login from "../pages/signup/Login/Login";
import DashBoard from "../layout/DashBoard";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/Dahsboard/MyProfile/MyProfile";
import MyDonationRequests from "../pages/Dahsboard/MyRequests/MyDonationRequests";
import CreateDonationRequest from "../pages/Dahsboard/CreateDonation/CreateDonationRequest";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/searchDonors',
                element: <SearchDonors></SearchDonors>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'my-donation-requests',
                element: <MyDonationRequests></MyDonationRequests>
            },
            {
                path: 'create-donation-request',
                element: <CreateDonationRequest></CreateDonationRequest>
            }
        ]
    }
]);