import React from 'react';
import { Link } from 'react-router-dom';

const CandidateQuickLinks: React.FC<{ signedInCandidate: boolean }> = ({ signedInCandidate }) => (
  <section className="grid gap-3 sm:grid-cols-2">
    <Link to="/jobs" className="group rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 transition hover:shadow-md"><span className="material-symbols-outlined text-2xl text-blue-900">manage_search</span><h3 className="mt-3 font-bold text-slate-900">Tìm theo mục tiêu nghề nghiệp</h3><p className="mt-1 text-sm leading-5 text-slate-600">Lọc tin theo từ khóa, địa điểm, kinh nghiệm và mức lương.</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-900">Mở bộ lọc <span className="transition group-hover:translate-x-1">→</span></span></Link>
    <Link to={signedInCandidate ? '/profile' : '/login'} className="group rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 transition hover:shadow-md"><span className="material-symbols-outlined text-2xl text-emerald-800">badge</span><h3 className="mt-3 font-bold text-slate-900">Chuẩn bị hồ sơ cơ bản</h3><p className="mt-1 text-sm leading-5 text-slate-600">Thêm vị trí mong muốn, số điện thoại và phần giới thiệu ngắn.</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800">{signedInCandidate ? 'Cập nhật hồ sơ' : 'Đăng nhập để cập nhật'} <span className="transition group-hover:translate-x-1">→</span></span></Link>
  </section>
);

export default CandidateQuickLinks;
