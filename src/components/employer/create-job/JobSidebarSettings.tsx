import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { CreateJobFormValues } from '../../../utils/createJobSchema';

const MAX_SALARY_MILLION = 300;
const SALARY_PRESETS = [
  { label: '10–20 triệu', min: 10, max: 20 },
  { label: '20–35 triệu', min: 20, max: 35 },
  { label: '35–50 triệu', min: 35, max: 50 },
  { label: '50–80 triệu', min: 50, max: 80 },
];

const DEADLINE_PRESETS = [7, 14, 30];

interface JobSidebarSettingsProps {
  canPost: boolean;
  isCompanyVerified: boolean;
  remainingJobPostCredits: number;
  mode?: 'create' | 'edit';
}

function toLocalDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const JobSidebarSettings = ({ canPost, isCompanyVerified, remainingJobPostCredits, mode = 'create' }: JobSidebarSettingsProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateJobFormValues>();
  const [activeThumb, setActiveThumb] = useState<'min' | 'max'>('max');

  const salaryMin = watch('salaryMin');
  const salaryMax = watch('salaryMax');
  const isSalaryNegotiable = watch('isSalaryNegotiable');
  const visualMin = Math.min(Math.max(salaryMin ?? 0, 0), MAX_SALARY_MILLION);
  const visualMax = Math.min(
    Math.max(salaryMax ?? MAX_SALARY_MILLION, visualMin),
    MAX_SALARY_MILLION,
  );

  const setSalaryRange = (min: number, max: number) => {
    setValue('salaryMin', min, { shouldDirty: true, shouldValidate: true });
    setValue('salaryMax', max, { shouldDirty: true, shouldValidate: true });
  };

  const setDeadlineAfterDays = (days: number) => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);
    setValue('applicationDeadline', toLocalDateInputValue(deadline), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const inputClassName =
    'w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-3 py-2.5 font-body-regular text-body-regular text-on-surface outline-none transition focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="flex flex-col gap-space-lg">
      <section className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm">
        <div className="flex items-center gap-3 border-b border-outline-variant/40 bg-gradient-to-r from-primary-fixed/70 to-surface-container-low px-space-md py-4">
          <span className="material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
            tune
          </span>
          <div>
            <h2 className="font-job-title-card text-job-title-card font-bold text-on-surface">
              Điều kiện tuyển dụng
            </h2>
            <p className="mt-0.5 font-metadata-label text-metadata-label text-on-surface-variant">
              Lương, thời hạn và hình thức làm việc
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-space-md">
          <div className="flex flex-col gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="application-deadline">
              Hạn ứng tuyển <span className="text-error">*</span>
            </label>
            <input
              id="application-deadline"
              type="date"
              {...register('applicationDeadline')}
              className={inputClassName}
              min={toLocalDateInputValue(new Date())}
            />
            <div className="flex flex-wrap gap-2" aria-label="Chọn nhanh hạn ứng tuyển">
              {DEADLINE_PRESETS.map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDeadlineAfterDays(days)}
                  className="rounded-full border border-outline-variant/60 px-3 py-1.5 font-metadata-label text-metadata-label font-medium text-on-surface-variant transition hover:border-primary/50 hover:bg-primary-fixed/40 hover:text-primary"
                >
                  +{days} ngày
                </button>
              ))}
            </div>
            {errors.applicationDeadline && (
              <p className="text-sm text-error">{errors.applicationDeadline.message}</p>
            )}
          </div>

          <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-low/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <label className="font-body-compact text-body-compact font-bold text-on-surface" htmlFor="salary-negotiable">
                  Mức lương
                </label>
                <p className="mt-1 font-metadata-label text-metadata-label text-on-surface-variant">
                  Chọn khoảng lương theo triệu đồng mỗi tháng
                </p>
              </div>
              <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-2 font-metadata-label text-metadata-label font-semibold text-on-surface shadow-sm">
                <input
                  id="salary-negotiable"
                  type="checkbox"
                  checked={isSalaryNegotiable}
                  onChange={(event) => {
                    const checked = event.target.checked;
                    setValue('isSalaryNegotiable', checked, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    if (checked) {
                      setValue('salaryMin', null, { shouldDirty: true, shouldValidate: true });
                      setValue('salaryMax', null, { shouldDirty: true, shouldValidate: true });
                    }
                  }}
                  className="h-4 w-4 accent-primary"
                />
                Thỏa thuận
              </label>
            </div>

            {!isSalaryNegotiable && (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block font-metadata-label text-metadata-label font-medium text-on-surface-variant" htmlFor="salary-min">
                      Tối thiểu
                    </label>
                    <div className="relative">
                      <input
                        id="salary-min"
                        type="number"
                        min={0}
                        max={MAX_SALARY_MILLION}
                        step={0.5}
                        inputMode="decimal"
                        {...register('salaryMin', {
                          setValueAs: (value) => value === '' ? null : Number(value),
                        })}
                        className={`${inputClassName} pr-14 font-semibold tabular-nums`}
                        placeholder="Ví dụ: 20"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-metadata-label text-metadata-label text-on-surface-variant">
                        triệu
                      </span>
                    </div>
                    {errors.salaryMin && <p className="mt-1 text-xs text-error">{errors.salaryMin.message}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block font-metadata-label text-metadata-label font-medium text-on-surface-variant" htmlFor="salary-max">
                      Tối đa
                    </label>
                    <div className="relative">
                      <input
                        id="salary-max"
                        type="number"
                        min={0}
                        max={MAX_SALARY_MILLION}
                        step={0.5}
                        inputMode="decimal"
                        {...register('salaryMax', {
                          setValueAs: (value) => value === '' ? null : Number(value),
                        })}
                        className={`${inputClassName} pr-14 font-semibold tabular-nums`}
                        placeholder="Ví dụ: 35"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-metadata-label text-metadata-label text-on-surface-variant">
                        triệu
                      </span>
                    </div>
                    {errors.salaryMax && <p className="mt-1 text-xs text-error">{errors.salaryMax.message}</p>}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between font-metadata-label text-metadata-label text-on-surface-variant">
                    <span>0 triệu</span>
                    <span>300 triệu</span>
                  </div>
                  <div className="relative h-7" aria-label="Thanh chọn khoảng lương">
                    <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface-container-high" />
                    <div
                      className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
                      style={{
                        left: `${(visualMin / MAX_SALARY_MILLION) * 100}%`,
                        right: `${100 - (visualMax / MAX_SALARY_MILLION) * 100}%`,
                      }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={MAX_SALARY_MILLION}
                      step={1}
                      value={visualMin}
                      aria-label="Lương tối thiểu, triệu đồng mỗi tháng"
                      onFocus={() => setActiveThumb('min')}
                      onChange={(event) => {
                        const nextMin = Number(event.target.value);
                        setValue('salaryMin', Math.min(nextMin, salaryMax ?? MAX_SALARY_MILLION), {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      className="salary-range-slider"
                      style={{ zIndex: activeThumb === 'min' ? 4 : 3 }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={MAX_SALARY_MILLION}
                      step={1}
                      value={visualMax}
                      aria-label="Lương tối đa, triệu đồng mỗi tháng"
                      onFocus={() => setActiveThumb('max')}
                      onChange={(event) => {
                        const nextMax = Number(event.target.value);
                        setValue('salaryMax', Math.max(nextMax, salaryMin ?? 0), {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      className="salary-range-slider"
                      style={{ zIndex: activeThumb === 'max' ? 4 : 3 }}
                    />
                  </div>
                  <p className="mt-1 text-center font-metadata-label text-metadata-label text-on-surface-variant">
                    Kéo hai nút hoặc nhập số ở hai ô phía trên
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {SALARY_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSalaryRange(preset.min, preset.max)}
                      className="rounded-full border border-primary/20 bg-surface-container-lowest px-3 py-1.5 font-metadata-label text-metadata-label font-semibold text-primary transition hover:border-primary/50 hover:bg-primary-fixed/50"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="employment-type">
              Hình thức làm việc
            </label>
            <select id="employment-type" {...register('employmentType')} className={inputClassName}>
              <option value="FULL_TIME">Toàn thời gian</option>
              <option value="PART_TIME">Bán thời gian</option>
              <option value="INTERN">Thực tập</option>
              <option value="CONTRACT">Hợp đồng</option>
            </select>
            <select aria-label="Chế độ làm việc" {...register('workMode')} className={inputClassName}>
              <option value="ONSITE">Tại văn phòng</option>
              <option value="HYBRID">Kết hợp tại văn phòng và từ xa</option>
              <option value="REMOTE">Từ xa</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="experience-required">
              Kinh nghiệm yêu cầu
            </label>
            <select id="experience-required" {...register('experienceRequired')} className={inputClassName}>
              <option value="Dưới 1 năm kinh nghiệm">Dưới 1 năm</option>
              <option value="1 - 2 năm kinh nghiệm">1–2 năm</option>
              <option value="3 - 5 năm chuyên môn">3–5 năm</option>
              <option value="Trên 5 năm (Chuyên gia / Lead)">Trên 5 năm</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="education-required">
              Học vấn tối thiểu
            </label>
            <select id="education-required" {...register('educationRequired')} className={inputClassName}>
              <option value="Không yêu cầu bằng cấp">Không yêu cầu bằng cấp</option>
              <option value="Trung cấp / Cao đẳng">Trung cấp / Cao đẳng</option>
              <option value="Đại học trở lên">Đại học trở lên</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-3">
          <h2 className="font-job-title-card text-job-title-card font-bold text-on-surface">
            {mode === 'edit' ? 'Lưu thay đổi tin?' : 'Sẵn sàng đăng tin?'}
          </h2>
          <p className="mt-1 font-metadata-label text-metadata-label text-on-surface-variant">
            {mode === 'edit'
              ? 'Nội dung chỉ được cập nhật sau khi lưu.'
              : canPost
              ? `Công ty còn ${remainingJobPostCredits} lượt đăng tin.`
              : isCompanyVerified
                ? 'Công ty đã hết lượt đăng tin hiện có.'
                : 'Xác minh công ty trước khi đăng tin.'}
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !canPost}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-space-md py-3 font-body-compact text-body-compact font-bold text-on-primary shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              {mode === 'edit' ? 'Đang lưu thay đổi…' : 'Đang tạo tin và xử lý AI…'}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              {mode === 'edit' ? 'Lưu thay đổi' : 'Đăng tin tuyển dụng'}
            </>
          )}
        </button>
      </section>
    </div>
  );
};
