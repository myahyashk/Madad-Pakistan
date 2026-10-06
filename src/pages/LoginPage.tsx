import React, { useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { DEMO_ACCOUNTS, useAuthStore } from '../store/authStore';

export const LoginPage: React.FC<{ onContinuePublic?: () => void }> = ({ onContinuePublic }) => {
  const login = useAuthStore(state => state.login);
  const [email, setEmail] = useState('admin@madadpk.local');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(login(email, password) ? '' : 'Email ya password demo account se match nahi karta.');
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-10 text-stone-900 sm:px-6">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl lg:grid-cols-[1.05fr_1fr]">
        <section className="bg-[#0F3A5D] p-8 text-white sm:p-12">
          <div className="flex items-center gap-2 text-amber-300"><ShieldCheck className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.18em]">MADAD PAKISTAN</span></div>
          <h1 className="mt-16 max-w-md text-4xl font-serif font-bold leading-tight">Har organization ka apna secure relief view.</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-stone-200">NGO, government scheme, private donor aur admin ke records alag scope mein demo login ke zariye show hote hain.</p>
        </section>
        <section className="p-8 sm:p-12">
          <div className="mb-8"><p className="text-xs font-bold uppercase tracking-wider text-amber-700">Demo access</p><h2 className="mt-2 text-2xl font-serif font-bold text-[#0F3A5D]">Sign in to your organization</h2></div>
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-xs font-semibold text-stone-700">Organization email<input value={email} onChange={event => setEmail(event.target.value)} type="email" className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-3 text-sm outline-none focus:border-[#0F3A5D]" /></label>
            <label className="block text-xs font-semibold text-stone-700">Demo password<input value={password} onChange={event => setPassword(event.target.value)} type="password" className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-3 text-sm outline-none focus:border-[#0F3A5D]" /></label>
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</p>}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F3A5D] px-4 py-3 text-sm font-bold text-white">Open dashboard <ArrowRight className="h-4 w-4" /></button>
          </form>
          <div className="mt-8 space-y-2"><p className="flex items-center gap-2 text-xs font-bold text-stone-700"><LockKeyhole className="h-4 w-4 text-emerald-700" /> Dummy accounts</p>{DEMO_ACCOUNTS.map(account => <button key={account.email} onClick={() => { setEmail(account.email); setPassword(account.password); }} className="block w-full rounded-lg border border-stone-200 px-3 py-2 text-left text-[11px] hover:bg-stone-50"><span className="font-bold text-[#0F3A5D]">{account.organizationName}</span><span className="ml-2 text-stone-500">{account.email}</span></button>)}</div>
          {onContinuePublic && <button onClick={onContinuePublic} className="mt-5 w-full rounded-xl border border-stone-300 px-4 py-3 text-xs font-bold text-stone-700">Continue as public user without login</button>}
        </section>
      </div>
    </main>
  );
};