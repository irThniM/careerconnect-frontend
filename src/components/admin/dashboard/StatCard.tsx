import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: string;
    colorClass: string;
}

export default function StatCard({ title, value, icon, colorClass }: StatCardProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 flex items-center justify-between transition-all hover:shadow-md">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colorClass}`}>
                <span className="material-symbols-outlined text-[28px]">{icon}</span>
            </div>
        </div>
    );
}