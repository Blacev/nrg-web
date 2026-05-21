import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-primary sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Page not found — La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Volver al inicio / Back to home
      </Link>
    </div>
  );
}
