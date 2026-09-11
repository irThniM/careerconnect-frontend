import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CandidateLayout from './layouts/CandidateLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/candidate/Home';
import CandidateLogin from './pages/auth/CandidateLogin';
import CandidateRegister from './pages/auth/CandidateRegister';
import EmailVerification from './pages/auth/EmailVerification'; // Import trang xác thực

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CandidateLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Route dùng Layout Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<CandidateLogin />} />
          <Route path="/register" element={<CandidateRegister />} />
          <Route path="/verify-email" element={<EmailVerification />} /> {/* Thêm route này */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;