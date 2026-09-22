import React, { useState, useEffect } from 'react';
import DashboardMainContent from '../../components/admin/dashboard/DashboardMainContent';

export default function AdminDashboard() {
    // Không gian này sau này bác sẽ dùng để quản lý State và gọi API.
    // Ví dụ:
    // const [dashboardData, setDashboardData] = useState(null);
    // useEffect(() => { 
    //      fetch('/api/admin/dashboard-stats').then(...) 
    // }, []);

    return (
        // Chỉ việc gọi cái vỏ UI ra, sau này truyền props (dashboardData) vào đây là xong!
        <DashboardMainContent />
    );
}