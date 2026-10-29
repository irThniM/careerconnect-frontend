import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  colorClass: string;
  href?: string;
  footnote: string;
}

export default function StatCard({ title, value, icon, colorClass, href, footnote }: StatCardProps) {
  const content = <><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-500">{title}</p><p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">{value}</p></div><span className={`material-symbols-outlined rounded-xl p-3 text-2xl ${colorClass}`}>{icon}</span></div><div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="text-[11px] text-slate-500">{footnote}</span>{href && <span className="material-symbols-outlined text-base text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-900">arrow_outward</span>}</div></>;
  return href
    ? <Link to={href} className="group block rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">{content}</Link>
    : <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">{content}</div>;
}
