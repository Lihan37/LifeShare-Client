import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Registration from "../pages/signup/Registration/Registration";
import SearchDonors from "../pages/SearchDonors/SearchDonors";
import Login from "../pages/signup/Login/Login";

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
]);