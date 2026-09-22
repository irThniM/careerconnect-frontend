import React from 'react';
import StatCard from './StatCard';

export default function DashboardMainContent() {
    return (
        <div className="animate-in fade-in duration-300">
            {/* Header của Dashboard */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Tổng quan hệ thống</h1>
                <p className="text-slate-500 mt-1">Cập nhật dữ liệu mới nhất ngày hôm nay.</p>
            </div>

            {/* Các thẻ Thống kê (Grid 4 cột) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Tổng Ứng Viên" value="12,543" icon="group" colorClass="bg-blue-100 text-blue-600" />
                <StatCard title="Tổng Công Ty" value="842" icon="apartment" colorClass="bg-emerald-100 text-emerald-600" />
                <StatCard title="Công ty chờ duyệt" value="15" icon="pending_actions" colorClass="bg-amber-100 text-amber-600" />
                <StatCard title="Việc làm đang mở" value="3,204" icon="work" colorClass="bg-purple-100 text-purple-600" />
            </div>

            {/* Vùng chứa Biểu đồ hoặc Danh sách mới nhất */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-sm border border-slate-100 h-96 flex items-center justify-center">
                    <p className="text-slate-400 font-medium">(Khu vực tích hợp Biểu đồ Chart.js sau này)</p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 h-96">
                    <h3 className="font-bold text-slate-800 mb-4">Hoạt động gần đây</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></span>
                            <p className="text-slate-600">Công ty <span className="font-semibold text-slate-800">FPT Software</span> vừa đăng ký tài khoản.</p>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></span>
                            <p className="text-slate-600">Ứng viên <span className="font-semibold text-slate-800">Ngô Minh Trí</span> vừa cập nhật CV.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}