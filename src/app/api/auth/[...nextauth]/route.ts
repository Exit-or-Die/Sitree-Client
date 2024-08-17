import AuthService, { UserDetail } from '@/service/auth/AuthService';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;

      const { email } = user;
      const { provider, access_token: accessToken } = account;

      if (!accessToken || !email) return false;

      const body = {
        provider: provider.toUpperCase(),
        email,
        oAuthToken: accessToken
      };

      try {
        const response = await AuthService.signIn(body);

        if (response.code === 400) {
          throw new Error(response.message);
        }

        user.information = response.value;

        return true;
      } catch (error) {
        console.error('Error checking user:', error);

        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.detail = user.information;
      }

      return token;
    },
    async session({ session, token }) {
      session.detail = (token as unknown as { detail: UserDetail }).detail;

      return session;
    }
  }
});

export { handler as GET, handler as POST };
