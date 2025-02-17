import { UserDetail } from '@/service/auth/response';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    detail: UserDetail;
  }

  interface User {
    information: UserDetail;
  }

  interface JWT {
    detail: UserDetail;
  }
}
