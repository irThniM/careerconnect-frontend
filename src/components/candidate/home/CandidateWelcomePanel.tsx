import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  signedInCandidate: boolean;
  fullName: string;
  isLookingForJob: boolean;
  profileCompletion: number;
  profileReady: boolean;
  profileError: boolean;
  jobsReady: boolean;
  jobsError: boolean;
  publicJobCount: number;
};

const CandidateWelcomePanel: React.FC<Props> = ({ signedInCandidate, fullName, isLookingForJob, profileCompletion, profileReady, profileError, jobsReady, jobsError, publicJobCount }) => {
  return (
    <section className="border-b border-indigo-100 bg-gradient-to-b from-indigo-50 to-[#f8f7ff] px-4 pb-5 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px] rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />{signedInCandidate && isLookingForJob ? 'Sẵn sàng đón nhận cơ hội mới' : 'Khám phá cơ hội nghề nghiệp mới'}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{signedInCandidate ? `Chào ${fullName || 'bạn'}, bắt đầu ngày mới nhé!` : 'Tìm cơ hội tiếp theo của bạn'}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Khám phá tin tuyển dụng đang mở, so sánh yêu cầu và chuẩn bị hồ sơ theo mục tiêu nghề nghiệp của bạn.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/jobs" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800">Khám phá việc làm <span className="material-symbols-outlined text-lg">arrow_forward</span></Link>
            {signedInCandidate && <Link to="/profile" className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-blue-900 hover:bg-indigo-100"><span className="material-symbols-outlined text-lg">person_edit</span>Cập nhật hồ sơ</Link>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-indigo-50 p-4"><p className="text-xs font-medium text-slate-600">Hồ sơ cơ bản</p><p className="mt-1 text-2xl font-extrabold text-emerald-800">{signedInCandidate ? profileError ? '—' : profileReady ? `${profileCompletion}%` : '…' : 'Bắt đầu'}</p><p className="mt-1 text-xs text-slate-500">{signedInCandidate ? profileError ? 'Không tải được hồ sơ' : 'Mức hoàn thiện thông tin cơ bản' : 'Đăng nhập để cập nhật hồ sơ'}</p></div>
          <div className="rounded-xl bg-indigo-50 p-4"><p className="text-xs font-medium text-slate-600">Việc làm đang tuyển</p><p className="mt-1 text-2xl font-extrabold text-blue-950">{jobsError ? '—' : jobsReady ? new Intl.NumberFormat('vi-VN').format(publicJobCount) : '…'}</p><p className="mt-1 text-xs text-slate-500">{jobsError ? 'Không tải được số liệu' : 'Tin công khai trên CareerConnect'}</p></div>
          <div className="rounded-xl bg-indigo-50 p-4"><p className="text-xs font-medium text-slate-600">Trạng thái tìm việc</p><p className="mt-1 text-lg font-extrabold text-slate-900">{signedInCandidate ? profileError ? '—' : profileReady ? isLookingForJob ? 'Đang tìm việc' : 'Chưa bật tìm việc' : '…' : 'Đăng nhập'}</p><p className="mt-1 text-xs text-slate-500">{signedInCandidate ? profileError ? 'Không tải được trạng thái hồ sơ' : 'Theo thông tin hồ sơ hiện tại' : 'Đăng nhập để quản lý trạng thái hồ sơ'}</p></div>
        </div>
      </div>
    </section>
  );
};

export default CandidateWelcomePanel;
