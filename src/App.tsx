import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './services/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './AdminLayout';
import StudentApplicant from './pages/Admin/StudentApplicant';
import StudentOnboarding from './pages/Admin/StudentOnboarding';
import LecturerOnboarding from './pages/Admin/LecturerOnboarding';
import Announcements from './pages/Admin/communication/Announcements';
import NewAnnounce from './pages/Admin/communication/NewAnnounce';
import Messages from './pages/Admin/communication/Messages';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route
        path="/*"
        element={
          <AdminLayout>
            <Routes>
              <Route path="/table" element={<StudentApplicant />} />
              <Route path="/student/onboarding" element={<StudentOnboarding />} />
              <Route path="/lecturer/onboarding" element={<LecturerOnboarding />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/announcements/new" element={<NewAnnounce />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  </Router>
  // <Router>
  //   <AuthProvider>
  //     <div>
  //       <h1>My React App</h1>
  //       <Routes>
  //         <Route path="/" element={<Login />} />
  //         <Route
  //           path="/admin"
  //           element={<PrivateRoute element={<AdminDashboard />} />}
  //         />
  //       </Routes>
  //     </div>
  //   </AuthProvider>
  // </Router>
);

export default App;
