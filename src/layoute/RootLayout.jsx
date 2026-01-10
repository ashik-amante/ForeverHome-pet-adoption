
import Navbar from '../pages/shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer';

const RootLayout = () => {
    return (
        <div >
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto min-h-screen mt-16'>
                 <Outlet/>
                
            </div>
            <div>
                <Footer></Footer>
            </div>
           
            
        </div>
    );
};

export default RootLayout;