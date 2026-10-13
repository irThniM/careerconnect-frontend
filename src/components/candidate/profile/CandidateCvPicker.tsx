import React, { type ChangeEvent } from 'react';

type Props = {
  fileName: string;
  message: string;
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const CandidateCvPicker: React.FC<Props> = ({ fileName, message, onSelect, onClear }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3"><span className="material-symbols-outlined rounded-lg bg-rose-50 p-2 text-rose-700">description</span><div><h2 className="font-bold text-slate-950">Hồ sơ &amp; CV đang sử dụng</h2><p className="mt-1 text-xs leading-5 text-slate-500">Chọn CV để xem tên file trong giao diện. Chức năng lưu CV sẽ được kết nối sau.</p></div></div>
      <label htmlFor="profile-cv-picker" className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-indigo-100"><span className="material-symbols-outlined text-lg">upload_file</span>{fileName ? 'Đổi CV' : 'Chọn CV'}</label>
      <input id="profile-cv-picker" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onClick={(event) => { event.currentTarget.value = ''; }} onChange={onSelect} className="sr-only" />
    </div>
    <div className="mt-4 flex flex-col gap-3 rounded-lg bg-slate-50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3"><span className="material-symbols-outlined rounded-lg bg-white p-2 text-rose-700">picture_as_pdf</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{fileName || 'Chưa có CV được tải lên'}</p><p className="mt-0.5 text-xs text-slate-500">Hỗ trợ PDF, DOC, DOCX · tối đa 10 MB</p></div></div>
      {fileName && <button type="button" onClick={onClear} className="shrink-0 text-xs font-semibold text-slate-600 hover:text-rose-700">Bỏ chọn</button>}
    </div>
    {message && <p role={fileName ? 'status' : 'alert'} className={`mt-2 text-xs ${fileName ? 'text-amber-700' : 'text-rose-700'}`}>{message}</p>}
  </section>
);

export default CandidateCvPicker;
