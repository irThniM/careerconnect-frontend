import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

export default function InterviewSchedulePage() {
  return <PlannedFeaturePage title="Lịch phỏng vấn" summary="Đề xuất lịch gắn với hồ sơ ứng tuyển để hai bên xác nhận, đổi hoặc hủy." phase="Core" items={['Đề xuất thời gian và ghi chú', 'Ứng viên xác nhận, từ chối hoặc đề nghị đổi lịch', 'Theo dõi lịch sử và trạng thái cuộc hẹn']} />;
}
