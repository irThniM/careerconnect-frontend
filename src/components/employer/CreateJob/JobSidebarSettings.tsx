import { useFormContext } from 'react-hook-form';

export const JobSidebarSettings = () => {
  const { register, formState: { errors, isSubmitting } } = useFormContext();

  return (
<div className="flex flex-col gap-space-lg">
      {/* Khối Hành động */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden p-space-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <span className="font-job-title-card text-job-title-card text-on-surface font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">send</span>Hành động
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          
          <button 
            type="submit" 
            disabled={isSubmitting} // Chặn click khi đang submit
            className={`w-full inline-flex items-center justify-center gap-2 px-space-md py-3 rounded font-body-compact text-body-compact font-bold shadow-md transition-all duration-300 ${
              isSubmitting 
                ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-80" 
                : "bg-secondary hover:bg-secondary/90 text-on-secondary"
            }`}
          >
            {isSubmitting ? (
              <>
                {/* SVG Spinner quay đều */}
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Đang xử lý AI Vector...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                <span>Đăng tin tuyển dụng ngay</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* Khối Cài đặt */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-space-md py-3 bg-surface-container-low flex items-center justify-between">
          <span className="font-job-title-card text-job-title-card text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">tune</span>Cài đặt cơ bản
          </span>
        </div>
        <div className="p-space-md flex flex-col gap-space-md">
          
          {/* Hạn ứng tuyển */}
          <div className="flex flex-col gap-1.5">
            <label className="font-metadata-label text-metadata-label text-on-surface font-semibold">Hạn ứng tuyển <span className="text-error">*</span></label>
            <input 
              type="date"
              {...register("applicationDeadline")}
              className="w-full px-3 py-2 rounded bg-surface-container-low text-on-surface font-body-regular text-body-regular focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
            />
            {errors.applicationDeadline && <p className="text-error text-sm">{errors.applicationDeadline.message as string}</p>}
          </div>

          {/* Mức lương */}
          <div className="flex flex-col gap-2">
            <label className="font-metadata-label text-metadata-label text-on-surface font-semibold">Mức lương công bố <span className="text-error">*</span></label>
            <input 
              {...register("salaryRange")}
              className="w-full px-3 py-2 rounded bg-surface-container-low text-on-surface font-salary-badge text-salary-badge text-secondary focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all" 
              placeholder="VD: 35 - 50 Triệu VNĐ hoặc Thỏa thuận" 
            />
          </div>

          {/* Hình thức */}
          <div className="flex flex-col gap-2">
            <label className="font-metadata-label text-metadata-label text-on-surface font-semibold">Hình thức & Chế độ làm việc</label>
            <select {...register("employmentType")} className="w-full px-3 py-2 rounded bg-surface-container-low text-on-surface cursor-pointer">
              <option value="FULL_TIME">Toàn thời gian</option>
              <option value="PART_TIME">Bán thời gian</option>
            </select>
            <select {...register("workMode")} className="w-full px-3 py-2 rounded bg-surface-container-low text-on-surface cursor-pointer mt-1">
              <option value="ONSITE">Văn phòng (Onsite)</option>
              <option value="HYBRID">Hybrid</option>
              <option value="REMOTE">Từ xa 100% (Remote)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-metadata-label text-metadata-label text-on-surface font-semibold">Số năm kinh nghiệm</label>
            <select {...register("experienceRequired")} className="w-full px-3 py-2 rounded bg-surface-container-low text-on-surface cursor-pointer">
              <option value="Dưới 1 năm kinh nghiệm">Dưới 1 năm kinh nghiệm</option>
              <option value="1 - 2 năm kinh nghiệm">1 - 2 năm kinh nghiệm</option>
              <option value="3 - 5 năm chuyên môn">3 - 5 năm chuyên môn</option>
              <option value="Trên 5 năm (Chuyên gia / Lead)">Trên 5 năm (Chuyên gia / Lead)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-metadata-label text-metadata-label text-on-surface font-semibold">Học vấn tối thiểu</label>
            <select {...register("educationRequired")} className="w-full px-3 py-2 rounded bg-surface-container-low text-on-surface cursor-pointer">
              <option value="Không yêu cầu bằng cấp">Không yêu cầu bằng cấp</option>
              <option value="Trung cấp / Cao đẳng">Trung cấp / Cao đẳng</option>
              <option value="Đại học trở lên">Đại học trở lên</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};