import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NRG Ingeniería — Ingeniería en movimiento';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020a15 0%, #050f22 60%, #0a1d3e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Amber accent bar top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#e89f3c',
          }}
        />

        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 400,
            background: 'radial-gradient(ellipse at center top, rgba(30,58,111,0.8) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          NRG
        </div>

        {/* Amber underline accent */}
        <div
          style={{
            width: 64,
            height: 4,
            background: '#e89f3c',
            borderRadius: 2,
            marginTop: 16,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            marginTop: 24,
            letterSpacing: '0.01em',
          }}
        >
          Ingeniería en movimiento
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
            marginTop: 12,
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Mantenimiento, montaje y puesta en marcha de turbinas
        </div>
      </div>
    ),
    { ...size },
  );
}
