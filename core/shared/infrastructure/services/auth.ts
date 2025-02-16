import NextAuth, { type DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@core/shared/infrastructure/persistence/prisma';
import { cookies } from 'next/headers';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          username: token.username as string,
        },
      };
    },
  },
  events: {
    createUser: async ({ user }) => {
      const cookieStore = cookies();
      const username = (await cookieStore).get('username')?.value;

      if (username) {
        await prisma.user.update({
          where: { id: user.id },
          data: { username },
        });

        (await cookieStore).delete('username');
      }
    },
  },
});
