import React, { useState } from 'react';
import { TRANSPARENT_LEDGER } from '../data/floodaidsData';
import { Search, ShieldCheck, CheckCircle } from 'lucide-react';

export const TransparentLedger: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const categories = ['All', 'Shelter Materials', 'Water Purification', 'Direct Family Cash Grant', 'Emergency Medical Kits'];

  const filteredItems = TRANSPARENT_LEDGER.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.verifiedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <section id="transparent-ledger" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E4DA] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#0F3A5D]">
              Public Financial Accountability (Pakistan)
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F3A5D]">
              Public Aid Disbursement & Material Ledger
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans">
              Every Pakistani Rupee (PKR) contributed to FloodAids is itemized and linked to verified field delivery manifests audited by Provincial Disaster Management Authorities (PDMAs) and humanitarian partners.
            </p>
          </div>

          {/* Allocation Breakdown Graphic */}
          <div className="bg-white p-4 rounded-2xl hairline-box shadow-xs flex items-center gap-6">
            <div className="space-y-1">
              <div className="text-xs text-stone-500 font-medium">Fund Allocation</div>
              <div className="text-xl font-serif font-bold text-[#0F3A5D] num-tabular">
                88% <span className="text-xs font-normal text-stone-600 font-sans">Direct Rehousing & Build</span>
              </div>
            </div>
            <div className="text-xs text-stone-500 space-y-0.5 border-l border-stone-200 pl-4 font-mono">
              <div>8% Clean Water & Logistics</div>
              <div>4% Field Audit & Inspection</div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Pakistan district, receipt, auditor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F3A5D] text-white font-semibold'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Ledger Table Container */}
        <div className="bg-white rounded-2xl hairline-box shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8F6F1] border-b border-stone-200 text-stone-500 uppercase tracking-wider font-mono">
                  <th className="py-3 px-4">Transaction / Date</th>
                  <th className="py-3 px-4">Disaster Zone & Province</th>
                  <th className="py-3 px-4">Relief Category</th>
                  <th className="py-3 px-4 text-right">Disbursed (PKR)</th>
                  <th className="py-3 px-4 text-right">Beneficiary Families</th>
                  <th className="py-3 px-4">Verification Entity</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-500">
                      No ledger transactions found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-semibold text-stone-900">{tx.id}</div>
                        <div className="text-stone-400 text-[11px]">{tx.date}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-stone-800">{tx.zone}</div>
                        <div className="text-stone-400 text-[11px]">{tx.province}, Pakistan</div>
                      </td>

                      <td className="py-3.5 px-4 text-stone-600">
                        {tx.category}
                      </td>

                      <td className="py-3.5 px-4 text-right font-semibold text-[#0F3A5D] num-tabular">
                        Rs. {tx.amountPKR.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-medium text-stone-700 num-tabular">
                        {tx.beneficiaryFamilies} families
                      </td>

                      <td className="py-3.5 px-4 text-stone-600">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[200px]" title={tx.verifiedBy}>{tx.verifiedBy}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyHash(tx.receiptHash)}
                          className="text-[10px] text-stone-400 hover:text-stone-700 font-mono mt-0.5 block cursor-pointer"
                          title="Click to copy receipt hash"
                        >
                          {copiedHash === tx.receiptHash ? '✓ Copied Hash' : `Hash: ${tx.receiptHash}`}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium ${
                          tx.status === 'Delivered On-Site'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-sky-50 text-sky-800'
                        }`}>
                          <CheckCircle className="w-3 h-3" />
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-[#F8F6F1] border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <span>
              Showing {filteredItems.length} verified humanitarian transactions across Pakistan.
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-stone-400">All disbursements cleared via 1LINK / Raast Banking Channels</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
