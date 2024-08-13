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
      const { email, name, image, id } = user;
      // console.log(user)
      // console.log(account);
      const requestData = {
        provider: account?.provider,
        email,
        oAuthToken: account?.access_token
      }

      await AuthService.signIn(requestData);


      // const requestUser = {
      //   authId: id,
      //   nickname: name || 'user',
      //   email: email || 'default@default.com',
      //   profileImgUrl:
      //     image || 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'
      // };

      try {
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

        user.information = failResponse;

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
