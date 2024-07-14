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
    async signIn({ user }) {
      // const { email, name, image, id } = user;

      // const requestUser = {
      //   authId: id,
      //   nickname: name,
      //   email,
      //   profileImgUrl: image
      // }

      try {
        // const response = await axios.post('/member/sign-in', { email, name, image, id });
        // 유저가 첫 로그인인지 아닌지 어떻게 확인 할것인가?
        // 있으면 user 반환

        // const requestConfig: RequestInit & { url: string; method: string } = {
        //   ...{},
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   credentials: 'include',
        //   body: requestUser ? JSON.stringify(requestUser) : undefined,
        //   url: 'https://api.si-tree.com/members/sign-in'
        // };

        // const { url: requestUrl, ...fetchConfig } = requestConfig;
        // const response = await fetch(requestUrl, fetchConfig);

        // user exists
        const successResponse = {
          user: {
            authId: '123',
            email: 'abc@abc.com',
            nickname: 'yoon',
            profileImgUrl:
              'https://lh3.googleusercontent.com/a/ACg8ocKiS_mAYqkeWQ3OkqJ7ZA9CzuCEMhUld5EGF7OyQQjMOn-h7rfP=s96-c',
            isNewMember: false, //false or true
            accessToken: 'abc',
            refreshToken: 'abc'
          }
        };

        // user doesn't exist
        // const failResponse = {
        //   user: {
        //     authId: "106352626255878217290",
        //     email: "bear04012@gmail.com",
        //     nickname: "YoonKeun Koh",
        //     profileImgUrl: "https://lh3.googleusercontent.com/a/ACg8ocKiS_mAYqkeWQ3OkqJ7ZA9CzuCEMhUld5EGF7OyQQjMOn-h7rfP=s96-c",
        //     isNewMember: true,
        //     accessToken: null,
        //     refreshToken: null
        //   }
        // }

        const response = successResponse;

        user.information = response.user;

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
      session.detail = token.detail;

      return session;
    }
  }
});

export { handler as GET, handler as POST };
