// StatCard.jsx
// Component to display metrics with neon glow

import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }) => {
  return (
    <div className="bg-dashboard-card border border-dashboard-border rounded-2xl p-5 flex items-center justify-between shadow-lg hover:shadow-xl transition-all">
      <div>
        <p className="text-dashboard-text text-xs font-bold tracking-wider uppercase mb-1">{title}</p>
        <h3 className={`text-3xl font-bold ${colorClass}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${bgClass}`}>
        <Icon size={24} className={colorClass} />
      </div>
    </div>
  );
};

export default StatCard;