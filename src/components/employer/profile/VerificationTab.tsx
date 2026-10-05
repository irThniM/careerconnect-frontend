import React, { useState, useEffect } from 'react';

const VerificationTab: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // State lưu trạng thái từ Database
  const [companyStatus, setCompanyStatus] = useState<string>('PENDING');
  const [licensePdfUrl, setLicensePdfUrl] = useState<string | null>(null);

  // Gọi API lấy thông tin công ty khi vừa load Tab
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        // LƯU Ý: Bác thay đường dẫn này bằng API Get Profile thực tế của Backend nhé
        const response = await fetch('https://localhost:7203/api/Company/my-profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Giả sử API trả về data.status và data.licensePdfUrl (Sửa lại tên biến nếu Backend trả về khác)
          setCompanyStatus(data.status || 'PENDING');
          setLicensePdfUrl(data.licensePdfUrl || null);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin công ty:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.type !== 'application/pdf') {
        setFeedback({ type: 'error', text: 'Hệ thống chỉ hỗ trợ định dạng file PDF.' });
        return;
      }

      setSelectedFile(file);
      setFeedback(null);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Vui lòng chọn file PDF trước khi tải lên.');
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await fetch('https://localhost:7203/api/Company/verify-kyb', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ type: 'success', text: data.message });
        setSelectedFile(null);
        
        // Tải lại trang sau 2s để effect tự cập nhật lại giao diện xem PDF
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setFeedback({ type: 'error', text: data.message || 'Xác minh thất bại.' });
      }
    } catch (error) {
      setFeedback({ type: 'error', text: 'Không thể kết nối đến máy chủ Backend.' });
    } finally {
      setIsLoading(false);
    }
  };

  // MÀN HÌNH LOADING TRONG LÚC GỌI API
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64 max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100">
        <span className="material-symbols-outlined animate-spin text-emerald-600 text-4xl">sync</span>
      </div>
    );
  }

  // MÀN HÌNH ĐÃ XÁC MINH (HIỂN THỊ PDF)
  if (companyStatus === 'ACTIVE' && licensePdfUrl) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6 flex items-start gap-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-emerald-600 text-2xl">verified_user</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-800 tracking-tight">Tài khoản doanh nghiệp đã được xác minh!</h2>
            <p className="text-emerald-700 text-sm mt-1 leading-relaxed">
              Hệ thống đã đối soát thành công Mã số thuế với cơ sở dữ liệu quốc gia. 
              Dưới đây là bản lưu Giấy phép kinh doanh của bạn trên hệ thống bảo mật.
            </p>
          </div>
        </div>

        {/* Khung nhúng file PDF từ Cloudinary */}
        <div className="w-full h-[650px] border border-slate-200 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
          <iframe 
            src={licensePdfUrl} 
            className="w-full h-full" 
            title="Giấy phép kinh doanh"
          />
        </div>
      </div>
    );
  }

  // MÀN HÌNH CHƯA XÁC MINH (FORM UPLOAD CŨ)
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Xác minh Giấy phép hoạt động (KYB)</h2>
          <p className="text-sm text-slate-600 mb-4">
            Tài khoản của bạn đang ở trạng thái <strong className="text-orange-600">CHỜ DUYỆT</strong>. Tải lên file PDF Giấy chứng nhận ĐKKD để hệ thống tự động bóc tách mã số thuế và đối soát.
          </p>
          
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 flex gap-3 text-sm text-sky-800">
            <span className="material-symbols-outlined text-sky-600">info</span>
            <div>
              <strong>Hướng dẫn test nhanh:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Chuẩn bị 1 file PDF có chứa dòng chữ: <code className="bg-sky-100 px-1 py-0.5 rounded font-mono">Mã số doanh nghiệp: [Mã số thuế thật]</code>.</li>
                <li>Hệ thống sẽ tự động quét, check trạng thái hoạt động qua cổng VietQR và kích hoạt tài khoản.</li>
              </ul>
            </div>
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg flex gap-3 text-sm font-medium ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            <span className="material-symbols-outlined">
              {feedback.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{feedback.text}</span>
          </div>
        )}

        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="w-full">
            <label 
              htmlFor="pdf-file-input" 
              className={`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'border-slate-300'}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-3">
                  {isLoading ? 'hourglass_empty' : 'picture_as_pdf'}
                </span>
                <p className="mb-2 text-sm text-slate-600 font-bold">
                  {isLoading ? 'Hệ thống đang bóc tách và tải file lên mây...' : 'Bấm để chọn file PDF Giấy phép kinh doanh'}
                </p>
                <p className="text-xs text-slate-500">Chỉ chấp nhận định dạng .PDF</p>
              </div>
              <input 
                id="pdf-file-input" 
                type="file" 
                className="hidden" 
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
          </div>

          {selectedFile && !isLoading && (
            <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-sm">
              <div className="flex items-center gap-2 truncate">
                <span className="material-symbols-outlined text-red-600">picture_as_pdf</span>
                <span className="font-semibold truncate">{selectedFile.name}</span>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedFile(null)}
                className="text-slate-500 hover:text-red-600"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={!selectedFile || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
              selectedFile && !isLoading
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">sync</span>
                Đang xử lý và đối soát...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">verified</span>
                Gửi hệ thống xét duyệt
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationTab;