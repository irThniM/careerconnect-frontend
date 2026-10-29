import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

export default function AdminCatalogPage() {
  return <PlannedFeaturePage title="Danh mục nghề và kỹ năng" summary="Quản lý từ điển nghề nghiệp, kỹ năng, bí danh và trạng thái hoạt động." phase="Core" items={['Quản lý danh mục nghề', 'Thêm kỹ năng và bí danh', 'Ngừng sử dụng hoặc gộp kỹ năng trùng']} />;
}
