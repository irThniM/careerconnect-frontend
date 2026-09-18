import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import CandidateLayout from './layouts/CandidateLayout';
import EmployerLayout from './layouts/EmployerLayout'; 
import EmployerDashboardLayout from './layouts/EmployerDashboardLayout';

// Pages Ứng viên (Candidate)
import CandidateHome from './pages/candidate/Home'; 
import CandidateLogin from './pages/candidate/CandidateLogin'; 
import CandidateRegister from './pages/candidate/CandidateRegister'; 
import EmailVerification from './pages/candidate/EmailVerification';

// Pages Nhà Tuyển Dụng (Employer)
import EmployerHome from './pages/employer/Home'; 
import EmployerDashboard from './pages/employer/Dashboard'; 
import EmployerLogin from './pages/employer/EmployerLogin'; 
import EmployerRegister from './pages/employer/EmployerRegister'; 
import CompanyProfile from './pages/employer/CompanyProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- LUỒNG ỨNG VIÊN (CANDIDATE) --- */}
        <Route path="/login" element={<CandidateLogin />} />
        <Route path="/register" element={<CandidateRegister />} />
        <Route path="/verify-email" element={<EmailVerification />} />

        <Route path="/" element={<CandidateLayout />}>
          <Route index element={<CandidateHome />} />
        </Route>

        {/* --- LUỒNG NHÀ TUYỂN DỤNG (EMPLOYER) --- */}
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/register" element={<EmployerRegister />} />

        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerHome />} /> 
        </Route>

        <Route path="/employer/dashboard" element={<EmployerDashboardLayout />}>
          <Route index element={<EmployerDashboard />} />
        </Route>

        <Route path="/employer/profile" element={<CompanyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
