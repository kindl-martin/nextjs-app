'use server';

import { signOut } from '@/auth';

export async function callSignOut() {
  await signOut({ redirectTo: '/login' });
}
