import React, { useState, useEffect } from 'react';
import DashboardMainContent from '../../components/admin/dashboard/DashboardMainContent';

export default function AdminDashboard() {
    // State lưu trữ các con số thống kê
    const [stats, setStats] = useState({
        totalCandidates: 0,
        totalCompanies: 0,
        pendingCompanies: 0,
        openJobs: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('https://localhost:7203/api/Admin/dashboard-stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    console.error('Lỗi phân quyền hoặc server từ chối.');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API thống kê:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    // Truyền dữ liệu stats và trạng thái loading xuống component con
    return (
        <DashboardMainContent stats={stats} isLoading={isLoading} />
    );
}