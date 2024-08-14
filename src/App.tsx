import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import AdminLayout from './AdminLayout';
import StudentApplicant from './pages/Admin/StudentApplicant';
import StudentOnboarding from './pages/Admin/StudentOnboarding';
import LecturerOnboarding from './pages/Admin/LecturerOnboarding';
import Announcements from './pages/Admin/communication/Announcements';
import NewAnnounce from './pages/Admin/communication/NewAnnounce';
import Messages from './pages/Admin/communication/Messages';
import Faculty from './pages/Admin/university/Faculty';
import Department from './pages/Admin/university/Department';
import Courses from './pages/Admin/university/Courses';
import PrivateRoute from './services/PrivateRoute';
const App: React.FC = () => (
  <Router>
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
                  <Route path="university/department" element={<Department />} />
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
