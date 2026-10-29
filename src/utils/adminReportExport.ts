import type { AdminCompany, AdminUser } from '../api/admin';

export type AdminReportKind = 'candidates' | 'companies' | 'staff';

function csvCell(value: unknown): string {
  let text = String(value ?? '').replace(/[\r\n]+/g, ' ');
  if (/^\s*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function displayDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? 'Không rõ' : new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}

function statusLabel(value: string): string {
  const key = value.toUpperCase();
  const labels: Record<string, string> = {
    ACTIVE: 'Đang hoạt động',
    PENDING: 'Chờ xác minh',
    PENDING_REVIEW: 'Chờ xác minh',
    UNVERIFIED: 'Chưa xác thực',
    BANNED: 'Đã khóa',
    DELETED: 'Đã xóa',
  };
  return labels[key] || value;
}

function createdWithinLastWeek(value: string, now: Date): boolean {
  const createdAt = new Date(value).getTime();
  const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  return Number.isFinite(createdAt) && createdAt >= weekAgo && createdAt <= now.getTime();
}

function buildReport(kind: AdminReportKind, users: AdminUser[], companies: AdminCompany[], now: Date): (string | number)[][] {
  if (kind === 'candidates') {
    const candidates = users.filter((user) => user.accountType.toLowerCase() === 'candidate').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return [
      ['CAREERCONNECT | BÁO CÁO ỨNG VIÊN'],
      ['Thời điểm xuất báo cáo', displayDate(now)],
      [],
      ['TỔNG QUAN ỨNG VIÊN'],
      ['Chỉ số', 'Số lượng'],
      ['Tổng số ứng viên', candidates.length],
      ['Ứng viên mới trong 7 ngày', candidates.filter((user) => createdWithinLastWeek(user.createdAt, now)).length],
      ['Tài khoản đang hoạt động', candidates.filter((user) => user.status.toLowerCase() === 'active').length],
      ['Chưa xác thực', candidates.filter((user) => user.status.toLowerCase() === 'unverified').length],
      [],
      ['DANH SÁCH ỨNG VIÊN'],
      ['STT', 'Họ và tên', 'Email', 'Trạng thái', 'Ngày tạo tài khoản'],
      ...candidates.map((user, index) => [index + 1, user.fullName, user.email, statusLabel(user.status), displayDate(user.createdAt)]),
    ];
  }

  if (kind === 'companies') {
    const orderedCompanies = [...companies].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const pending = orderedCompanies.filter((company) => ['PENDING', 'PENDING_REVIEW'].includes(company.status.toUpperCase()));
    return [
      ['CAREERCONNECT | BÁO CÁO DOANH NGHIỆP'],
      ['Thời điểm xuất báo cáo', displayDate(now)],
      [],
      ['TỔNG QUAN DOANH NGHIỆP'],
      ['Chỉ số', 'Số lượng'],
      ['Tổng số doanh nghiệp', orderedCompanies.length],
      ['Chờ xác minh', pending.length],
      ['Đã xác minh', orderedCompanies.filter((company) => company.status.toUpperCase() === 'ACTIVE').length],
      ['Doanh nghiệp mới trong 7 ngày', orderedCompanies.filter((company) => createdWithinLastWeek(company.createdAt, now)).length],
      [],
      ['DANH SÁCH DOANH NGHIỆP'],
      ['STT', 'Tên doanh nghiệp', 'Mã số thuế', 'Email liên hệ', 'Trạng thái KYB', 'Ngày tạo', 'Giấy phép'],
      ...orderedCompanies.map((company, index) => [index + 1, company.companyName, company.taxCode || '', company.contactEmail || '', statusLabel(company.status), displayDate(company.createdAt), company.licensePdfUrl || '']),
    ];
  }

  const staff = users.filter((user) => user.accountType.toLowerCase() === 'admin').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return [
    ['CAREERCONNECT | BÁO CÁO NHÂN SỰ ADMIN'],
    ['Thời điểm xuất báo cáo', displayDate(now)],
    [],
    ['TỔNG QUAN NHÂN SỰ ADMIN'],
    ['Chỉ số', 'Số lượng'],
    ['Tổng số tài khoản admin', staff.length],
    ['Đang hoạt động', staff.filter((user) => user.status.toLowerCase() === 'active').length],
    ['Tài khoản admin mới trong 7 ngày', staff.filter((user) => createdWithinLastWeek(user.createdAt, now)).length],
    [],
    ['DANH SÁCH NHÂN SỰ ADMIN'],
    ['STT', 'Họ và tên', 'Email', 'Vai trò hệ thống', 'Trạng thái', 'Ngày tạo tài khoản'],
    ...staff.map((user, index) => [index + 1, user.fullName, user.email, 'Quản trị viên', statusLabel(user.status), displayDate(user.createdAt)]),
  ];
}

export function exportAdminReport(kind: AdminReportKind, users: AdminUser[], companies: AdminCompany[]): void {
  const now = new Date();
  const rows = buildReport(kind, users, companies, now);
  const content = `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `careerconnect-bao-cao-${kind}-${now.toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
