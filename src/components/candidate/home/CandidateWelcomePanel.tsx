import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  signedInCandidate: boolean;
  fullName: string;
  isLookingForJob: boolean;
  profileCompletion: number;
  profileReady: boolean;
};

const CandidateWelcomePanel: React.FC<Props> = ({ signedInCandidate, fullName, isLookingForJob, profileCompletion, profileReady }) => {
  const [selectedCv, setSelectedCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState('');

  const selectCv = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCvError('');
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(extension ?? '')) {
      setSelectedCv(null);
      setCvError('Vui lòng chọn file PDF, DOC hoặc DOCX.');
      event.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setSelectedCv(null);
      setCvError('File CV cần có dung lượng tối đa 10 MB.');
      event.target.value = '';
      return;
    }
    setSelectedCv(file);
  };

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

        <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-3">
          <div className="rounded-xl bg-indigo-50 p-4"><p className="text-xs font-medium text-slate-600">Hồ sơ cơ bản</p><p className="mt-1 text-2xl font-extrabold text-emerald-800">{signedInCandidate && profileReady ? `${profileCompletion}%` : signedInCandidate ? '…' : 'Bắt đầu'}</p><p className="mt-1 text-xs text-slate-500">{signedInCandidate ? 'Mức hoàn thiện thông tin cơ bản' : 'Đăng nhập để cập nhật hồ sơ'}</p></div>
          <div className="rounded-xl bg-indigo-50 p-4">
            <p className="text-xs font-medium text-slate-600">CV của bạn</p>
            <p className="mt-1 truncate text-sm font-extrabold text-slate-900">{selectedCv ? selectedCv.name : 'Chưa chọn CV'}</p>
            {signedInCandidate ? <><label htmlFor="candidate-cv-picker" className="mt-2 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-900 shadow-sm transition hover:bg-indigo-100"><span className="material-symbols-outlined text-base">upload_file</span>{selectedCv ? 'Chọn file khác' : 'Chọn CV'}</label><input id="candidate-cv-picker" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onClick={(event) => { event.currentTarget.value = ''; }} onChange={selectCv} className="sr-only"/><p className="mt-2 text-[10px] leading-4 text-slate-500">PDF, DOC, DOCX · tối đa 10 MB. Hiện mới xem trước tên file, chưa lưu lên hệ thống.</p>{cvError && <p role="alert" className="mt-1 text-[10px] font-medium text-rose-700">{cvError}</p>}</> : <Link to="/login" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-900 shadow-sm hover:bg-indigo-100"><span className="material-symbols-outlined text-base">login</span>Đăng nhập để chọn</Link>}
          </div>
          <div className="rounded-xl bg-indigo-50 p-4"><p className="text-xs font-medium text-slate-600">Theo dõi ứng tuyển</p><p className="mt-1 text-lg font-extrabold text-slate-900">Sắp bổ sung</p><p className="mt-1 text-xs text-slate-500">Hiện tại bạn có thể xem chi tiết tin</p></div>
        </div>
      </div>
    </section>
  );
};

export default CandidateWelcomePanel;
