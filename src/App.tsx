import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import AdminLayout from './pages/Admin/AdminLayout';
import StudentApplicant from './pages/Admin/student/StudentApplicant';
import StudentOnboarding from './pages/Admin/student/StudentOnboarding';
import LecturerOnboarding from './pages/Admin/lecturer/LecturerOnboarding';
import Announcements from './pages/Admin/communication/Announcements';
import NewAnnounce from './pages/Admin/communication/NewAnnounce';
import Messages from './pages/Admin/communication/Messages';
import Faculty from './pages/Admin/university/faculty/Faculty';
import Course from './pages/Admin/university/course/Course';
import PrivateRoute from './services/PrivateRoute';
import NewFaculty from './pages/Admin/university/faculty/NewFaculty';
import FacultyDetails from './pages/Admin/university/faculty/FacultyDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Department from './pages/Admin/university/department/Department';
import NewDepartment from './pages/Admin/university/department/NewDepartment';
import DepartmentDetails from './pages/Admin/university/department/DepartmentDetails';
import NewCourse from "./pages/Admin/university/course/NewCourse";
import CourseDetails from "./pages/Admin/university/course/CourseDetails";
import StudentRequest from "./pages/public/StudentRequest";
import NotFound from "./pages/public/NotFound";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import Module from "./pages/Admin/university/modules/Module";
import NewModule from "./pages/Admin/university/modules/NewModule";
import ModuleDetails from "./pages/Admin/university/modules/ModuleDetails";
import Unauthorized from "./pages/public/Unauthorized";
import StudentLayout from "./pages/Student/StudentLayout";
import LecturerLayout from './pages/Lecturer/LecturerLayout';
import Home from "./pages/Student/Home/Home";
import Materials from "./pages/Student/Materials/materials";
import EnrolledStudent from "./pages/Admin/student/EnrolledStudent";
import NewStudent from "./pages/Admin/student/NewStudent";
import Profile from "./pages/Student/Profile/Profile";
import LecturerHome from "./pages/Lecturer/Home/Home";
import LecturerMaterials from "./pages/Lecturer/Materials/materials";
import LecturerProfile from "./pages/Lecturer/Profile/Profile";
import AllLecturers from "./pages/Admin/lecturer/AllLecturers";

const App: React.FC = () => {


    useEffect(() => {
        if (window.location.pathname.startsWith('/student')) {
            document.body.className = 'hold-transition layout-top-nav';
        } else {
            document.body.className = 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed';
        }
    }, [window.location.pathname]);

    return (
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <AuthProvider>
                <Routes>
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/student-application" element={<StudentRequest />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute element={<div />} allowedGroups={['ADMIN', 'STUDENT', 'LECTURER']} />
                        }
                    />
                    <Route
                        path="/admin/*"
                        element={
                            <PrivateRoute element={
                                <AdminLayout>
                                    <Routes>
                                        <Route path="index" element={<Dashboard />} />
                                        <Route path="university/faculty" element={<Faculty />} />
                                        <Route path="university/faculty/new" element={<NewFaculty />} />
                                        <Route path="university/faculty/:id/details" element={<FacultyDetails />} />
                                        <Route path="university/department" element={<Department />} />
                                        <Route path="university/department/new" element={<NewDepartment />} />
                                        <Route path="university/department/:id/details" element={<DepartmentDetails />} />
                                        <Route path="university/course" element={<Course />} />
                                        <Route path="university/course/new" element={<NewCourse />} />
                                        <Route path="university/course/:id/details" element={<CourseDetails />} />
                                        <Route path="university/module" element={<Module />} />
                                        <Route path="university/module/new" element={<NewModule />} />
                                        <Route path="university/module/:id/details" element={<ModuleDetails />} />
                                        <Route path="student/applicants" element={<StudentApplicant />} />
                                        <Route path="student/applicants/:id/view" element={<StudentOnboarding />} />
                                        <Route path="student/enrolled" element={<EnrolledStudent />} />
                                        <Route path="student/new" element={<NewStudent />} />
                                        <Route path="lecturer/onboarding" element={<LecturerOnboarding />} />
                                        <Route path="lecturer/all" element={<AllLecturers />} />
                                        <Route path="announcements" element={<Announcements />} />
                                        <Route path="announcements/new" element={<NewAnnounce />} />
                                        <Route path="messages" element={<Messages />} />
                                    </Routes>
                                </AdminLayout>
                            } allowedGroups={['ADMIN']} />
                        }
                    />
                    <Route
                        path="/student/*"
                        element={
                            <PrivateRoute element={
                                <StudentLayout>
                                    <Routes>
                                        <Route path="" element={<Home />} />
                                        <Route path=":id/materials" element={<Materials />} />
                                        <Route path="profile" element={<Profile />} />
                                    </Routes>
                                </StudentLayout>
                            } allowedGroups={['STUDENT']} />
                        }
                    />
                    <Route
                        path="/lecturer/*"
                        element={
                            <PrivateRoute element={
                                <LecturerLayout>
                                    <Routes>
                                        <Route path="" element={<LecturerHome />} />
                                        <Route path=":id/materials" element={<LecturerMaterials />} />
                                        <Route path="profile" element={<LecturerProfile />} />
                                    </Routes>
                                </LecturerLayout>
                            } allowedGroups={['LECTURER']} />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App;
