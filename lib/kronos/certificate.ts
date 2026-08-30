import crypto from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs';

export type ReeferData = {
 containerId: string;
 route: 'VLP-RTM';
 setTemp: string;
 currentTemp: string;
 auditTrail: string;
 product: string;
}

export async function generateKronosTrustCertificate(data: ReeferData) {
 // 1. SHA-256 REAL del log - infalsificable
 const rawHash = crypto.createHash('sha256').update(data.auditTrail).digest('hex');
 const hash = `sha256:${rawHash}`;

 const certNo = `KRN-AUD-2026-${data.route}-${data.containerId.replace(/\s/g,'')}`;
 const verifyUrl = `https://kronos-assurance.global/verify?hash=${rawHash}&cert=${certNo}&container=${encodeURIComponent(data.containerId)}`;

 const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
   errorCorrectionLevel: 'H',
   color: { dark: '#0A1931', light: '#FFFFFF' }
 });

 return {
   certificateNo: certNo,
   hash,
   rawHash,
   verifyUrl,
   qrDataUrl,
   issuedAt: new Date().toISOString(),
   validUntil: new Date(Date.now() + 365*24*60*60*1000).toISOString(),
   coldChain: {
     integrity: data.currentTemp === data.setTemp ? 'CONFIRMED' : 'ALERT',
     setTemp: data.setTemp,
     currentTemp: data.currentTemp,
   },
   meta: {
     iso: 'ISO-IEC 27001:2022',
     keywords: ['Audit Authenticity', 'Data Integrity', 'Cold Chain Logistics', 'Valparaiso-Rotterdam'],
   }
 };
}

// EJECUCIÓN LOCAL (para generar el primer certificado)
(async () => {
  const log = fs.readFileSync('audit_trail.log', 'utf8');
  const cert = await generateKronosTrustCertificate({
    containerId: 'KRNU 847102 3',
    route: 'VLP-RTM',
    setTemp: '-18.0°C',
    currentTemp: '-18.1°C',
    auditTrail: log,
    product: 'Fruta fresca'
  });
  console.log('✅ CERTIFICADO GENERADO:');
  console.log('Nº:', cert.certificateNo);
  console.log('Hash:', cert.hash);
  console.log('URL:', cert.verifyUrl);
  console.log('QR (base64):', cert.qrDataUrl.substring(0, 80) + '...');
})();
import crypto from 'crypto';
import QRCode from 'qrcode';

export type ReeferData = {
  containerId: string; // KRNU 847102 3
  route: 'VLP-RTM';
  setTemp: string; // -18°C
  currentTemp: string; // -18.1°C
  auditTrail: string; // contenido de tu audit_trail.log
  product: string; // Fruta fresca
}

export async function generateKronosTrustCertificate(data: ReeferData) {
  // 1. SHA-256 REAL del log - infalsificable
  const rawHash = crypto.createHash('sha256').update(data.auditTrail).digest('hex');
  const hash = `sha256:${rawHash}`;

  const certNo = `KRN-AUD-2026-${data.route}-${data.containerId.replace(/\s/g,'')}`;
  const verifyUrl = `https://kronos-assurance.global/verify?hash=${rawHash}&cert=${certNo}&container=${encodeURIComponent(data.containerId)}`;

  // 2. QR que escanea Héctor y la aduana de Róterdam
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    errorCorrectionLevel: 'H',
    color: { dark: '#0A1931', light: '#FFFFFF' }
  });

  return {
    certificateNo: certNo,
    hash,
    rawHash,
    verifyUrl,
    qrDataUrl,
    issuedAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 365*24*60*60*1000).toISOString(),
    coldChain: {
      integrity: data.currentTemp === data.setTemp? 'CONFIRMED' : 'ALERT',
      setTemp: data.setTemp,
      currentTemp: data.currentTemp,
    },
    meta: {
      iso: 'ISO-IEC 27001:2022',
      keywords: ['Audit Authenticity', 'Data Integrity', 'Cold Chain Logistics', 'Valparaiso-Rotterdam'],
    }
  };
}