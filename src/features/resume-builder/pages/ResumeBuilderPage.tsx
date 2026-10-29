import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

export default function ResumeBuilderPage() {
  return <PlannedFeaturePage title="Tạo CV trực tuyến" summary="Tạo CV từ hồ sơ đã chuẩn hóa và lưu các phiên bản để khôi phục." phase="Optional" items={['Chọn mẫu CV đang hoạt động', 'Chỉnh sửa thông tin hồ sơ và xuất bản xem trước', 'Lưu snapshot và khôi phục phiên bản']} />;
}
