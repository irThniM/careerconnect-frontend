import { useFormContext } from 'react-hook-form';
import type { CreateJobFormValues } from '../../../utils/createJobSchema';

export const JobContentEditor = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateJobFormValues>();

  const jobDescription = watch('jobDescription') ?? '';
  const jobRequirements = watch('jobRequirements') ?? '';
  const jobBenefits = watch('jobBenefits') ?? '';

  const textAreaClassName =
    'w-full resize-y rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 font-body-regular text-body-regular leading-7 text-on-surface outline-none transition placeholder:text-on-surface-variant/70 focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20';

  return (
    <section className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm">
      <div className="flex items-center gap-3 border-b border-outline-variant/40 bg-gradient-to-r from-primary-fixed/70 to-surface-container-low px-space-lg py-space-md">
        <span className="material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
          description
        </span>
        <div>
          <h2 className="font-job-title-card text-job-title-card font-bold text-on-surface">
            Nội dung tuyển dụng
          </h2>
          <p className="mt-0.5 font-metadata-label text-metadata-label text-on-surface-variant">
            Viết cụ thể để ứng viên hiểu rõ công việc và quyền lợi.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-space-lg p-space-lg">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-description">
              Mô tả công việc <span className="text-error">*</span>
            </label>
            <span className={`font-metadata-label text-metadata-label ${jobDescription.trim().length >= 50 ? 'text-secondary' : 'text-on-surface-variant'}`}>
              {jobDescription.trim().length}/50 ký tự tối thiểu
            </span>
          </div>
          <p className="font-metadata-label text-metadata-label text-on-surface-variant">
            Gợi ý: nêu mục tiêu vị trí, nhiệm vụ chính và cách phối hợp trong công việc.
          </p>
          <textarea
            id="job-description"
            {...register('jobDescription')}
            rows={6}
            className={textAreaClassName}
            placeholder={'Ví dụ:\n• Nhiệm vụ chính của vị trí\n• Sản phẩm hoặc nhóm sẽ phối hợp\n• Kết quả mong đợi'}
          />
          {errors.jobDescription && <p className="text-sm text-error">{errors.jobDescription.message}</p>}
        </div>

        <div className="h-px bg-outline-variant/40" />

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-requirements">
              Yêu cầu ứng viên <span className="text-error">*</span>
            </label>
            <span className={`font-metadata-label text-metadata-label ${jobRequirements.trim().length >= 50 ? 'text-secondary' : 'text-on-surface-variant'}`}>
              {jobRequirements.trim().length}/50 ký tự tối thiểu
            </span>
          </div>
          <p className="font-metadata-label text-metadata-label text-on-surface-variant">
            Có thể chia thành kinh nghiệm, kỹ năng chuyên môn và học vấn.
          </p>
          <textarea
            id="job-requirements"
            {...register('jobRequirements')}
            rows={6}
            className={textAreaClassName}
            placeholder={'Ví dụ:\n• Kinh nghiệm liên quan\n• Kỹ năng và công cụ cần biết\n• Yêu cầu khác của vị trí'}
          />
          {errors.jobRequirements && <p className="text-sm text-error">{errors.jobRequirements.message}</p>}
        </div>

        <div className="h-px bg-outline-variant/40" />

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="font-body-compact text-body-compact font-semibold text-on-surface" htmlFor="job-benefits">
              Quyền lợi và đãi ngộ
            </label>
            <span className="font-metadata-label text-metadata-label text-on-surface-variant">
              {jobBenefits.trim().length} ký tự
            </span>
          </div>
          <p className="font-metadata-label text-metadata-label text-on-surface-variant">
            Nêu những chính sách thực tế của công ty như thưởng, bảo hiểm, đào tạo hoặc thiết bị làm việc.
          </p>
          <textarea
            id="job-benefits"
            {...register('jobBenefits')}
            rows={5}
            className={textAreaClassName}
            placeholder={'Ví dụ:\n• Thưởng và phụ cấp\n• Bảo hiểm và ngày nghỉ\n• Cơ hội đào tạo, phát triển'}
          />
        </div>
      </div>
    </section>
  );
};
