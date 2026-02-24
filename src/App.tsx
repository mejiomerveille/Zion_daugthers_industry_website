import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AssociationPage } from './pages/AssociationPage';
import { ChurchPage } from './pages/ChurchPage';
import { SchoolPage } from './pages/SchoolPage';
import { ContactPage } from './pages/ContactPage';
import { DonatePage } from './pages/DonatePage';
import { CoursePage } from './pages/CoursePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminPages from './pages/admin/AdminPages';
import AdminCourses from './pages/admin/AdminCourses';
import AdminDonations from './pages/admin/AdminDonations';
import AdminStudents from './pages/admin/AdminStudents';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<><Navigation /><HomePage /></>} />
          <Route path="/association" element={<><Navigation /><AssociationPage /></>} />
          <Route path="/church" element={<><Navigation /><ChurchPage /></>} />
          <Route path="/school" element={<><Navigation /><SchoolPage /></>} />
          <Route path="/contact" element={<><Navigation /><ContactPage /></>} />
          <Route path="/donate" element={<><Navigation /><DonatePage /></>} />
          <Route path="/course/:courseId" element={<><Navigation /><CoursePage /></>} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="students" element={<AdminStudents />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
