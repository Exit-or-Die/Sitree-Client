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
      const { email } = user;

      // user = {
      //   id: '106352626255878217290',
      //   name: 'YoonKeun Koh',
      //   email: 'bear04012@gmail.com',
      //   image: 'https://lh3.googleusercontent.com/a/ACg8ocKiS_mAYqkeWQ3OkqJ7ZA9CzuCEMhUld5EGF7OyQQjMOn-h7rfP=s96-c'
      // }

      try {
        // const response = await axios.post('/api/auth/check-user', { email });
        // 유저가 첫 로그인인지 아닌지 어떻게 확인 할것인가?
        // 있으면 user 반환

        // 없으면 response not found with 에러코드 반환
        // 더 나은 방법있으면 제시
        // signup api 호출 await axios.post('/api/auth/sign-up', { email });
        // success user 반환

        // 이때 리스폰스에서 is_new 추가해서 user 반환
        // 이걸 클라이언트에서 할지 서버에서 할지?

        // success response
        const successResponse = {
          user: {
            uid: '123',
            is_new: true
          }
        };

        //failure response
        const failResponse = {
          user: {}
        };

        if (true) {
          // If user does not exist, set a flag in the token
          user.firstTime = true;
        }
        user.firstTime = true;

        return true;
      } catch (error) {
        console.error('Error checking user:', error);

        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          // const response = await axios.post('http://localhost:3000/api/auth/get-tokens', {
          //   email: user.email
          // });
          token.firstTime = user.firstTime || false;
          const response = {
            data: {
              accessToken: 'access',
              refreshToken: 'refresh'
            }
          };
          token.accessToken = response.data.accessToken;
          token.refreshToken = response.data.refreshToken;
        } catch (error) {
          console.error('Error getting tokens:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.firstTime = token.firstTime;

      return session;
    }
  }
});

export { handler as GET, handler as POST };
