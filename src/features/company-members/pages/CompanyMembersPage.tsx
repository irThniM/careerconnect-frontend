import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

export default function CompanyMembersPage() {
  return <PlannedFeaturePage title="Thành viên doanh nghiệp" summary="Quản lý OWNER và RECRUITER, lời mời thành viên và quyền thao tác." phase="Core" items={['Mời theo email', 'Phân quyền theo vai trò', 'Thu hồi lời mời hoặc gỡ thành viên']} />;
}
