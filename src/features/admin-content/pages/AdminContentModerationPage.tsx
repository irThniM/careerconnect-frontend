import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

export default function AdminContentModerationPage() {
  return <PlannedFeaturePage title="Kiểm duyệt nội dung" summary="Quản trị viên có thể ẩn hoặc gỡ bài viết và bình luận theo quy tắc đã thống nhất." phase="Core" items={['Tìm bài viết và bình luận', 'Ẩn hoặc xóa nội dung', 'Ghi nhận người thao tác và thời điểm xử lý']} />;
}
