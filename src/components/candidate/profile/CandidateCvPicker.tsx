import React, { type ChangeEvent } from 'react';
import type { CandidateResumeData } from './profileTypes';

type Props = {
  resume: CandidateResumeData | null;
  skills: string[];
  message: string;
  messageTone: 'success' | 'error' | 'info';
  isBusy: boolean;
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onReprocess: () => void;
  onDownload: () => void;
  onDelete: () => void;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const CandidateCvPicker: React.FC<Props> = ({ resume, skills, message, messageTone, isBusy, onSelect, onReprocess, onDownload, onDelete }) => (
  <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_8px_28px_-22px_rgba(30,64,175,0.28)]">
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined rounded-lg bg-indigo-50 p-2 text-xl text-blue-900">description</span>
        <div>
          <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-bold text-slate-950">Hồ sơ & CV đang sử dụng</h2>{resume && <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-800">Đã lưu</span>}</div>
          <p className="mt-1 max-w-xl text-[11px] leading-5 text-slate-500">Tải một CV lên hồ sơ. Hỗ trợ PDF, DOCX · tối đa 10 MB.</p>
        </div>
      </div>
      <label htmlFor="profile-cv-picker" className={`inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-blue-900 transition hover:bg-indigo-100 ${isBusy ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
        <span className="material-symbols-outlined text-base">upload_file</span>{resume ? 'Thay CV' : 'Tải CV lên'}
      </label>
      <input id="profile-cv-picker" type="file" disabled={isBusy} accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onClick={(event) => { event.currentTarget.value = ''; }} onChange={onSelect} className="sr-only" />
    </div>

    <div className={`m-4 flex flex-col gap-3 rounded-lg border p-3.5 sm:m-5 sm:flex-row sm:items-center sm:justify-between ${resume ? 'border-slate-100 bg-slate-50/80' : 'border-dashed border-indigo-200 bg-indigo-50/40'}`}>
      <div className="flex min-w-0 items-center gap-3">
        <span className={`material-symbols-outlined rounded-lg bg-white p-2 text-lg shadow-sm ${resume ? 'text-rose-700' : 'text-indigo-700'}`}>{resume ? 'picture_as_pdf' : 'note_add'}</span>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-slate-900">{resume?.fileName ?? 'Chưa có CV trong hồ sơ'}</p>
          <p className="mt-1 text-[10px] text-slate-500">{resume ? `${formatFileSize(resume.fileSizeBytes)} · Tải lên ${new Date(resume.uploadedAt).toLocaleDateString('vi-VN')}` : 'Chọn bản CV mới nhất để bắt đầu'}</p>
        </div>
      </div>
      {resume && <div className="flex shrink-0 flex-wrap items-center gap-1"><button type="button" disabled={isBusy} onClick={onReprocess} className="rounded-md px-2.5 py-2 text-[10px] font-bold text-indigo-800 transition hover:bg-white disabled:opacity-50">Phân tích lại</button><button type="button" disabled={isBusy} onClick={onDownload} className="rounded-md px-2.5 py-2 text-[10px] font-bold text-blue-900 transition hover:bg-white disabled:opacity-50">Tải xuống</button><button type="button" disabled={isBusy} onClick={onDelete} className="rounded-md px-2.5 py-2 text-[10px] font-semibold text-slate-500 transition hover:bg-white hover:text-rose-700 disabled:opacity-50">Xóa CV</button></div>}
    </div>

    {resume && <div className="mx-4 mb-4 rounded-lg border border-slate-100 bg-white p-3.5 sm:mx-5 sm:mb-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Tình trạng phân tích</p>
        <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${resume.processingStatus === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' : resume.processingStatus === 'FAILED' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
          {resume.processingStatus === 'PENDING' ? 'Chờ phân tích' : resume.processingStatus === 'PROCESSING' ? 'Đang phân tích' : resume.processingStatus === 'COMPLETED' ? 'Đã phân tích' : resume.processingStatus === 'FAILED' ? 'Chưa phân tích được' : resume.processingStatus}
        </span>
      </div>
      {resume.processingError && <p className="mt-2 text-[11px] leading-5 text-rose-700">{resume.processingError}</p>}
      {resume.processingStatus === 'COMPLETED' && <>
        <p className="mt-3 text-[10px] text-slate-500">Đã xử lý CV và nhận diện {skills.length} kỹ năng cùng các mục kinh nghiệm, dự án, học vấn. Bạn có thể rà soát và chỉnh sửa bên dưới.</p>
        <p className="mt-2 rounded-md bg-indigo-50 px-2.5 py-2 text-[10px] text-indigo-900">
          Tên đọc được từ CV: <strong>{resume.suggestedFullName || 'Chưa nhận diện được'}</strong>
        </p>
      </>}
    </div>}
    {message && <p role={messageTone === 'error' ? 'alert' : 'status'} className={`mx-4 mb-4 flex items-start gap-2 rounded-lg px-3 py-2.5 text-[11px] leading-5 sm:mx-5 sm:mb-5 ${messageTone === 'success' ? 'bg-emerald-50 text-emerald-800' : messageTone === 'info' ? 'bg-slate-50 text-slate-600' : 'bg-rose-50 text-rose-800'}`}><span className="material-symbols-outlined text-base">{messageTone === 'success' ? 'check_circle' : messageTone === 'error' ? 'error' : 'info'}</span>{message}</p>}
  </section>
);

export default CandidateCvPicker;
