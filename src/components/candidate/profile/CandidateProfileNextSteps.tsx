import React, { useEffect, useMemo, useState } from 'react';
import type { CandidateResumeData, CandidateResumeSection, CandidateResumeSections } from './profileTypes';

type SectionKey = keyof CandidateResumeSections;
type Props = {
  skills: string[];
  resume: CandidateResumeData | null;
  onSaveSections: (sections: CandidateResumeSections) => Promise<void>;
};

const SECTION_CONFIG: { key: SectionKey; title: string; icon: string; empty: string }[] = [
  { key: 'workExperiences', title: 'Kinh nghiệm làm việc', icon: 'work_history', empty: 'Chưa nhận diện được kinh nghiệm trong CV.' },
  { key: 'projects', title: 'Dự án tiêu biểu', icon: 'deployed_code', empty: 'Chưa nhận diện được dự án trong CV.' },
  { key: 'education', title: 'Học vấn & chứng chỉ', icon: 'school', empty: 'Chưa nhận diện được học vấn trong CV.' },
];

const emptySection: CandidateResumeSection = { title: '', organization: '', period: '', description: '' };

function getResumeSections(resume: CandidateResumeData | null): CandidateResumeSections {
  return {
    workExperiences: resume?.workExperiences ?? [],
    projects: resume?.projects ?? [],
    education: resume?.education ?? [],
  };
}

const CandidateProfileNextSteps: React.FC<Props> = ({ skills, resume, onSaveSections }) => {
  const sourceSections = useMemo(() => getResumeSections(resume), [resume]);
  const [sections, setSections] = useState<CandidateResumeSections>(sourceSections);
  const [editing, setEditing] = useState<{ section: SectionKey; index: number | null } | null>(null);
  const [entry, setEntry] = useState<CandidateResumeSection>(emptySection);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    setSections(sourceSections);
    setEditing(null);
  }, [sourceSections]);

  const isDirty = JSON.stringify(sections) !== JSON.stringify(sourceSections);
  const canEdit = Boolean(resume);

  const startAdd = (section: SectionKey) => {
    setEntry({ ...emptySection });
    setEditing({ section, index: null });
    setSaveMessage('');
  };

  const startEdit = (section: SectionKey, index: number, value: CandidateResumeSection) => {
    setEntry({ ...value });
    setEditing({ section, index });
    setSaveMessage('');
  };

  const saveEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing || entry.title.trim().length < 2) return;
    const updated = [...sections[editing.section]];
    const normalized = {
      title: entry.title.trim(),
      organization: entry.organization?.trim() || null,
      period: entry.period?.trim() || null,
      description: entry.description?.trim() || null,
    };
    if (editing.index === null) updated.push(normalized);
    else updated[editing.index] = normalized;
    setSections((current) => ({ ...current, [editing.section]: updated }));
    setEditing(null);
    setSaveMessage('');
  };

  const removeEntry = (section: SectionKey, index: number) => {
    setSections((current) => ({
      ...current,
      [section]: current[section].filter((_, itemIndex) => itemIndex !== index),
    }));
    setSaveMessage('');
  };

  const saveSections = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      await onSaveSections(sections);
      setSaveMessage('Các mục hồ sơ đã được lưu.');
      setSaveError(false);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Chưa lưu được các mục hồ sơ. Vui lòng thử lại.');
      setSaveError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {SECTION_CONFIG.map((config, index) => (
        <React.Fragment key={config.key}>
        <section key={config.key} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_28px_-22px_rgba(30,64,175,0.24)] sm:p-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="material-symbols-outlined text-xl text-blue-900">{config.icon}</span>
            <h2 className="text-sm font-bold text-slate-950">{config.title}</h2>
            <span className="ml-auto rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-800">
              {sections[config.key].length} mục
            </span>
            <button
              type="button"
              disabled={!canEdit}
              onClick={() => startAdd(config.key)}
              className="inline-flex items-center gap-1 rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-800 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">add</span>Thêm mục
            </button>
          </div>

          {sections[config.key].length > 0 ? (
            <div className="mt-4 space-y-3">
              {sections[config.key].map((item, index) => (
                <article key={`${config.key}-${index}`} className="rounded-lg border border-slate-100 bg-slate-50/75 p-3.5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 material-symbols-outlined text-base text-indigo-700">{config.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                      {(item.organization || item.period) && (
                        <p className="mt-1 text-[11px] font-medium text-indigo-800">
                          {[item.organization, item.period].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      {item.description && <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-600">{item.description}</p>}
                    </div>
                    {canEdit && <div className="flex shrink-0 gap-1">
                      <button type="button" aria-label={`Sửa ${item.title}`} onClick={() => startEdit(config.key, index, item)} className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-indigo-800"><span className="material-symbols-outlined text-base">edit</span></button>
                      <button type="button" aria-label={`Xóa ${item.title}`} onClick={() => removeEntry(config.key, index)} className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-red-700"><span className="material-symbols-outlined text-base">delete</span></button>
                    </div>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-500">
              {resume ? config.empty : 'Tải CV lên để hệ thống nhận diện nội dung ở mục này.'}
            </p>
          )}
        </section>
        {index === 0 && (
          <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_28px_-22px_rgba(30,64,175,0.24)] sm:p-6">
            <div className="flex flex-wrap items-center gap-2.5"><span className="material-symbols-outlined text-xl text-blue-900">psychology</span><h2 className="text-sm font-bold text-slate-950">Kỹ năng nhận diện từ CV</h2><span className="rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-800">{skills.length} kỹ năng</span></div>
            {skills.length > 0
              ? <div className="mt-4 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-md border border-indigo-100 bg-indigo-50/70 px-2.5 py-1.5 text-[11px] font-medium text-indigo-900">{skill}</span>)}</div>
              : <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-500">Chưa có kỹ năng được nhận diện. Tải CV lên và chờ phân tích để hiển thị các kỹ năng tìm thấy.</p>}
            <p className="mt-3 text-[10px] text-slate-400">Danh sách này lấy từ kết quả phân tích CV hiện tại.</p>
          </section>
        )}
        </React.Fragment>
      ))}

      {editing && (
        <form onSubmit={saveEntry} className="rounded-xl border border-indigo-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-indigo-800">edit_note</span>
            <h2 className="text-sm font-bold text-slate-900">{editing.index === null ? 'Thêm mục hồ sơ' : 'Chỉnh sửa mục hồ sơ'}</h2>
            <button type="button" onClick={() => setEditing(null)} className="ml-auto rounded-md p-1 text-slate-500 hover:bg-slate-100"><span className="material-symbols-outlined text-base">close</span></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Tiêu đề *
              <input required minLength={2} maxLength={180} value={entry.title} onChange={(event) => setEntry((current) => ({ ...current, title: event.target.value }))} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" placeholder="Vị trí, tên dự án hoặc trường học" />
            </label>
            <label className="text-xs font-semibold text-slate-700">Công ty / tổ chức
              <input maxLength={180} value={entry.organization ?? ''} onChange={(event) => setEntry((current) => ({ ...current, organization: event.target.value }))} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" placeholder="Tên công ty, trường học..." />
            </label>
            <label className="text-xs font-semibold text-slate-700">Thời gian
              <input maxLength={80} value={entry.period ?? ''} onChange={(event) => setEntry((current) => ({ ...current, period: event.target.value }))} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" placeholder="2023 – Hiện tại" />
            </label>
            <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Mô tả
              <textarea maxLength={2400} rows={4} value={entry.description ?? ''} onChange={(event) => setEntry((current) => ({ ...current, description: event.target.value }))} className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal leading-5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" placeholder="Mô tả ngắn về công việc, dự án hoặc nội dung học tập..." />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setEditing(null)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Hủy</button>
            <button type="submit" disabled={entry.title.trim().length < 2} className="rounded-lg bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-50">Lưu mục</button>
          </div>
        </form>
      )}

      {canEdit && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800">Thông tin nhận diện từ CV</p>
              <p className="mt-1 text-[11px] leading-5 text-slate-600">Hệ thống đọc CV bằng công cụ cục bộ. Hãy rà soát kết quả và chỉnh lại nếu cần; CV không được gửi tới Gemini.</p>
              {saveMessage && <p className={`mt-2 text-xs font-medium ${saveError ? 'text-red-700' : 'text-emerald-700'}`}>{saveMessage}</p>}
            </div>
            <button type="button" disabled={!isDirty || isSaving} onClick={saveSections} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">
              <span className="material-symbols-outlined text-base">save</span>{isSaving ? 'Đang lưu...' : 'Lưu các mục'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CandidateProfileNextSteps;
