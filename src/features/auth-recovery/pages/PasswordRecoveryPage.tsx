import PlannedFeaturePage from '../../../components/planned/PlannedFeaturePage';

export default function PasswordRecoveryPage() {
  return <PlannedFeaturePage title="Khôi phục tài khoản" summary="Bộ khung cho quên mật khẩu, đặt lại mật khẩu và đăng nhập Google." phase="Core" items={['Yêu cầu liên kết đặt lại qua email', 'Xác minh token đã băm và hạn sử dụng', 'Liên kết tài khoản Google an toàn']} />;
}
