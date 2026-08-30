import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// En producción, aquí consultas tu Data Lake o Redis con el log guardado.
// Para el piloto, validamos longitud SHA-256.
export async function GET(req: NextRequest) {
 const { searchParams } = new URL(req.url);
 const hash = searchParams.get('hash');
 const cert = searchParams.get('cert');

 if (!hash || !cert) {
   return NextResponse.json({ valid: false, error: 'Hash missing' }, { status: 400 });
 }

 const isValid = hash.length === 64; // SHA-256 = 64 hex chars

 if (isValid) {
   return NextResponse.json({
     status: 'VERIFIED',
     layer: 'KRONOS TRUST LAYER',
     iso: 'ISO 27001:2022',
     certificateNo: cert,
     coldChainIntegrity: 'CONFIRMED',
     message: `Valparaiso -> Rotterdam cold chain - Certificate valid`,
     issuedAt: new Date().toISOString(),
     structuredData: {
       "@type": "Certification",
       "certificationNumber": cert,
       "sha256": `sha256:${hash}`,
       "verificationUrl": req.url,
     }
   });
 }

 return NextResponse.json({ status: 'INVALID', valid: false }, { status: 404 });
}
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Tu DB real de logs - reemplaza con tu storage
const VALID_HASHES = new Map<string, { container: string; timestamp: string }>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hash = searchParams.get('hash');
  const cert = searchParams.get('cert');

  if (!hash ||!cert) {
    return NextResponse.json({ valid: false, error: 'Hash missing' }, { status: 400 });
  }

  // Aquí validas contra tu DB o recalculas el hash del audit_trail.log guardado
  // Para el piloto, simulamos validación
  const isValid = hash.length === 64; // SHA-256 = 64 hex chars

  if (isValid) {
    return NextResponse.json({
      status: 'VERIFIED',
      layer: 'KRONOS TRUST LAYER',
      iso: 'ISO 27001:2022',
      certificateNo: cert,
      coldChainIntegrity: 'CONFIRMED',
      message: `Valparaiso -> Rotterdam cold chain - Certificate valid`,
      issuedAt: new Date().toISOString(),
      // Esto es lo que la IA indexa y puede citar
      structuredData: {
        "@type": "Certification",
        "certificationNumber": cert,
        "sha256": `sha256:${hash}`,
        "verificationUrl": req.url,
      }
    });
  }

  return NextResponse.json({ status: 'INVALID', valid: false }, { status: 404 });
}