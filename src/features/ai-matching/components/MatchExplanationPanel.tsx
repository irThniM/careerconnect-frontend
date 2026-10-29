interface MatchExplanationPanelProps {
  matchedSkills?: string[];
  missingSkills?: string[];
  explanation?: string;
}

/** UI contract only; it currently renders no live matching data. */
export default function MatchExplanationPanel({ matchedSkills = [], missingSkills = [], explanation }: MatchExplanationPanelProps) {
  return (
    <section className="rounded-xl border border-indigo-100 bg-white p-4">
      <h3 className="font-semibold text-slate-900">Vì sao công việc này phù hợp?</h3>
      <p className="mt-2 text-sm text-slate-600">{explanation ?? 'Chưa nối dữ liệu giải thích matching.'}</p>
      <div className="mt-3 flex flex-wrap gap-2">{matchedSkills.map((skill) => <span key={skill} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-800">{skill}</span>)}</div>
      {missingSkills.length > 0 && <p className="mt-3 text-xs text-slate-500">Kỹ năng chưa thể hiện: {missingSkills.join(', ')}</p>}
    </section>
  );
}
