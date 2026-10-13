import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CandidateJobSearch: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('keyword', keyword.trim());
    if (location.trim()) params.set('location', location.trim());
    navigate(`/jobs${params.size ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="px-4 pb-4 pt-5 sm:px-6 lg:px-8">
      <form onSubmit={submitSearch} className="mx-auto max-w-[1320px] rounded-xl border border-indigo-100 bg-white p-3 shadow-sm sm:p-4">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_260px_auto]">
          <label className="flex min-w-0 items-center gap-2 rounded-lg bg-indigo-50 px-3 py-3"><span className="material-symbols-outlined text-blue-900">search</span><input value={keyword} onChange={(event) => setKeyword(event.target.value)} className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500" placeholder="Chức danh, kỹ năng hoặc công ty" aria-label="Từ khóa tìm việc" /></label>
          <label className="flex min-w-0 items-center gap-2 rounded-lg bg-indigo-50 px-3 py-3"><span className="material-symbols-outlined text-blue-900">location_on</span><input value={location} onChange={(event) => setLocation(event.target.value)} className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500" placeholder="Thành phố, khu vực" aria-label="Địa điểm tìm việc" /></label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"><span className="material-symbols-outlined">search</span>Tìm việc</button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs"><span className="font-semibold text-slate-600">Từ khóa phổ biến:</span>{['React', '.NET', 'Data Analyst', 'QA Engineer'].map((tag) => <Link key={tag} to={`/jobs?keyword=${encodeURIComponent(tag)}`} className="rounded-full bg-indigo-50 px-3 py-1.5 text-blue-900 hover:bg-indigo-100">{tag}</Link>)}</div>
      </form>
    </section>
  );
};

export default CandidateJobSearch;
