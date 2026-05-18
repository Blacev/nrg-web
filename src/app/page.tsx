import { redirect } from 'next/navigation';

// La raíz redirige a /es — next-intl middleware también lo hace,
// pero este fallback garantiza el redirect si el middleware no aplica.
export default function RootPage() {
  redirect('/es');
}
