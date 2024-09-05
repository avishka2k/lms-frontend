import Navbar from "../../components/Student/Navbar";

const StudentLayout = ({ children }: { children: any }) => {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
}

export default StudentLayout;