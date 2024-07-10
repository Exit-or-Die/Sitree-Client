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
      const { email, name, image, id } = user;

      // user = {
      //   id: '106352626255878217290',
      //   name: 'YoonKeun Koh',
      //   email: 'bear04012@gmail.com',
      //   image: 'https://lh3.googleusercontent.com/a/ACg8ocKiS_mAYqkeWQ3OkqJ7ZA9CzuCEMhUld5EGF7OyQQjMOn-h7rfP=s96-c'
      // }

      try {
        // const response = await axios.post('/member/sign-in', { email, name, image, id });
        // 유저가 첫 로그인인지 아닌지 어떻게 확인 할것인가?
        // 있으면 user 반환

        // success response
        const successResponse = {
          user: {
            auth_id: '123',
            email: 'abc@abc.com',
            nickname: 'yoon',
            profile_img_url: 'https://lh3.googleusercontent.com/a/ACg8ocKiS_mAYqkeWQ3OkqJ7ZA9CzuCEMhUld5EGF7OyQQjMOn-h7rfP=s96-c',
            is_new_member: false, //false or true
            access_token: 'abc',
            refresh_token: 'abc'
          }
        };

        //failure response
        const failResponse = {
          user: {}
        };



        if (!successResponse.user.is_new_member) {
          // If user does not exist, set a flag in the token
          user.isAuthenticated = true;
          user.email = successResponse.user.email;
          user.nickname = successResponse.user.nickname;
          user.profileImg = successResponse.user.profile_img_url;
          user.accessToken = successResponse.user.access_token;
          user.refreshToken = successResponse.user.refresh_token;
          return true;
        }
        user.isAuthenticated = false;

        return true;
      } catch (error) {
        console.error('Error checking user:', error);

        return false;
      }
    },
    async jwt({ token, user }) {
      console.log('jwt: ',user)
      if (user) {
        try {
          token.firstTime = user.isAuthenticated;

          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
        } catch (error) {
          console.error('Error getting tokens:', error);
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log('user: ', user)
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.firstTime = token.firstTime;

      return session;
    }
  }
});

export { handler as GET, handler as POST };
