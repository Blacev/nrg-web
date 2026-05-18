import type { Metadata } from 'next';
import './globals.css';
// globals.css se importa aquí (root layout) — Next.js App Router lo propaga a todos los layouts hijos

export const metadata: Metadata = {
  title: 'NRG — Ingeniería en movimiento',
  description:
    'Servicios de ingeniería para centrales eléctricas. Mantenimiento, montaje y puesta en marcha de turbinas hidráulicas, de vapor y de gas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
