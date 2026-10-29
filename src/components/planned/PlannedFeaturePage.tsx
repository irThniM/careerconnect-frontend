import type { ReactElement } from 'react';

interface PlannedFeaturePageProps {
  title: string;
  summary: string;
  items: string[];
  phase: 'Core' | 'Priority 2' | 'Optional';
}

/** Shared placeholder for planned screens. It is intentionally not wired to routes or APIs. */
export default function PlannedFeaturePage({ title, summary, items, phase }: PlannedFeaturePageProps): ReactElement {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800">{phase}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">Các phần dự kiến</p>
          <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-slate-600">
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <p className="mt-5 text-xs text-slate-500">Bản khung giao diện: chưa nối API, chưa lưu dữ liệu và chưa đưa vào điều hướng chính.</p>
      </div>
    </main>
  );
}
