import Footer from "./components/Admin/Footer";
import Navbar from "./components/Admin/Navbar";
import Sidebar from "./components/Admin/SideBar";

const AdminLayout = ({ children }: { children: any }) => {
    return (
        <div className="wrapper">

            {/* Preloader */}

            {/* <div className="preloader flex-column justify-content-center align-items-center">
                <img className="animation__shake" src="/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
            </div> */}

            {/* Navbar */}
            <Navbar />

            {/* Main Sidebar Container */}
            <Sidebar />

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {children}
            </div>
            {/* /.content-wrapper */}
            <Footer />
        </div>
    );
}

export default AdminLayout;