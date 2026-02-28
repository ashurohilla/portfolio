"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface KycData {
  firstName: string;
  motherName: string;
}

// Separate component to handle reading the URL
const QueryParamsTable = () => {
  const searchParams = useSearchParams();
  
  // Convert searchParams entries to an array for mapping
  const params = Array.from(searchParams.entries());

  if (params.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4 ml-1">
        URL Parameters Received
      </h2>
      <div className="overflow-hidden border border-slate-800 rounded-xl bg-slate-900/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/80 border-b border-slate-800">
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase">Key</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {params.map(([key, value]) => (
              <tr key={key} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-3 text-sm font-mono text-blue-400">{key}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<KycData>({
    firstName: '',
    motherName: ''
  });

  const handleSendToFlutter = () => {
    if (window.FlutterHttpRequest) {
      const payload = JSON.stringify({
        handler: 'fetchKycDetails',
        data: formData
      });
      window.FlutterHttpRequest.postMessage(payload);
    }

    const queryParams = new URLSearchParams({
      name: formData.firstName,
      motherName: formData.motherName
    }).toString();

    // Redirecting to the SAME page but with parameters
    router.push(`/success?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 font-sans">
      <div className="w-full max-w-md mt-8 mb-10 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          KYC Verification
        </h1>
        <p className="text-slate-400 mt-2 text-sm">Submit details to see them in the table</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">First Name</label>
            <input 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="Enter name" 
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Mother's Name</label>
            <input 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="Enter mother's name" 
              value={formData.motherName}
              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
            />
          </div>
        </div>

        <button 
          onClick={handleSendToFlutter}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
        >
          Update URL & Show Table
        </button>
      </div>

      {/* Wrap in Suspense to handle the search params hook safely */}
      <Suspense fallback={<p className="mt-10 text-slate-500">Loading params...</p>}>
        <QueryParamsTable />
      </Suspense>
    </div>
  );
}

export default Page;