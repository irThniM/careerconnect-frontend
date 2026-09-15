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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- LUỒNG ỨNG VIÊN (CANDIDATE) --- */}
        
        {/* Các trang Đăng nhập / Đăng ký / Xác thực email đứng độc lập */}
        <Route path="/login" element={<CandidateLogin />} />
        <Route path="/register" element={<CandidateRegister />} />
        <Route path="/verify-email" element={<EmailVerification />} />

        {/* Các trang nằm trong Layout của Ứng viên (có thanh menu to) */}
        <Route path="/" element={<CandidateLayout />}>
          <Route index element={<CandidateHome />} />
        </Route>

        {/* --- LUỒNG NHÀ TUYỂN DỤNG (EMPLOYER) --- */}
        
        {/* Đăng nhập & Đăng ký NTD */}
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/register" element={<EmployerRegister />} />

        {/* Landing Page của NTD (Dùng Layout có menu ngang) */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerHome />} /> 
        </Route>

        {/* KHU VỰC QUẢN TRỊ (Dùng Layout có Sidebar dọc) */}
        <Route path="/employer/dashboard" element={<EmployerDashboardLayout />}>
          <Route index element={<EmployerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;