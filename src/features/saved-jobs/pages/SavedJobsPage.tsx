import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

export default function SavedJobsPage() {
  return <PlannedFeaturePage title="Việc làm đã lưu" summary="Danh sách vị trí ứng viên muốn xem lại." phase="Priority 2" items={['Lưu hoặc bỏ lưu tin', 'Mở lại chi tiết tin', 'Ngăn lưu trùng cùng một tin']} />;
}
