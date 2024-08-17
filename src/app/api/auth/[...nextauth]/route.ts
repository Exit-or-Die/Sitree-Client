import { getDehydratedQuery } from '@/hooks/react-query/react-query';
import AuthService, { UserDetail } from '@/service/auth/AuthService';
import AuthQueryOptions from '@/service/auth/queries';
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
      }

      try {
        const response = await AuthService.signIn(body);

        if (response.code === 400) {
          throw new Error(response.message);
        }
        // const userResponse = await AuthService.signIn(requestUser);

        // if (userResponse.code !== 200) {
        //   throw new Error(userResponse.message);
        // }

        // const userData = userResponse.value;

        // user exists
        // const successResponse = {
        //   user: {
        //     authId: '123',
        //     email: 'abc@abc.com',
        //     nickname: 'yoon',
        //     profileImgUrl:
        //       'https://lh3.googleusercontent.com/a/ACg8ocKiS_mAYqkeWQ3OkqJ7ZA9CzuCEMhUld5EGF7OyQQjMOn-h7rfP=s96-c',
        //     isNewMember: false, //false or true
        //     accessToken: 'abc',
        //     refreshToken: 'abc'
        //   }
        // };

        // user doesn't exist
        const failResponse = {
          user: {
            authId: '106352626255878217290',
            email: 'bear04012@gmail.com',
            nickname: 'YoonKeun Koh',
            profileImgUrl:
              'https://lh3.googleusercontent.com/a/ACg8ocKiS_mAYqkeWQ3OkqJ7ZA9CzuCEMhUld5EGF7OyQQjMOn-h7rfP=s96-c',
            isNewMember: true,
            accessToken: null,
            refreshToken: null
          }
        };

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
