
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/footer';
import NavBar from '../pages/Shared/navbar/NavBar';

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
