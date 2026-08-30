import { cn } from '@/lib/utils';

export function KronosSeal({ cert }: { cert: any }) {
 return (
   <div className={cn("w- bg-slate-900 border border-[#C5A25A] p-6 rounded-lg", "font-mono")}>
     <div className="flex justify-between items-start">
       <div>
         <h2 className="text-[#C5A25A] text-xl font-bold">KRONOS TRUST LAYER</h2>
         <p className="text-white text-xs">ISO 27001:2022 - VERIFIED</p>
         <p className="text-white/70 text- mt-2 break-all">{cert.hash}</p>
         <p className="text-green-400 text-sm mt-2">Cold chain integrity: {cert.coldChain.integrity}</p>
         <p className="text-white/50 text-xs">{cert.coldChain.setTemp} | NOW: {cert.coldChain.currentTemp}</p>
       </div>
       <img src={cert.qrDataUrl} alt="QR Verify" className="w-28 h-28 bg-white p-1 rounded" />
     </div>
     {/* Sello cromático físico (gradiente) */}
     <div className="mt-4 w-full h- bg-gradient-to-r from-yellow-200 via-blue-300 to-pink-300" />
     <p className="text- text-white/40 mt-2">{cert.verifyUrl}</p>
   </div>
 );
}
import { cn } from '@/lib/utils';

export function KronosSeal({ cert }: { cert: any }) {
  return (
    <div className={cn("w-[600px] bg-slate-900 border border-[#C5A25A] p-6 rounded-lg", "font-mono")}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[#C5A25A] text-xl font-bold">KRONOS TRUST LAYER</h2>
          <p className="text-white text-xs">ISO 27001:2022 - VERIFIED</p>
          <p className="text-white/70 text-[10px] mt-2 break-all">{cert.hash}</p>
          <p className="text-green-400 text-sm mt-2">Cold chain integrity: {cert.coldChain.integrity}</p>
          <p className="text-white/50 text-xs">{cert.coldChain.setTemp} | NOW: {cert.coldChain.currentTemp}</p>
        </div>
        <img src={cert.qrDataUrl} alt="QR Verify" className="w-28 h-28 bg-white p-1 rounded" />
      </div>
      {/* Sello cromático CSS */}
      <div className="mt-4 w-full h-[2px] bg-gradient-to-r from-yellow-200 via-blue-300 to-pink-300" />
      <p className="text-[9px] text-white/40 mt-2">{cert.verifyUrl}</p>
    </div>
  );
}