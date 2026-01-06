// App.jsx
// Main Dashboard Layout

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, CheckCircle, MessageSquare, Send, AlertTriangle } from 'lucide-react';
import StatCard from './components/StatCard';
import Controls from './components/Controls';
import LeadTable from './components/LeadTable';

function App() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [isProcessing, setProcessing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/leads"); 
      setLeads(res.data.leads);
      setStats(res.data.stats);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // Safe Stats Access
  const getTotal = () => Object.values(stats).reduce((a,b)=>a+b, 0);

  return (
    <div className="min-h-screen p-8 bg-dashboard-dark font-sans text-dashboard-text">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-blue-500 tracking-tight">MCP Orchestrator</h1>
          <p className="text-slate-500 mt-1">Autonomous Lead Generation Pipeline</p>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard title="Total Leads" value={getTotal()} icon={Users} colorClass="text-blue-500" bgClass="bg-blue-500/10" />
          <StatCard title="Enriched" value={stats.ENRICHED || 0} icon={CheckCircle} colorClass="text-yellow-500" bgClass="bg-yellow-500/10" />
          <StatCard title="Ready" value={stats.MESSAGED || 0} icon={MessageSquare} colorClass="text-orange-500" bgClass="bg-orange-500/10" />
          <StatCard title="Sent" value={stats.SENT || 0} icon={Send} colorClass="text-green-500" bgClass="bg-green-500/10" />
          <StatCard title="Failed" value={stats.FAILED || 0} icon={AlertTriangle} colorClass="text-red-500" bgClass="bg-red-500/10" />
        </div>

        {/* MAIN CONTROLS */}
        <Controls refreshData={fetchData} isProcessing={isProcessing} setProcessing={setProcessing} />

        {/* DATA TABLE */}
        <LeadTable leads={leads} />

      </div>
    </div>
  );
}

export default App;