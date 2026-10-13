import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiFetch } from '../../api/client';
import { createJobSchema, type CreateJobFormValues } from '../../utils/createJobSchema';

import { JobGeneralInfo } from '../../components/employer/create-job/JobGeneralInfo';
import { JobContentEditor } from '../../components/employer/create-job/JobContentEditor';
import { JobSidebarSettings } from '../../components/employer/create-job/JobSidebarSettings';
import { toast } from 'react-hot-toast/headless';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import type { JobCategoryOption } from '../../utils/jobCategoryDictionary';
import { isAuthenticatedAs } from '../../utils/auth';

interface CompanyPostingProfile {
  status: string;
  jobPostCreditsRemaining: number;
}

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [companyProfile, setCompanyProfile] = useState<CompanyPostingProfile | null>(null);
  const [isLoadingCompanyProfile, setIsLoadingCompanyProfile] = useState(true);
  const [companyProfileError, setCompanyProfileError] = useState('');
  const [categories, setCategories] = useState<JobCategoryOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryLoadError, setCategoryLoadError] = useState('');
  const [formResetKey, setFormResetKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const response = await apiFetch('jobs/categories');
        if (!response.ok) throw new Error(`Không tải được danh mục (${response.status}).`);

        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error('Dữ liệu danh mục từ máy chủ không hợp lệ.');

        if (isMounted) setCategories(data as JobCategoryOption[]);
      } catch (error) {
        if (isMounted) {
          setCategoryLoadError(error instanceof Error ? error.message : 'Không tải được danh mục tuyển dụng.');
        }
      } finally {
        if (isMounted) setIsLoadingCategories(false);
      }
    };

    void loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem('accessToken');

    if (!token || !isAuthenticatedAs('Employer')) {
      navigate('/employer/login');
      return () => {
        isMounted = false;
      };
    }

    const loadCompanyProfile = async () => {
      try {
        const response = await apiFetch('Company/my-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseText = await response.text();

        if (!response.ok) {
          let message = responseText;
          try {
            message = JSON.parse(responseText).message ?? message;
          } catch {
            // Keep the plain response text when the API does not return JSON.
          }
          throw new Error(message || 'Không thể tải thông tin công ty.');
        }

        if (isMounted) setCompanyProfile(JSON.parse(responseText));
      } catch (error) {
        if (isMounted) {
          setCompanyProfileError(error instanceof Error ? error.message : 'Không thể tải thông tin công ty.');
        }
      } finally {
        if (isMounted) setIsLoadingCompanyProfile(false);
      }
    };

    void loadCompanyProfile();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const isCompanyVerified = companyProfile?.status === 'ACTIVE';
  const remainingJobPostCredits = companyProfile?.jobPostCreditsRemaining ?? 0;
  const canPost = !isLoadingCompanyProfile && isCompanyVerified && remainingJobPostCredits > 0;

  // 1. Khởi tạo form
  const methods = useForm<CreateJobFormValues>({
    // Ép kiểu as any để bỏ qua sự khắt khe của TypeScript giữa 2 thư viện
    resolver: zodResolver(createJobSchema) as any,
    defaultValues: {
      employmentType: 'FULL_TIME',
      workMode: 'ONSITE',
      quantity: 1,
      salaryMin: null,
      salaryMax: null,
      isSalaryNegotiable: false,
      requiredSkillIds: [],
      categoryId: null,
    }
  });

  // 2. Hàm gọi API POST gửi xuống Backend
 const onSubmit = async (data: CreateJobFormValues) => {
    if (!canPost) {
      toast.error(!isCompanyVerified
        ? 'Công ty cần xác minh giấy tờ trước khi đăng tin.'
        : 'Công ty đã hết lượt đăng tin hiện có.');
      return;
    }

    const payloadToSend = {
      ...data,
      // Form nhập theo triệu đồng để dễ thao tác; API lưu số tiền thực theo VNĐ.
      salaryMin: data.isSalaryNegotiable || data.salaryMin === null
        ? null
        : Math.round(data.salaryMin * 1_000_000),
      salaryMax: data.isSalaryNegotiable || data.salaryMax === null
        ? null
        : Math.round(data.salaryMax * 1_000_000),
      applicationDeadline: data.applicationDeadline + "T00:00:00Z"
    };
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');

      const response = await apiFetch('EmployerJob/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payloadToSend)
      });

      const textRaw = await response.text();
      if (!response.ok) {
        let message = textRaw;
        try {
          message = JSON.parse(textRaw).message ?? message;
        } catch {
          // Keep the plain response text when the API does not return JSON.
        }
        if (response.status === 409) {
          setCompanyProfile((current) => current
            ? { ...current, jobPostCreditsRemaining: 0 }
            : current);
        }
        throw new Error(message || `Yêu cầu thất bại (${response.status}).`);
      }

      setCompanyProfile((current) => current
        ? {
          ...current,
          jobPostCreditsRemaining: Math.max(0, current.jobPostCreditsRemaining - 1),
        }
        : current);
      toast.success('Đăng tin thành công! AI đã tạo xong Vector.');
      methods.reset();
      setFormResetKey((current) => current + 1);
    } catch (error: any) {
      toast.error(error instanceof Error ? error.message : 'Đăng tin thất bại.');
    }
  };

  // 3. Render giao diện
// Lấy trạng thái isSubmitting trực tiếp từ methods
  const { isSubmitting } = methods.formState;

  return (
    <main className="w-full flex-1 bg-background flex flex-col justify-between">
      <div className="max-w-[1280px] w-full mx-auto px-gutter-desktop mt-8">
        <header className="mb-space-lg rounded-2xl border border-outline-variant/50 bg-gradient-to-r from-primary-fixed/70 via-surface-container-low to-surface-container-lowest px-space-lg py-space-lg shadow-sm sm:px-space-xl">
          <p className="font-metadata-label text-metadata-label font-bold uppercase tracking-[0.16em] text-primary">
            CareerConnect · Nhà tuyển dụng
          </p>
          <h1 className="mt-2 font-headline-lg text-headline-lg font-bold text-on-surface sm:text-headline-xl">
            Tạo tin tuyển dụng
          </h1>
          <p className="mt-2 max-w-2xl font-body-regular text-body-regular text-on-surface-variant">
            Nhập thông tin rõ ràng để ứng viên hiểu vị trí. Có thể dùng các mức lương và hạn đăng nhanh, sau đó chỉnh lại theo nhu cầu.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1.5 font-metadata-label text-metadata-label font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">edit_note</span>
              Thông tin vị trí
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1.5 font-metadata-label text-metadata-label font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">description</span>
              Nội dung tuyển dụng
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1.5 font-metadata-label text-metadata-label font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
              Điều kiện tuyển dụng
            </span>
          </div>
        </header>
        <button
          type="button"
          onClick={() => navigate('/employer/dashboard')}
          className="mb-space-md inline-flex items-center gap-2 self-start rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-2.5 font-body-compact text-body-compact font-semibold text-primary shadow-sm transition hover:bg-primary-fixed/40"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quay về Dashboard
        </button>
        <section
          className={`mb-space-lg flex flex-col gap-3 rounded-2xl border px-space-lg py-4 sm:flex-row sm:items-center sm:justify-between ${
            canPost
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-amber-200 bg-amber-50 text-amber-950'
          }`}
          aria-live="polite"
        >
          <div>
            {isLoadingCompanyProfile ? (
              <p className="font-body-compact text-body-compact font-semibold">Đang kiểm tra trạng thái công ty và lượt đăng...</p>
            ) : companyProfileError ? (
              <>
                <p className="font-body-compact text-body-compact font-bold">Chưa kiểm tra được quyền đăng tin</p>
                <p className="mt-1 text-sm">{companyProfileError}</p>
              </>
            ) : !isCompanyVerified ? (
              <>
                <p className="font-body-compact text-body-compact font-bold">Công ty chưa xác minh KYB</p>
                <p className="mt-1 text-sm">Tải giấy phép kinh doanh PDF lên hồ sơ công ty. Sau khi MST được đối chiếu thành công, công ty mới có thể đăng tin.</p>
              </>
            ) : remainingJobPostCredits === 0 ? (
              <>
                <p className="font-body-compact text-body-compact font-bold">Đã hết lượt đăng tin hiện có</p>
                <p className="mt-1 text-sm">Công ty hiện không còn lượt đăng. Lượt đăng có thể được cấp thêm khi tính năng gói dịch vụ được triển khai.</p>
              </>
            ) : (
              <>
                <p className="font-body-compact text-body-compact font-bold">Công ty đã xác minh · Còn {remainingJobPostCredits} lượt đăng</p>
                <p className="mt-1 text-sm">Mỗi tin đăng thành công sẽ sử dụng một lượt.</p>
              </>
            )}
          </div>
          {!isLoadingCompanyProfile && !isCompanyVerified && (
            <button
              type="button"
              onClick={() => navigate('/employer/profile')}
              className="shrink-0 rounded-xl bg-primary px-4 py-2.5 font-body-compact text-body-compact font-bold text-on-primary"
            >
              Đi tới xác minh công ty
            </button>
          )}
        </section>
        <FormProvider {...methods}>
          {/* Thêm relative để làm mốc cho lớp overlay */}
          <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

            {/* Cột trái 70% */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <JobGeneralInfo
                key={formResetKey}
                categories={categories}
                isLoadingCategories={isLoadingCategories}
                categoryLoadError={categoryLoadError}
              />
              <JobContentEditor />
            </div>

            {/* Cột phải 30% */}
            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              <JobSidebarSettings
                canPost={canPost}
                isCompanyVerified={isCompanyVerified}
                remainingJobPostCredits={remainingJobPostCredits}
              />
            </div>

          </form>
        </FormProvider>
      </div>
      <LoadingOverlay
        isOpen={isSubmitting}
        title="Đang đăng tin tuyển dụng"
        description="Tin tuyển dụng đang được lưu và tạo dữ liệu phục vụ gợi ý việc làm."
      />
    </main>
  );
};

export default CreateJobPage;
