import { useFormContext } from 'react-hook-form';

export const JobGeneralInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
          </div>
          <div>
            <h2 className="font-job-title-card text-job-title-card text-on-surface">1. Thông tin chung về vị trí</h2>
            <p className="font-metadata-label text-metadata-label text-on-surface-variant">Thiết lập tiêu đề, vị trí chuyên môn và địa điểm tuyển dụng</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-error-container text-error font-tag-chip text-tag-chip font-semibold">Bắt buộc</span>
      </div>

      <div className="p-space-lg flex flex-col gap-space-md">
        {/* Tiêu đề */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-job-title-card text-job-title-card text-on-surface flex items-center gap-1" htmlFor="job-title">
              Tiêu đề tin tuyển dụng <span className="text-error">*</span>
            </label>
          </div>
          <input 
            id="job-title" 
            {...register("title")}
            className="w-full px-space-md py-2.5 rounded bg-surface-container-low text-on-surface font-body-regular text-body-regular focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
            placeholder="VD: Senior Frontend Engineer (ReactJS, TypeScript) - Thu nhập tới 50M" 
          />
          {errors.title && <p className="text-error text-sm mt-1">{errors.title.message as string}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {/* Vị trí */}
          <div className="flex flex-col gap-1.5">
            <label className="font-metadata-label text-metadata-label text-on-surface font-semibold" htmlFor="job-role">
              Vị trí chuyên môn (Role) <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">badge</span>
              <input 
                id="job-role" 
                {...register("position")}
                className="w-full pl-9 pr-space-md py-2 rounded bg-surface-container-low text-on-surface font-body-regular text-body-regular focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
                placeholder="VD: Frontend Developer / Kỹ sư giao diện" 
              />
            </div>
            {errors.position && <p className="text-error text-sm">{errors.position.message as string}</p>}
          </div>

          {/* Số lượng */}
          <div className="flex flex-col gap-1.5">
            <label className="font-metadata-label text-metadata-label text-on-surface font-semibold">
              Số lượng cần tuyển <span className="text-error">*</span>
            </label>
            <div className="flex items-center bg-surface-container-low rounded p-1">
              <input 
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="w-full text-center bg-transparent text-on-surface font-bold text-body-regular focus:outline-none py-1" 
                min="1" max="99" 
              />
              <span className="font-metadata-label text-metadata-label text-on-surface-variant pr-2 shrink-0">Người</span>
            </div>
            {errors.quantity && <p className="text-error text-sm">{errors.quantity.message as string}</p>}
          </div>
        </div>

        {/* Địa điểm */}
        <div className="flex flex-col gap-1.5">
          <label className="font-metadata-label text-metadata-label text-on-surface font-semibold">
            Địa điểm làm việc cụ thể <span className="text-error">*</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">location_on</span>
            <input 
              {...register("location")}
              className="w-full pl-9 pr-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-regular text-body-regular focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
              placeholder="Nhập địa chỉ văn phòng làm việc cụ thể..." 
            />
          </div>
          {errors.location && <p className="text-error text-sm">{errors.location.message as string}</p>}
        </div>
      </div>
    </div>
  );
};