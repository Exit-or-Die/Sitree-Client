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

      try {
        // const response = await axios.post('http://localhost:3000/api/auth/check-user', { email });
        // 유저가 첫 로그인인지 아닌지 어떻게 확인 할것인가?
        // 있으면 user 반환
        // 없으면 signup api 호출
        // 이후에 user 반환
        const response = {
          user: {
            uid: '123',
            firstTime: true
          }
        };
        if (!response) {
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
      console.log('session');
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.firstTime = token.firstTime;

      return session;
    }
  }
});

export { handler as GET, handler as POST };
