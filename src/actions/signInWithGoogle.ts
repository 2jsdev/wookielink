'use server';

import { signIn } from '@core/shared/infrastructure/services/auth';

export async function signInWithGoogle() {
  return await signIn('google', {
    redirect: true,
    redirectTo: '/admin',
  });
}
