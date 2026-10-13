import { useState, type Dispatch, type SetStateAction } from 'react';
import type { JobSearchForm } from './jobSearchForm';

interface JobFiltersSidebarProps {
  filters: JobSearchForm;
  onChange: Dispatch<SetStateAction<JobSearchForm>>;
  onApply: () => void;
  onReset: () => void;
}

const MAX_SALARY_MILLION = 100;
const SALARY_PRESETS = [
  { label: 'Dưới 10', min: null, max: 10 },
  { label: '10–20', min: 10, max: 20 },
  { label: '20–35', min: 20, max: 35 },
  { label: '35+', min: 35, max: null },
];

const EMPLOYMENT_TYPES = [
  { label: 'Tất cả', value: '' },
  { label: 'Toàn thời gian', value: 'FULL_TIME' },
  { label: 'Bán thời gian', value: 'PART_TIME' },
  { label: 'Thực tập', value: 'INTERN' },
  { label: 'Hợp đồng', value: 'CONTRACT' },
];

const WORK_MODES = [
  { label: 'Tất cả', value: '' },
  { label: 'Văn phòng', value: 'ONSITE' },
  { label: 'Kết hợp', value: 'HYBRID' },
  { label: 'Từ xa', value: 'REMOTE' },
];

const INDUSTRY_SUGGESTIONS = [
  'Công nghệ thông tin',
  'Giáo dục / Đào tạo',
  'Tài chính / Ngân hàng',
  'Marketing / Truyền thông',
  'Kinh doanh / Bán hàng',
  'Nhân sự',
  'Sản xuất',
];

const inputClassName =
  'w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-3 py-2.5 font-body-regular text-body-regular text-on-surface outline-none transition focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20';

const JobFiltersSidebar = ({ filters, onChange, onApply, onReset }: JobFiltersSidebarProps) => {
  const [activeThumb, setActiveThumb] = useState<'min' | 'max'>('max');
  const visualMin = Math.min(Math.max(filters.salaryMin ?? 0, 0), MAX_SALARY_MILLION);
  const visualMax = Math.max(
    visualMin,
    Math.min(filters.salaryMax ?? MAX_SALARY_MILLION, MAX_SALARY_MILLION),
  );

  const update = <K extends keyof JobSearchForm>(field: K, value: JobSearchForm[K]) => {
    onChange((current) => ({ ...current, [field]: value }));
  };

  const setSalaryPreset = (min: number | null, max: number | null) => {
    onChange((current) => ({ ...current, salaryMin: min, salaryMax: max }));
  };

  const updateSalaryInput = (field: 'salaryMin' | 'salaryMax', rawValue: string) => {
    const parsedValue = rawValue === '' ? null : Math.min(MAX_SALARY_MILLION, Math.max(0, Number(rawValue)));
    onChange((current) => {
      if (field === 'salaryMin') {
        return {
          ...current,
          salaryMin: parsedValue,
          salaryMax: parsedValue !== null && current.salaryMax !== null && parsedValue > current.salaryMax
            ? parsedValue
            : current.salaryMax,
        };
      }

      return {
        ...current,
        salaryMax: parsedValue,
        salaryMin: parsedValue !== null && current.salaryMin !== null && parsedValue < current.salaryMin
          ? parsedValue
          : current.salaryMin,
      };
    });
  };

  return (
    <aside className="h-fit overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm xl:sticky xl:top-24">
      <div className="flex items-center justify-between gap-3 border-b border-outline-variant/50 bg-gradient-to-r from-primary-fixed/70 via-surface-container-low to-surface-container-lowest px-space-md py-4">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary">tune</span>
          <div>
            <h2 className="font-job-title-card font-bold text-on-surface">Bộ lọc việc làm</h2>
            <p className="font-metadata-label text-on-surface-variant">Chọn tiêu chí phù hợp</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg px-2 py-1.5 font-metadata-label font-semibold text-primary transition hover:bg-primary-fixed/50"
        >
          Xóa
        </button>
      </div>

      <div className="flex flex-col gap-space-md p-space-md">
        <section className="flex flex-col gap-2">
          <label htmlFor="filter-location" className="font-body-compact font-semibold text-on-surface">Địa điểm</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[19px] text-primary">location_on</span>
            <input
              id="filter-location"
              value={filters.location}
              onChange={(event) => update('location', event.target.value)}
              className={`${inputClassName} pl-10`}
              placeholder="Thành phố, quận..."
            />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="filter-industry" className="font-body-compact font-semibold text-on-surface">Ngành nghề</label>
          <input
            id="filter-industry"
            list="job-industry-suggestions"
            value={filters.industry}
            onChange={(event) => update('industry', event.target.value)}
            className={inputClassName}
            placeholder="Ví dụ: Công nghệ thông tin"
          />
          <datalist id="job-industry-suggestions">
            {INDUSTRY_SUGGESTIONS.map((industry) => <option key={industry} value={industry} />)}
          </datalist>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-body-compact font-semibold text-on-surface">Loại công việc</h3>
          <div className="grid grid-cols-2 gap-2">
            {EMPLOYMENT_TYPES.map((type) => {
              const selected = filters.employmentType === type.value;
              return (
                <button
                  key={type.value || 'all'}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => update('employmentType', type.value)}
                  className={`rounded-xl border px-2.5 py-2 text-left font-metadata-label font-semibold transition ${selected
                    ? 'border-primary bg-primary-fixed/60 text-primary'
                    : 'border-outline-variant/50 bg-surface-container-low text-on-surface-variant hover:border-primary/40'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="filter-experience" className="font-body-compact font-semibold text-on-surface">Kinh nghiệm</label>
          <select
            id="filter-experience"
            value={filters.experience}
            onChange={(event) => update('experience', event.target.value)}
            className={inputClassName}
          >
            <option value="">Mọi mức kinh nghiệm</option>
            <option value="Không yêu cầu">Không yêu cầu</option>
            <option value="Dưới 1 năm">Dưới 1 năm</option>
            <option value="1-2 năm">1–2 năm</option>
            <option value="2-4 năm">2–4 năm</option>
            <option value="3-5 năm">3–5 năm</option>
            <option value="Trên 5 năm">Trên 5 năm</option>
          </select>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-body-compact font-semibold text-on-surface">Nơi làm việc</h3>
          <div className="grid grid-cols-2 gap-2">
            {WORK_MODES.map((mode) => {
              const selected = filters.workMode === mode.value;
              return (
                <button
                  key={mode.value || 'all'}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => update('workMode', mode.value)}
                  className={`rounded-xl border px-2.5 py-2 text-left font-metadata-label font-semibold transition ${selected
                    ? 'border-primary bg-primary-fixed/60 text-primary'
                    : 'border-outline-variant/50 bg-surface-container-low text-on-surface-variant hover:border-primary/40'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-low/70 p-3.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-body-compact font-bold text-on-surface">Khoảng lương</h3>
              <p className="mt-0.5 font-metadata-label text-on-surface-variant">Triệu đồng / tháng</p>
            </div>
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="font-metadata-label text-on-surface-variant">
              Từ
              <input
                aria-label="Lương tối thiểu, triệu đồng"
                type="number"
                min={0}
                max={MAX_SALARY_MILLION}
                step={1}
                inputMode="numeric"
                value={filters.salaryMin ?? ''}
                onChange={(event) => updateSalaryInput('salaryMin', event.target.value)}
                className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-2.5 py-2 font-body-compact font-semibold text-on-surface outline-none focus:border-primary"
                placeholder="Bất kỳ"
              />
            </label>
            <label className="font-metadata-label text-on-surface-variant">
              Đến
              <input
                aria-label="Lương tối đa, triệu đồng"
                type="number"
                min={0}
                max={MAX_SALARY_MILLION}
                step={1}
                inputMode="numeric"
                value={filters.salaryMax ?? ''}
                onChange={(event) => updateSalaryInput('salaryMax', event.target.value)}
                className="mt-1 w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-2.5 py-2 font-body-compact font-semibold text-on-surface outline-none focus:border-primary"
                placeholder="Bất kỳ"
              />
            </label>
          </div>

          <div className="mt-3 flex justify-between font-metadata-label text-on-surface-variant">
            <span>{visualMin} triệu</span>
            <span>{visualMax} triệu</span>
          </div>
          <div className="relative mt-1 h-7" aria-label="Thanh lọc khoảng lương">
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface-container-high" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
              style={{
                left: `${(visualMin / MAX_SALARY_MILLION) * 100}%`,
                right: `${100 - (visualMax / MAX_SALARY_MILLION) * 100}%`,
              }}
            />
            <input
              className="salary-range-slider"
              type="range"
              min={0}
              max={MAX_SALARY_MILLION}
              step={1}
              value={visualMin}
              aria-label="Lương tối thiểu"
              onFocus={() => setActiveThumb('min')}
              onChange={(event) => {
                const nextMin = Math.min(Number(event.target.value), visualMax);
                onChange((current) => ({
                  ...current,
                  salaryMin: nextMin === 0 ? null : nextMin,
                  salaryMax: current.salaryMax !== null && nextMin > current.salaryMax ? nextMin : current.salaryMax,
                }));
              }}
              style={{ zIndex: activeThumb === 'min' ? 4 : 3 }}
            />
            <input
              className="salary-range-slider"
              type="range"
              min={0}
              max={MAX_SALARY_MILLION}
              step={1}
              value={visualMax}
              aria-label="Lương tối đa"
              onFocus={() => setActiveThumb('max')}
              onChange={(event) => {
                const nextMax = Math.max(Number(event.target.value), visualMin);
                onChange((current) => ({
                  ...current,
                  salaryMax: nextMax === MAX_SALARY_MILLION ? null : nextMax,
                  salaryMin: current.salaryMin !== null && nextMax < current.salaryMin ? nextMax : current.salaryMin,
                }));
              }}
              style={{ zIndex: activeThumb === 'max' ? 4 : 3 }}
            />
          </div>
          <p className="mt-1 text-center font-metadata-label text-on-surface-variant">Kéo hai nút hoặc nhập mức lương</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {SALARY_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setSalaryPreset(preset.min, preset.max)}
                className="rounded-full border border-primary/20 bg-surface-container-lowest px-2.5 py-1 font-metadata-label font-semibold text-primary transition hover:border-primary/50 hover:bg-primary-fixed/50"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={onApply}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-body-compact font-bold text-on-primary shadow-sm transition hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[18px]">filter_alt</span>
          Áp dụng bộ lọc
        </button>
      </div>
    </aside>
  );
};

export default JobFiltersSidebar;
