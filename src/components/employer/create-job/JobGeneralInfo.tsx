import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { CreateJobFormValues } from '../../../utils/createJobSchema';
import { suggestJobCategory, type JobCategoryOption } from '../../../utils/jobCategoryDictionary';

type JobGeneralInfoProps = {
  categories: JobCategoryOption[];
  isLoadingCategories: boolean;
  categoryLoadError: string;
};

export const JobGeneralInfo = ({
  categories,
  isLoadingCategories,
  categoryLoadError,
}: JobGeneralInfoProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateJobFormValues>();

  const position = watch('position') ?? '';
  const quantity = watch('quantity') || 1;
  const selectedCategoryId = watch('categoryId') ?? null;
  const [hasManuallySelectedCategory, setHasManuallySelectedCategory] = useState(false);
  const suggestedCategory = suggestJobCategory(position, categories);

  useEffect(() => {
    if (hasManuallySelectedCategory || isLoadingCategories || categories.length === 0) return;

    setValue('categoryId', suggestedCategory?.id ?? null, {
      shouldDirty: false,
      shouldValidate: false,
    });
  }, [categories.length, hasManuallySelectedCategory, isLoadingCategories, setValue, suggestedCategory?.id]);

  const categoryRegistration = register('categoryId', {
    setValueAs: (value) => value === '' ? null : Number(value),
  });

  const inputClassName =
    'w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 font-body-regular text-body-regular text-on-surface outline-none transition placeholder:text-on-surface-variant/70 focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20';

  const updateQuantity = (delta: number) => {
    const nextValue = Math.min(99, Math.max(1, Number(quantity) + delta));
    setValue('quantity', nextValue, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm">
      <div className="flex items-center gap-3 border-b border-outline-variant/40 bg-gradient-to-r from-primary-fixed/70 to-surface-container-low px-space-lg py-space-md">
        <span className="material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
          edit_note
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-job-title-card text-job-title-card font-bold text-on-surface">
            Thông tin vị trí
          </h2>
          <p className="mt-0.5 font-metadata-label text-metadata-label text-on-surface-variant">
            Bắt đầu với chức danh, vị trí và nơi làm việc.
          </p>
        </div>
        <span className="rounded-full bg-error-container px-3 py-1 font-metadata-label text-metadata-label font-semibold text-error">
          Bắt buộc
        </span>
      </div>

      <div className="flex flex-col gap-space-md p-space-lg">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-title">
              Tiêu đề tin tuyển dụng <span className="text-error">*</span>
            </label>
            {position.trim() && (
              <button
                type="button"
                onClick={() => setValue('title', position.trim(), { shouldDirty: true, shouldValidate: true })}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-metadata-label text-metadata-label font-semibold text-primary transition hover:bg-primary-fixed/50"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                Dùng vị trí làm tiêu đề
              </button>
            )}
          </div>
          <input
            id="job-title"
            {...register('title')}
            className={inputClassName}
            placeholder="Ví dụ: Backend Developer (.NET) – Thu nhập đến 35 triệu"
            maxLength={120}
          />
          <div className="flex items-center justify-between gap-2">
            {errors.title ? (
              <p className="text-sm text-error">{errors.title.message}</p>
            ) : (
              <p className="font-metadata-label text-metadata-label text-on-surface-variant">
                Tiêu đề rõ ràng giúp ứng viên dễ tìm thấy tin.
              </p>
            )}
            <span className="shrink-0 font-metadata-label text-metadata-label text-on-surface-variant">
              {(watch('title') ?? '').length}/120
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-role">
              Vị trí chuyên môn <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
                badge
              </span>
              <input
                id="job-role"
                {...register('position')}
                className={`${inputClassName} pl-11`}
                placeholder="Ví dụ: Backend Developer"
              />
            </div>
            {errors.position && <p className="text-sm text-error">{errors.position.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-quantity">
              Số lượng cần tuyển <span className="text-error">*</span>
            </label>
            <div className="flex items-center rounded-xl border border-outline-variant/60 bg-surface-container-low p-1">
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={() => updateQuantity(-1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-primary transition hover:bg-primary-fixed/60"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <input
                id="job-quantity"
                type="number"
                min={1}
                max={99}
                {...register('quantity', {
                  setValueAs: (value) => value === '' ? 1 : Number(value),
                })}
                className="w-full bg-transparent text-center font-body-regular text-body-regular font-bold text-on-surface outline-none"
              />
              <span className="pr-2 font-metadata-label text-metadata-label text-on-surface-variant">người</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={() => updateQuantity(1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-primary transition hover:bg-primary-fixed/60"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            {errors.quantity && <p className="text-sm text-error">{errors.quantity.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-category">
            Danh mục tuyển dụng <span className="text-error">*</span>
          </label>
          <select
            id="job-category"
            {...categoryRegistration}
            onChange={(event) => {
              setHasManuallySelectedCategory(true);
              void categoryRegistration.onChange(event);
            }}
            disabled={isLoadingCategories || categories.length === 0}
            className={`${inputClassName} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <option value="">
              {isLoadingCategories ? 'Đang tải danh mục…' : categories.length ? 'Chọn danh mục tuyển dụng' : 'Chưa có danh mục khả dụng'}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.categoryId ? (
            <p className="text-sm text-error">{errors.categoryId.message}</p>
          ) : categoryLoadError ? (
            <p className="text-sm text-error">{categoryLoadError}</p>
          ) : suggestedCategory ? (
            <p className="font-metadata-label text-metadata-label text-on-surface-variant">
              {selectedCategoryId === suggestedCategory.id
                ? `Đã tự gợi ý “${suggestedCategory.name}” theo vị trí; em có thể đổi nếu cần.`
                : `Từ điển nhận diện vị trí này thuộc “${suggestedCategory.name}”. Em có thể chọn danh mục phù hợp hơn.`}
            </p>
          ) : (
            <p className="font-metadata-label text-metadata-label text-on-surface-variant">
              Hệ thống dò từ khóa trong vị trí; nếu chưa nhận diện được, em chọn danh mục thủ công.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-location">
            Địa điểm làm việc <span className="text-error">*</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
              location_on
            </span>
            <input
              id="job-location"
              {...register('location')}
              className={`${inputClassName} pl-11`}
              placeholder="Ví dụ: Quận 1, TP. Hồ Chí Minh"
            />
          </div>
          {errors.location && <p className="text-sm text-error">{errors.location.message}</p>}
        </div>
      </div>
    </section>
  );
};
