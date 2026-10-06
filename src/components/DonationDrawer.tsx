import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Check, CreditCard, Printer, Sparkles, Building2 } from 'lucide-react';

interface DonationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  targetedZone?: string;
}

export const DonationDrawer: React.FC<DonationDrawerProps> = ({
  isOpen,
  onClose,
  initialAmount = 65000,
  targetedZone
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number>(initialAmount);
  const [customVal, setCustomVal] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'raast' | 'card'>('raast');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [dedication, setDedication] = useState<string>('');
  const [receiptId, setReceiptId] = useState<string>('');

  if (!isOpen) return null;

  const currentAmount = customVal ? parseFloat(customVal) || 0 : amount;

  const getImpactDescription = (amt: number) => {
    if (amt >= 850000) {
      return 'Constructs a permanent flood-hardened pakka cottage on reinforced concrete stilts with rooftop solar unit in a rural village.';
    } else if (amt >= 320000) {
      return 'Erects a complete elevated rural Machan stilt haven, protecting a rural family of 8 and their livestock 3 meters above floodwaters.';
    } else if (amt >= 65000) {
      return 'Constructs an elevated heavy-timber stilt foundation deck keeping children and bedframes safe above flood currents.';
    } else if (amt >= 15000) {
      return 'Provides an immediate 48-Hour Rapid Chhappar Kit with waterproof tarpaulin, bamboo poles, anti-malaria nets, and solar lantern.';
    } else {
      return 'Provides clean drinking water tablets, high-energy emergency rations, and infant hydration packs.';
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setReceiptId(`PK-FBR-${Math.floor(1000000 + Math.random() * 9000000)}`);
      setIsSuccess(true);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl hairline-box overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#0F3A5D] text-white p-6 sm:p-7 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Pakistan Flood Rehousing Sponsorship</span>
            </div>
            <h3 className="text-2xl font-serif font-bold">
              {targetedZone ? `Support ${targetedZone}` : 'Sponsor Rural Shelter in Pakistan'}
            </h3>
            <p className="text-xs text-stone-200">
              Tax-Deductible under Section 61 / 2(36) of Income Tax Ordinance 2001 (FBR Pakistan)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close donation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleProcessPayment} className="p-6 sm:p-8 space-y-6">
            
            {/* Frequency Segmented Control */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4EFEA] rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  frequency === 'one-time'
                    ? 'bg-white text-[#0F3A5D] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                One-Time Shelter Donation
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  frequency === 'monthly'
                    ? 'bg-white text-[#0F3A5D] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Monthly Village Sustainer
              </button>
            </div>

            {/* Predefined Pakistani Rupee Amounts Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Choose Sponsorship Tier (Pakistani Rupees - PKR)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[15000, 65000, 320000, 850000].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => {
                      setAmount(tier);
                      setCustomVal('');
                    }}
                    className={`py-3 px-2 text-center rounded-xl border transition-all cursor-pointer ${
                      amount === tier && !customVal
                        ? 'bg-[#0F3A5D] text-white border-[#0F3A5D] shadow-xs'
                        : 'bg-[#FAF8F5] text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-sm font-bold num-tabular">Rs. {tier >= 100000 ? `${tier / 1000}k` : tier.toLocaleString()}</div>
                    <div className={`text-[10px] mt-0.5 truncate ${
                      amount === tier && !customVal ? 'text-stone-300' : 'text-stone-500'
                    }`}>
                      {tier === 15000 ? 'Chhappar Kit' : tier === 65000 ? 'Stilt Base' : tier === 320000 ? 'Machan Home' : 'Pakka Cottage'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="relative pt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-semibold font-mono">PKR Rs.</span>
                <input
                  type="number"
                  min="500"
                  step="500"
                  placeholder="Enter other custom amount in PKR (e.g. 50000)..."
                  value={customVal}
                  onChange={(e) => setCustomVal(e.target.value)}
                  className="w-full pl-18 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D] num-tabular"
                />
              </div>
            </div>

            {/* Impact Calculation Callout */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-[#0F3A5D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Impact of your Rs. {currentAmount.toLocaleString()} PKR {frequency === 'monthly' ? '/ month' : ''} contribution:</span>
              </div>
              <p className="text-stone-600 leading-snug">
                {getImpactDescription(currentAmount)}
              </p>
            </div>

            {/* Payment Method Selector in Pakistan */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Payment Channel (Pakistan & Overseas)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'raast', label: 'Raast / 1LINK', desc: 'Instant Bank Pay' },
                  { id: 'jazzcash', label: 'JazzCash', desc: 'Mobile Wallet' },
                  { id: 'easypaisa', label: 'Easypaisa', desc: 'Mobile Wallet' },
                  { id: 'card', label: 'Visa / Mastercard', desc: 'Credit / Debit Card' }
                ].map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setPaymentMethod(channel.id as any)}
                    className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === channel.id
                        ? 'bg-stone-900 text-white border-stone-900 font-medium'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="text-xs font-semibold">{channel.label}</div>
                    <div className={`text-[10px] truncate ${paymentMethod === channel.id ? 'text-stone-300' : 'text-stone-500'}`}>
                      {channel.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Donor Contact & FBR Tax Exemption Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. tariq@domain.pk"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0321-9876543"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Optional Dedication / ایصالِ ثواب یا نام منسوب
                </label>
                <input
                  type="text"
                  placeholder="e.g. In memory of parents / سیلاب متاثرین کے لیے"
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3A5D]"
                />
              </div>
            </div>

            {/* Simulated Payment Trigger */}
            <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
              <button
                type="submit"
                disabled={isProcessing || currentAmount <= 0}
                className="w-full py-3 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] disabled:opacity-50 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Securing Transaction & Registering with Raast/FBR...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Authorize Rs. {currentAmount.toLocaleString()} PKR Rehousing Donation</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>State Bank of Pakistan Regulated Payment Channels · 88% Direct Field Material Allocation</span>
              </div>
            </div>

          </form>
        ) : (
          /* Success & Official Certificate View */
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-[#0F3A5D]">
                جزاک اللہ — Thank You for Rehousing a Rural Family
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Your humanitarian contribution has been recorded in the Pakistan relief procurement ledger.
              </p>
            </div>

            {/* Printable Certificate Frame */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border-2 border-dashed border-[#0F3A5D]/30 space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#0F3A5D]" />
                  <span className="font-serif font-bold text-sm text-[#0F3A5D]">MADAD PAKISTAN OFFICIAL TAX RECEIPT</span>
                </div>
                <span className="font-mono text-stone-500">{receiptId}</span>
              </div>

              <div className="space-y-1.5 text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-500">Donor Name:</span>
                  <span className="font-semibold text-stone-900">{donorName || 'Humanitarian Contributor'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Amount Contributed:</span>
                  <span className="font-bold text-[#0F3A5D] num-tabular">Rs. {currentAmount.toLocaleString()} PKR ({frequency})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Designated Region:</span>
                  <span>{targetedZone || 'Rural Flood Rehousing (Sindh / Balochistan / S. Punjab)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Tax Exemption:</span>
                  <span className="text-emerald-800 font-semibold">100% Tax Deductible (FBR Section 61)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500 italic">
                "An official confirmation SMS and digital certificate has been dispatched to {donorPhone || donorEmail || 'your contact'}."
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-semibold text-stone-700 border border-stone-200 hover:bg-stone-50 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-xs font-semibold text-white bg-[#0F3A5D] hover:bg-[#0a273f] rounded-xl cursor-pointer"
              >
                Return to Mission
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
