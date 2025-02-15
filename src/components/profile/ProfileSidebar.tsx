'use client';

import html2pdf from 'html2pdf.js';
import { useState } from 'react';

import SImage from '../common/Image';
import PortfolioPDF from './PortfolioPDF';

const ProfileSidebar = () => {
  const [text, setText] = useState('');

  const exportToPDF = () => {
    const element = document.getElementById('pdf-template');
    if (!element) return;

    html2pdf()
      .set({
        margin: 0,
        filename: '이력서.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save();
  };

  return (
    <div className="w-[300px] flex flex-col">
      <div className="bg-white-100 p-5 border border-slate-90 rounded-xlarge shadow-sm">
        <div className="w-[88px] h-[88px] bg-white-100 rounded-full flex items-center justify-center border">
          <SImage src="/defaultUser.svg" alt="default user" width={70} height={70} />
        </div>
        <h2 className="text-large text-slate-10 mt-4 font-lg">고윤근</h2>
        <div className="h-[46px] relative flex items-center bg-slate-95 p-3 rounded-large w-full max-w-md mt-4">
          <input
            type="text"
            placeholder="한 줄 소개를 작성해 주세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-transparent w-full outline-none text-[13px] placeholder:text-slate-60 placeholder:font-md"
          />
          <button className="text-slate-30 flex items-center min-w-[65px] justify-center text-[10px]">
            <SImage src="/pencil.svg" alt="pencil" width={14} height={14} className="mr-1" />
            입력하기
          </button>
          <div className="absolute top-1 left-5 -mt-2 w-3 h-3 bg-gray-100 rotate-45" />
        </div>
      </div>
      <button
        onClick={exportToPDF}
        className="mt-3 w-full py-2 text-slate-80 bg-slate-90 rounded-large text-center text-base font-bd h-[52px]"
      >
        PDF 이력서
      </button>
      <div className="mt-6 w-full flex justify-around text-slate-30 text-small font-md">
        <button>로그아웃</button>
        <button className="flex items-center">
          <SImage src="/setting.svg" alt="setting" width={18} height={18} className="mr-1" />
          프로필 편집
        </button>
      </div>
      <div className="hidden">
        <PortfolioPDF />
      </div>
    </div>
  );
};

export default ProfileSidebar;
