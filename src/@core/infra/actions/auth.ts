'use server';

import { signIn } from '../auth';

export async function googleSignIn() {
  return await signIn('google', {
    redirect: true,
    redirectTo: '/admin',
  });
}
