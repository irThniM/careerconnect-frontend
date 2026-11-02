import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  createCompanyCheckout,
  getCompanyPackages,
  getCompanyPaymentStatus,
  getCurrentCompanySubscription,
  type CompanyPackage,
  type CompanyPaymentStatus,
  type CompanySubscription,
} from '../../../api/billing';

const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' });

function formatDate(value: string | null): string {
  if (!value) return 'Chưa kích hoạt';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? 'Chưa cập nhật' : date.format(parsed);
}

function paymentMessage(status: string): { title: string; description: string; color: string } {
  switch (status.toUpperCase()) {
    case 'SUCCESS': return { title: 'Thanh toán thành công', description: 'VNPay đã xác nhận giao dịch và gói dịch vụ đã được kích hoạt.', color: 'border-emerald-200 bg-emerald-50 text-emerald-900' };
    case 'FAILED': return { title: 'Giao dịch chưa thành công', description: 'Gói chưa được kích hoạt. Bạn có thể quay lại và thử thanh toán lại.', color: 'border-rose-200 bg-rose-50 text-rose-900' };
    default: return { title: 'Đang chờ VNPay xác nhận', description: 'Giao dịch đang được đối soát. Hãy tải lại trạng thái sau ít giây.', color: 'border-amber-200 bg-amber-50 text-amber-900' };
  }
}

export default function CompanySubscriptionPage() {
  const [searchParams] = useSearchParams();
  const transactionRef = searchParams.get('transactionRef') || searchParams.get('vnp_TxnRef');
  const [packages, setPackages] = useState<CompanyPackage[]>([]);
  const [subscription, setSubscription] = useState<CompanySubscription | null>(null);
  const [payment, setPayment] = useState<CompanyPaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [buyingPackageId, setBuyingPackageId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const loadPage = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const [packageResult, subscriptionResult] = await Promise.all([
        getCompanyPackages(),
        getCurrentCompanySubscription(),
      ]);
      setPackages(packageResult);
      setSubscription(subscriptionResult);
      if (transactionRef) {
        setPayment(await getCompanyPaymentStatus(transactionRef));
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tải được thông tin gói dịch vụ.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [transactionRef]);

  useEffect(() => { void loadPage(); }, [loadPage]);

  const paymentInfo = useMemo(() => payment ? paymentMessage(payment.status) : null, [payment]);

  const startCheckout = async (packageItem: CompanyPackage) => {
    setBuyingPackageId(packageItem.id);
    setError('');
    try {
      const checkout = await createCompanyCheckout(packageItem.id);
      window.location.assign(checkout.checkoutUrl);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Chưa tạo được phiên thanh toán.');
      setBuyingPackageId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 font-sans text-slate-800 sm:px-8">
      <main className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">CareerConnect · Doanh nghiệp</p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-950">Gói dịch vụ & thanh toán</h1>
            <p className="mt-1 text-sm text-slate-500">Mua thêm lượt đăng tin bằng cổng VNPay Sandbox.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => void loadPage(true)} disabled={refreshing || loading} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60">{refreshing ? 'Đang tải…' : 'Làm mới'}</button>
            <Link to="/employer/dashboard" className="rounded-xl bg-blue-950 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900">Về dashboard</Link>
          </div>
        </header>

        {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</div>}

        {payment && paymentInfo && <section className={`rounded-2xl border p-5 ${paymentInfo.color}`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><h2 className="font-bold">{paymentInfo.title}</h2><p className="mt-1 text-sm">{paymentInfo.description}</p><p className="mt-2 text-xs">Mã giao dịch: <strong>{payment.transactionRef}</strong> · {payment.packageName} · {money.format(payment.amount)}</p></div>
            {payment.status.toUpperCase() === 'PENDING' && <button type="button" onClick={() => void loadPage(true)} disabled={refreshing} className="rounded-lg border border-current/20 bg-white/70 px-3 py-2 text-sm font-semibold">Kiểm tra lại</button>}
          </div>
        </section>}

        <section className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3"><span className="material-symbols-outlined rounded-xl bg-indigo-50 p-3 text-blue-900">workspace_premium</span><div><h2 className="font-bold text-slate-950">Gói hiện tại</h2><p className="text-sm text-slate-500">Quyền lợi đang được áp dụng cho doanh nghiệp.</p></div></div>
            {loading ? <div className="h-24 animate-pulse rounded-xl bg-slate-100" /> : subscription ? <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-950">{subscription.packageName}</h3><p className="mt-1 text-sm text-slate-600">Có hiệu lực từ {formatDate(subscription.startAt)} đến {formatDate(subscription.endAt)}</p></div><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">Đang hoạt động</span></div>
              <div className="mt-4 rounded-lg bg-white p-3"><p className="text-xs text-slate-500">Lượt đăng còn lại</p><p className="mt-1 font-bold text-slate-900">{subscription.remainingJobPosts == null ? 'Không giới hạn' : `${subscription.remainingJobPosts} lượt`}</p></div>
            </div> : <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">Doanh nghiệp chưa có gói trả phí đang hoạt động. Các lượt miễn phí vẫn dùng theo hạn mức hiện có.</div>}
          </article>

          <aside className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6">
            <span className="material-symbols-outlined text-2xl text-indigo-800">verified_user</span>
            <h2 className="mt-2 font-bold text-slate-950">Thanh toán thử nghiệm</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Đây là môi trường Sandbox, không thu tiền thật. Gói chỉ được cộng lượt đăng sau khi máy chủ nhận xác nhận hợp lệ từ VNPay.</p>
            <p className="mt-3 rounded-lg bg-white p-3 text-xs leading-5 text-slate-600">IPN backend cần được công khai và đăng ký với VNPay theo đường dẫn <code className="break-all">/api/company/billing/vnpay/ipn</code>.</p>
          </aside>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-5"><h2 className="text-lg font-bold text-slate-950">Chọn gói dịch vụ</h2><p className="mt-1 text-sm text-slate-500">Sau khi thanh toán được xác nhận, thời hạn và lượt đăng sẽ tự cập nhật.</p></div>
          {loading ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map(item => <div key={item} className="h-56 animate-pulse rounded-xl bg-slate-100" />)}</div> : packages.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center"><span className="material-symbols-outlined text-4xl text-slate-400">inventory_2</span><p className="mt-2 font-semibold text-slate-800">Chưa có gói dịch vụ được mở bán</p><p className="mt-1 text-sm text-slate-500">Cần thêm gói vào bảng packages trong Neon thì các gói sẽ hiện ở đây.</p></div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map(packageItem => <article key={packageItem.id} className="flex flex-col rounded-xl border border-slate-200 p-5 transition hover:border-indigo-300 hover:shadow-md">
              <div className="flex-1"><h3 className="text-lg font-bold text-slate-950">{packageItem.name}</h3><p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">{packageItem.description || 'Gói dịch vụ CareerConnect dành cho nhà tuyển dụng.'}</p><p className="mt-4 text-2xl font-extrabold text-blue-950">{money.format(packageItem.price)}</p><p className="mt-1 text-xs text-slate-500">Thời hạn {packageItem.durationDays} ngày</p>
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700"><li className="flex justify-between gap-3"><span>Lượt đăng tin</span><strong>{packageItem.jobPostLimit == null ? 'Không giới hạn' : packageItem.jobPostLimit}</strong></li><li className="flex justify-between gap-3"><span>Thành viên</span><strong>{packageItem.memberLimit == null ? 'Không giới hạn' : packageItem.memberLimit}</strong></li></ul>
              </div><button type="button" onClick={() => void startCheckout(packageItem)} disabled={buyingPackageId !== null} className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-4 py-3 text-sm font-bold text-white hover:bg-blue-900 disabled:cursor-wait disabled:opacity-60">{buyingPackageId === packageItem.id ? 'Đang chuyển đến VNPay…' : 'Mua gói qua VNPay'}<span className="material-symbols-outlined text-lg">arrow_forward</span></button>
            </article>)}
          </div>}
        </section>
      </main>
    </div>
  );
}
