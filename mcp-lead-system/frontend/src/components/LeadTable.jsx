// LeadTable.jsx
// Component to display a data grid with status badges

import React from 'react';
import { Linkedin, Mail, Search, Globe, MapPin, Download } from 'lucide-react';

const LeadTable = ({ leads }) => {
  // Avatar generator
  const getAvatar = (name) => `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=3b82f6&color=fff`;
  const getLogo = (company) => `https://ui-avatars.com/api/?name=${company.substring(0,2)}&background=1e293b&color=94a3b8&font-size=0.4`;

  return (
    <div className="bg-dashboard-card border border-dashboard-border rounded-2xl shadow-lg flex flex-col h-[600px]">
      
      {/* Header with Export Button */}
      <div className="px-6 py-5 border-b border-dashboard-border flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-dashboard-textHighlight text-lg font-semibold">Lead List</h3>
          <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded-md border border-blue-500/20">
            {leads.length} Total
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <a href="http://localhost:8000/export/csv" target="_blank" rel="noreferrer"
             className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dashboard-dark border border-dashboard-border text-xs text-dashboard-text hover:text-white hover:border-blue-500 transition-all">
             <Download size={14} /> Export CSV
          </a>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={14}/>
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="bg-dashboard-dark border border-dashboard-border rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-64 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-auto custom-scrollbar flex-grow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-dashboard-dark text-xs uppercase text-dashboard-text sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">Name & Email</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Company & Web</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Role & Country</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Industry</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-center">Status</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-right">Drafts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashboard-border">
            {leads.map(l => (
              <tr key={l.id} className="hover:bg-slate-800/50 transition-colors group">
                
                {/* 1. Name + Email + LinkedIn Link */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={getAvatar(l.full_name)} alt="avatar" className="w-10 h-10 rounded-full border border-dashboard-border" />
                    <div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        {l.full_name}
                        {/* LINKEDIN ICON - Always Visible */}
                        <a href={l.linkedin_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-white transition-colors" title="Open LinkedIn Profile">
                          <Linkedin size={12} />
                        </a>
                      </div>
                      <div className="text-xs text-gray-500">{l.email}</div>
                    </div>
                  </div>
                </td>

                {/* 2. Company + Website Link */}
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                    <img src={getLogo(l.company_name)} alt="logo" className="w-6 h-6 rounded bg-dashboard-dark" />
                    <div>
                      <div className="text-sm text-gray-300">{l.company_name}</div>
                      <a href={l.website} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline flex items-center gap-1">
                        <Globe size={10} /> {l.website.replace('https://www.', '')}
                      </a>
                    </div>
                  </div>
                </td>

                {/* 3. Role + Country */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-400">{l.role}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {l.country}
                  </div>
                </td>

                {/* 4. Industry */}
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {l.industry}
                  </span>
                </td>

                {/* 5. Status Badge */}
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border 
                    ${l.status==='NEW'?'bg-blue-500/10 text-blue-400 border-blue-500/20':''}
                    ${l.status==='ENRICHED'?'bg-yellow-500/10 text-yellow-400 border-yellow-500/20':''}
                    ${l.status==='MESSAGED'?'bg-orange-500/10 text-orange-400 border-orange-500/20':''}
                    ${l.status==='SENT'?'bg-green-500/10 text-green-400 border-green-500/20':''}
                    ${l.status==='FAILED'?'bg-red-500/10 text-red-400 border-red-500/20':''}
                  `}>
                    {l.status}
                  </span>
                </td>

                {/* 6. Action Buttons (View Content) */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {l.email_content_a ? (
                      <>
                        <button 
                          onClick={() => alert(`EMAIL TO ${l.email}:\n\n${l.email_content_a}`)}
                          className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-blue-400 hover:text-white hover:border-blue-500 transition-all flex items-center gap-1">
                          <Mail size={12}/> Email
                        </button>
                        <button 
                          onClick={() => alert(`LINKEDIN MSG TO ${l.full_name}:\n\n${l.linkedin_content_a}`)}
                          className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-blue-400 hover:text-white hover:border-blue-500 transition-all flex items-center gap-1">
                          <Linkedin size={12}/> DM
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-700 text-xs italic py-1">Pending Draft</span>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-3 border-t border-dashboard-border flex justify-between items-center text-xs text-gray-500">
        <div>Showing all {leads.length} records</div>
      </div>
    </div>
  );
};

export default LeadTable;