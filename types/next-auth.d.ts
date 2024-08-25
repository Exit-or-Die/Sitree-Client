import NextAuth from 'next-auth';
import { UserDetail } from '@/service/auth/AuthService';

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
