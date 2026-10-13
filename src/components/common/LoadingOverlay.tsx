type LoadingOverlayProps = {
  isOpen: boolean;
  title: string;
  description?: string;
};

export default function LoadingOverlay({ isOpen, title, description }: LoadingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-sm rounded-2xl border border-white/70 bg-white p-7 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
          <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-blue-200 border-t-blue-700" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>}
        <p className="mt-5 text-xs font-medium text-slate-400">Vui lòng chờ trong giây lát…</p>
      </div>
    </div>
  );
}
