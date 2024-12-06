'use client';

import React from 'react';
import AuthService from '@/service/auth/AuthService';

export default function Home() {
  const testComments = async () => await AuthService.testComments();

  return <div className="w-full h-screen flex flex-col justify-center items-center">
    <button onClick={testComments}>renew Token</button>
  </div>;
}
