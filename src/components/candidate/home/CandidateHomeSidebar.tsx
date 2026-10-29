import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  signedInCandidate: boolean;
  profileReady: boolean;
  profileError: boolean;
  profileCompletion: number;
  professionalTitle: string | null;
};

const CandidateHomeSidebar: React.FC<Props> = ({ signedInCandidate, profileReady, profileError, profileCompletion, professionalTitle }) => (
  <aside className="space-y-4 lg:sticky lg:top-24">
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3"><h2 className="font-bold text-slate-900">Hồ sơ ứng viên</h2><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">{signedInCandidate ? profileError ? '—' : profileReady ? `${profileCompletion}%` : '…' : 'Chưa đăng nhập'}</span></div>
      <p className="mt-2 text-sm leading-5 text-slate-600">{signedInCandidate ? profileError ? 'Không thể tải hồ sơ lúc này. Bạn có thể thử tải lại trang.' : (professionalTitle || 'Thêm vị trí mong muốn để giới thiệu rõ định hướng nghề nghiệp.') : 'Đăng nhập để lưu thông tin cơ bản và tiếp tục hoàn thiện hồ sơ.'}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${signedInCandidate && profileReady && !profileError ? profileCompletion : 0}%` }} /></div>
      <Link to={signedInCandidate ? '/profile' : '/login'} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"><span className="material-symbols-outlined text-lg">{signedInCandidate ? 'edit' : 'login'}</span>{signedInCandidate ? 'Quản lý hồ sơ cá nhân' : 'Đăng nhập ứng viên'}</Link>
      <p className="mt-3 text-xs text-slate-500">CV, kỹ năng và ứng tuyển trực tuyến sẽ được kết nối ở giai đoạn tiếp theo.</p>
    </section>
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-900">lightbulb</span><h2 className="font-bold text-slate-900">Mẹo tìm việc</h2></div><ul className="mt-3 space-y-3 text-sm leading-5 text-slate-600"><li className="flex gap-2"><span className="mt-0.5 text-emerald-700">✓</span><span>Dùng chức danh cụ thể như “Backend .NET” thay vì từ khóa quá rộng.</span></li><li className="flex gap-2"><span className="mt-0.5 text-emerald-700">✓</span><span>Đọc kỹ địa điểm, kinh nghiệm và hạn nhận hồ sơ trước khi ứng tuyển.</span></li><li className="flex gap-2"><span className="mt-0.5 text-emerald-700">✓</span><span>Cập nhật số điện thoại và phần giới thiệu trong hồ sơ cơ bản.</span></li></ul></section>
    <section className="rounded-xl bg-blue-950 p-5 text-white shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-indigo-200">CareerConnect</p><h2 className="mt-2 text-lg font-bold">Một bước nhỏ, gần hơn với công việc phù hợp</h2><p className="mt-2 text-sm leading-5 text-indigo-100">Bắt đầu bằng việc khám phá tin tuyển dụng và chọn bộ lọc phù hợp với bạn.</p><Link to="/jobs" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-blue-950 hover:bg-indigo-50">Xem việc làm <span className="material-symbols-outlined text-lg">arrow_forward</span></Link></section>
  </aside>
);

export default CandidateHomeSidebar;
