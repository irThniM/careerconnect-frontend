import React, { type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { JobSearchForm } from './jobSearchForm';

type Props = {
  form: JobSearchForm;
  loading: boolean;
  totalCount: number;
  onKeywordChange: (keyword: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const JobSearchHeader: React.FC<Props> = ({ form, loading, totalCount, onKeywordChange, onSubmit }) => (
  <>
    <div className="mb-space-lg"><p className="font-metadata-label font-semibold uppercase tracking-wider text-primary">CareerConnect · Cơ hội nghề nghiệp</p><h1 className="mt-2 font-headline-xl font-bold text-on-surface">Tìm việc phù hợp với bạn</h1><p className="mt-2 max-w-2xl font-body-regular text-on-surface-variant">Tìm kiếm cơ hội theo từ khóa, sau đó tinh chỉnh kết quả theo địa điểm, kinh nghiệm, hình thức làm việc và mức lương.</p></div>
    <form onSubmit={onSubmit} className="mb-space-lg flex flex-col gap-space-sm rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-md shadow-sm sm:flex-row">
      <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-surface-container-low px-space-sm py-2.5"><span className="material-symbols-outlined text-primary">search</span><input aria-label="Từ khóa" className="w-full bg-transparent font-body-regular text-on-surface outline-none placeholder:text-outline" placeholder="Chức danh, kỹ năng, công ty..." value={form.keyword} onChange={(event) => onKeywordChange(event.target.value)}/></label>
      <button type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-space-lg py-2.5 font-body-compact font-bold text-on-primary transition hover:bg-primary-container"><span className="material-symbols-outlined text-[18px]">search</span>Tìm việc</button>
    </form>
    <div className="mb-space-md flex flex-wrap items-end justify-between gap-space-sm"><div><h2 className="font-headline-md font-bold text-on-surface">Việc làm đang tuyển</h2>{!loading && <p className="mt-1 font-body-compact text-on-surface-variant">{new Intl.NumberFormat('vi-VN').format(totalCount)} kết quả</p>}</div><Link to="/" className="font-body-compact font-semibold text-primary hover:underline">Về trang chủ</Link></div>
  </>
);

export default JobSearchHeader;
