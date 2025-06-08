import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function authGuard() {
  const session = await auth();
  if (!session) redirect('/login');
}
