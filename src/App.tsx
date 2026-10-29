import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import CandidateLayout from './layouts/CandidateLayout';
import EmployerLayout from './layouts/EmployerLayout';
import EmployerDashboardLayout from './layouts/EmployerDashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Load each page only when its route is visited to keep the initial bundle small.
const CandidateHome = lazy(() => import('./pages/candidate/Home'));
const CandidateLogin = lazy(() => import('./pages/candidate/CandidateLogin'));
const CandidateRegister = lazy(() => import('./pages/candidate/CandidateRegister'));
const EmailVerification = lazy(() => import('./pages/candidate/EmailVerification'));
const CandidateJobs = lazy(() => import('./pages/candidate/Jobs'));
const CandidateJobDetail = lazy(() => import('./pages/candidate/JobDetail'));
const CandidateProfile = lazy(() => import('./pages/candidate/CandidateProfile'));
const RecommendedJobs = lazy(() => import('./pages/candidate/RecommendedJobs'));
const CandidateApplicationsPage = lazy(() => import('./features/applications/pages/CandidateApplicationsPage'));
const EmployerApplicationsPage = lazy(() => import('./features/applications/pages/EmployerApplicationsPage'));
const EmployerHome = lazy(() => import('./pages/employer/Home'));
const EmployerDashboard = lazy(() => import('./pages/employer/Dashboard'));
const EmployerLogin = lazy(() => import('./pages/employer/EmployerLogin'));
const EmployerRegister = lazy(() => import('./pages/employer/EmployerRegister'));
const CompanyProfile = lazy(() => import('./pages/employer/CompanyProfile'));
const CreateJobPage = lazy(() => import('./pages/employer/CreateJobPage'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminCompaniesPage = lazy(() => import('./pages/admin/AdminCompaniesPage'));
const AdminProfilePage = lazy(() => import('./pages/admin/AdminProfilePage'));

function App() {
  return (
    <BrowserRouter>

      <Toaster
              position="top-right"
              toastOptions={{
                success: {
                  style: { background: '#ECFDF5', color: '#047857', border: '1px solid #34D399' },
                  iconTheme: { primary: '#059669', secondary: '#ECFDF5' },
                },
                error: {
                  style: { background: '#ffdad6', color: '#93000a', border: '1px solid #ba1a1a' },
                  iconTheme: { primary: '#ba1a1a', secondary: '#ffdad6' },
                },
              }}
            />

      <Suspense fallback={<div className="px-6 py-12 text-center text-on-surface-variant">Đang tải trang...</div>}>
      <Routes>
        {/* --- LUỒNG QUẢN TRỊ (ADMIN) --- */}
        <Route path="/admin-secure-login" element={<AdminLoginPage />} />

        {/* Đã xóa cụm Route dư thừa, chỉ giữ lại một nhóm Route bảo vệ bởi AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="companies" element={<AdminCompaniesPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* --- LUỒNG ỨNG VIÊN (CANDIDATE) --- */}
        <Route path="/login" element={<CandidateLogin />} />
        <Route path="/register" element={<CandidateRegister />} />
        <Route path="/verify-email" element={<EmailVerification />} />

        <Route path="/" element={<CandidateLayout />}>
          <Route index element={<CandidateHome />} />
          <Route path="jobs" element={<CandidateJobs />} />
          <Route path="jobs/recommended" element={<RecommendedJobs />} />
          <Route path="jobs/:jobId" element={<CandidateJobDetail />} />
          <Route path="profile" element={<CandidateProfile />} />
          <Route path="applications" element={<CandidateApplicationsPage />} />
        </Route>

        {/* --- LUỒNG NHÀ TUYỂN DỤNG (EMPLOYER) --- */}
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/register" element={<EmployerRegister />} />
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerHome />} />
          <Route path="jobs/create" element={<CreateJobPage />} />
          <Route path="jobs/:jobId/edit" element={<CreateJobPage />} />
        </Route>
        <Route path="/employer/dashboard" element={<EmployerDashboardLayout />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="applications" element={<EmployerApplicationsPage />} />
        </Route>
        <Route path="/employer/profile" element={<CompanyProfile />} />
      </Routes>
      </Suspense>


    </BrowserRouter>
  );
}

export default App;
