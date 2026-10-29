import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

/** Placeholder for relational experience/education/project editing; current CV extraction remains separate. */
export default function StructuredProfileSections() {
  return <PlannedFeaturePage title="Kinh nghiệm, học vấn và dự án" summary="Bộ khung cho các mục hồ sơ lưu thành bản ghi riêng, thay vì chỉ nằm trong dữ liệu CV trích xuất." phase="Core" items={['Thêm, sửa, xóa từng kinh nghiệm', 'Quản lý học vấn và chứng chỉ', 'Quản lý dự án và công nghệ sử dụng']} />;
}
