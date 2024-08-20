import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/SideBar";

const AdminLayout = ({ children }: { children: any }) => {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;