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
import AllUsers from "../pages/Dahsboard/AllUSers/AllUsers";
import AllDonation from "../pages/Dahsboard/AllDonation/AllDonation";
import AdminHome from "../pages/Dahsboard/AdminHome/AdminHome";
import ContentManagement from "../pages/Dahsboard/ContentManagement/ContentManagement";
import BlogList from "../pages/Dahsboard/ContentManagement/BlogList";
import DonationDetailsPage from "../pages/Donationdetails/DonationDetailsPage";
import EditDonationRequest from "../pages/Dahsboard/EditDonationRequest/EditDonationrequest";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
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
            },
            {
                path: '/blog',
                element: <BlogList></BlogList>
            },
            {
                path: '/donationDetails',
                element: <DonationDetailsPage></DonationDetailsPage>
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
            },
            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'all-blood-donation-request',
                element: <AllDonation></AllDonation>
            },
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path:  'content-management',
                element: <ContentManagement></ContentManagement>
            },
            {
                path: 'edit/:id',
                element: <EditDonationRequest></EditDonationRequest>
            }
            
        ]
    }
]);