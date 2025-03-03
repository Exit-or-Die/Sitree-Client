'use client';

import { useRouter } from 'next/navigation';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="h-[calc(100vh*4/5)] rounded-xlarge shadow-lg border border-gray-200 mx-[80px] my-[24px] bg-white-100 flex flex-col justify-center items-center">
      <div className="relative">
        <div className="w-[80px] h-[80px] rounded-2xlarge bg-slate-95 flex items-center justify-center">
          <SImage src="/error.svg" alt="Error Icon" width={60} height={60} />
        </div>
        <div className="absolute top-[-10px] right-[-10px] w-[28px] h-[28px] rounded-full bg-[#F6424E] flex justify-center items-center">
          <SImage src="/exclamation.svg" alt="Exclamation Icon" width={20} height={20} />
        </div>
      </div>
      <div className="text-2xlarge font-lb text-slate-10 mt-[24px]">페이지를 찾을 수 없어요</div>
      <p className="text-slate-30 mt-2 text-base font-md">
        입력하신 주소가 정확한지 확인해 주세요.
      </p>
      <SButton
        size="md"
        className="bg-slate-95 mt-[24px] text-slate-30 border-0"
        onClick={() => router.back()}
      >
        <SImage src="/left.svg" alt="Left Icon" width={16} height={16} className="mr-1" />
        이전 페이지
      </SButton>
    </div>
  );
};

export default NotFound;
