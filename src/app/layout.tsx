import '@/styles/globals.css';

import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-montserrat'
});

const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

import { AuthProvider } from '@/components/providers/AuthProvider';
import { ReactQueryProvider } from '@/components/providers/ReactQuery';
import SessionWrapper from '@/components/SessionWrapper';
import { MainLayout } from '@/components/templates/MainLayout';

export const metadata: Metadata = {
  title: {
    default: 'Sitree | 자유롭게 프로젝트를 소개하고 팀원을 모집하세요',
    template: 'Sitree | %s'
  },
  icons: {
    icon: '/meta/sitree_favicon.ico',
    shortcut: '/meta/sitree_favicon.ico',
    apple: '/meta/sitree_favicon.ico'
  },
  description:
    '개발자, 디자이너, 기획자가 자유롭게 프로젝트를 등록하고 소개할 수 있는 협업 플랫폼. 당신의 아이디어에 함께할 유저를 지금 모집해보세요.',
  keywords: [
    '프로젝트 모집',
    '사이드 프로젝트',
    '팀원 모집',
    '협업 플랫폼',
    '개발자 팀빌딩',
    '디자이너 구인'
  ],
  metadataBase: new URL('https://si-tree.com'),
  openGraph: {
    title: 'Sitree | 자유롭게 프로젝트를 소개하고 팀원을 모집하세요',
    description:
      '개발자, 디자이너, 기획자가 자유롭게 프로젝트를 등록하고 소개할 수 있는 협업 플랫폼.',
    url: 'https://si-tree.com',
    siteName: 'Sitree',
    images: [
      {
        url: '/meta/sitree_image.png',
        width: 1200,
        height: 630,
        alt: 'Sitree 대표 이미지'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitree | 자유롭게 프로젝트를 소개하고 팀원을 모집하세요',
    description:
      '당신의 아이디어를 현실로! 개발자, 디자이너, 기획자들과 협업할 수 있는 최고의 공간.',
    images: ['/meta/sitree_image.png'],
    creator: '@sitree_official' // 트위터 계정
  },
  authors: [{ name: 'Sitree', url: 'https://si-tree.com' }],
  themeColor: '#08C767',
  viewport: 'width=device-width, initial-scale=1.0'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionWrapper>
      <html lang="kr">
        <AuthProvider>
          <body className={cls(pretendard.className, montserrat.variable)} suppressHydrationWarning>
            <div id="modal" />
            <ReactQueryProvider>
              <MainLayout>
                <main>{children}</main>
              </MainLayout>
            </ReactQueryProvider>
          </body>
        </AuthProvider>
      </html>
    </SessionWrapper>
  );
};

export default RootLayout;
