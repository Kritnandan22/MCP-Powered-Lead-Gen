// Controls.jsx
// Component for pipeline triggers

import React, { useState } from 'react';
import axios from 'axios';
import { Database, Sparkles, Mail, Send, Search, ChevronDown, Layers } from 'lucide-react';

const Controls = ({ refreshData, isProcessing, setProcessing }) => {
  const [batchSize, setBatchSize] = useState(10);
  const [industry, setIndustry] = useState("");
  const [enrichMode, setEnrichMode] = useState("offline");
  const [isLiveMode, setIsLiveMode] = useState(false); // NEW: State for Execution Mode

  const run = async (endpoint, payload) => {
    setProcessing(true);
    try { 
      await axios.post(`http://localhost:8000/agent/${endpoint}`, payload); 
      setTimeout(refreshData, 800); 
    }
    catch (e) { console.error(e); alert("Action failed."); }
    finally { setProcessing(false); }
  };

  const primaryBtn = "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 border border-blue-500/50";
  const secondaryBtn = "bg-dashboard-card hover:bg-slate-700 border border-dashboard-border text-dashboard-text hover:text-white";
  const inputStyle = "bg-dashboard-dark border border-dashboard-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all";

  return (
    <div className="bg-dashboard-card border border-dashboard-border rounded-2xl p-6 mb-8 shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-dashboard-textHighlight text-lg font-semibold">Lead Management</h2>
          <p className="text-xs text-dashboard-text mt-1">Configure generation parameters and execute pipeline stages.</p>
        </div>
      </div>

      {/* Control Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        
        {/* Batch Dropdown */}
        <div className="relative">
          <Layers className="absolute left-3 top-3 text-gray-500" size={16}/>
          <select 
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className={`${inputStyle} pl-10 pr-8 appearance-none cursor-pointer min-w-[140px]`}
          >
            <option value="10">10 Leads</option>
            <option value="50">50 Leads</option>
            <option value="100">100 Leads</option>
            <option value="200">200 Leads</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={14}/>
        </div>

        {/* Industry Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-3 text-gray-500" size={16}/>
          <input 
            type="text" 
            placeholder="Target Industry (e.g. Fintech, SaaS)..." 
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className={`${inputStyle} w-full pl-10`}
          />
        </div>

        {/* Generate Button - NOW WITH RANDOM SEED */}
        <button 
          onClick={() => run('generate', { 
              count: batchSize, 
              industry: industry,
              seed: Math.floor(Math.random() * 1000000) // <--- FIX: Random Seed every click
          })}
          disabled={isProcessing}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${primaryBtn} ${isProcessing ? 'opacity-50' : ''}`}
        >
          <Database size={18}/> Generate Leads
        </button>
      </div>

      {/* Execution Mode Toggle - NEW SECTION */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          onClick={() => setIsLiveMode(!isLiveMode)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className={`w-10 h-5 rounded-full relative transition-colors ${isLiveMode ? 'bg-red-500/20 border border-red-500/50' : 'bg-green-500/20 border border-green-500/50'}`}>
            <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all duration-300 ${isLiveMode ? 'left-5 bg-red-400' : 'left-1 bg-green-400'}`}></div>
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${isLiveMode ? 'text-red-400' : 'text-green-400'}`}>
            {isLiveMode ? '🔴 LIVE MODE' : '🟢 DRY RUN'}
          </span>
        </div>
      </div>

      {/* Pipeline Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-dashboard-border">
        <button onClick={() => run('enrich', { limit: batchSize })} disabled={isProcessing}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${secondaryBtn} hover:border-yellow-500/50 hover:text-yellow-400`}>
          <Sparkles size={16}/> Enrich Leads
        </button>

        <button onClick={() => run('prepare-messages', { limit: batchSize })} disabled={isProcessing}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${secondaryBtn} hover:border-orange-500/50 hover:text-orange-400`}>
          <Mail size={16}/> Draft Messages
        </button>

        <button onClick={() => run('send', { limit: batchSize, dry_run: true })} disabled={isProcessing}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${secondaryBtn} hover:border-green-500/50 hover:text-green-400`}>
          <Send size={16}/> Send Outreach
        </button>
      </div>
    </div>
  );
};

export default Controls;