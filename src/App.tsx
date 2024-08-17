import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import AdminLayout from './pages/Admin/AdminLayout';
import StudentApplicant from './pages/public/StudentApplicant';
import StudentOnboarding from './pages/Admin/student/StudentOnboarding';
import LecturerOnboarding from './pages/Admin/lecturer/LecturerOnboarding';
import Announcements from './pages/Admin/communication/Announcements';
import NewAnnounce from './pages/Admin/communication/NewAnnounce';
import Messages from './pages/Admin/communication/Messages';
import Faculty from './pages/Admin/university/faculty/Faculty';
import Courses from './pages/Admin/university/course/Courses';
import PrivateRoute from './services/PrivateRoute';
import NewFaculty from './pages/Admin/university/faculty/NewFaculty';
import FacultyDetails from './pages/Admin/university/faculty/FacultyDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Department from './pages/Admin/university/department/Department';
import NewDepartment from './pages/Admin/university/department/NewDepartment';
import DepartmentDetails from './pages/Admin/university/department/DepartmentDetails';

const App: React.FC = () => (
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
        <Route
          path="/*"
          element={
            <PrivateRoute element={
              <AdminLayout>
                <Routes>
                  <Route path="university/faculty" element={<Faculty />} />
                  <Route path="university/faculty/new" element={<NewFaculty />} />
                  <Route path="university/faculty/:id/details" element={<FacultyDetails />} />
                  <Route path="university/department" element={<Department />} />
                  <Route path="university/department/new" element={<NewDepartment />} />
                  <Route path="university/department/:id/details" element={<DepartmentDetails />} />
                  <Route path="university/courses" element={<Courses />} />
                  <Route path="student/applicants" element={<StudentApplicant />} />
                  <Route path="student/onboarding" element={<StudentOnboarding />} />
                  <Route path="lecturer/onboarding" element={<LecturerOnboarding />} />
                  <Route path="announcements" element={<Announcements />} />
                  <Route path="announcements/new" element={<NewAnnounce />} />
                  <Route path="messages" element={<Messages />} />
                </Routes>
              </AdminLayout>
            } />
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
