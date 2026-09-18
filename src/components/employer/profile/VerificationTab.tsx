import React, { useState } from 'react';

const VerificationTab: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Vui lòng chỉ tải lên file định dạng PDF!');
      }
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      alert('Tải lên thành công! Hệ thống đang xử lý và đối soát dữ liệu PDF của bạn.');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
          <span className="material-symbols-outlined text-[24px]">policy</span>
        </div>
        <div>
          <h3 className="font-bold text-indigo-900 mb-1">Xác thực để mở khóa Đăng tin & Tìm CV</h3>
          <p className="text-sm text-indigo-800/80 leading-relaxed">
            Theo quy định, bạn cần cung cấp bản scan/bản mềm <strong>Giấy Đăng ký Kinh doanh</strong> hoặc <strong>Quyết định thành lập</strong>. Hệ thống sẽ tự động quét file (dưới định dạng PDF) để đối soát với Mã số thuế của bạn trong vòng vài giây.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-bold text-slate-800 block mb-3">Tải lên tài liệu (Chỉ chấp nhận file .PDF)</label>
        <div className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors ${selectedFile ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
          <input 
            type="file" accept="application/pdf" onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Bấm để chọn file PDF"
          />
          {!selectedFile ? (
            <>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm mb-4">
                <span className="material-symbols-outlined text-[32px]">upload_file</span>
              </div>
              <h4 className="text-base font-bold text-slate-700 mb-1">Bấm để chọn hoặc kéo thả file PDF vào đây</h4>
              <p className="text-xs text-slate-500 font-medium">Kích thước tối đa 5MB</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-sm mb-4">
                <span className="material-symbols-outlined text-[32px]">picture_as_pdf</span>
              </div>
              <h4 className="text-base font-bold text-emerald-700 mb-1">{selectedFile.name}</h4>
              <p className="text-xs text-slate-500 font-medium mb-5">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <button 
                onClick={(e) => { e.preventDefault(); handleUploadSubmit(); }}
                disabled={isUploading}
                className="relative z-10 px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isUploading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>Đang xử lý...</>
                ) : (
                  <><span className="material-symbols-outlined text-[18px]">verified</span>Xác thực File ngay</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;