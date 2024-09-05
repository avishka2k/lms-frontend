import Navbar from "../../components/Lecturer/Navbar";

const LecturerLayout = ({ children }: { children: any }) => {
    return (
        <div className="wrapper">
            <Navbar />
            {/*<Sidebar />*/}
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
}

export default LecturerLayout;